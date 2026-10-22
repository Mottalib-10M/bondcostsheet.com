/** Every page id the site is meant to have. Content tests accept links to these ids while pages are being
 *  written; the "all planned pages exist" test fails until each has its file. */
export const PLANNED_GUIDES = [
  'what-is-a-surety-bond', 'surety-bond-cost', 'notary-bond', 'contractor-license-bond', 'auto-dealer-bond', 'title-bond',
  'freight-broker-bond', 'erisa-bond', 'performance-bond', 'payment-bond', 'bid-bond', 'license-and-permit-bond',
  'probate-bond', 'bad-credit-surety-bonds',
];
export const PLANNED_STATES = [
  'notary:texas', 'notary:florida', 'notary:california', 'notary:pennsylvania', 'notary:illinois', 'notary:michigan', 'notary:indiana', 'notary:louisiana',
  'auto-dealer:california', 'auto-dealer:texas', 'auto-dealer:florida', 'auto-dealer:new-york', 'auto-dealer:georgia', 'auto-dealer:north-carolina',
  'contractor:california', 'contractor:washington', 'contractor:oregon', 'contractor:arizona',
  'title:texas', 'title:california',
].map((x) => `state:${x}`);
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, ...PLANNED_STATES]);
