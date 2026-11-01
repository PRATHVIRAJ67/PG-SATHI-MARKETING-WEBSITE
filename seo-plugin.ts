import type { Plugin } from 'vite';
import { FAQS } from './src/faqs';
import { SEO, SITE_URL } from './seo.config';

const SCREENS = [
  ['overview', 'PG Sathi owner dashboard overview'],
  ['rooms', 'Rooms and beds by floor'],
  ['residents', 'Resident list with rent status'],
  ['payments', 'Rent payments and receipts'],
  ['online-payments', 'Online rent payments by UPI and Razorpay'],
  ['reports', 'Collection and expense reports'],
  ['join-qr', 'Join-by-QR code for new residents'],
  ['app-home', 'PG Sathi resident app home screen'],
] as const;

function structuredData() {
  const abs = (p: string) => `${SITE_URL}${p}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': abs('/#organization'),
        name: SEO.name,
        url: abs('/'),
        logo: abs('/favicon.svg'),
        areaServed: { '@type': 'Country', name: 'India' },
      },
      {
        '@type': 'WebSite',
        '@id': abs('/#website'),
        url: abs('/'),
        name: SEO.name,
        inLanguage: 'en-IN',
        publisher: { '@id': abs('/#organization') },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': abs('/#software'),
        name: SEO.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android, iOS',
        description: SEO.description,
        url: abs('/'),
        image: abs(SEO.image),
        publisher: { '@id': abs('/#organization') },
        audience: { '@type': 'BusinessAudience', name: 'PG, hostel and co-living owners in India' },
        featureList: [
          'Rooms and beds by floor',
          'Monthly rent bills in one click',
          'Payments, receipts and deposits',
          'Online rent payments through the owner’s own Razorpay account',
          'UPI QR on every bill',
          'Join by QR with the resident app',
          'Expenses and reports with CSV export',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': abs('/#faq'),
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }).replace(/</g, '\\u003c');
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const images = SCREENS.map(
    ([file, caption]) =>
      `    <image:image><image:loc>${SITE_URL}/screens/${file}.png</image:loc><image:caption>${caption}</image:caption></image:image>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${images}
  </url>
</urlset>
`;
}

/** Fills the SEO placeholders in index.html and writes sitemap.xml at build time. */
export function seoPlugin(): Plugin {
  return {
    name: 'pg-sathi-seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replaceAll('%SEO_TITLE%', SEO.title)
        .replaceAll('%SEO_DESCRIPTION%', SEO.description)
        .replaceAll('%SEO_KEYWORDS%', SEO.keywords)
        .replaceAll('%SEO_IMAGE%', `${SITE_URL}${SEO.image}`)
        .replaceAll('%SEO_IMAGE_ALT%', SEO.imageAlt)
        .replace('%JSON_LD%', () => structuredData());
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
    },
  };
}
