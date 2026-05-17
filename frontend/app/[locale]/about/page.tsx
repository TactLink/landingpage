import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDesc"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <main className="w-full min-h-screen bg-[#0A0D1E] text-white selection:bg-brand-accent selection:text-brand-primary">

      {/* HERO SECTION */}
      <section className="relative w-full py-32 px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center overflow-hidden min-h-[85vh]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/20 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#374085]/40 blur-[150px] mix-blend-screen pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center max-w-5xl mx-auto pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-sm font-medium text-white tracking-widest uppercase">{t("missionBadge")}</span>
          </div>

          <h1 className="text-[56px] lg:text-[72px] leading-[1.1] font-extrabold text-white mb-6 tracking-tight">
            {t("heroTitle")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#f8cdab]">{t("heroTitleAccent")}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light">
            {t("heroDesc")}
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="w-full px-6 md:px-12 lg:px-16 -mt-16 relative z-20 mb-20">
        <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:divide-x divide-white/10">
          {[
            { value: t("stat0Value"), label: t("stat0Label") },
            { value: t("stat1Value"), label: t("stat1Label") },
            { value: t("stat2Value"), label: t("stat2Label") },
            { value: t("stat3Value"), label: t("stat3Label") },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-[32px] md:text-[40px] font-extrabold text-brand-accent mb-2">{stat.value}</span>
              <span className="text-[13px] font-semibold text-white/60 tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-16 relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col items-start pr-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-accent inline-block animate-pulse" />
              {t("originBadge")}
            </div>

            <h2 className="text-[32px] md:text-[40px] font-extrabold text-white mb-8 leading-tight tracking-tight">
              {t("storyTitle")} <br/>
              <span className="text-brand-accent">{t("storyTitleAccent")}</span>
            </h2>

            <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
              <p>{t("storyP1")}</p>
              <p>{t("storyP2")}</p>
              <p>{t("storyP3")}</p>
            </div>
          </div>

          <div className="flex-[0.8] flex items-center justify-center relative w-full mt-12 lg:mt-0 lg:order-last order-first">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent/20 blur-[100px] rounded-full z-0" />
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-lg mx-auto">
              <Image
                src="/people.webp"
                alt="TactLink team at events and partnerships"
                width={600}
                height={480}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR SOLUTIONS */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-16 relative overflow-hidden bg-white/5 border-y border-white/5 mt-16">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#374085]/20 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-accent inline-block" />
              {t("solutionsBadge")}
            </div>
            <h2 className="text-[32px] md:text-[48px] font-extrabold text-white leading-tight tracking-tight">
              {t("solutionsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "/value1.webp", title: t("sol0Title"), desc: t("sol0Desc") },
              { icon: "/value2.webp", title: t("sol1Title"), desc: t("sol1Desc") },
              { icon: "/value3.webp", title: t("sol2Title"), desc: t("sol2Desc") },
            ].map((sol, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-[#0d122b]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:bg-[#151b3b]/80 transition-all duration-300 hover:scale-[1.02] hover:border-brand-accent/30 group">
                <div className="w-20 h-20 mb-6 flex items-center justify-center bg-brand-accent/10 rounded-2xl group-hover:bg-brand-accent/20 transition-colors">
                  <Image src={sol.icon} alt={sol.title} width={48} height={48} className="object-contain drop-shadow-md brightness-0 invert" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-white group-hover:text-brand-accent transition-colors">{sol.title}</h3>
                <p className="text-white/60 text-[15px] leading-relaxed font-light">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-16 relative mt-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col items-start lg:pr-10">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-white mb-6 leading-tight tracking-tight">
              {t("conscienceTitle").split(" ").slice(0, -1).join(" ")} <span className="text-[#4CAF50]">{t("conscienceTitle").split(" ").slice(-1)[0]}</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 font-light leading-relaxed">
              {t("conscienceDesc")}
            </p>
            <ul className="space-y-4 w-full">
              {[
                { goal: t("sdg0Goal"), label: t("sdg0Label"), color: "bg-[#BF8B2E]" },
                { goal: t("sdg1Goal"), label: t("sdg1Label"), color: "bg-[#3F7E44]" },
                { goal: t("sdg2Goal"), label: t("sdg2Label"), color: "bg-[#56C02B]" },
                { goal: t("sdg3Goal"), label: t("sdg3Label"), color: "bg-[#19486A]" },
              ].map((item) => (
                <li key={item.goal} className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-4 rounded-xl hover:bg-white/10 transition-colors w-full">
                  <span className={`w-4 h-4 rounded-full ${item.color} shadow-lg shadow-white/10`} />
                  <span className="font-bold text-white min-w-[70px]">{item.goal}:</span>
                  <span className="text-white/80">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-6 w-full max-w-[400px] mx-auto relative lg:mt-0 mt-8">
            <div className="absolute inset-0 bg-green-500/10 blur-[100px] z-0 rounded-full" />
            {[
              { src: "/sdg12.webp", alt: "SDG 12" },
              { src: "/sdg13.webp", alt: "SDG 13" },
              { src: "/sdg15.webp", alt: "SDG 15" },
              { src: "/sdg17.webp", alt: "SDG 17" },
            ].map((img, idx) => (
              <div key={idx} className="relative z-10 bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/10 transform hover:scale-105 transition-transform duration-300 hover:border-white/30 flex items-center justify-center">
                <Image src={img.src} alt={img.alt} width={130} height={130} className="w-full max-w-[130px] h-auto rounded-lg mix-blend-screen" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="w-full py-32 px-6 md:px-12 lg:px-16 bg-[#060813] border-t border-white/5 mt-16 relative">
        <div className="absolute top-0 right-1/4 w-[30%] h-[30%] bg-brand-accent/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/20 border border-white/10 text-brand-accent text-sm font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-accent inline-block animate-pulse" />
              {t("peopleBadge")}
            </div>
            <h2 className="text-[32px] md:text-[48px] font-extrabold text-white tracking-tight mb-6">{t("teamTitle")}</h2>
            <p className="text-lg leading-relaxed text-white/70 font-light">{t("teamDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { nameKey: "member0Name", roleKey: "member0Role", bioKey: "member0Bio", img: "/cdanny.webp" },
              { nameKey: "member1Name", roleKey: "member1Role", bioKey: "member1Bio", img: "/cjeremy.webp" },
              { nameKey: "member2Name", roleKey: "member2Role", bioKey: "member2Bio", img: "/cgoh.webp" },
            ].map((member, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-[#0d122b] rounded-[2rem] border border-white/10 p-10 hover:border-brand-accent/40 hover:bg-[#131b40] hover:-translate-y-2 transition-all duration-300 group shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-[140px] h-[140px] mb-8">
                  <div className="absolute inset-0 bg-brand-accent rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <Image
                    src={member.img}
                    alt={t(member.nameKey as any)}
                    fill
                    className="relative z-10 rounded-full object-cover border-[4px] border-[#060813] shadow-2xl group-hover:border-brand-accent transition-colors duration-500 bg-white"
                  />
                </div>
                <h3 className="text-[24px] font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{t(member.nameKey as any)}</h3>
                <p className="text-brand-accent font-semibold tracking-widest uppercase text-xs mb-6">{t(member.roleKey as any)}</p>
                <p className="text-[15px] leading-relaxed text-white/60 font-light">{t(member.bioKey as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="w-full py-32 px-6 bg-[#0A0D1E] bg-gradient-to-b from-[#060813] to-[#0A0D1E] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-4xl bg-brand-accent/10 blur-[150px] mix-blend-screen rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-[36px] md:text-[56px] font-extrabold text-white mb-6 tracking-tight">{t("ctaTitle")}</h2>
          <p className="mb-10 text-xl text-white/70 font-light max-w-2xl mx-auto">{t("ctaDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="/digital-namecard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent text-brand-primary rounded-full font-bold text-lg shadow-xl shadow-brand-accent/20 hover:scale-[1.03] hover:bg-white transition-all duration-300">
              {t("ctaExplore")}
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
              {t("ctaGetStarted")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
