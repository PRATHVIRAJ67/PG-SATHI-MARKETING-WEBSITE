import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  BarChart3,
  BedDouble,
  Bell,
  Building2,
  Check,
  ChevronDown,
  FileText,
  IndianRupee,
  KeyRound,
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
import { CONTACT, EVERY_PLAN, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './config';

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
      <h2 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-navy-900 sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-[15px] leading-relaxed text-gray-600 sm:text-[17px]">{children}</p>}
    </div>
  );
}

/**
 * A screenshot in a light browser frame. On phones the whole dashboard would be
 * unreadably small, so it zooms into the main content (past the sidebar).
 */
function BrowserShot({ src, alt, className = '', focus = [40, 45] }: { src: string; alt: string; className?: string; focus?: [number, number] }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(20,33,61,0.35)] ring-1 ring-gray-200 ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 sm:h-8" aria-hidden>
        <span className="size-2 rounded-full bg-[#ff5f57] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#febc2e] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#28c840] sm:size-2.5" />
      </div>
      {/* Phones: a readable close-up of the interesting part */}
      <div
        role="img"
        aria-label={alt}
        className="aspect-[4/3] bg-white bg-no-repeat sm:hidden"
        style={{ backgroundImage: `url(${src})`, backgroundSize: '220% auto', backgroundPosition: `${focus[0]}% ${focus[1]}%` }}
      />
      <img src={src} alt={alt} width={2880} height={1800} loading="lazy" className="hidden h-auto w-full sm:block" />
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
        <ResidentApp />
        <MoreFeatures />
        <HowItWorks />
        <Pricing />
        <DemoForm />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}

