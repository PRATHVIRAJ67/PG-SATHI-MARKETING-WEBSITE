/**
 * Everything you may want to change without touching the page layout.
 */
export const APP_URL = 'https://pg-sathi-admin.prathviholla67.workers.dev';
export const SIGN_UP_URL = `${APP_URL}/sign-up`;
export const SIGN_IN_URL = `${APP_URL}/sign-in`;

/**
 * Contact details for "Talk to us". Leave a value empty to hide that button.
 * WhatsApp: digits only with country code, e.g. '919845012345'.
 */
export const CONTACT = {
  email: '',
  whatsapp: '',
  phone: '',
};

/**
 * Plans as configured in the platform (Super admin → Plans). Keep in sync.
 * Every plan has every feature; plans differ only in limits.
 */
export const PLANS = [
  {
    name: 'Starter',
    price: '₹0',
    period: 'forever',
    description: 'For a single PG getting organised.',
    limits: ['1 property', 'Up to 30 residents', '1 team login (you)'],
    note: 'No card needed',
    cta: 'Start free',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '₹999',
    period: 'per month',
    description: 'For growing PGs with a small team.',
    limits: ['Up to 3 properties', 'Up to 150 residents', 'Up to 5 team logins'],
    note: '14-day free trial',
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '₹2,499',
    period: 'per month',
    description: 'For operators running many properties.',
    limits: ['Unlimited properties', 'Unlimited residents', 'Unlimited team logins', 'Priority support'],
    note: '14-day free trial',
    cta: 'Start free trial',
    highlighted: false,
  },
] as const;

/** Included in every plan. */
export const EVERY_PLAN = [
  'Rooms and beds by floor, bulk add',
  'Monthly rent bills in one click',
  'Payments, receipts and deposits',
  'Online rent payments (your Razorpay)',
  'UPI QR on every bill',
  'Join-by-QR for new residents',
  'Resident app for bills and receipts',
  'Expenses and reports with CSV export',
];
