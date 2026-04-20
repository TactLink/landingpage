"use client";
import { useState, useEffect } from "react";

const COUNTRY_MAP: Record<string, string> = {
  TH: "Thailand", SG: "Singapore", ID: "Indonesia",
  MY: "Malaysia", KH: "Cambodia", VN: "Vietnam", PH: "Philippines", BD: "Bangladesh",
};

const COUNTRY_FLAGS: Record<string, string> = {
  Thailand: "🇹🇭", Singapore: "🇸🇬", Indonesia: "🇮🇩",
  Malaysia: "🇲🇾", Cambodia: "🇰🇭", Vietnam: "🇻🇳", Philippines: "🇵🇭", Bangladesh: "🇧🇩",
};

export default function CountryDetectBanner() {
  const [detected, setDetected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tactlink_country")) return;

    const timer = setTimeout(() => {
      fetch("https://ipapi.co/json/")
        .then(r => r.json())
        .then(data => {
          const country = COUNTRY_MAP[data.country_code];
          if (country) {
            setDetected(country);
            requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
          }
        })
        .catch(() => {});
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = (afterFn?: () => void) => {
    setVisible(false);
    setTimeout(() => { afterFn?.(); setGone(true); }, 350);
  };

  const switchCountry = () => {
    dismiss(() => {
      if (!detected) return;
      localStorage.setItem("tactlink_country", detected);
      window.dispatchEvent(new Event("countryChange"));
    });
  };

  const stayGlobal = () => {
    dismiss(() => localStorage.setItem("tactlink_country", "Global"));
  };

  if (gone || !detected) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100vw-3rem)] max-w-md transition-all duration-350 ease-out pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? "0" : "1.5rem"})`,
      }}
    >
      <div className="pointer-events-auto bg-white rounded-3xl shadow-2xl border border-gray-100 px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <span className="text-5xl shrink-0">{COUNTRY_FLAGS[detected]}</span>
          <div>
            <p className="text-base font-bold text-gray-900 leading-snug">Looks like you&apos;re in {detected}!</p>
            <p className="text-sm text-gray-500 mt-1">Want to see local partners and content for {detected}?</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={switchCountry}
            className="flex-1 py-3 bg-brand-primary text-white text-sm font-bold rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors"
          >
            Yes, switch to {detected}
          </button>
          <button
            onClick={stayGlobal}
            className="flex-1 py-3 border border-gray-200 text-gray-500 text-sm font-medium rounded-full hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            Stay on Global
          </button>
        </div>
      </div>
    </div>
  );
}