const NAV = [
  { href: '#features', label: 'Features' },
  { href: '#app', label: 'Resident app' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#demo', label: 'Contact' },
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
          <Button href="#demo">Book a demo</Button>
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
          <div className="mt-3">
            <Button href="#demo" className="w-full">
              Book a demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/** Phones: a "Book a free demo" bar once you scroll past the hero, hidden while the form is on screen. */
function MobileCta() {
  const [show, setShow] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const form = document.getElementById('demo');
    const io = form ? new IntersectionObserver(([e]) => setFormVisible(!!e?.isIntersecting), { threshold: 0.15 }) : null;
    if (form && io) io.observe(form);
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);
  const visible = show && !formVisible;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!visible}
    >
      <Button href="#demo" size="lg" className="w-full">
        Book a free demo <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(60%_60%_at_50%_0%,#e0e0fb_0%,rgba(255,255,255,0)_70%)]" aria-hidden />
      {/* Phones: a dark, bolder hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#14213D_0%,#0B1326_100%)] sm:hidden" aria-hidden />
      <div className="pointer-events-none absolute -left-28 top-10 -z-10 size-80 rounded-full bg-accent-600/40 blur-3xl sm:hidden" aria-hidden />
      <div className="pointer-events-none absolute -right-28 top-[34rem] -z-10 size-80 rounded-full bg-success-600/25 blur-3xl sm:hidden" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[13px] font-medium text-accent-200 ring-1 ring-white/15 sm:bg-white sm:text-accent-700 sm:ring-accent-200">
            <BedDouble className="size-4" /> Made for PGs, hostels and co-living in India
          </p>
          <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl sm:text-navy-900">
            Run your PG from one screen.{' '}
            <span className="bg-gradient-to-r from-[#A5A6FF] to-[#6EE7B7] bg-clip-text text-transparent sm:bg-none sm:text-accent-600">Rent, rooms and residents</span>, sorted.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/75 sm:mt-6 sm:text-lg sm:text-gray-600">
            PG Sathi tracks every bed, bills rent every month, records payments and deposits, and lets residents pay online by UPI. No more notebooks, Excel sheets or chasing people on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="w-full sm:hidden">
              <Button href="#demo" size="lg" variant="light" className="w-full">
                Book a free demo <ArrowRight className="size-4" />
              </Button>
            </div>
            <a href="#features" className="inline-flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-semibold text-white ring-1 ring-white/25 sm:hidden">
              See what it does
            </a>
            <div className="hidden sm:flex sm:gap-3">
              <Button href="#demo" size="lg">
                Book a free demo <ArrowRight className="size-4" />
              </Button>
              <Button href="#features" size="lg" variant="secondary">
                See what it does
              </Button>
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[13px] text-white/85 sm:gap-x-6 sm:text-gray-500">
            {['Set up for you by our team', 'Residents join by QR', 'Works on phone and laptop'].map((t) => (
              <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15 sm:bg-transparent sm:p-0 sm:ring-0">
                <Check className="size-4 text-[#6EE7B7] sm:text-success-600" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Phones: the resident app, with live-looking chips around it */}
        <div className="relative mx-auto mt-12 w-[236px] pb-4 sm:hidden">
          <PhoneShot src="/screens/app-home.png" alt="PG Sathi resident app home screen" />
          <div className="absolute -left-12 top-16 rounded-2xl bg-white px-3 py-2.5 shadow-xl ring-1 ring-gray-200">
            <p className="text-[11px] font-medium text-gray-500">Paid online</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[14px] font-semibold text-navy-900">
              <span className="grid size-5 place-items-center rounded-full bg-success-50 text-success-600">
                <Check className="size-3" />
              </span>
              ₹8,000
            </p>
          </div>
          <div className="absolute -right-12 bottom-24 rounded-2xl bg-accent-600 px-3 py-2.5 text-white shadow-xl">
            <p className="text-[11px] font-medium text-white/75">New join request</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[14px] font-semibold">
              <QrCode className="size-4 text-white/80" /> Kiran · Room 2
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-14 hidden max-w-5xl sm:block">
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
    <section className="border-y border-gray-100 bg-gray-25 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Sound familiar?" title="Running a PG shouldn’t mean doing accounts every night">
          PG Sathi replaces the register, the spreadsheet and the guesswork with one simple app built around beds, bills and payments.
        </SectionHeading>
        <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="w-[80%] shrink-0 snap-center rounded-2xl bg-white p-6 ring-1 ring-gray-200 md:w-auto">
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
    <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className={reverse ? 'lg:order-2' : ''}>
        <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-600">
          <Icon className="size-4" /> {eyebrow}
        </p>
        <h3 className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-tight text-navy-900 sm:text-3xl">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-600 sm:mt-4 sm:text-[16px]">{text}</p>
        <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-[14px] text-gray-700 sm:text-[15px]">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600">
                <Check className="size-3.5" />
              </span>
              {p}
            </li>
          ))}
        </ul>
        {extra}
      </div>
      <div className={`order-first lg:order-none ${reverse ? 'lg:order-1' : ''}`}>{image}</div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:space-y-24 sm:px-6">
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
          image={<BrowserShot focus={[33, 48]} src="/screens/rooms.png" alt="Rooms and beds grouped by floor, showing occupied and vacant beds" />}
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
          image={<BrowserShot focus={[30, 40]} src="/screens/payments.png" alt="Payments list with receipts, methods and amounts" />}
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
          image={<BrowserShot focus={[100, 76]} src="/screens/online-payments.png" alt="Online payments settings with Razorpay and a UPI QR code" />}
        />

        <FeatureRow
          reverse
          eyebrow="Join by QR"
          icon={QrCode}
          title="New residents fill in their own details"
          text="Print your join QR at the front desk. New people scan it in the PG Sathi app (or with any phone camera), fill in their name, phone, ID and emergency contact, and create their own login. You get a notification; approve it, pick a bed and rent, and their app opens their room, rent and bills."
          points={[
            'No typing on your side, no lost paper forms',
            'Residents create their own login: no passwords to share',
            'New requests show up in your notifications straight away',
            'One QR for the whole PG or one per property; turn it off any time',
          ]}
          image={
            <div className="relative">
              <BrowserShot focus={[28, 42]} src="/screens/join-requests.png" alt="Join requests waiting for approval" />
              <PhoneShot src="/screens/join-form-phone.png" alt="Join form on a phone" className="absolute -bottom-6 -right-2 w-[110px] sm:-bottom-8 sm:-left-4 sm:right-auto sm:w-[190px] lg:-left-10" />
            </div>
          }
        />

        <FeatureRow
          eyebrow="Reports"
          icon={BarChart3}
          title="Know exactly where you stand"
          text="Collection, outstanding rent, occupancy, expenses and income per property. Export to Excel (CSV) or print for your accountant."
          points={['Month-by-month income against expenses', 'Who owes what, and since when', 'Occupancy for every property']}
          image={<BrowserShot focus={[24, 34]} src="/screens/reports.png" alt="Reports for collection, outstanding rent, occupancy and expenses" />}
        />
      </div>
    </section>
  );
}

