import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  BarChart3,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  FileText,
  IndianRupee,
  Layers,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  NotebookPen,
  Phone,
  QrCode,
  Receipt,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { CONTACT, EVERY_PLAN, PLANS, SIGN_IN_URL, SIGN_UP_URL } from './config';

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------
function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="PG Sathi home">
      <img src="/favicon.svg" alt="" className="size-9 rounded-[10px]" width={36} height={36} />
      <span className={`text-[17px] font-semibold tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}>PG Sathi</span>
    </a>
  );
}

function Button({ href, children, variant = 'primary', size = 'md', className = '' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'light' | 'ghost'; size?: 'md' | 'lg'; className?: string }) {
  const styles = {
    primary: 'bg-navy-900 text-white hover:bg-navy-800 shadow-sm',
    secondary: 'bg-white text-navy-900 ring-1 ring-gray-200 hover:ring-gray-300 hover:bg-gray-25',
    light: 'bg-white text-navy-900 hover:bg-accent-50',
    ghost: 'text-white ring-1 ring-white/30 hover:bg-white/10',
  }[variant];
  const sizes = { md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-[15px]' }[size];
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors ${styles} ${sizes} ${className}`}
    >
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, children, center = true }: { eyebrow: string; title: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-[17px] leading-relaxed text-gray-600">{children}</p>}
    </div>
  );
}

/** A screenshot in a light browser frame. */
function BrowserShot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(20,33,61,0.35)] ring-1 ring-gray-200 ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="size-2.5 rounded-full bg-gray-300" />
      </div>
      <img src={src} alt={alt} width={2880} height={1800} loading="lazy" className="block h-auto w-full" />
    </div>
  );
}

