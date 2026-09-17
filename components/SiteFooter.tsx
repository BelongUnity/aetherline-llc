export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2bd4d9]">
            Aetherline L.L.C
          </p>
          <p className="mt-3 text-sm text-[#8a9398]">
            Pristina, Kosovo. CET. Invoice as a contractor.
          </p>
        </div>
        <ul className="flex flex-col gap-2 font-mono text-[11px] uppercase text-[#c4ccd0] sm:items-end">
          <li>
            <a className="hover:text-[#2bd4d9]" href="tel:+38346817697">
              +383 46 817 697
            </a>
          </li>
          <li>
            <a className="hover:text-[#2bd4d9]" href="mailto:cancolak666@icloud.com">
              cancolak666@icloud.com
            </a>
          </li>
          <li>
            <a
              className="hover:text-[#2bd4d9]"
              href="https://www.linkedin.com/in/lapro"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn / lapro
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