function ResidentApp() {
  const points = [
    { icon: Wallet, title: 'Pay the monthly bill in a tap', text: 'Rent and charges in one bill. Pay online by UPI, card or netbanking, or open GPay, PhonePe or Paytm with the amount filled in.' },
    { icon: Receipt, title: 'Proof of every payment', text: 'Every payment has a receipt with its number, date and method. No more “I paid you last week” arguments.' },
    { icon: FileText, title: 'All bills and dues in one place', text: 'What is due, what is overdue and what has been paid, month by month.' },
    { icon: QrCode, title: 'Join by scanning a QR', text: 'New residents scan your QR in the app, fill in their details and create their own login.' },
    { icon: BedDouble, title: 'Room, rent and deposit', text: 'Their room and bed, monthly rent, due date and the deposit you hold, always up to date.' },
    { icon: Phone, title: 'Call the PG in one tap', text: 'Your name and number are on their home screen, so they can reach you straight away.' },
  ];
  return (
    <section id="app" className="overflow-hidden bg-gradient-to-b from-accent-50/60 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Resident app" title="Your residents get the PG Sathi app">
          On Android and iPhone. Residents see their room and bills, pay rent online and keep every receipt, so you never chase anyone for proof of payment.
        </SectionHeading>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {['Android', 'iPhone'].map((os) => (
            <span key={os} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-navy-900 ring-1 ring-gray-200">
              <Smartphone className="size-4 text-accent-600" /> {os}
            </span>
          ))}
        </div>

        <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-start md:mx-0 md:mt-14 md:justify-center md:gap-6 md:overflow-visible md:px-0">
          {[
            { src: '/screens/app-home.png', alt: 'Resident app home: room, monthly rent, deposit and recent payments', cls: 'md:order-2', label: 'Home' },
            { src: '/screens/app-bill.png', alt: 'A monthly bill in the resident app, marked paid', cls: 'md:order-3 md:mt-10', label: 'Monthly bill' },
            { src: '/screens/app-payments.png', alt: 'Payment receipts in the resident app', cls: 'md:order-4 md:mt-20 md:hidden lg:block', label: 'Receipts' },
            { src: '/screens/app-join.png', alt: 'Resident app sign-in with “Join a PG by scanning QR”', cls: 'md:order-1 md:mt-16', label: 'Join by QR' },
          ].map((s) => (
            <figure key={s.src} className={`w-[62%] shrink-0 snap-center sm:w-[210px] lg:w-[220px] ${s.cls}`}>
              <PhoneShot src={s.src} alt={s.alt} />
              <figcaption className="mt-3 text-center text-[13px] font-medium text-gray-600 md:hidden">{s.label}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-3">
          {points.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white p-4 ring-1 ring-gray-200 sm:p-6">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-50 text-accent-600 sm:size-10">
                <Icon className="size-[18px] sm:size-5" />
              </span>
              <h3 className="mt-3 text-[14px] font-semibold leading-snug text-navy-900 sm:mt-4 sm:text-[17px]">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600 sm:mt-2 sm:text-[15px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreFeatures() {
  const items = [
    { icon: Bell, title: 'Instant alerts', text: 'New join requests, overdue rent and upcoming move-outs show up in your notifications.' },
    { icon: Building2, title: 'Many properties', text: 'Run several PGs from one login and switch between them in a click.' },
    { icon: Users, title: 'Team roles', text: 'Give your manager, accountant or staff their own login with the right access.' },
    { icon: IndianRupee, title: 'Expenses', text: 'Electricity, groceries, salaries: log them with receipts and see your real profit.' },
    { icon: FileText, title: 'Bills & receipts', text: 'Clean, printable bills and receipts with your name, address and GSTIN.' },
    { icon: ShieldCheck, title: 'Your data stays yours', text: 'Every business’s data is kept separate and private. Every change is logged.' },
    { icon: KeyRound, title: 'Secure sign-in', text: 'Sign in or reset your password with a 6-digit code sent to your email.' },
    { icon: Smartphone, title: 'Phone or laptop', text: 'Run your PG from the browser on your phone or laptop. Nothing to install.' },
  ];
  return (
    <section className="bg-navy-900 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-200">And much more</p>
          <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight sm:text-4xl">Small things that save you hours</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-6">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-600/20 text-accent-200 sm:size-10">
                <Icon className="size-[18px] sm:size-5" />
              </span>
              <h3 className="mt-3 text-[14px] font-semibold sm:mt-4 sm:text-[17px]">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/70 sm:mt-2 sm:text-[15px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '1', title: 'Book a demo and pick a plan', text: 'We call you, show you PG Sathi and set up your account once you choose a plan. You get a sign-in link by WhatsApp or email.' },
    { n: '2', title: 'Add rooms in bulk', text: 'Type “101 to 110”, choose beds per room and one rent for all. Then the next floor is filled in for you.' },
    { n: '3', title: 'Residents join, you start collecting', text: 'Residents scan your join QR in the app and you approve them, or add them yourself. Generate the month’s rent and start collecting.' },
  ];
  return (
    <section id="how" className="py-16 sm:py-24">
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
          <BrowserShot focus={[50, 52]} src="/screens/bulk-rooms.png" alt="Adding rooms 301 to 310 in bulk with beds and rent" />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="border-y border-gray-100 bg-gray-25 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Pricing" title="Affordable plans for every PG">
          Whether you run one PG or several, we’ll suggest a plan that fits your business and your budget. Every plan includes every feature, with no hidden charges.
        </SectionHeading>
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 shadow-[0_20px_50px_-24px_rgba(20,33,61,0.25)]">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
            <div>
              <p className="text-[14px] font-semibold text-navy-900">Included in every plan</p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {EVERY_PLAN.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[14px] text-gray-700">
                    <Check className="mt-0.5 size-4 shrink-0 text-success-600" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy-900 p-7 text-center text-white">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-200">Your price</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">Made for your PG</p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/75">Tell us about your PG and we’ll share an affordable plan, set everything up for you and train your team.</p>
              <Button href="#demo" variant="light" className="mt-6 w-full">
                Get your price <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          <p className="border-t border-gray-100 px-7 py-4 text-xs text-gray-500 sm:px-10">Online payment fees are charged by Razorpay on your own account.</p>
        </div>
      </div>
    </section>
  );
}

const BEDS = ['Up to 20 beds', '20 to 50 beds', '50 to 100 beds', 'More than 100 beds'];

/** "Book a demo": goes to Super admin → Leads. */
function DemoForm() {
  const [f, setF] = useState({ business_name: '', owner_name: '', phone: '', email: '', city: '', beds: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));
  const problem =
    f.business_name.trim().length < 2 ? 'Enter your PG’s name.'
    : f.owner_name.trim().length < 2 ? 'Enter your name.'
    : f.phone.replace(/\D/g, '').length < 10 ? 'Enter your 10-digit phone number.'
    : null;

  const submit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setState('sending');
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_lead`, {
        method: 'POST',
        headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_data: Object.fromEntries(Object.entries(f).map(([k, v]) => [k, v.trim() || null])) }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(body.message ?? 'Could not send your request. Please try again.');
      }
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your request. Please try again.');
      setState('idle');
    }
  };

  const input = 'mt-1.5 block h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-[15px] text-gray-900 shadow-sm outline-none transition focus:border-accent-500 focus:ring-4 focus:ring-accent-100';
  const label = 'block text-[14px] font-medium text-gray-700';

  return (
    <section id="demo" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <div>
          <SectionHeading center={false} eyebrow="Get started" title="Book a free demo">
            Tell us about your PG. We’ll call you, show you PG Sathi on your own rooms, and once you pick a plan our team sets up your account for you.
          </SectionHeading>
          <ul className="mt-8 space-y-3">
            {['A 15-minute call at a time that suits you', 'We set up your property, rooms and beds with you', 'Your residents join by QR from day one'].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-gray-700">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600">
                  <Check className="size-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ContactButtons />
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-24px_rgba(20,33,61,0.35)] ring-1 ring-gray-200 sm:p-8">
          {state === 'sent' ? (
            <div className="py-10 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-success-50 text-success-600">
                <Check className="size-7" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-navy-900">Thanks, {f.owner_name.split(' ')[0]}!</h3>
              <p className="mx-auto mt-3 max-w-sm text-[15px] text-gray-600">We’ve got your request for {f.business_name}. Our team will call you on {f.phone} within one working day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => void submit(e)} noValidate className="grid gap-5 sm:grid-cols-2">
              <label className={`${label} sm:col-span-2`}>
                PG name <span className="text-red-500">*</span>
                <input className={input} value={f.business_name} onChange={set('business_name')} placeholder="e.g. Sunrise Stays" autoComplete="organization" />
              </label>
              <label className={label}>
                Your name <span className="text-red-500">*</span>
                <input className={input} value={f.owner_name} onChange={set('owner_name')} autoComplete="name" />
              </label>
              <label className={label}>
                Phone <span className="text-red-500">*</span>
                <input className={input} value={f.phone} onChange={set('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="98450 00000" />
              </label>
              <label className={label}>
                Email
                <input className={input} value={f.email} onChange={set('email')} type="email" autoComplete="email" />
              </label>
              <label className={label}>
                City
                <input className={input} value={f.city} onChange={set('city')} autoComplete="address-level2" />
              </label>
              <label className={`${label} sm:col-span-2`}>
                How many beds?
                <select className={input} value={f.beds} onChange={set('beds')}>
                  <option value="">Choose…</option>
                  {BEDS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
              <label className={`${label} sm:col-span-2`}>
                Anything we should know?
                <textarea className={`${input} h-24 py-2.5`} value={f.message} onChange={set('message')} placeholder="e.g. 2 PGs in Koramangala, best time to call is after 6pm" maxLength={1000} />
              </label>
              {error && <p className="text-[14px] text-red-600 sm:col-span-2">{error}</p>}
              <button
                type="submit"
                disabled={state === 'sending'}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-navy-800 disabled:opacity-60 sm:col-span-2"
              >
                {state === 'sending' ? 'Sending…' : 'Book my free demo'} <ArrowRight className="size-4" />
              </button>
              <p className="text-center text-xs text-gray-500 sm:col-span-2">We only use your details to contact you about PG Sathi.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: 'Do I need to install anything?',
    a: 'No. You run PG Sathi in your browser on a laptop or phone. Your residents get the PG Sathi app on Android and iPhone to see their bills, pay rent and keep receipts.',
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
    q: 'How do new residents join?',
    a: 'Print or share your join QR. New residents scan it in the PG Sathi app, fill in their details and create their own login. You get a notification, approve them and pick their bed and rent, and their app opens straight away. No paper forms, no passwords to share.',
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
    q: 'How do I get started?',
    a: 'Book a demo using the form above. We call you, help you choose a plan, and once that is done our team sets up your account and sends you a sign-in link. Your residents can then join by scanning your QR code.',
  },
];

function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24">
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
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-white/75">Book a free demo. We set up your rooms, beds and rent with you, and your residents join by QR from day one.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#demo" variant="light" size="lg">
              Book a free demo <ArrowRight className="size-4" />
            </Button>
            <ContactButtons light />
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-[13px] text-white/60">
            <Lock className="size-3.5" /> Your data stays private to your business
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 pb-28 pt-10 md:py-10">
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
        </nav>
        <p className="text-[13px] text-gray-400">© {new Date().getFullYear()} PG Sathi</p>
      </div>
    </footer>
  );
}
