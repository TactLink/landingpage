"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/navigation";

const COUNTRY_MAP: Record<string, string> = {
  TH: "Thailand", SG: "Singapore", ID: "Indonesia",
  MY: "Malaysia", KH: "Cambodia", VN: "Vietnam", PH: "Philippines", BD: "Bangladesh",
};

const COUNTRY_FLAGS: Record<string, string> = {
  Thailand: "🇹🇭", Singapore: "🇸🇬", Indonesia: "🇮🇩",
  Malaysia: "🇲🇾", Cambodia: "🇰🇭", Vietnam: "🇻🇳", Philippines: "🇵🇭", Bangladesh: "🇧🇩",
};

const LANG_NAMES: Record<string, string> = {
  en: "English",
  zh: "中文",
  id: "Bahasa Indonesia",
};

// Find first browser-preferred locale that's supported and differs from current
function detectBrowserLocale(current: string): string | null {
  if (typeof navigator === "undefined") return null;
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const pref of prefs) {
    const base = pref.toLowerCase().split("-")[0];
    if ((locales as readonly string[]).includes(base) && base !== current) return base;
  }
  return null;
}

type Step = 'country' | 'lang';

export default function CountryDetectBanner() {
  const t = useTranslations("Banner");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStep] = useState<Step>('country');
  const [detected, setDetected] = useState<string | null>(null);
  const [detectedCode, setDetectedCode] = useState<string | null>(null);
  const [suggestedLocale, setSuggestedLocale] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hasCountry = !!localStorage.getItem("tactlink_country");
    const hasLang = !!localStorage.getItem("tactlink_lang");

    const browserLocale = hasLang ? null : detectBrowserLocale(locale);
    if (browserLocale) setSuggestedLocale(browserLocale);

    if (hasCountry) {
      if (browserLocale) {
        setStep('lang');
        const timer = setTimeout(() => {
          requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
        }, 1000);
        return () => clearTimeout(timer);
      }
      return;
    }

    const timer = setTimeout(() => {
      fetch("https://ipapi.co/json/")
        .then(r => r.json())
        .then(data => {
          const code = data.country_code as string;
          const country = COUNTRY_MAP[code];
          if (country) {
            setDetected(country);
            setDetectedCode(code);
            requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
          } else if (browserLocale) {
            setStep('lang');
            requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
          }
        })
        .catch(() => {
          if (browserLocale) {
            setStep('lang');
            requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
          }
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, [locale]);

  const dismiss = (afterFn?: () => void) => {
    setVisible(false);
    setTimeout(() => {
      afterFn?.();
      if (step === 'country' && suggestedLocale) {
        setStep('lang');
        requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      } else {
        setGone(true);
      }
    }, 350);
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

  const switchLang = () => {
    dismiss(() => {
      localStorage.setItem("tactlink_lang", suggestedLocale ?? "");
      if (suggestedLocale) router.replace(pathname, { locale: suggestedLocale });
    });
  };

  const keepLang = () => {
    dismiss(() => localStorage.setItem("tactlink_lang", locale));
  };

  if (gone) return null;
  if (step === 'country' && !detected) return null;
  if (step === 'lang' && !suggestedLocale) return null;

  const langName = suggestedLocale ? LANG_NAMES[suggestedLocale] : "";

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100vw-3rem)] max-w-md transition-all duration-350 ease-out pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? "0" : "1.5rem"})`,
      }}
    >
      <div className="pointer-events-auto bg-white rounded-3xl shadow-2xl border border-gray-100 px-7 py-6 flex flex-col gap-5">
        {step === 'country' && detected ? (
          <>
            <div className="flex items-center gap-4">
              <span className="text-5xl shrink-0">{COUNTRY_FLAGS[detected]}</span>
              <div>
                <p className="text-base font-bold text-gray-900 leading-snug">{t("detected", { country: detected })}</p>
                <p className="text-sm text-gray-500 mt-1">{t("localContent", { country: detected })}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={switchCountry}
                className="flex-1 py-3 bg-brand-primary text-white text-sm font-bold rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors"
              >
                {t("switchTo", { country: detected })}
              </button>
              <button
                onClick={stayGlobal}
                className="flex-1 py-3 border border-gray-200 text-gray-500 text-sm font-medium rounded-full hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                {t("stayGlobal")}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <span className="text-4xl shrink-0">🌐</span>
              <p className="text-base font-bold text-gray-900 leading-snug">{t("langSuggestion", { language: langName })}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={switchLang}
                className="flex-1 py-3 bg-brand-primary text-white text-sm font-bold rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors"
              >
                {t("switchLang", { language: langName })}
              </button>
              <button
                onClick={keepLang}
                className="flex-1 py-3 border border-gray-200 text-gray-500 text-sm font-medium rounded-full hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                {t("keepLang")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
