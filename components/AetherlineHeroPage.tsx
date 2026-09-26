"use client";

import { useState } from "react";

// ─── SVG Brand Mark ─────────────────────────────────────────────────────────
function BrandMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path
        d="M50 8 L18 85 L32 85 L44 56 L56 56 L68 85 L82 85 Z"
        fill="none"
        stroke="url(#brandGradient)"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M22 62 Q50 48 78 34"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="8" r="5" fill="#06b6d4" />
      <circle cx="18" cy="85" r="4.5" fill="#2563eb" />
      <circle cx="82" cy="85" r="4.5" fill="#0ea5e9" />
    </svg>
  );
}

// ─── Booking Modal ───────────────────────────────────────────────────────────
function BookingModal({
  open,
  onClose,
  defaultSubject = "",
}: {
  open: boolean;
  onClose: () => void;
  defaultSubject?: string;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState(defaultSubject || "AI Voice Agent");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Merhaba Aetherline Ekibi,\n\nİsim/Şirket: ${name}\nİletişim: ${contact}\nTalep Edilen Konu: ${subject}\n\nDetayları konuşmak ve randevu planlamak istiyorum.`
    );
    window.open(`https://wa.me/38346817697?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-sky-500/40 rounded-3xl max-w-lg w-full p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-mono"
        >
          ✕
        </button>
        <div className="mb-6">
          <span className="text-xs font-[var(--font-mono)] text-cyan-400 font-bold uppercase tracking-widest">
            DOĞRUDAN KURUCU ERİŞİMİ
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">
            Aetherline ile İletişime Geçin
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Talebiniz doğrudan Can Çolak (CTO) veya Gülçin Turhan (CEO)&apos;a
            iletilecektir.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-[var(--font-mono)]">
          <div>
            <label className="block text-slate-300 mb-1">
              Adınız / Şirketiniz:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Markus Weber / TechFab GmbH"
              className="w-full bg-[#030712] border border-[#1e293b] rounded-xl p-3 text-white focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">
              İletişim Numaranız veya E-Postanız:
            </label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="markus@company.de veya +49 ..."
              className="w-full bg-[#030712] border border-[#1e293b] rounded-xl p-3 text-white focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">
              Öncelikli İlgi Alanınız:
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#030712] border border-[#1e293b] rounded-xl p-3 text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="AI Voice Agent">
                AI Voice Agent (Sesli Çağrı Santrali)
              </option>
              <option value="Web Data Scraping">
                Web Veri Kazıma &amp; Pazar Madenciliği
              </option>
              <option value="AI Chatbot">
                7/24 Akıllı Satış &amp; Destek Chatbot
              </option>
              <option value="Sosyal Medya">
                360° Sosyal Medya Yönetimi (Gülçin Turhan)
              </option>
              <option value="SAP & Kurumsal IT">
                Kurumsal IT, SAP Basis &amp; Yazılım/Donanım (Can Çolak)
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-[0_0_35px_-5px_rgba(14,165,233,0.45)] hover:opacity-95 transition text-sm"
          >
            Görüşme Talebini WhatsApp ile İlet →
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "AI Voice Agent mevcut telefon santralimize bağlanabilir mi?",
    a: "Evet. SIP trunk, VoIP santraller (FreePBX, 3CX, Asterisk vb.) veya bulut santrallerle doğrudan entegre çalışır. Telefon numaranızı değiştirmeden birkaç saat içinde çağrıları yapay zekaya yönlendirebiliriz.",
  },
  {
    q: "Neden büyük ajanslar yerine Aetherline'ı tercih etmeliyiz?",
    a: "Büyük ajanslarda yüksek ücretler ödeyip acemi junior personelle muhatap olursunuz. Aetherline'da işin başında doğrudan kurucular (Can Çolak ve Gülçin Turhan) vardır. 7/24 çalışan AI Agent işgücümüz sayesinde aynı işi beşte bir maliyetle ve 10 kat daha hızlı teslim ederiz.",
  },
  {
    q: "Verilerimizin gizliliği ve GDPR uyumluluğu nasıl sağlanıyor?",
    a: "Tüm sistemlerimiz GDPR ve Zero-Trust mimarisine tam uyumludur. Şirket verileriniz üçüncü parti modelleri eğitmek için kullanılmaz; izole ve şifrelenmiş ortamlarda işlenir.",
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="rounded-2xl glass border border-[#1e293b] overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left p-5 font-bold text-white text-sm"
          >
            <span>{faq.q}</span>
            <span className="text-cyan-400 text-lg ml-4 shrink-0">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-[#1e293b] pt-3">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export function AetherlineHeroPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState("");
  const [activeTab, setActiveTab] = useState<"voice" | "scraping" | "chat">(
    "voice"
  );
  const [roiUsers, setRoiUsers] = useState(75);
  const [roiScope, setRoiScope] = useState(2);

  const openModal = (subject = "") => {
    setModalSubject(subject);
    setModalOpen(true);
  };

  const roiData = (() => {
    let ae = 0,
      mkt = 0;
    if (roiScope === 1) {
      ae = 18000;
      mkt = 60000 + roiUsers * 200;
    } else if (roiScope === 2) {
      ae = 36000;
      mkt = 120000 + roiUsers * 320;
    } else {
      ae = 66000;
      mkt = 190000 + roiUsers * 420;
    }
    return { ae, mkt, savings: mkt - ae, pct: Math.round(((mkt - ae) / mkt) * 100) };
  })();

  const fmt = (n: number) => n.toLocaleString("de-DE");

  return (
    <>
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultSubject={modalSubject}
      />

      {/* Ambient Background */}
      <div className="fixed inset-0 grid-bg radial-mask pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-[radial-gradient(circle_500px_at_50%_-10%,rgba(14,165,233,0.2),rgba(6,182,212,0.06),transparent_80%)] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_300px_at_100%_100%,rgba(139,92,246,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* Top Status Strip */}
      <div className="bg-[#080d1a]/90 border-b border-[#1e293b]/60 py-1.5 px-4 text-[11px] font-[var(--font-mono)] text-slate-400 z-50 relative">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <strong className="text-slate-200">AETHERLINE GATEWAY:</strong>
              <span className="text-emerald-400 font-bold">ONLINE (7/24)</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <span>Active Operator:</span>
              <strong className="text-slate-200">Nemotron 3 Ultra 550B</strong>
            </span>
          </div>
          <a
            href="https://wa.me/38346817697"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition flex items-center gap-1 text-slate-300 font-medium"
          >
            <span>WhatsApp VIP:</span>
            <strong className="text-emerald-400">+383 46 817 697</strong>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-3 z-50 w-[94%] max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-[#080d1a]/80 border border-[#1e293b]/80 rounded-full px-5 py-3 shadow-card flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-center shadow-neon-sky group-hover:border-sky-500 transition-colors">
              <BrandMark />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-wider text-white flex items-center gap-1.5">
                AETHERLINE
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-600/30 text-cyan-400 border border-blue-600/40">
                  L.L.C.
                </span>
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 font-[var(--font-mono)] -mt-0.5 hidden sm:inline">
                AI AGENTS &amp; ENTERPRISE IT
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#demo" className="hover:text-cyan-400 transition-colors">Canlı AI Demo</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Hizmetler</a>
            <a href="#founders" className="hover:text-cyan-400 transition-colors">Kurucular</a>
            <a href="#calculator" className="hover:text-cyan-400 transition-colors">ROI Hesap</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Fiyatlar</a>
          </div>

          <button
            onClick={() => openModal()}
            className="relative group overflow-hidden rounded-full p-px font-semibold text-xs transition duration-300 shadow-neon-sky"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 group-hover:opacity-90 transition" />
            <span className="relative block px-4 py-2 rounded-full bg-[#0f172a] text-white flex items-center gap-2">
              Doğrudan Görüş
              <svg className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-5 max-w-6xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-[#080d1a]/80 backdrop-blur-md text-xs font-[var(--font-mono)] text-slate-300 mb-8 shadow-card">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Pristina &amp; DACH • 2 Kurucu Ortak • 7/24 AI Agent İşgücü • Sıfır Aracı
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          İşin Başındayız.<br />
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            AI Agent Gücüyle, Işık Hızında Çözümler.
          </span>
        </h1>

        <p className="mt-7 text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Aetherline; <strong className="text-slate-200">Gülçin Turhan (CEO)</strong> liderliğinde 360° Sosyal Medya &amp; Marka Büyütme,{" "}
          <strong className="text-slate-200">Can Çolak (CTO)</strong> liderliğinde Kurumsal IT, SAP Basis, Yazılım/Donanım ve AI Mühendisliğini birleştiriyor.
          7/24 çalışan uzman AI Ses ve Chat Ajanlarımızla operasyonel yükü sıfırlıyor, işletmenizi geleceğe taşıyoruz.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-neon-sky hover:opacity-95 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Kurucularla Doğrudan Görüşme Başlat
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#1e293b] bg-[#0f172a]/60 backdrop-blur text-slate-300 font-semibold text-sm hover:border-slate-500 hover:text-white transition-all text-center flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Canlı AI Simülatörünü Dene
          </a>
        </div>

        {/* Trust Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#1e293b]/60">
          {[
            { val: "2", label: "Kurucu Ortak (CEO + CTO)" },
            { val: "7/24", label: "Otonom AI Agent Mesaisi", accent: true },
            { val: "0", label: "Junior Personel / Aracı Riski" },
            { val: "15+ Yıl", label: "Kıdemli Mimari & Marka Deneyimi" },
          ].map((m, i) => (
            <div key={i} className="p-3 text-center">
              <div className={`text-2xl sm:text-3xl font-extrabold font-[var(--font-mono)] ${m.accent ? "text-cyan-400" : "text-white"}`}>
                {m.val}
              </div>
              <div className="text-xs text-slate-400 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Capability Marquee */}
      <section className="py-5 border-y border-[#1e293b]/50 bg-[#080d1a]/40 backdrop-blur-sm overflow-hidden z-10 relative">
        <div className="flex items-center gap-10 whitespace-nowrap opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-10 text-xs font-[var(--font-mono)] text-slate-400 tracking-widest uppercase animate-none">
            {[
              { dot: "sky", label: "AI VOICE AGENTS (INBOUND & OUTBOUND)" },
              { dot: "cyan", label: "24/7 AUTONOMOUS CHATBOTS" },
              { dot: "emerald", label: "HIGH-THROUGHPUT WEB SCRAPING & MINING" },
              { dot: "violet", label: "360° SOCIAL MEDIA & BRAND ARCHITECTURE" },
              { dot: "sky", label: "SAP S/4HANA 2027 & BASIS OPERATIONS" },
              { dot: "cyan", label: "MICROSOFT 365 ZERO-TRUST & ENTRA ID" },
              { dot: "emerald", label: "CUSTOM SOFTWARE & HARDWARE ENGINEERING" },
            ].map((item, i) => {
              const dotColors: Record<string, string> = {
                sky: "bg-sky-500",
                cyan: "bg-cyan-500",
                emerald: "bg-emerald-500",
                violet: "bg-violet-500",
              };
              return (
                <span key={i} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColors[item.dot]}`} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Interactive AI Demo ── */}
      <section id="demo" className="py-24 px-5 max-w-6xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-[var(--font-mono)] font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30">
            CANLI ETKİLEŞİMLİ DENEYİM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Ajanlarımızı Bizzat Test Edin
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Sesli telefon asistanımızdan web veri madenciliğine kadar geliştirdiğimiz sistemlerin gücünü canlı simüle edin.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10 shadow-card relative overflow-hidden">
          {/* Tab Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 pb-6 border-b border-[#1e293b]">
            {(
              [
                { key: "voice", label: "🎙️ AI Voice Agent" },
                { key: "scraping", label: "⚡ Web Data Scraping" },
                { key: "chat", label: "💬 7/24 Chatbot" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-xl font-[var(--font-mono)] text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-neon-sky"
                    : "bg-[#0f172a] text-slate-300 hover:text-white hover:bg-[#1e293b]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Voice Agent Tab */}
          {activeTab === "voice" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 rounded-2xl bg-[#030712] border border-[#1e293b] p-6 font-[var(--font-mono)] text-xs shadow-card">
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-3 mb-4">
                  <span className="text-white font-bold">Aetherline Voice Telephony</span>
                  <span className="text-[10px] text-slate-500">VOIP / SIP Gateway</span>
                </div>
                <div className="text-center py-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-blue-600/20 border border-cyan-500 flex items-center justify-center mb-4 relative">
                    <svg className="w-10 h-10 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400" />
                    </span>
                  </div>
                  <p className="text-white font-bold font-[var(--font-sans)] text-sm">Aetherline Inbound Çağrı Ajanı</p>
                  <p className="text-xs text-emerald-400 mt-1">Canlı Görüşme Simülasyonu</p>
                  {/* Soundwave bars */}
                  <div className="flex items-center justify-center gap-1.5 h-12 my-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="wave-bar" />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#1e293b] text-[11px] text-slate-400">
                  <div>Latency: <strong className="text-white">&lt;380 ms</strong></div>
                  <div>Naturalness: <strong className="text-cyan-400">99.2%</strong></div>
                  <div>Diller: <strong className="text-white">TR, EN, DE, SQ</strong></div>
                  <div>CRM Sync: <strong className="text-emerald-400">Otomatik</strong></div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-[var(--font-mono)] text-cyan-400 uppercase tracking-wider">Canlı Ses Sentezi ve Diyalog Akışı</span>
                <h3 className="text-2xl font-bold text-white">İnsan Doğallığında Sesli Asistanlar</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Müşterileriniz telefon ettiğinde çalma tonu bile bitmeden telefonu açan, randevu oluşturan, sipariş alan, teknik destek sağlayan ve ön eleme yapan yapay zeka sesli ajanları inşa ediyoruz.
                </p>
                <div className="rounded-2xl bg-[#0f172a] border border-[#1e293b] p-5 font-[var(--font-mono)] text-xs space-y-3">
                  <div className="p-3 rounded-xl bg-[#030712]/70 border border-[#1e293b]">
                    <span className="text-sky-400 font-bold">Müşteri:</span>
                    <p className="text-slate-200 mt-1">&ldquo;İyi günler, kliniğimiz için 7/24 gelen çağrıları yanıtlayacak ve randevuları takvime işleyecek bir sesli asistan arıyoruz.&rdquo;</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-600/30">
                    <span className="text-cyan-400 font-bold">Aetherline Voice AI:</span>
                    <p className="text-slate-100 mt-1">&ldquo;Merhaba! Sesli asistanımızı kliniğinizin santraline 24 saat içinde bağlıyoruz. Randevu yazılımınızla çift yönlü senkronize çalışarak her hastayı insan doğallığında karşılıyor ve randevuyu onaylıyor.&rdquo;</p>
                  </div>
                </div>
                <button
                  onClick={() => openModal("AI Voice Agent")}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-neon-sky"
                >
                  Şirketiniz İçin Voice Agent Talep Edin
                </button>
              </div>
            </div>
          )}

          {/* Scraping Tab */}
          {activeTab === "scraping" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-[var(--font-mono)] text-emerald-400 uppercase tracking-wider">Pazar İstihbaratı &amp; Büyük Veri</span>
                <h3 className="text-2xl font-bold text-white">Yüksek Hızlı Web Veri Madenciliği &amp; Scraping</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Web sitelerinden rakip ürün ve fiyatlarını, B2B potansiyel müşteri listelerini, e-ticaret kataloglarını bot korumalarına (Cloudflare, Akamai) takılmadan kazıyor, temizliyor ve doğrudan CRM&apos;inize akıtıyoruz.
                </p>
                <div className="space-y-2 text-xs font-[var(--font-mono)] text-slate-300">
                  <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span><strong>Dinamik Proxy Rotasyonu:</strong> IP engellemelerine karşı sıfır kesinti.</div>
                  <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span><strong>AI Destekli Ayrıştırma:</strong> Bozuk HTML&apos;leri otomatik normalize eder.</div>
                  <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span><strong>Doğrudan Export:</strong> REST API, Webhook, PostgreSQL veya Excel çıktısı.</div>
                </div>
                <button onClick={() => openModal("Web Data Scraping")} className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow">
                  Özel Veri Kazıma Projenizi Başlatın
                </button>
              </div>
              <div className="lg:col-span-6 rounded-2xl bg-[#030712] border border-[#1e293b] p-5 font-[var(--font-mono)] text-xs shadow-card">
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-slate-400 ml-2 text-[11px]">aetherline-scraper-engine.py</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">PIPELINE ACTIVE</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-300 bg-[#080d1a]/80 p-4 rounded-xl border border-[#1e293b]/50 h-52 overflow-y-auto">
                  <p className="text-slate-500">// Hedef: Almanya &amp; İsviçre B2B Makine Üreticileri</p>
                  <p className="text-cyan-400">[00:01] ⚡ Headless Chromium kümesi başlatıldı (32 worker)</p>
                  <p>[00:03] 🌐 Hedef domainler taranıyor: 2.450 URL kuyrukta</p>
                  <p className="text-emerald-400">[00:05] ✔ Şirket: &quot;Müller Präzisionstechnik GmbH&quot; → CTO bulundu</p>
                  <p className="text-emerald-400">[00:07] ✔ ERP: SAP S/4HANA (Geçiş Aşaması)</p>
                  <p className="text-emerald-400">[00:09] ✔ E-Posta: m.mueller@mueller-pt.de doğrulandı</p>
                  <p className="text-sky-400">[00:11] 🔄 Webhook → Hubspot CRM senkronize (ID: #4819)</p>
                  <p className="text-yellow-400">[00:14] 📊 Çıktı: 240 yeni nitelikli B2B Lead hazır!</p>
                </div>
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-[var(--font-mono)] text-violet-400 uppercase tracking-wider">7/24 Kesintisiz Satış &amp; Destek</span>
                <h3 className="text-2xl font-bold text-white">Web &amp; WhatsApp Zeki Sohbet Ajanları</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Web sitenizde, WhatsApp Business&apos;ınızda ve sosyal medyada gece gündüz nöbet tutan yapay zeka ajanları. Kurumsal dokümanlarınızı okur ve profesyonel bir satış temsilcisi gibi ikna eder.
                </p>
                <div className="space-y-2 text-xs font-[var(--font-mono)] text-slate-300">
                  <div className="flex items-center gap-2"><span className="text-violet-400">✓</span><strong>Sıfır Halüsinasyon:</strong> Yalnızca şirketinizin onaylı belgelerine sadık kalır.</div>
                  <div className="flex items-center gap-2"><span className="text-violet-400">✓</span><strong>Lead Yakalama:</strong> Ziyaretçinin ihtiyacını belirleyip iletişim bilgisini alır.</div>
                  <div className="flex items-center gap-2"><span className="text-violet-400">✓</span><strong>Çoklu Dil:</strong> TR, EN, DE, SQ kusursuz iletişim.</div>
                </div>
                <button onClick={() => openModal("AI Chatbot")} className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow">
                  WhatsApp / Web Chatbotunuzu Kurun
                </button>
              </div>
              <div className="lg:col-span-6 rounded-2xl bg-[#030712] border border-[#1e293b] p-5 font-[var(--font-mono)] text-xs shadow-card">
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">A</div>
                    <div>
                      <div className="text-white font-bold text-[11px]">Aetherline Assistant (Live)</div>
                      <div className="text-[9px] text-emerald-400">WhatsApp / Web Widget</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">Response: 0.8s</span>
                </div>
                <div className="space-y-3 bg-[#080d1a]/70 p-4 rounded-xl border border-[#1e293b]/50 text-[11px]">
                  <div className="flex justify-end">
                    <div className="bg-blue-600/30 text-slate-200 p-2.5 rounded-xl rounded-tr-none max-w-[80%]">
                      &ldquo;Kosova&apos;daki şirketimiz için ERP ve bulut altyapımızı yenilemek istiyoruz. Destek sağlayabilir misiniz?&rdquo;
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[#0f172a] border border-[#1e293b] text-slate-200 p-2.5 rounded-xl rounded-tl-none max-w-[85%]">
                      &ldquo;Merhaba! Kurucu ortağımız Can Çolak (Kıdemli IT &amp; SAP Mimarı) bizzat altyapı analizini yürütmektedir. Hangi ERP sistemini kullanıyorsunuz?&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4 Service Pillars ── */}
      <section id="services" className="py-24 px-5 max-w-6xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-[var(--font-mono)] font-bold tracking-widest text-cyan-400 uppercase">AETHERLINE DÖRT TEMEL SÜTUN</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Uçtan Uca Kurumsal &amp; Dijital Mimari
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            İş dünyasının iki kritik ihtiyacını tek çatı altında buluşturuyoruz: Teknolojik otomasyon ve pazarlama gücü.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              badge: "OTONOM AGENTLAR", badgeColor: "text-sky-300 bg-blue-600/20 border-blue-600/30",
              status: "● 7/24 Kesintisiz", statusColor: "text-emerald-400",
              accentClass: "group-hover:border-sky-500",
              glow: "bg-sky-500/10",
              title: "1. AI Voice & Chatbot Çözümleri",
              desc: "Telefon santraliniz için inbound/outbound sesli AI asistanları ve web/WhatsApp üzerinde 7/24 satış ve destek yürüten akıllı sohbet ajanları.",
              tags: ["Inbound Santral Karşılama", "Outbound Satış & Randevu", "WhatsApp & Web Botu", "CRM / ERP Entegrasyonu"],
              subject: "AI Voice Agent",
            },
            {
              badge: "BÜYÜK VERİ & OTOMASYON", badgeColor: "text-cyan-400 bg-cyan-400/20 border-cyan-400/30",
              status: "Engelleme Korumalı", statusColor: "text-slate-400",
              accentClass: "group-hover:border-cyan-500",
              glow: "bg-cyan-500/10",
              title: "2. Web Veri Kazıma & Pazar Madenciliği",
              desc: "Rakiplerinizin fiyat politikalarını, B2B potansiyel müşteri iletişimlerini veya pazar verilerini otomatik toplayan, filtreleyen ve iş akışlarınıza aktaran özel scraper yazılımları.",
              tags: ["Otomatik Lead Toplama", "Dinamik Fiyat Takibi", "Proxy & CAPTCHA Bypass", "Canlı API & Webhook Akışı"],
              subject: "Web Data Scraping",
            },
            {
              badge: "GÜLÇİN TURHAN (FOUNDER & CEO)", badgeColor: "text-violet-300 bg-violet-600/20 border-violet-600/30",
              status: "Marka Otoritesi", statusColor: "text-slate-400",
              accentClass: "group-hover:border-violet-500",
              glow: "bg-violet-500/10",
              title: "3. 360° Sosyal Medya & Marka Büyütme",
              desc: "Instagram, LinkedIn, X, TikTok ve YouTube hesaplarınızı profesyonel içerik üretimi, video kurgusu, algoritmik kitle büyütme ve satış odaklı marka kimliği ile yönetiyoruz.",
              tags: ["Video & Reels Üretimi", "Görsel Tasarım & Kimlik", "B2B LinkedIn Otoritesi", "Organik Takipçi Büyümesi"],
              subject: "Sosyal Medya",
            },
            {
              badge: "CAN ÇOLAK (CO-FOUNDER & CTO)", badgeColor: "text-sky-300 bg-blue-600/20 border-blue-600/30",
              status: "Kıdemli Mühendislik", statusColor: "text-slate-400",
              accentClass: "group-hover:border-sky-500",
              glow: "bg-blue-500/10",
              title: "4. Kurumsal IT, SAP Basis, Yazılım & Donanım",
              desc: "Kritik iş süreçlerinizi taşıyan SAP S/4HANA & Basis operasyonları, Microsoft 365 Zero-Trust sıkılaştırması, fidye korumalı yedekleme, özel yazılım geliştirme ve sunucu/donanım denetimi.",
              tags: ["SAP Basis & HANA 2027", "M365 Entra ID Zero-Trust", "Özel Kod Yazımı & Debug", "Donanım Toplama & Denetim"],
              subject: "SAP & Kurumsal IT",
            },
          ].map((svc, i) => (
            <div
              key={i}
              className={`rounded-3xl glass p-8 shadow-card transition-all duration-300 relative overflow-hidden group border border-[#1e293b] ${svc.accentClass}`}
            >
              <div className={`absolute -right-8 -bottom-8 w-48 h-48 ${svc.glow} rounded-full blur-3xl pointer-events-none`} />
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-[var(--font-mono)] px-3 py-1 rounded-full border ${svc.badgeColor}`}>{svc.badge}</span>
                <span className={`text-xs font-[var(--font-mono)] ${svc.statusColor}`}>{svc.status}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">{svc.desc}</p>
              <div className="grid grid-cols-2 gap-2.5 text-xs font-[var(--font-mono)] text-slate-300 pt-4 border-t border-[#1e293b]">
                {svc.tags.map((tag) => (
                  <div key={tag} className="p-2.5 rounded-xl bg-[#030712]/60 border border-[#1e293b]">• {tag}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founders ── */}
      <section id="founders" className="py-24 px-5 max-w-6xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-[var(--font-mono)] font-bold tracking-widest text-cyan-400 uppercase">FOUNDER-LED INTEGRITY • ARACI YOK</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Bizzat İşin Başındayız.</h2>
          <p className="text-slate-400 text-sm mt-3">
            Klasik ajanslar gibi satış toplantısında kıdemli mühendis vaat edip masaya stajyer oturtmuyoruz. İki kurucu ortak ve uzman AI Agent ordumuzla tüm işlerinizi ışık hızında ve doğrudan teslim ediyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gülçin */}
          <div className="rounded-3xl glass p-8 sm:p-10 shadow-card hover:border-violet-500/50 transition-all flex flex-col justify-between relative overflow-hidden group border border-[#1e293b]">
            <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-500 p-0.5 shrink-0 shadow-neon-violet">
                  <div className="w-full h-full rounded-2xl bg-[#030712] flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-white font-[var(--font-mono)]">GT</span>
                    <span className="text-[9px] font-[var(--font-mono)] text-violet-400 font-bold">CEO</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-[var(--font-mono)] font-bold tracking-widest text-violet-400 uppercase px-2.5 py-1 rounded bg-violet-600/15 border border-violet-600/30">FOUNDER &amp; CEO</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Gülçin Turhan</h3>
                  <p className="text-xs font-[var(--font-mono)] text-slate-400">Sosyal Medya Uzmanı &amp; Dijital Marka Stratejisti</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                &ldquo;Sosyal medyada var olmak sadece görsel paylaşmak değil; algıyı doğru yönetmek, müşteride sarsılmaz bir güven inşa etmek ve her etkileşimi satışa dönüştürmektir. Aetherline ile markanızın dijital sesini en üst seviyeye taşıyoruz.&rdquo;
              </p>
            </div>
            <div className="pt-6 border-t border-[#1e293b]">
              <div className="flex flex-wrap gap-2 mb-4">
                {["360° Sosyal Medya", "Video & Reels", "Marka Otoritesi", "KOBİ Büyümesi"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#0b132b] border border-[#1e293b] text-[11px] font-[var(--font-mono)] text-slate-300">{tag}</span>
                ))}
              </div>
              <button onClick={() => openModal("Sosyal Medya")} className="w-full py-2.5 rounded-xl border border-violet-500/40 hover:bg-violet-500/20 text-white font-[var(--font-mono)] text-xs font-bold transition">
                Gülçin Turhan ile Marka Stratejinizi Konuşun →
              </button>
            </div>
          </div>

          {/* Can */}
          <div className="rounded-3xl glass p-8 sm:p-10 shadow-card hover:border-sky-500/50 transition-all flex flex-col justify-between relative overflow-hidden group border border-[#1e293b]">
            <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-0.5 shrink-0 shadow-neon-sky">
                  <div className="w-full h-full rounded-2xl bg-[#030712] flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-white font-[var(--font-mono)]">CÇ</span>
                    <span className="text-[9px] font-[var(--font-mono)] text-sky-400 font-bold">CTO</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-[var(--font-mono)] font-bold tracking-widest text-sky-400 uppercase px-2.5 py-1 rounded bg-sky-500/15 border border-sky-500/30">CO-FOUNDER &amp; CTO</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Can Çolak</h3>
                  <p className="text-xs font-[var(--font-mono)] text-slate-400">Kıdemli Kurumsal IT Mimarı, SAP Basis &amp; AI Mühendisi</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                &ldquo;Kritik sunucu altyapıları, SAP Basis, M365 Zero-Trust, özel yazılımlar ve yapay zeka ajanlarımızın her bir kod satırında bizzat mühendislik imzamız vardır. Hantal hiyerarşi yok; sıfır kesinti ve net mühendislik taahhüdü var.&rdquo;
              </p>
            </div>
            <div className="pt-6 border-t border-[#1e293b]">
              <div className="flex flex-wrap gap-2 mb-4">
                {["SAP Basis & HANA", "M365 Zero-Trust", "AI Voice & Chat", "Yazılım & Donanım"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#0b132b] border border-[#1e293b] text-[11px] font-[var(--font-mono)] text-slate-300">{tag}</span>
                ))}
              </div>
              <button onClick={() => openModal("SAP & Kurumsal IT")} className="w-full py-2.5 rounded-xl border border-sky-500/40 hover:bg-sky-500/20 text-white font-[var(--font-mono)] text-xs font-bold transition">
                Can Çolak ile IT &amp; AI Projenizi Konuşun →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section id="calculator" className="py-20 px-5 max-w-5xl mx-auto z-10 relative">
        <div className="glass rounded-3xl border border-sky-500/30 p-8 sm:p-12 shadow-card relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-[var(--font-mono)] font-bold tracking-widest text-cyan-400 uppercase">INTERACTIVE ROI CALCULATOR</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Operasyonel Tasarrufunuzu Hesaplayın</h2>
            <p className="text-slate-400 text-sm mt-2">Klasik çağrı merkezi veya hantal danışmanlık maliyetleri yerine Aetherline modelinin yıllık kazancını görün.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-300">Aylık Çağrı / Kullanıcı Hacmi:</span>
                  <span className="text-cyan-400 font-[var(--font-mono)] font-bold">{roiUsers} Kullanıcı / {roiUsers * 20} Çağrı</span>
                </div>
                <input
                  type="range" min={10} max={300} step={5} value={roiUsers}
                  onChange={(e) => setRoiUsers(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-[var(--font-mono)] mt-1">
                  <span>10 KOBİ</span><span>150 Orta Ölçek</span><span>300+ Enterprise</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Hizmet Kapsamı:</label>
                <select
                  value={roiScope}
                  onChange={(e) => setRoiScope(Number(e.target.value))}
                  className="w-full bg-[#030712] border border-[#1e293b] text-slate-200 text-sm rounded-xl p-3.5 focus:border-sky-500 focus:outline-none font-[var(--font-mono)]"
                >
                  <option value={1}>Essential: AI Chatbot + M365 Güvenlik İzleme</option>
                  <option value={2}>Professional: AI Voice + SAP Basis + Sosyal Medya</option>
                  <option value={3}>Enterprise: 7/24 Sesli Santral + Büyük Veri + Kritik SAP</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#1e293b] text-xs text-slate-400 space-y-1 font-[var(--font-mono)]">
                <div>✓ Operatör / Personel Yıllık Maliyeti: <strong className="text-slate-200">€45.000 - €95.000</strong></div>
                <div>✓ Big-4 / GSI Günlük Danışmanlık: <strong className="text-slate-200">€1.800 / gün</strong></div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0b132b] border border-[#1e293b] p-6 sm:p-8 text-center space-y-5 shadow-neon-sky">
              <div>
                <div className="text-xs uppercase font-[var(--font-mono)] tracking-wider text-slate-400">Tahmini Geleneksel Yıllık Gider</div>
                <div className="text-2xl font-bold text-slate-400 line-through font-[var(--font-mono)] mt-1">€ {fmt(roiData.mkt)} / yıl</div>
              </div>
              <div className="py-4 border-y border-[#1e293b]">
                <div className="text-xs uppercase font-[var(--font-mono)] tracking-wider text-sky-400">Aetherline Sabit Yıllık Bedeli</div>
                <div className="text-3xl font-extrabold text-white font-[var(--font-mono)] mt-1">€ {fmt(roiData.ae)} / yıl</div>
                <div className="text-[11px] text-slate-400 mt-1">Öngörülebilir Sabit Fatura (Sürpriz Yok)</div>
              </div>
              <div>
                <div className="text-xs uppercase font-[var(--font-mono)] tracking-widest text-emerald-400 font-bold">Net Yıllık Tasarrufunuz</div>
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-[var(--font-mono)] mt-1">€ {fmt(roiData.savings)}</div>
                <div className="text-xs text-cyan-400 font-[var(--font-mono)] mt-1">%{roiData.pct} Yıllık Maliyet Avantajı</div>
              </div>
              <button onClick={() => openModal("ROI Analizi")} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-neon-sky hover:opacity-95 transition">
                Bu Analiz Doğrultusunda Görüşme Planlayın
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-5 max-w-6xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-[var(--font-mono)] font-bold tracking-widest text-cyan-400 uppercase">ŞEFFAF VE NET MODEL</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Sonuç Odaklı Aylık Retainer Paketleri</h2>
          <p className="text-slate-400 text-sm mt-3">Gizli maliyet veya sürpriz fatura yok. Net Euro (€) bazında faturalandırma ve kesin SLA güvencesi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Essential */}
          <div className="rounded-3xl glass p-8 flex flex-col justify-between hover:border-slate-500 transition-all border border-[#1e293b]">
            <div>
              <span className="text-xs font-[var(--font-mono)] font-bold text-slate-400">KOBİ &amp; GİRİŞİM</span>
              <h3 className="text-2xl font-bold text-white mt-1">Essential</h3>
              <p className="text-xs text-slate-400 mt-2 mb-6">Temel AI chatbot, web veri takibi ve M365 altyapı güvenliği.</p>
              <div className="text-3xl font-extrabold text-white font-[var(--font-mono)] mb-6">€ 1.500 <span className="text-xs text-slate-400 font-normal">/ ay</span></div>
              <ul className="space-y-3 text-xs text-slate-300">
                {["7/24 Web & WhatsApp Akıllı Chatbot", "Aylık Hedefli Web Veri Kazıma (5.000 Kayıt)", "M365 & Entra ID Günlük Güvenlik Taraması", "4 Saat İçinde Müdahale SLA"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-emerald-400">✓</span> {f}</li>
                ))}
                <li className="flex items-center gap-2 text-slate-500"><span>✕</span> Sesli Voice Agent Santral Entegrasyonu</li>
              </ul>
            </div>
            <button onClick={() => openModal("Essential Retainer")} className="w-full mt-8 py-3 rounded-xl border border-[#1e293b] text-white text-xs font-bold hover:bg-[#1e293b] transition">Essential Paketi Başlat</button>
          </div>

          {/* Professional */}
          <div className="rounded-3xl bg-[#0b132b] border-2 border-cyan-500 p-8 flex flex-col justify-between shadow-neon-cyan relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-[11px] font-bold text-white font-[var(--font-mono)] tracking-wider shadow">EN ÇOK TERCİH EDİLEN</div>
            <div>
              <span className="text-xs font-[var(--font-mono)] font-bold text-cyan-400">ORTA ÖLÇEK &amp; BÜYÜYEN</span>
              <h3 className="text-2xl font-bold text-white mt-1">Professional</h3>
              <p className="text-xs text-slate-400 mt-2 mb-6">AI Voice Agent, SAP Basis ve 360° Sosyal Medya bir arada.</p>
              <div className="text-3xl font-extrabold text-white font-[var(--font-mono)] mb-6">€ 3.000 <span className="text-xs text-slate-400 font-normal">/ ay</span></div>
              <ul className="space-y-3 text-xs text-slate-200">
                {["Essential Paketindeki Tüm Yetenekler", "AI Voice Agent Santral & Sesli Karşılama", "SAP Basis Rutin Operasyon & HANA İzleme", "360° Sosyal Medya & Video İçerik Yönetimi", "2 Saat Öncelikli Kurucu Müdahalesi"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> {f}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => openModal("Professional Retainer")} className="w-full mt-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-neon-sky hover:opacity-95 transition">Professional Paketi Başlat</button>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl glass p-8 flex flex-col justify-between hover:border-slate-500 transition-all border border-[#1e293b]">
            <div>
              <span className="text-xs font-[var(--font-mono)] font-bold text-slate-400">ENTERPRISE CRITICAL</span>
              <h3 className="text-2xl font-bold text-white mt-1">Enterprise</h3>
              <p className="text-xs text-slate-400 mt-2 mb-6">Kesintiye tahammülü olmayan, yüksek hacimli santral &amp; kritik altyapılar.</p>
              <div className="text-3xl font-extrabold text-white font-[var(--font-mono)] mb-6">€ 5.500 <span className="text-xs text-slate-400 font-normal">/ ay</span></div>
              <ul className="space-y-3 text-xs text-slate-300">
                {["Professional Paketindeki Tüm Yetenekler", "Sınırsız Eşzamanlı Sesli AI Santral Hattı", "SAP S/4HANA 2027 Geçiş Mimarlık Desteği", "Özel Yazılım Geliştirme & Donanım Denetimi", "30 Dakika 7/24 Acil Müdahale SLA"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-emerald-400">✓</span> {f}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => openModal("Enterprise Retainer")} className="w-full mt-8 py-3 rounded-xl border border-[#1e293b] text-white text-xs font-bold hover:bg-[#1e293b] transition">Enterprise Paketi İncele</button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5 max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-12">
          <span className="text-xs font-[var(--font-mono)] font-bold tracking-widest text-cyan-400 uppercase">SIKÇA SORULAN SORULAR</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Merak Ettiğiniz Her Şey</h2>
        </div>
        <FaqAccordion />
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e293b] bg-[#030712] py-14 px-5 z-10 relative font-[var(--font-mono)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider text-sm">AETHERLINE L.L.C.</span>
            <span>•</span>
            <span className="text-slate-400">Pristina, Kosovo</span>
            <span>•</span>
            <a href="https://www.aetherline.llc" className="text-cyan-400 hover:underline">www.aetherline.llc</a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://wa.me/38346817697" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">WhatsApp (+383 46 817 697)</a>
            <span>•</span>
            <a href="mailto:info@aetherline.llc" className="hover:text-white transition">info@aetherline.llc</a>
          </div>
          <div>© 2026 Aetherline L.L.C. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
