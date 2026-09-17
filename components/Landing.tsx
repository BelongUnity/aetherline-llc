const STACK = [
  { name: "SAP Basis", note: "Kernel, transports, copies, SolMan." },
  { name: "Active Directory", note: "Forest, GPO, identity source of truth." },
  { name: "Entra ID", note: "Conditional access, hybrid join, app registrations." },
  { name: "Microsoft 365", note: "Exchange, Intune, SharePoint, tenant hygiene." },
  { name: "SCCM", note: "Image, patch, and hardware lifecycle." },
  { name: "Windows Server", note: "AD-integrated estate, DNS, file, print." },
  { name: "ITIL / ITSM", note: "Incident, change, and the runbook that holds." },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Scope the estate",
    body: "What is running, what is broken, who owns the change window.",
  },
  {
    n: "02",
    title: "Invoice the work",
    body: "Aetherline L.L.C bills as a contractor. Not an employee. Not staffed.",
  },
  {
    n: "03",
    title: "Keep it running",
    body: "Identity, Microsoft 365, and SAP Basis from Pristina, CET hours.",
  },
] as const;

export function Landing() {
  return (
    <div className="relative z-10 bg-[#030508]">
      <section className="relative px-6 pb-8 pt-20 sm:px-10 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="rise-line mb-16 h-px w-full bg-[#2bd4d9]/70" />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <p className="rise font-mono text-[11px] uppercase text-[#2bd4d9] lg:col-span-3">
              Remote IT operations
            </p>
            <h2 className="rise text-balance font-sans text-4xl font-normal leading-[1.05] text-[#e8eef0] sm:text-6xl lg:col-span-9 lg:text-7xl">
              The estate keeps running.
              <span className="mt-3 block text-[#8a9398]">We invoice the work.</span>
            </h2>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex items-end justify-between gap-6">
            <h2 className="rise text-balance text-3xl sm:text-4xl">What we run</h2>
            <p className="rise hidden max-w-xs text-pretty font-mono text-[11px] uppercase leading-relaxed text-[#8a9398] sm:block">
              Stack we sell. Not a catalogue of everything.
            </p>
          </div>
          <ul>
            {STACK.map((item) => (
              <li
                key={item.name}
                className="rise grid grid-cols-1 border-t border-white/10 py-6 sm:grid-cols-12 sm:items-baseline"
              >
                <span className="font-sans text-xl text-[#e8eef0] sm:col-span-5 sm:text-2xl">
                  {item.name}
                </span>
                <span className="mt-2 text-pretty text-sm leading-relaxed text-[#8a9398] sm:col-span-7 sm:mt-0 sm:text-base">
                  {item.note}
                </span>
              </li>
            ))}
          </ul>
          <div className="rise-line h-px w-full bg-white/10" />
        </div>
      </section>

      <section className="px-6 py-8 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="rise mb-16 font-mono text-[11px] uppercase text-[#2bd4d9]">
            How a contract starts
          </p>
          <ol className="grid gap-16 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((step) => (
              <li key={step.n} className="rise">
                <p className="font-mono text-sm text-[#2bd4d9]">{step.n}</p>
                <h3 className="mt-4 text-2xl text-balance">{step.title}</h3>
                <p className="mt-3 max-w-sm text-pretty leading-relaxed text-[#8a9398]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
