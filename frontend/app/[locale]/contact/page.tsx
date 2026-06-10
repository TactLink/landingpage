import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin, LifeBuoy, Newspaper, MessageCircle, Send } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("contactTitle"),
    description: t("contactDesc"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  return (
    <main className="w-full min-h-screen bg-[#0A0D1E] text-white relative selection:bg-brand-accent selection:text-brand-primary">
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/10 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-0 w-[50%] h-[50%] rounded-full bg-[#374085]/20 blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="relative w-full h-[350px] md:h-[450px] mb-12 z-10 overflow-hidden pt-20">
        <Image
          src="/map.webp"
          alt="TactLink Map"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-none object-center mix-blend-screen opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D1E]/40 via-[#0A0D1E]/60 to-[#0A0D1E]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-sm font-medium text-white tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h1 className="font-extrabold mb-4 text-4xl md:text-5xl lg:text-6xl text-white text-center tracking-tight">
            {t("heroTitle")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#f8cdab]">{t("heroTitleAccent")}</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/70 text-center font-light leading-relaxed">
            {t("heroDesc")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-20">

        {/* Left Column */}
        <div className="flex-1 lg:max-w-2xl flex flex-col gap-8">
          <div>
            <h2 className="text-[32px] font-extrabold text-white mb-2 tracking-tight">{t("partnerTitle")}</h2>
            <p className="text-white/60 mb-6 font-light leading-relaxed">{t("partnerDesc")}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 blur-[60px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                <Mail size={26} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-white/50 text-sm font-medium uppercase tracking-widest">{t("dropUsLine")}</p>
                <p className="text-white font-extrabold text-xl">info@tactlink.com</p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10 relative z-10" />

            <div className="flex flex-col gap-3 relative z-10">
              <p className="text-white/60 text-sm font-light leading-relaxed">{t("emailRoutingDesc")}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { country: 'Singapore', email: 'info@tactlink.com' },
                  { country: 'Thailand', email: 'info.thailand@tactlink.com' },
                  { country: 'Cambodia', email: 'info.cambodia@tactlink.com' },
                  { country: 'Malaysia', email: 'info.malaysia@tactlink.com' },
                  { country: 'Indonesia', email: 'info.indonesia@tactlink.com' },
                  { country: 'Vietnam', email: 'info.vietnam@tactlink.com' },
                  { country: 'Philippines', email: 'info.philippines@tactlink.com' },
                  { country: 'Bangladesh', email: 'info.bangladesh@tactlink.com' },
                ].map(({ country, email }) => (
                  <a
                    key={country}
                    href={`mailto:${email}?subject=Partnership Inquiry from ${country}`}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-brand-accent/10 hover:border-brand-accent/30 transition-all duration-200 overflow-hidden"
                  >
                    <span className="text-[11px] font-bold text-brand-accent w-8 h-8 rounded-full bg-brand-accent/10 hidden sm:flex items-center justify-center flex-shrink-0">{country.slice(0,2).toUpperCase()}</span>
                    <span className="text-white text-[13px] font-semibold">{country}</span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="mailto:info@tactlink.com?subject=Partnership Inquiry"
              className="mt-2 bg-brand-accent hover:bg-white text-brand-primary font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-brand-accent/20 hover:scale-[1.02] relative z-10"
            >
              {t("emailNow")} <Send size={18} />
            </a>
            <p className="text-xs text-white/30 text-center relative z-10">{t("respondTime")}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-10 lg:pt-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-white">{t("otherInquiries")}</h2>
            <div className="flex flex-col gap-4">
              <a href="mailto:info@tactlink.com?subject=App Support Request" className="group bg-[#0d122b]/60 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/10 hover:border-brand-accent/40 hover:bg-[#151b3b]/80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent flex flex-shrink-0 items-center justify-center group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all">
                  <LifeBuoy size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">{t("appSupportTitle")}</h3>
                  <p className="text-white/50 text-sm font-light">{t("appSupportDesc")}</p>
                </div>
              </a>

              <a href="mailto:info@tactlink.com?subject=Press %26 Media Inquiry" className="group bg-[#0d122b]/60 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/10 hover:border-brand-accent/40 hover:bg-[#151b3b]/80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent flex flex-shrink-0 items-center justify-center group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all">
                  <Newspaper size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">{t("pressTitle")}</h3>
                  <p className="text-white/50 text-sm font-light">{t("pressDesc")}</p>
                </div>
              </a>

              <a href="mailto:info@tactlink.com?subject=General Inquiry" className="group bg-[#0d122b]/60 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/10 hover:border-brand-accent/40 hover:bg-[#151b3b]/80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent flex flex-shrink-0 items-center justify-center group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">{t("generalTitle")}</h3>
                  <p className="text-white/50 text-sm font-light">{t("generalDesc")}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-white">{t("hqTitle")}</h2>
            <div className="bg-gradient-to-br from-[#374085]/40 to-[#0A0D1E] rounded-2xl p-8 shadow-2xl border border-white/10 text-white relative overflow-hidden group">
              <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <MapPin size={150} />
              </div>
              <h3 className="font-bold text-2xl mb-6 relative z-10 flex items-center gap-2">
                Singapore <span className="px-2.5 py-1 bg-white/10 rounded-lg font-medium text-xs tracking-widest uppercase ml-2">{t("hqBadge")}</span>
              </h3>
              <div className="flex flex-col gap-4 relative z-10 text-[15px] text-white/80">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Mail size={14} className="text-brand-accent" />
                  </div>
                  <a href="mailto:info@tactlink.com" className="hover:text-white transition-colors">info@tactlink.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Phone size={14} className="text-brand-accent" />
                  </div>
                  <a href="tel:+6587141991" className="hover:text-white transition-colors">+65 87141991</a>
                </div>
                <div className="flex items-start gap-4 mt-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <MapPin size={14} className="text-brand-accent" />
                  </div>
                  <span className="leading-relaxed font-light">{t("address")}<br/>{t("city")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
