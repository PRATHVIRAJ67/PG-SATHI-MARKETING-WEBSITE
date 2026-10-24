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

/** Included in every plan. */
export const EVERY_PLAN = [
  'Rooms and beds by floor, bulk add',
  'Monthly rent bills in one click',
  'Payments, receipts and deposits',
  'Online rent payments (your Razorpay)',
  'UPI QR on every bill',
  'Join by QR, with residents’ own app login',
  'Resident app: room, bills, pay online, receipts',
  'Expenses and reports with CSV export',
];
