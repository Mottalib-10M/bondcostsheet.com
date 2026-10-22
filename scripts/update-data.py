#!/usr/bin/env python3
"""Rereads every official page behind a bond amount and checks that the amount is still there.

For each record of data/facts/*.json (state bonds) and data/facts/federal.json, the script downloads the
official URL, extracts its text (HTML or PDF), and looks for the required amount (or the quoted line).
It writes data/verification.json:
  { "checked": "YYYY-MM-DD", "records": { "notary/TX": {"status": "ok" | "missing" | "unreachable", "http": 200}, ... } }
  - ok           the amount (or the quote) is on the page: the record stays as it is;
  - missing      the page answered but the amount is gone: a legislature or agency may have changed it.
                 The script never rewrites an amount by itself (an amount enters the site only when a person
                 reads it on the official page); it exits with code 1 so the scheduled run fails and asks for review;
  - unreachable  the site refused automated reading (403, timeout): nothing is concluded.
Then it rebuilds src/data/bonds.json (scripts/build-data.py).

Usage:  python3 scripts/update-data.py            (all records)
        python3 scripts/update-data.py notary     (one bond type)
"""
import io, json, os, re, subprocess, sys, urllib.request, datetime, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FACTS = os.path.join(ROOT, 'data', 'facts')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.status, r.read(), r.headers.get('Content-Type', '')
    except urllib.error.HTTPError as e:
        return e.code, b'', ''
    except Exception:
        return 0, b'', ''


def text_of(body, ctype, url):
    if body[:4] == b'%PDF' or 'pdf' in ctype or url.lower().endswith('.pdf'):
        try:
            from pypdf import PdfReader
            return ' '.join((p.extract_text() or '') for p in PdfReader(io.BytesIO(body)).pages)
        except Exception:
            return ''
    t = body.decode('utf-8', 'replace')
    t = re.sub(r'<(script|style)[\s\S]*?</\1>', ' ', t)
    return html.unescape(re.sub(r'<[^>]+>', ' ', t))


norm = lambda s: re.sub(r'\s+', ' ', s.replace(' ', ' ')).lower()


def needles(r):
    """Strings whose presence confirms the record: each required amount, else the multiplier."""
    out = []
    amts = [r.get('amount')] + [v.get('amount') for v in (r.get('variants') or [])] + list(r.get('range') or [])
    for a in amts:
        if a:
            out.append([f'{a:,}', f'{a}'])
    if r.get('multiplier'):
        m = r['multiplier']
        out.append(['1 ½', '1½', '1.5', 'one and one-half', 'one and a half'] if m == 1.5 else ['market value', 'value of the vehicle'])
    return out


def check(r, text):
    t = norm(text).replace('$', '')
    groups = needles(r)
    if groups and all(any(n.lower() in t for n in g) for g in groups):
        return True
    q = norm(r.get('quote', ''))
    return bool(q) and q[:60] in norm(text)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    today = datetime.date.today().isoformat()
    res, missing = {}, []
    files = [f for f in sorted(os.listdir(FACTS)) if f.endswith('.json') and (not only or f == f'{only}.json')]
    for f in files:
        data = json.load(open(os.path.join(FACTS, f)))
        kind = f[:-5]
        for key, r in data.items():
            if not isinstance(r, dict) or not r.get('url') or r.get('verified') is False:
                continue
            status, body, ctype = fetch(r['url'])
            if status != 200 or not body:
                res[f'{kind}/{key}'] = {'status': 'unreachable', 'http': status}
                continue
            ok = check(r, text_of(body, ctype, r['url']))
            res[f'{kind}/{key}'] = {'status': 'ok' if ok else 'missing', 'http': status}
            if not ok:
                missing.append(f'{kind}/{key} {r["url"]}')
            print(f'{kind}/{key}: {res[f"{kind}/{key}"]["status"]}', flush=True)
    path = os.path.join(ROOT, 'data', 'verification.json')
    prev = json.load(open(path)) if os.path.exists(path) else {'records': {}}
    prev['records'].update(res)
    prev['checked'] = today
    json.dump(prev, open(path, 'w'), indent=1, ensure_ascii=False)
    subprocess.run([sys.executable, os.path.join(ROOT, 'scripts', 'build-data.py')], check=True)
    n = {s: sum(1 for x in res.values() if x['status'] == s) for s in ('ok', 'missing', 'unreachable')}
    print(f'update-data: {n["ok"]} confirmed, {n["missing"]} to review, {n["unreachable"]} unreachable')
    if missing:
        print('Amounts no longer found on their official page (read them and edit data/facts by hand):')
        print('\n'.join('  ' + m for m in missing))
        sys.exit(1)


if __name__ == '__main__':
    main()
