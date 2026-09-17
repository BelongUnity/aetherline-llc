import { EngageForm } from "@/components/EngageForm";
import { HeroIntro } from "@/components/HeroIntro";
import { Landing } from "@/components/Landing";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#030508]">
      <HeroIntro />
      <Landing />
      <section id="engage" className="relative z-10 mx-auto max-w-xl px-6 py-28 sm:px-10">
        <h2 className="rise mb-3 font-mono text-[11px] uppercase text-[#2bd4d9]">
          Engage
        </h2>
        <p className="rise mb-8 max-w-md text-pretty text-lg leading-relaxed text-[#c4ccd0]">
          Tell us what needs running. We reply from Pristina, CET.
        </p>
        <div className="rise">
          <EngageForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
