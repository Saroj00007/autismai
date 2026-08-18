import Link from "next/link";

type ProductExplorerProps = {
  chatHref: string;
};

const EXPLORE_LINKS = [
  ["01", "Chat with NIVA", "Clear, supportive answers", "#chat", "Available now"],
  ["02", "Routine Builder", "Visual plans for everyday life", "#routines", "Coming soon"],
  ["03", "Autism News", "Research and resources, explained", "#news", "Coming soon"],
] as const;

export function ExploreNivaRail() {
  return (
    <aside className="border border-border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Explore NIVA</p>
      <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">Choose a place to begin.</h2>
      <div className="mt-5 divide-y divide-border border-y border-border">
        {EXPLORE_LINKS.map(([number, title, description, href, status]) => (
          <a key={title} href={href} className="group block py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <div className="flex items-start justify-between gap-3">
              <span className="font-display text-xs font-bold text-ink-fainter">{number}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{status}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink transition-colors group-hover:text-brand">{title} <span aria-hidden="true">→</span></p>
            <p className="mt-1 text-xs leading-relaxed text-ink-faint">{description}</p>
          </a>
        ))}
      </div>
    </aside>
  );
}

const ROUTINE_STEPS = [
  ["01", "Get dressed", "Choose clothes that feel comfortable"],
  ["02", "Breakfast", "Take your time and drink some water"],
  ["03", "Pack your bag", "Check your three essentials"],
] as const;

export function ProductExplorer({ chatHref }: ProductExplorerProps) {
  return (
    <section className="border-y border-border bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl space-y-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Explore NIVA</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Practical support, designed to be easy to return to.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-faint">
            See the tools NIVA brings together for questions, everyday routines, and reliable information.
          </p>
        </div>

        <article id="chat" className="grid items-center gap-10 border border-border bg-canvas p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5f7f6e]">01 / Available now</p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-ink">Talk with NIVA</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-faint">
              Ask in your own words. NIVA streams a clear, supportive response and keeps your conversation organized for later.
            </p>
            <Link href={chatHref} className="mt-7 inline-flex border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              Start a conversation →
            </Link>
          </div>
          <div className="border border-border bg-white p-4 shadow-lg shadow-slate-900/5 sm:p-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#5f7f6e]" />
                <span className="text-xs font-semibold text-ink">NIVA chat</span>
              </div>
              <span className="text-xs text-ink-fainter">Private by default</span>
            </div>
            <div className="space-y-3 py-5 text-sm leading-relaxed">
              <div className="ml-auto max-w-[82%] bg-[#5f7f6e] px-4 py-3 text-[#f6f4ef]">How can I make transitions after school feel easier?</div>
              <div className="max-w-[88%] bg-[#efe7d8] px-4 py-3 text-ink">Try making the first 15 minutes predictable: a quiet space, a preferred snack, and no questions until they are ready.</div>
            </div>
            <div className="border border-border px-3 py-2.5 text-xs text-ink-fainter">Ask NIVA anything…</div>
          </div>
        </article>

        <article id="routines" className="grid items-center gap-10 border border-border bg-[#edf3ee] p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="order-2 border border-[#c8d6cb] bg-white p-4 shadow-sm lg:order-1 sm:p-5">
            <div className="flex items-center justify-between border-b border-[#dce6de] pb-3">
              <div>
                <p className="text-xs font-semibold text-ink">Morning routine</p>
                <p className="mt-0.5 text-[11px] text-ink-faint">A calm start, one step at a time</p>
              </div>
              <span className="border border-[#9fb5a4] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#466553]">Preview</span>
            </div>
            <ol className="divide-y divide-[#dce6de]">
              {ROUTINE_STEPS.map(([number, title, detail]) => (
                <li key={number} className="flex gap-4 py-4">
                  <span className="font-display text-sm font-bold text-[#5f7f6e]">{number}</span>
                  <div><p className="text-sm font-semibold text-ink">{title}</p><p className="mt-1 text-xs text-ink-faint">{detail}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5f7f6e]">02 / Coming soon</p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-ink">Routine Builder</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-faint">Build visual, flexible routines for home, school, appointments, and transitions—then adapt them as needs change.</p>
          </div>
        </article>

        <article id="news" className="grid items-center gap-10 border border-border bg-[#fffaf0] p-5 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a66f21]">03 / Coming soon</p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-ink">Autism News</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-faint">A calm reading space for selected research updates, practical resources, and community news—always with plain-language context.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-[#eadfcb] bg-white p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a66f21]">Research, explained</p><p className="mt-4 font-display text-lg font-semibold leading-snug text-ink">Important updates, without the jargon.</p><span className="mt-6 block text-xs text-ink-faint">Preview card</span></div>
            <div className="border border-[#eadfcb] bg-white p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a66f21]">Community resources</p><p className="mt-4 font-display text-lg font-semibold leading-snug text-ink">Useful support for the next step.</p><span className="mt-6 block text-xs text-ink-faint">Preview card</span></div>
          </div>
        </article>
      </div>
    </section>
  );
}
