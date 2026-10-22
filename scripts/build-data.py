#!/usr/bin/env python3
"""Builds src/data/bonds.json from data/facts/*.json (one record per state, read on an official page).

A record enters the site only with an official URL and an exact quote; a record marked
"verified": false or without a quote is dropped (it never reaches a page or the calculator).
Rerun after editing a facts file:  python3 scripts/build-data.py
"""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(ROOT, 'data', 'facts')
STATES = {
 'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut',
 'DE': 'Delaware', 'DC': 'District of Columbia', 'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois',
 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
 'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana',
 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania',
 'RI': 'Rhode Island', 'SC': 'South Carolina', 'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
 'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'}
TYPES = [
 ('notary', 'Notary public bond', 'Notary', 'notary'),
 ('auto-dealer', 'Motor vehicle dealer bond', 'Auto dealer', 'dealer'),
 ('contractor', 'Contractor license bond', 'Contractor', 'license'),
 ('title', 'Bonded title (lost title bond)', 'Title', 'title'),
]
slug = lambda n: n.lower().replace(' ', '-')
out = {'retrieved': '2026-10-22', 'types': [], 'federal': json.load(open(os.path.join(F, 'federal.json')))}
errors = []
for tid, label, short, pricing in TYPES:
    raw = json.load(open(os.path.join(F, f'{tid}.json')))
    states = []
    for code, r in sorted(raw.items(), key=lambda kv: STATES[kv[0]]):
        if r.get('verified') is False or not r.get('url') or not r.get('quote'):
            continue
        if not r['url'].startswith('http'):
            errors.append(f'{tid} {code}: url'); continue
        rec = {'code': code, 'slug': slug(STATES[code]), 'name': STATES[code], 'required': r.get('required', True),
               'amount': r.get('amount'), 'variants': r.get('variants') or [], 'range': r.get('range'),
               'multiplier': r.get('multiplier'), 'term': r.get('term_years'), 'statute': r.get('statute'),
               'note': r.get('note', ''), 'quote': r['quote'], 'url': r['url'], 'read': r.get('read', '2026-10-22'),
               'previous': r.get('previous_amount'), 'changed': r.get('change_date'), 'official': r.get('official_premium'),
               'valueBasis': r.get('value_basis'), 'threshold': r.get('threshold')}
        if rec['required'] and rec['amount'] is None and not rec['variants'] and not rec['range'] and not rec['multiplier']:
            errors.append(f'{tid} {code}: required but no amount'); continue
        states.append(rec)
    out['types'].append({'id': tid, 'label': label, 'short': short, 'pricing': pricing, 'states': states})
if errors:
    sys.exit('\n'.join(errors))
json.dump(out, open(os.path.join(ROOT, 'src', 'data', 'bonds.json'), 'w'), indent=1, ensure_ascii=False)
print(' · '.join(f"{t['id']} {len(t['states'])}" for t in out['types']))