function PhoneShot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-navy-900 bg-navy-900 shadow-[0_24px_50px_-16px_rgba(20,33,61,0.5)] ${className}`}>
      <img src={src} alt={alt} width={780} height={1688} loading="lazy" className="block h-auto w-full rounded-[1.6rem]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export function App() {
  return (
    <div id="top" className="min-h-dvh overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Features />
        <MoreFeatures />
        <HowItWorks />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

const NAV = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[14px] font-medium text-gray-600 hover:text-navy-900">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={SIGN_IN_URL} target="_blank" rel="noreferrer" className="px-3 text-[14px] font-medium text-gray-700 hover:text-navy-900">
            Sign in
          </a>
          <Button href={SIGN_UP_URL}>Start free</Button>
        </div>
        <button className="grid size-10 place-items-center rounded-lg text-navy-900 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-2 md:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-[15px] font-medium text-gray-700">
              {n.label}
            </a>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button href={SIGN_IN_URL} variant="secondary">
              Sign in
            </Button>
            <Button href={SIGN_UP_URL}>Start free</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(60%_60%_at_50%_0%,#e0e0fb_0%,rgba(255,255,255,0)_70%)]" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[13px] font-medium text-accent-700 ring-1 ring-accent-200">
            <BedDouble className="size-4" /> Made for PGs, hostels and co-living in India
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-navy-900 sm:text-6xl">
            Run your PG from one screen. <span className="text-accent-600">Rent, rooms and residents</span>, sorted.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            PG Sathi tracks every bed, bills rent every month, records payments and deposits, and lets residents pay online by UPI. No more notebooks, Excel sheets or chasing people on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={SIGN_UP_URL} size="lg">
              Start free <ArrowRight className="size-4" />
            </Button>
            <Button href="#features" size="lg" variant="secondary">
              See what it does
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-gray-500">
            {['Free plan for one PG', 'Set up in 10 minutes', 'Works on phone and laptop'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-success-600" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <BrowserShot src="/screens/overview.png" alt="PG Sathi dashboard: rent billed, collected, outstanding and occupancy for the month" />
          <PhoneShot src="/screens/join-form-phone.png" alt="New resident filling in the join form on their phone" className="absolute -bottom-10 -right-2 hidden w-[180px] sm:block lg:-right-10 lg:w-[210px]" />
          <div className="absolute -left-4 top-1/3 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 md:block lg:-left-12">
            <p className="text-xs font-medium text-gray-500">Paid online</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-navy-900">
              <span className="grid size-7 place-items-center rounded-full bg-success-50 text-success-600">
                <Check className="size-4" />
              </span>
              ₹8,000 · Room 101
            </p>
            <p className="mt-1 text-xs text-gray-500">Recorded against the bill by itself</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: NotebookPen, title: 'Notebooks and Excel', text: 'Who is in which bed, who paid, who is late: it lives in a register that only you can read.' },
    { icon: MessageCircle, title: 'Chasing rent on WhatsApp', text: 'Every month you check bank SMS, match UPI payments to names and send reminders one by one.' },
    { icon: Wallet, title: 'Deposits you can’t trace', text: 'When someone moves out, nobody is sure how much deposit was paid, deducted or refunded.' },
  ];
  return (
    <section className="border-y border-gray-100 bg-gray-25 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Sound familiar?" title="Running a PG shouldn’t mean doing accounts every night">
          PG Sathi replaces the register, the spreadsheet and the guesswork with one simple app built around beds, bills and payments.
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white p-6 ring-1 ring-gray-200">
              <span className="grid size-10 place-items-center rounded-xl bg-warning-50 text-warning-600">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ eyebrow, icon: Icon, title, text, points, image, reverse, extra }: { eyebrow: string; icon: typeof Layers; title: string; text: string; points: string[]; image: ReactNode; reverse?: boolean; extra?: ReactNode }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className={reverse ? 'lg:order-2' : ''}>
        <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-600">
          <Icon className="size-4" /> {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">{title}</h3>
        <p className="mt-4 text-[16px] leading-relaxed text-gray-600">{text}</p>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-[15px] text-gray-700">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600">
                <Check className="size-3.5" />
              </span>
              {p}
            </li>
          ))}
        </ul>
        {extra}
      </div>
      <div className={reverse ? 'lg:order-1' : ''}>{image}</div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl space-y-24 px-4 sm:px-6">
        <SectionHeading eyebrow="Features" title="Everything a PG owner does, in one place">
          Built with PG owners, for the way PGs actually run: beds on floors, rent every month, deposits, and residents who come and go.
        </SectionHeading>

        <FeatureRow
          eyebrow="Rooms & beds"
          icon={Layers}
          title="Your whole building, floor by floor"
          text="See every bed on every floor at a glance: who is in it, which are vacant, and which are under repair. Add a whole floor in one go."
          points={[
            'Add rooms 101 to 110 in one step, with beds and rent for all',
            'Rooms grouped by floor, with how full each floor is',
            'Tap any bed to assign a resident, move them or mark it unavailable',
          ]}
          image={<BrowserShot src="/screens/rooms.png" alt="Rooms and beds grouped by floor, showing occupied and vacant beds" />}
        />

        <FeatureRow
          reverse
          eyebrow="Rent & payments"
          icon={Receipt}
          title="Bill the whole month in one click"
          text="Generate every resident’s rent bill for the month at once, with first-month proration and extra charges like laundry. Record cash, UPI or bank transfers in seconds."
          points={[
            'Printable bills and receipts with your business name',
            'Overdue and partly paid bills are highlighted automatically',
            'Advance payments carry forward as credit',
            'Deposits tracked from collection to deduction to refund',
          ]}
          image={<BrowserShot src="/screens/payments.png" alt="Payments list with receipts, methods and amounts" />}
        />

        <FeatureRow
          eyebrow="Online payments"
          icon={Zap}
          title="Residents pay online. It records itself."
          text="Connect your own Razorpay account and residents can pay rent from the app by UPI, card or netbanking. The money goes straight to your bank, and the payment is matched to the right bill automatically."
          points={[
            'Your Razorpay, your money: PG Sathi never holds your funds',
            'Every payment is verified with Razorpay before it is recorded',
            'Prefer plain UPI? Every bill carries a UPI QR with the exact amount',
          ]}
          image={<BrowserShot src="/screens/online-payments.png" alt="Online payments settings with Razorpay and a UPI QR code" />}
        />

        <FeatureRow
          reverse
          eyebrow="Join by QR"
          icon={QrCode}
          title="New residents fill in their own details"
          text="Print your join QR at the front desk. New people scan it, fill in their name, phone, ID and emergency contact on their own phone, and you get a notification. Approve it, pick a bed and rent, done."
          points={['No typing on your side, no lost paper forms', 'One QR for the whole PG or one per property', 'Turn it off or make a new one any time']}
          image={
            <div className="relative">
              <BrowserShot src="/screens/join-requests.png" alt="Join requests waiting for approval" />
              <PhoneShot src="/screens/join-form-phone.png" alt="Join form on a phone" className="absolute -bottom-8 -left-4 w-[150px] sm:w-[190px] lg:-left-10" />
            </div>
          }
        />

        <FeatureRow
          eyebrow="Reports"
          icon={BarChart3}
          title="Know exactly where you stand"
          text="Collection, outstanding rent, occupancy, expenses and income per property. Export to Excel (CSV) or print for your accountant."
          points={['Month-by-month income against expenses', 'Who owes what, and since when', 'Occupancy for every property']}
          image={<BrowserShot src="/screens/reports.png" alt="Reports for collection, outstanding rent, occupancy and expenses" />}
        />
      </div>
    </section>
  );
}

function MoreFeatures() {
  const items = [
    { icon: Smartphone, title: 'Resident app', text: 'Residents see their bills, pay rent and download receipts on Android.' },
    { icon: Building2, title: 'Many properties', text: 'Run several PGs from one login and switch between them in a click.' },
    { icon: Users, title: 'Team roles', text: 'Give your manager, accountant or staff their own login with the right access.' },
    { icon: IndianRupee, title: 'Expenses', text: 'Electricity, groceries, salaries: log them with receipts and see your real profit.' },
    { icon: FileText, title: 'Bills & receipts', text: 'Clean, printable bills and receipts with your name, address and GSTIN.' },
    { icon: ShieldCheck, title: 'Your data stays yours', text: 'Every business’s data is kept separate and private. Every change is logged.' },
  ];
  return (
    <section className="bg-navy-900 py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-200">And much more</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Small things that save you hours</h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-600/20 text-accent-200">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '1', title: 'Sign up and add your PG', text: 'Create your account and add your property: name, address and facilities. Takes two minutes.' },
    { n: '2', title: 'Add rooms in bulk', text: 'Type “101 to 110”, choose beds per room and one rent for all. Then the next floor is filled in for you.' },
    { n: '3', title: 'Add residents, start collecting', text: 'Add residents yourself or let them scan your join QR. Generate the month’s rent and start collecting.' },
  ];
  return (
    <section id="how" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="How it works" title="Up and running before your next rent day" />
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-900 text-[15px] font-semibold text-white">{s.n}</span>
                <div>
                  <h3 className="text-[17px] font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-gray-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <BrowserShot src="/screens/bulk-rooms.png" alt="Adding rooms 301 to 310 in bulk with beds and rent" />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="border-y border-gray-100 bg-gray-25 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Pricing" title="Simple pricing. Start free.">
          Every plan includes every feature. Pick the one that fits the size of your business, and change any time.
        </SectionHeading>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl bg-white p-7 ${p.highlighted ? 'ring-2 ring-accent-600 shadow-[0_20px_50px_-20px_rgba(91,92,226,0.45)]' : 'ring-1 ring-gray-200'}`}
            >
              {p.highlighted && <span className="absolute -top-3 left-7 rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
              <h3 className="text-lg font-semibold text-navy-900">{p.name}</h3>
              <p className="mt-1 text-[14px] text-gray-500">{p.description}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight text-navy-900">{p.price}</span>
                <span className="text-[14px] text-gray-500">{p.period}</span>
              </p>
              <p className="mt-1 text-[13px] font-medium text-success-700">{p.note}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.limits.map((l) => (
                  <li key={l} className="flex gap-3 text-[15px] text-gray-700">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-600" /> {l}
                  </li>
                ))}
              </ul>
              <Button href={SIGN_UP_URL} variant={p.highlighted ? 'primary' : 'secondary'} className="mt-8 w-full">
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-6 ring-1 ring-gray-200">
          <p className="text-[14px] font-semibold text-navy-900">Included in every plan</p>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {EVERY_PLAN.map((f) => (
              <li key={f} className="flex gap-2.5 text-[14px] text-gray-700">
                <Check className="mt-0.5 size-4 shrink-0 text-success-600" /> {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-500">Prices exclude GST. Online payment fees are charged by Razorpay on your own account.</p>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: 'Do I need to install anything?',
    a: 'No. PG Sathi runs in your browser on a laptop or phone. Residents can use the PG Sathi Android app to see bills and pay, or simply scan a UPI QR.',
  },
  {
    q: 'When residents pay online, where does the money go?',
    a: 'Straight to your own bank account through your own Razorpay account. PG Sathi never holds your money. It only records the payment against the right bill after checking it with Razorpay.',
  },
  {
    q: 'I don’t have Razorpay. Can residents still pay by UPI?',
    a: 'Yes. Add your UPI ID and every bill shows a QR code with the exact amount. Residents pay from GPay, PhonePe or Paytm, and you record the payment in a tap.',
  },
  {
    q: 'Is my data safe?',
    a: 'Each business’s data is stored separately, and only people you add to your team can see it. Every important change (bills, payments, voids) is kept in an activity log.',
  },
  {
    q: 'Can my manager or accountant use it?',
    a: 'Yes. Invite them with their own login and choose their role: manager, accountant or staff. You stay the owner.',
  },
  {
    q: 'I have more than one PG. Does that work?',
    a: 'Yes. Add all your properties under one business and switch between them, or see everything together. Each property can have its own rooms, rents and join QR.',
  },
  {
    q: 'Can I try it before paying?',
    a: 'The Starter plan is free for one property with up to 30 residents, with every feature. Growth and Scale come with a 14-day free trial.',
  },
];

function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions owners ask us" />
        <div className="mt-12 divide-y divide-gray-200 rounded-2xl ring-1 ring-gray-200">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-navy-900">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactButtons({ light = false }: { light?: boolean }) {
  const v = light ? 'ghost' : 'secondary';
  return (
    <>
      {CONTACT.whatsapp && (
        <Button href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hi, I want to know more about PG Sathi.')}`} variant={v} size="lg">
          <MessageCircle className="size-4" /> WhatsApp us
        </Button>
      )}
      {CONTACT.phone && (
        <Button href={`tel:${CONTACT.phone}`} variant={v} size="lg">
          <Phone className="size-4" /> Call us
        </Button>
      )}
      {CONTACT.email && (
        <Button href={`mailto:${CONTACT.email}`} variant={v} size="lg">
          <Mail className="size-4" /> Email us
        </Button>
      )}
    </>
  );
}

function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy-900 px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(108,109,232,0.45)_0%,rgba(20,33,61,0)_70%)]" aria-hidden />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">Your PG, organised by this weekend.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-white/75">Start free with one property. Add your rooms, your residents and this month’s rent in under an hour.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={SIGN_UP_URL} variant="light" size="lg">
              Start free <ArrowRight className="size-4" />
            </Button>
            <ContactButtons light />
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-[13px] text-white/60">
            <Lock className="size-3.5" /> No card needed for the free plan
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-[13px] text-gray-500">PG management software for owners in India.</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-gray-600" aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-navy-900">
              {n.label}
            </a>
          ))}
          <a href={SIGN_IN_URL} target="_blank" rel="noreferrer" className="hover:text-navy-900">
            Sign in
          </a>
        </nav>
        <p className="text-[13px] text-gray-400">© {new Date().getFullYear()} PG Sathi</p>
      </div>
    </footer>
  );
}
