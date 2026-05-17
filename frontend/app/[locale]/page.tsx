"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { fetchStrapiCollection, STRAPI_URL } from "@/lib/strapi";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

function useInView(ref: { current: Element | null }): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return inView;
}

const FAQItem = memo(function FAQItem({ idx, faq, isOpen, onToggle }: {
  idx: number;
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: (idx: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 cursor-pointer select-none" onClick={() => onToggle(idx)}>
      <div className="w-full flex justify-between items-center text-lg font-semibold text-black">
        <span className="text-black text-left">{faq.q}</span>
        <svg className={`ml-4 w-5 h-5 text-brand-accent shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && (
        <div className="mt-4 text-black text-base prose prose-sm max-w-none animate-fade-in"><ReactMarkdown>{faq.a}</ReactMarkdown></div>
      )}
    </div>
  );
});

export default function HomePage() {
  const t = useTranslations("Home");

  const [localPartners, setLocalPartners] = useState<any[]>([]);
  const [globalPartners, setGlobalPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeCountry, setActiveCountry] = useState("Global");
  const [localShouldScroll, setLocalShouldScroll] = useState(false);
  const localMarqueeRef = useRef<HTMLDivElement>(null);
  const localContentRef = useRef<HTMLDivElement>(null);
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [compareTab, setCompareTab] = useState<"old" | "new">("new");
  const partnerBarRef = useRef<HTMLDivElement>(null);
  const feat1Ref = useRef<HTMLDivElement>(null);
  const feat2Ref = useRef<HTMLDivElement>(null);
  const feat3Ref = useRef<HTMLDivElement>(null);
  const howItWorksGridRef = useRef<HTMLDivElement>(null);
  const feat1InView = useInView(feat1Ref);
  const feat2InView = useInView(feat2Ref);
  const feat3InView = useInView(feat3Ref);
  const howItWorksInView = useInView(howItWorksGridRef);

  const localDragRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });
  const localVelocityRef = useRef(0);
  const localLastXRef = useRef(0);
  const localLastTimeRef = useRef(0);
  const localInertiaRef = useRef(0);

  const handleToggleFaq = useCallback((idx: number) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  }, []);

  const keywords = [
    t("keyword0"),
    t("keyword1"),
    t("keyword2"),
    t("keyword3"),
    t("keyword4"),
  ];
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentKeywordIndex((prev) => (prev + 1) % keywords.length);
        setFade(true);
      }, 300);
    }, 3500);
    return () => clearInterval(timer);
  }, [keywords.length]);

  useEffect(() => {
    async function loadPartners() {
      try {
        setLoading(true);
        const country = localStorage.getItem("tactlink_country") || "Global";
        setActiveCountry(country);
        const data = await fetchStrapiCollection("partners", { populate: "*" });
        const locals: any[] = [];
        const globals: any[] = [];
        if (data && data.length > 0) {
          data.forEach((p: any) => {
            const partnerCountry = p.country?.name ?? p.country ?? null;
            if (country === "Global" || partnerCountry === country || partnerCountry === "Global") {
              locals.push(p);
            } else {
              globals.push(p);
            }
          });
        }
        setLocalPartners(locals);
        setGlobalPartners(globals);
      } catch (err) {
        console.error("Failed to load partners:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPartners();
    window.addEventListener("countryChange", loadPartners);
    return () => window.removeEventListener("countryChange", loadPartners);
  }, []);

  useEffect(() => {
    fetchStrapiCollection("faqs", { "sort[0]": "order:asc", "sort[1]": "id:asc", "filters[page][$in][0]": "homepage", "filters[page][$in][1]": "both" })
      .then((data) => {
        if (data) setFaqs(data.map((f: any) => ({ q: f.question, a: f.answer })));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const check = () => {
      if (!localMarqueeRef.current || !localContentRef.current) return;
      const containerW = localMarqueeRef.current.offsetWidth;
      const contentW = localContentRef.current.scrollWidth;
      setLocalShouldScroll(contentW > containerW);
    };
    check();
    if (localMarqueeRef.current) {
      const ro = new ResizeObserver(check);
      ro.observe(localMarqueeRef.current);
      return () => ro.disconnect();
    }
  }, [localPartners]);

  const compareRows = [
    {
      old: { label: t("compareOld0Label"), sub: t("compareOld0Sub") },
      new: { label: t("compareNew0Label"), sub: t("compareNew0Sub") },
    },
    {
      old: { label: t("compareOld1Label"), sub: t("compareOld1Sub") },
      new: { label: t("compareNew1Label"), sub: t("compareNew1Sub") },
    },
    {
      old: { label: t("compareOld2Label"), sub: t("compareOld2Sub") },
      new: { label: t("compareNew2Label"), sub: t("compareNew2Sub") },
    },
  ];

  const mobileOldItems = [
    { label: t("compareOld0Label"), sub: t("compareOld0Sub"), link: t("seeTheFix") },
    { label: t("compareOld1Label"), sub: t("compareOld1Sub"), link: t("seeTheFix") },
    { label: t("compareOld2Label"), sub: t("compareOld2Sub"), link: t("seeTheFix") },
  ];

  const mobileNewItems = [
    { label: t("compareNew0Label"), sub: t("compareNew0Sub"), link: t("seeTheOldWay") },
    { label: t("compareNew1Label"), sub: t("compareNew1Sub"), link: t("seeTheOldWay") },
    { label: t("compareNew2Label"), sub: t("compareNew2Sub"), link: t("seeTheOldWay") },
  ];

  return (
    <main className="w-full min-h-screen bg-white text-brand-primary overflow-x-hidden">

      {/* HERO SECTION */}
      <section data-navbar-theme="dark" className="w-full bg-gradient-to-br from-[#1A1F4C] via-[#374085] to-[#cfa086] text-brand-white flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 pt-24 pb-16 relative overflow-hidden min-h-screen">
        <div className="w-full md:w-[45%] lg:w-[48%] z-10 md:pr-8 lg:pr-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-[fade-up_0.6s_ease_both]" style={{ animationDelay: "0.05s" }}>
            <span className="flex items-center text-yellow-400 text-sm">★★★★★</span>
            <span className="text-sm font-medium text-white/90 tracking-wide">{t("trustedBy")}</span>
          </div>

          <h1 className="font-extrabold mb-3 leading-[1.1] text-[32px] md:text-[42px] lg:text-[48px] xl:text-[64px] text-white min-h-[80px] md:min-h-[100px] xl:min-h-[140px] animate-[fade-up_0.6s_ease_both]" style={{ animationDelay: "0.2s" }}>
            {t("heroTitlePrefix")}
            <span className="overflow-hidden inline-flex items-end align-bottom relative h-[1.1em]">
              <span className={`text-brand-accent block transition-all duration-300 ease-in-out ${fade ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
                {keywords[currentKeywordIndex]}
              </span>
            </span>
            {t("heroTitleSuffix")}
          </h1>

          <p className="mb-6 max-w-xl text-[15px] md:text-[16px] xl:text-[18px] text-white/90 leading-relaxed font-light animate-[fade-up_0.6s_ease_both]" style={{ animationDelay: "0.35s" }}>
            {t.rich("heroDesc", {
              highlight: (chunks) => <span className="text-brand-accent font-semibold">{chunks}</span>,
            })}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-[fade-up_0.6s_ease_both]" style={{ animationDelay: "0.5s" }}>
            <a href="/contact" className="w-full sm:w-auto flex justify-center">
              <span className="inline-flex px-8 py-4 bg-brand-accent text-brand-primary rounded-full font-bold text-lg items-center gap-2 shadow-xl shadow-brand-accent/20 hover:scale-[1.03] hover:bg-white hover:text-brand-primary transition-all duration-300">
                {t("becomePartner")}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </span>
            </a>
            <a href="/digital-namecard" className="w-full sm:w-auto flex justify-center text-white/80 hover:text-white font-medium px-4 py-3 transition-colors">
              {t("tryApp")}
            </a>
          </div>
        </div>

        <div className="w-full md:w-[55%] lg:w-[52%] flex justify-center items-center mt-8 md:mt-0 relative min-h-[65vh] lg:min-h-[72vh] group [perspective:1000px] origin-center md:origin-right">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-brand-accent opacity-20 rounded-full blur-[120px] animate-pulse" style={{ willChange: "opacity" }}></div>

          {/* Web Dashboard Replica (Background) */}
          <div className="hidden md:flex absolute right-0 lg:right-[-20px] top-1/2 -translate-y-1/2 w-[520px] lg:w-[680px] max-w-[50vw] h-[360px] lg:h-[480px] bg-[#f8fafc] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-gray-200 overflow-hidden transition-all duration-700 z-0 flex-col opacity-95 group-hover:hover:z-30 group-hover:hover:scale-105 group-hover:hover:-translate-x-4 group-hover:hover:-translate-y-[55%] pointer-events-none group-hover:pointer-events-auto">
            <div className="w-full h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <img src="/TactLink-Logo-core.webp" alt="TactLink" className="h-6 w-auto object-contain" />
                  <span className="font-bold text-gray-800 text-sm">Platform Admin</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-48 h-8 rounded bg-gray-100 flex items-center px-2 border border-gray-200">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <span className="text-gray-400 text-xs ml-2">Search</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-bold ml-2">U</div>
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-48 h-full border-r border-gray-200 bg-[#fafafa] p-4 flex flex-col gap-6 shrink-0 hidden lg:flex">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-semibold">General</div>
                  <div className="flex items-center gap-2 bg-[#f1f5f9] text-gray-800 p-2 rounded-md font-medium text-xs mb-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg>
                    Dashboard
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 p-2 rounded-md font-medium text-xs hover:bg-gray-100 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Users
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 bg-white overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Dashboard</h3>
                  <div className="bg-[#1e255a] text-white px-4 py-1.5 rounded text-xs font-semibold cursor-pointer">Download</div>
                </div>
                <div className="flex gap-4 mb-6 border-b border-gray-100 pb-2">
                  <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-[10px] font-bold">Overview</div>
                  <div className="text-gray-400 px-3 py-1 text-[10px] font-semibold">Analytics</div>
                  <div className="text-gray-400 px-3 py-1 text-[10px] font-semibold">Reports</div>
                </div>
                <div className="flex gap-4 flex-1 overflow-hidden">
                  <div className="flex-[2] border border-gray-200 rounded-xl p-4 flex flex-col relative overflow-hidden group">
                    <div className="text-xs font-bold text-gray-800 mb-4">Overview</div>
                    <div className="flex-1 border-l border-b border-gray-200 relative flex items-end justify-between px-2 pt-4">
                      <div className="absolute left-[-20px] top-0 bottom-0 flex flex-col justify-between text-[8px] text-gray-400 py-1">
                        <span>600</span><span>450</span><span>300</span><span>150</span><span>0</span>
                      </div>
                      {[15, 45, 52, 85, 20, 25, 22, 28, 25, 30, 60, 60].map((h, i) => (
                        <div key={i} className="w-5 bg-[#1e255a] rounded-t-sm group-hover:bg-[#2cbdf4] transition-colors duration-500" style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-400 mt-2 px-2">
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                  </div>
                  <div className="flex-1 border border-gray-200 rounded-xl p-4 flex flex-col">
                    <div className="text-xs font-bold text-gray-800 mb-1">Recent new members</div>
                    <div className="text-[9px] text-gray-500 mb-4">56 users joined your association this month</div>
                    <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                      {[
                        { i: "OM", n: "Olivia Martin", e: "olivia.martin@email.com" },
                        { i: "JL", n: "Jackson Lee", e: "jackson.lee@email.com" },
                        { i: "IN", n: "Isabella Nguyen", e: "isabella.nguyen@email.com" },
                        { i: "WK", n: "William Kim", e: "will@email.com" },
                      ].map((u, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-600 shrink-0">{u.i}</div>
                          <div className="overflow-hidden">
                            <div className="text-[10px] font-bold text-gray-900 truncate">{u.n}</div>
                            <div className="text-[9px] text-gray-400 truncate">{u.e}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Mobile UI Mockup */}
          <div className="relative md:absolute md:left-2 lg:left-6 md:top-1/2 md:-translate-y-1/2 w-[320px] shrink-0 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-[10px] border-[#18181b] ring-1 ring-inset ring-white/10 rounded-[2.25rem] overflow-hidden z-10 scale-[0.9] md:scale-[0.75] lg:scale-[0.75] origin-top md:origin-left">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-[#18181b] rounded-full z-[100]" />
            <img src="/association-newsfeed.webp" alt="Association NewsFeed" className="w-full h-auto block" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent opacity-10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
      </section>

      {/* THE WHY SECTION */}
      <section data-navbar-theme="dark" className="w-full py-24 px-6 bg-gradient-to-b from-[#1A1F4C] to-[#252b6b] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center mb-16 relative z-10">
          <h2 className="font-extrabold text-[36px] md:text-[48px] text-white mb-6 leading-tight">
            {t.rich("whyTitle", {
              highlight: (chunks) => <span className="text-brand-accent">{chunks}</span>,
            })}
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">{t("whyDesc")}</p>
        </div>

        <div className="max-w-4xl xl:max-w-5xl mx-auto relative z-10">
          {/* MOBILE: Tab switcher */}
          <div className="md:hidden">
            <div className="flex rounded-2xl overflow-hidden border border-white/10 mb-1 shadow-lg">
              <button
                onClick={() => { setCompareTab("old"); if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(40); }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 font-extrabold text-xs uppercase tracking-widest transition-all active:scale-95 ${compareTab === "old" ? "bg-red-900/80 text-red-300" : "bg-white/5 text-white/25"}`}
              >
                <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
                {t("theChaosBadge")}
                {compareTab === "new" && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping ml-0.5 shrink-0" />}
              </button>
              <div className="w-px bg-white/10 shrink-0" />
              <button
                onClick={() => { setCompareTab("new"); if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([20, 30, 60]); }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 font-extrabold text-xs uppercase tracking-widest transition-all active:scale-95 ${compareTab === "new" ? "bg-brand-accent/20 text-brand-accent" : "bg-white/5 text-white/25"}`}
              >
                <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                {t("theSolutionBadge")}
                {compareTab === "old" && <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping ml-0.5 shrink-0" />}
              </button>
            </div>
            <p className="text-center text-xs text-white/20 mb-4 tracking-wide">{t("tapToCompare")}</p>

            {compareTab === "old" && (
              <div className="rounded-2xl overflow-hidden border border-red-900/40 bg-red-950/50 backdrop-blur-xl">
                <div className="px-6 py-4 bg-red-900/30 border-b border-red-900/30 flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest">{t("oldWaySubtitle")}</span>
                </div>
                {mobileOldItems.map((item, i) => (
                  <div key={i} className={`px-6 py-5 ${i > 0 ? "border-t border-red-900/20" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-red-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white/40 text-sm line-through decoration-red-500/40">{item.label}</p>
                        <p className="text-sm text-white/25 mt-0.5">{item.sub}</p>
                        <button onClick={() => { setCompareTab("new"); if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([20, 30, 60]); }} className="text-brand-accent/60 text-xs mt-2 hover:text-brand-accent transition-colors">{item.link}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {compareTab === "new" && (
              <div className="rounded-2xl overflow-hidden border border-brand-accent/20 bg-[#1a2040] backdrop-blur-xl relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/15 rounded-full blur-[60px] pointer-events-none" />
                <div className="px-6 py-4 bg-brand-accent/10 border-b border-brand-accent/10 flex items-center gap-2 relative z-10">
                  <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">{t("tactlinkWaySubtitle")}</span>
                </div>
                {mobileNewItems.map((item, i) => (
                  <div key={i} className={`px-6 py-5 relative z-10 ${i > 0 ? "border-t border-brand-accent/5" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-extrabold text-white text-sm">{item.label}</p>
                        <p className="text-sm text-brand-accent/60 mt-0.5">{item.sub}</p>
                        <button onClick={() => { setCompareTab("old"); if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(40); }} className="text-white/25 text-xs mt-2 hover:text-white/50 transition-colors">{item.link}</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-6 py-4 border-t border-brand-accent/10 bg-brand-accent/5 relative z-10 flex items-center justify-between">
                  <span className="text-xs text-white/40">{t("stillOldWay")}</span>
                  <button onClick={() => { setCompareTab("old"); if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(40); }} className="text-xs text-red-400 font-semibold flex items-center gap-1 hover:text-red-300 transition-colors">
                    {t("seeChaos")}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP: contrast grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[1fr_72px_1fr] rounded-t-[32px] overflow-hidden border border-white/10 border-b-0">
              <div className="bg-red-950/60 backdrop-blur-xl flex items-center gap-3 py-5 px-8">
                <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div>
                  <p className="font-extrabold text-white/50 tracking-widest uppercase text-lg">{t("oldWayLabel")}</p>
                  <p className="text-xs text-red-400/60 mt-0.5">{t("oldWaySubtitle")}</p>
                </div>
              </div>
              <div className="bg-[#161a3a]" />
              <div className="bg-brand-accent/10 backdrop-blur-xl flex items-center gap-3 py-5 px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-accent/10 pointer-events-none" />
                <img src="/TactLink-Logo-core.webp" alt="TactLink" className="h-6 w-auto object-contain relative z-10 shrink-0" />
                <div className="relative z-10">
                  <p className="font-[family-name:var(--font-montserrat)] font-extrabold text-brand-accent tracking-widest uppercase text-lg">{t("tactlinkWayLabel")}</p>
                  <p className="text-xs text-brand-accent/50 mt-0.5">{t("tactlinkWaySubtitle")}</p>
                </div>
              </div>
            </div>

            {compareRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_72px_1fr] border border-white/5 ${i === 0 ? "border-t-0" : ""} ${i === 2 ? "rounded-b-[32px] overflow-hidden" : ""} shadow-[0_30px_100px_rgba(0,0,0,0.5)] border-l border-r`}>
                <div className="group bg-red-950/40 backdrop-blur-xl px-8 py-7 flex items-start gap-4 hover:bg-red-900/50 transition-all duration-300 cursor-default border-r border-white/5">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-500/20 transition-colors">
                    <svg className="w-3 h-3 text-red-400/50 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white/30 group-hover:text-white/50 text-lg line-through decoration-red-500/30 group-hover:decoration-red-500/60 transition-all">{row.old.label}</p>
                    <p className="text-base text-white/15 group-hover:text-white/30 mt-0.5 transition-colors">{row.old.sub}</p>
                  </div>
                </div>
                <div className="bg-[#161a3a] flex items-center justify-center">
                  <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">vs</span>
                </div>
                <div className="group bg-brand-accent/5 backdrop-blur-xl px-8 py-7 flex items-start gap-4 relative overflow-hidden hover:bg-brand-accent/10 hover:shadow-[inset_0_0_30px_rgba(239,201,74,0.06)] transition-all duration-300 cursor-default">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="w-5 h-5 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-accent/40 group-hover:border-brand-accent/60 group-hover:shadow-[0_0_8px_rgba(239,201,74,0.4)] transition-all z-10">
                    <svg className="w-3 h-3 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="relative z-10">
                    <p className="font-extrabold text-white text-lg group-hover:text-brand-accent transition-colors">{row.new.label}</p>
                    <p className="text-base text-brand-accent/60 group-hover:text-brand-accent/80 mt-0.5 transition-colors">{row.new.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS BAR */}
      <section data-navbar-theme="light" className="w-full bg-[#f8f9fc] pt-16 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <div className="text-center mb-8">
            {!loading && activeCountry !== "Global" ? (
              <h2 className="font-extrabold text-[28px] md:text-[38px] text-brand-primary">
                {localPartners.length > 0
                  ? t.rich("associationsIn", { country: activeCountry, highlight: (c) => <span className="text-brand-accent">{c}</span> })
                  : t.rich("firstInCountry", { country: activeCountry, highlight: (c) => <span className="text-brand-accent">{c}</span> })}
              </h2>
            ) : (
              <h2 className="font-extrabold text-[28px] md:text-[38px] text-brand-primary">
                {t.rich("trustedByGlobal", { highlight: (c) => <span className="text-brand-accent">{c}</span> })}
              </h2>
            )}
            <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-28 h-28 rounded-2xl bg-gray-200 animate-pulse" />)}
              </div>
            </div>
          ) : localPartners.length > 0 ? (
            <div className="relative group/carousel">
              <button
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
                onClick={() => { cancelAnimationFrame(localInertiaRef.current); localMarqueeRef.current?.scrollBy({ left: -280, behavior: "smooth" }); }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
                onClick={() => { cancelAnimationFrame(localInertiaRef.current); localMarqueeRef.current?.scrollBy({ left: 280, behavior: "smooth" }); }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>

              <div
                ref={localMarqueeRef}
                className="overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
                onMouseDown={(e) => { cancelAnimationFrame(localInertiaRef.current); localDragRef.current = { isDragging: true, startX: e.clientX, startScrollLeft: localMarqueeRef.current?.scrollLeft ?? 0 }; localLastXRef.current = e.clientX; localLastTimeRef.current = Date.now(); localVelocityRef.current = 0; }}
                onMouseMove={(e) => { if (!localDragRef.current.isDragging || !localMarqueeRef.current) return; const now = Date.now(); const dt = now - localLastTimeRef.current; if (dt > 0) localVelocityRef.current = (localLastXRef.current - e.clientX) / dt * 16; localLastXRef.current = e.clientX; localLastTimeRef.current = now; localMarqueeRef.current.scrollLeft = localDragRef.current.startScrollLeft - (e.clientX - localDragRef.current.startX); }}
                onMouseUp={() => { if (!localDragRef.current.isDragging) return; localDragRef.current.isDragging = false; const applyInertia = () => { if (!localMarqueeRef.current || Math.abs(localVelocityRef.current) < 0.5) return; localMarqueeRef.current.scrollLeft += localVelocityRef.current; localVelocityRef.current *= 0.92; localInertiaRef.current = requestAnimationFrame(applyInertia); }; localInertiaRef.current = requestAnimationFrame(applyInertia); }}
                onMouseLeave={() => { if (!localDragRef.current.isDragging) return; localDragRef.current.isDragging = false; localVelocityRef.current *= 0.5; const applyInertia = () => { if (!localMarqueeRef.current || Math.abs(localVelocityRef.current) < 0.5) return; localMarqueeRef.current.scrollLeft += localVelocityRef.current; localVelocityRef.current *= 0.92; localInertiaRef.current = requestAnimationFrame(applyInertia); }; localInertiaRef.current = requestAnimationFrame(applyInertia); }}
                onTouchStart={(e) => { cancelAnimationFrame(localInertiaRef.current); localDragRef.current = { isDragging: true, startX: e.touches[0].clientX, startScrollLeft: localMarqueeRef.current?.scrollLeft ?? 0 }; localLastXRef.current = e.touches[0].clientX; localLastTimeRef.current = Date.now(); localVelocityRef.current = 0; }}
                onTouchMove={(e) => { if (!localDragRef.current.isDragging || !localMarqueeRef.current) return; const now = Date.now(); const dt = now - localLastTimeRef.current; if (dt > 0) localVelocityRef.current = (localLastXRef.current - e.touches[0].clientX) / dt * 16; localLastXRef.current = e.touches[0].clientX; localLastTimeRef.current = now; localMarqueeRef.current.scrollLeft = localDragRef.current.startScrollLeft - (e.touches[0].clientX - localDragRef.current.startX); }}
                onTouchEnd={() => { localDragRef.current.isDragging = false; const applyInertia = () => { if (!localMarqueeRef.current || Math.abs(localVelocityRef.current) < 0.5) return; localMarqueeRef.current.scrollLeft += localVelocityRef.current; localVelocityRef.current *= 0.92; localInertiaRef.current = requestAnimationFrame(applyInertia); }; localInertiaRef.current = requestAnimationFrame(applyInertia); }}
              >
                <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-[#f8f9fc] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-[#f8f9fc] to-transparent z-10 pointer-events-none" />
                <div ref={localContentRef} className="flex gap-6 px-3 py-2 justify-center">
                  {localPartners.map((partner, idx) => {
                    const logoUrl = partner.logo?.url
                      ? partner.logo.url.startsWith("http") ? partner.logo.url : `${STRAPI_URL}${partner.logo.url}`
                      : undefined;
                    return (
                      <a key={idx} href={partner.url || "#"} target="_blank" rel="noopener noreferrer"
                        className="flex-shrink-0 bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center justify-center w-32 h-32 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        {logoUrl
                          ? <img src={logoUrl} alt={partner.name || "Partner"} className="h-20 w-20 object-contain" />
                          : <span className="text-xs text-gray-400 font-medium text-center px-2">{partner.name || "Partner"}</span>}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            !loading && activeCountry !== "Global" && (
              <div className="flex flex-col items-center gap-4 py-6">
                <p className="text-gray-500 text-base max-w-md text-center">
                  {t("growingIn", { country: activeCountry })}
                </p>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-semibold text-sm hover:bg-brand-accent hover:text-brand-primary transition-all duration-300 shadow-md">
                  {t("becomePartnerCta")}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </a>
              </div>
            )
          )}
        </div>

        {globalPartners.length > 0 && <div className="border-t border-gray-200 bg-white py-10 overflow-hidden">
          <div className="max-w-7xl mx-auto mb-5 px-4">
            <div className="text-center text-gray-400 font-semibold text-[12px] uppercase tracking-[0.2em]">
              {activeCountry !== "Global" ? t("alsoTrusted") : t("poweringGlobal")}
            </div>
          </div>
          <div className="relative flex overflow-hidden group w-full">
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-[marquee_150s_linear_infinite] group-hover:[animation-play-state:paused] w-max" style={{ willChange: "transform" }}>
              {[0, 1].map((half) => (
                <div key={half} className="flex shrink-0">
                  {loading ? null : [...Array(10)].map((_, copy) => (
                    <div key={copy} className="flex items-center gap-10 pr-10 shrink-0">
                      {globalPartners.map((partner, idx) => {
                        const logoUrl = partner.logo?.url
                          ? partner.logo.url.startsWith("http") ? partner.logo.url : `${STRAPI_URL}${partner.logo.url}`
                          : undefined;
                        return (
                          <div key={`global-${half}-${copy}-${partner.id || idx}`} className="inline-flex shrink-0">
                            <a href={partner.url || "#"} target="_blank" rel="noopener noreferrer"
                              className="flex items-center justify-center w-20 h-20 opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0 hover:scale-110 duration-300">
                              {logoUrl
                                ? <img src={logoUrl} alt={partner.name || "Partner"} className="h-12 w-12 object-contain" />
                                : <span className="text-[11px] text-gray-400 font-medium">{partner.name}</span>}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>}
      </section>

      {/* FEATURES SECTION */}
      <section data-navbar-theme="light" className="w-full py-24 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">

          {/* Feature 1 */}
          <div ref={feat1Ref} className="flex flex-col md:flex-row items-center gap-12 lg:gap-20" style={{ opacity: (!mounted || feat1InView) ? 1 : 0, transform: (!mounted || feat1InView) ? "translateY(0)" : "translateY(2.5rem)", transition: mounted ? "opacity 0.7s ease, transform 0.7s ease" : "none" }}>
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9ff] text-brand-accent text-sm font-bold mb-6 border border-blue-100">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-1.13a4 4 0 10-8 0 4 4 0 008 0z" /></svg>
                {t("featurePill1")}
              </div>
              <h3 className="font-extrabold mb-6 text-[32px] md:text-[40px] text-gray-900 leading-tight">
                {t.rich("feat1Title", { highlight: (c) => <span className="text-brand-accent">{c}</span> })}
              </h3>
              <p className="mb-6 text-lg text-gray-600 leading-relaxed font-normal">{t("feat1Desc")}</p>
              <ul className="space-y-4 mb-8">
                {[t("feat1Bullet0"), t("feat1Bullet1"), t("feat1Bullet2")].map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative bg-[#f8fafc] rounded-[40px] p-8 aspect-square flex items-center justify-center border border-gray-200 shadow-2xl overflow-hidden">
              <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-blue-50 to-brand-accent/10 rounded-full blur-2xl"></div>
              <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-[75%] -translate-y-1/2 w-[200px] rounded-[20px] shadow-lg border-[5px] border-[#18181b] ring-1 ring-inset ring-white/10 opacity-80 transform -rotate-6 overflow-hidden">
                  <img src="/contact.webp" alt="Member Directory" className="w-full h-auto block" />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-[25%] -translate-y-[45%] w-[220px] rounded-[24px] shadow-2xl border-[6px] border-[#18181b] ring-1 ring-inset ring-white/10 z-10 overflow-hidden transform rotate-3 hover:rotate-0 transition duration-500">
                  <img src="/card.webp" alt="Digital Namecard" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div ref={feat2Ref} className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20" style={{ opacity: (!mounted || feat2InView) ? 1 : 0, transform: (!mounted || feat2InView) ? "translateY(0)" : "translateY(2.5rem)", transition: mounted ? "opacity 0.7s ease, transform 0.7s ease" : "none" }}>
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff7ed] text-orange-600 text-sm font-bold mb-6 border border-orange-100">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                {t("featurePill2")}
              </div>
              <h3 className="font-extrabold mb-6 text-[32px] md:text-[40px] text-gray-900 leading-tight">
                {t.rich("feat2Title", { highlight: (c) => <span className="text-orange-600">{c}</span> })}
              </h3>
              <p className="mb-6 text-lg text-gray-600 leading-relaxed font-normal">{t("feat2Desc")}</p>
              <ul className="space-y-4 mb-8">
                {[t("feat2Bullet0"), t("feat2Bullet1"), t("feat2Bullet2"), t("feat2Bullet3")].map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative bg-gray-50 rounded-[40px] p-8 aspect-square flex items-center justify-center border border-gray-100 shadow-inner">
              <div className="relative w-[280px] shrink-0 shadow-2xl border-[8px] border-[#18181b] ring-1 ring-inset ring-white/10 rounded-[2.25rem] overflow-hidden transform -rotate-2 hover:rotate-0 transition duration-500">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70px] h-[18px] bg-[#18181b] rounded-full z-[100]" />
                <img src="/association-events-discover.webp" alt="Events Discover" className="w-full h-auto block" />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div ref={feat3Ref} className="flex flex-col md:flex-row items-center gap-12 lg:gap-20" style={{ opacity: (!mounted || feat3InView) ? 1 : 0, transform: (!mounted || feat3InView) ? "translateY(0)" : "translateY(2.5rem)", transition: mounted ? "opacity 0.7s ease, transform 0.7s ease" : "none" }}>
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf4ff] text-purple-600 text-sm font-bold mb-6 border border-purple-100">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                {t("featurePill3")}
              </div>
              <h3 className="font-extrabold mb-6 text-[32px] md:text-[40px] text-gray-900 leading-tight">
                {t.rich("feat3Title", { highlight: (c) => <span className="text-purple-600">{c}</span> })}
              </h3>
              <p className="mb-6 text-lg text-gray-600 leading-relaxed font-normal">{t("feat3Desc")}</p>
              <ul className="space-y-4 mb-8">
                {[t("feat3Bullet0"), t("feat3Bullet1"), t("feat3Bullet2"), t("feat3Bullet3")].map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="w-full aspect-[4/3] bg-white rounded-[24px] border border-gray-200 shadow-xl relative overflow-hidden flex flex-col transform rotate-2 hover:rotate-0 transition duration-500">
                <div className="h-12 border-b border-gray-100 flex items-center px-4 justify-between bg-gray-50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                  </div>
                </div>
                <div className="flex-1 p-6 flex gap-6">
                  <div className="w-32 flex flex-col gap-3">
                    <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                    <div className="flex items-center gap-2 bg-purple-50 p-2 rounded border border-purple-100">
                      <div className="w-4 h-4 rounded bg-purple-200"></div>
                      <div className="h-2 flex-1 bg-purple-600 rounded"></div>
                    </div>
                    {[1, 2].map(i => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded">
                        <div className="w-4 h-4 rounded bg-gray-200"></div>
                        <div className="h-2 flex-1 bg-gray-300 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs font-bold text-gray-500 mb-1">MEMBERSHIP DUES COLLECTED</div>
                        <div className="text-3xl font-black text-gray-900">$14,250.00</div>
                      </div>
                      <div className="px-3 py-1.5 bg-green-100 rounded-full text-green-700 text-xs font-bold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                        12.5% Keep up
                      </div>
                    </div>
                    <div className="flex-1 flex gap-4">
                      <div className="w-2/3 border-b border-l border-gray-200 flex items-end justify-between px-2 pt-4 pb-0 relative">
                        {[40, 55, 45, 70, 65, 85, 100].map((h, i) => (
                          <div key={i} className="w-6 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm relative z-10" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                      <div className="w-1/3 flex flex-col gap-3">
                        <div className="text-xs font-bold text-gray-500">RECENT RENEWALS</div>
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                              <div className="w-12 h-1.5 bg-gray-400 rounded"></div>
                            </div>
                            <div className="w-8 h-1.5 bg-green-400 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-navbar-theme="light" className="w-full py-24 px-6 md:px-12 lg:px-16 bg-[#f8fafc] border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-extrabold text-[36px] md:text-[48px] text-brand-primary mb-6">{t("howTitle")}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t("howDesc")}</p>
          </div>

          <div ref={howItWorksGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-brand-primary/10 via-brand-accent/50 to-brand-primary/10 z-0"></div>

            {[
              { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", rotate: "rotate-3", hoverRotate: "group-hover:-rotate-3", title: t("step1Title"), desc: t("step1Desc"), delay: "0ms" },
              { icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", rotate: "-rotate-3", hoverRotate: "group-hover:rotate-3", title: t("step2Title"), desc: t("step2Desc"), delay: "150ms" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", rotate: "rotate-3", hoverRotate: "group-hover:-rotate-3", title: t("step3Title"), desc: t("step3Desc"), delay: "300ms" },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group" style={{ opacity: (!mounted || howItWorksInView) ? 1 : 0, transform: (!mounted || howItWorksInView) ? "translateY(0)" : "translateY(2.5rem)", transition: mounted ? `opacity 0.7s ease ${step.delay}, transform 0.7s ease ${step.delay}` : "none" }}>
                <div className={`w-24 h-24 rounded-[32px] ${step.rotate} bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 ${step.hoverRotate} transition duration-500 group-hover:border-brand-accent/50 group-hover:shadow-brand-accent/20`}>
                  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={step.icon} /></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed px-4 text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-navbar-theme="dark" className="w-full py-24 px-6 relative overflow-hidden bg-[#1e255a]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent opacity-20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-[40px] md:text-[56px] font-black text-white mb-6 leading-tight">{t("ctaTitle")}</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{t("ctaDesc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/contact" className="px-8 py-4 bg-brand-accent text-[#1e255a] rounded-full font-bold text-base hover:bg-white transition shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2">
              {t("ctaBecomePartner")}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
          <p className="mt-6 text-sm text-blue-200">{t("ctaFree")}</p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section data-navbar-theme="light" className="w-full py-20 px-6 md:px-12 lg:px-16 bg-brand-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-extrabold text-brand-primary mb-8 text-center text-[30px] text-black">{t("faqTitle")}</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} idx={idx} faq={faq} isOpen={openFaq === idx} onToggle={handleToggleFaq} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
