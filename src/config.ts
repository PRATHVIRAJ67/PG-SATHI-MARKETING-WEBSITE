/**
 * Everything you may want to change without touching the page layout.
 *
 * "Book a demo" requests go to the PG Sathi database (Super admin → Leads).
 * The publishable key is public by design; it can only call submit_lead here.
 */
export const SUPABASE_URL = 'https://qdnnzbytjhtxzdamndyl.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SY3tyGEBfEkK_7onsqIUVg_cw4FwhXo';

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
    note: 'Set up for you by our team',
    cta: 'Talk to us',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '₹999',
    period: 'per month',
    description: 'For growing PGs with a small team.',
    limits: ['Up to 3 properties', 'Up to 150 residents', 'Up to 5 team logins'],
    note: 'Billed monthly',
    cta: 'Talk to us',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '₹2,499',
    period: 'per month',
    description: 'For operators running many properties.',
    limits: ['Unlimited properties', 'Unlimited residents', 'Unlimited team logins', 'Priority support'],
    note: 'Billed monthly',
    cta: 'Talk to us',
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
