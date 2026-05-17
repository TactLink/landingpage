"use client";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from 'next/image';
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";

const COUNTRIES = ["Global", "Thailand", "Singapore", "Indonesia", "Malaysia", "Cambodia", "Vietnam", "Philippines", "Bangladesh"];

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const touchStartX = useRef<number | null>(null);

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  const openMenu = () => { setMobileOpen(true); requestAnimationFrame(() => setMenuVisible(true)); };
  const closeMenu = () => { setMenuVisible(false); setTimeout(() => setMobileOpen(false), 300); };

  useEffect(() => {
    const savedCountry = localStorage.getItem('tactlink_country');
    if (savedCountry && COUNTRIES.includes(savedCountry)) setSelectedCountry(savedCountry);
    const onCountryChange = () => {
      const updated = localStorage.getItem('tactlink_country');
      if (updated && COUNTRIES.includes(updated)) setSelectedCountry(updated);
    };
    window.addEventListener('countryChange', onCountryChange);
    return () => window.removeEventListener('countryChange', onCountryChange);
  }, []);

  useEffect(() => {
    const visibleSections = new Map<Element, string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const theme = entry.target.getAttribute('data-navbar-theme') || 'dark';
          if (entry.isIntersecting) visibleSections.set(entry.target, theme);
          else visibleSections.delete(entry.target);
        });
        let bestTheme: 'dark' | 'light' = 'dark';
        let bestTop = Infinity;
        visibleSections.forEach((theme, section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 64 && Math.abs(rect.top) < Math.abs(bestTop)) {
            bestTop = rect.top;
            bestTheme = theme as 'dark' | 'light';
          }
        });
        if (bestTop === Infinity && visibleSections.size > 0) {
          bestTheme = visibleSections.values().next().value as 'dark' | 'light';
        }
        setNavTheme(bestTheme);
      },
      { rootMargin: '0px 0px -95% 0px', threshold: 0 }
    );
    const startObserving = () => {
      observer.disconnect();
      visibleSections.clear();
      document.querySelectorAll('[data-navbar-theme]').forEach((s) => observer.observe(s));
    };
    startObserving();
    const timer = setTimeout(startObserving, 300);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountryChangeMobile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    localStorage.setItem('tactlink_country', newCountry);
    window.dispatchEvent(new Event('countryChange'));
  };

  const handleCountrySelectDesktop = (newCountry: string) => {
    setSelectedCountry(newCountry);
    localStorage.setItem('tactlink_country', newCountry);
    window.dispatchEvent(new Event('countryChange'));
    setIsCountryDropdownOpen(false);
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const langLabel = (l: string) => l === 'en' ? 'EN' : l === 'zh' ? '中文' : 'ID';

  const navLinks = [
    { href: '/' as const, label: t("platform") },
    { href: '/digital-namecard' as const, label: t("namecard") },
    { href: '/about' as const, label: t("about") },
    { href: '/contact' as const, label: t("contact") },
  ];

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        navTheme === 'light'
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.08)]'
          : 'bg-gradient-to-b from-black/25 to-transparent backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/TactLink-Logo-core.webp" alt="TactLink Logo" width={120} height={40} className="h-8 w-auto object-contain" priority />
              <span className={`font-[family-name:var(--font-montserrat)] font-extrabold text-xl tracking-tight transition-colors duration-500 ${navTheme === 'light' ? 'text-brand-primary' : 'text-white'}`}>TACTLINK</span>
            </Link>
          </div>

          {/* Desktop right section */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {/* Nav links */}
            <div className="flex gap-6 items-center">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`transition-colors duration-500 text-[14px] font-medium py-1 ${
                    pathname === href
                      ? 'text-brand-accent'
                      : navTheme === 'light' ? 'text-gray-600 hover:text-brand-primary' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className={`flex items-center gap-4 border-l pl-5 transition-colors duration-500 ${navTheme === 'light' ? 'border-gray-300' : 'border-white/20'}`}>
              {/* Language switcher */}
              <div className={`flex items-center gap-0.5 border-r pr-4 transition-colors duration-500 ${navTheme === 'light' ? 'border-gray-200' : 'border-white/15'}`}>
                {(['en', 'zh', 'id'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLocale(lang)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                      locale === lang
                        ? (navTheme === 'light' ? 'bg-brand-primary text-white' : 'bg-white/15 text-white')
                        : (navTheme === 'light' ? 'text-gray-500 hover:text-brand-primary hover:bg-gray-100' : 'text-white/50 hover:text-white/80')
                    }`}
                  >
                    {langLabel(lang)}
                  </button>
                ))}
              </div>

              {/* Country dropdown */}
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className={`flex items-center gap-1.5 focus:outline-none transition-colors duration-500 ${navTheme === 'light' ? 'text-gray-600 hover:text-brand-primary' : 'text-white/80 hover:text-white'}`}
                >
                  <span className="text-[13px] font-semibold tracking-wide">{selectedCountry}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isCountryDropdownOpen && (
                  <div className={`absolute right-0 top-full mt-3 w-40 rounded-xl shadow-2xl py-1.5 overflow-hidden border ${navTheme === 'light' ? 'bg-white border-gray-100' : 'bg-[#0A0D1E]/95 backdrop-blur-3xl border-white/10'}`}>
                    {COUNTRIES.map(country => (
                      <button
                        key={country}
                        onClick={() => handleCountrySelectDesktop(country)}
                        className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors flex items-center justify-between ${
                          country === selectedCountry
                            ? (navTheme === 'light' ? 'bg-brand-primary/5 text-brand-primary' : 'bg-brand-accent/10 text-brand-accent')
                            : (navTheme === 'light' ? 'text-gray-600 hover:bg-gray-50' : 'text-white/70 hover:bg-white/5 hover:text-white')
                        }`}
                      >
                        {country}
                        {country === selectedCountry && (
                          <span className={`w-1.5 h-1.5 rounded-full ${navTheme === 'light' ? 'bg-brand-primary' : 'bg-brand-accent'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              {pathname !== '/contact' && (
                pathname === '/' ? (
                  <Link href="/contact" className="bg-brand-accent text-brand-primary hover:bg-white px-6 py-2.5 rounded-full font-bold text-[14px] shadow-lg shadow-brand-accent/20 transition-all transform hover:scale-[1.03]">
                    {t("becomePartner")}
                  </Link>
                ) : (
                  <a href="#download" className="bg-brand-accent text-brand-primary hover:bg-white px-6 py-2.5 rounded-full font-bold text-[14px] shadow-lg shadow-brand-accent/20 transition-all transform hover:scale-[1.03]">
                    {t("downloadApp")}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {pathname !== '/contact' && (
              pathname === '/' ? (
                <Link href="/contact" className="bg-brand-accent text-brand-primary px-4 py-1.5 rounded-full font-bold text-[13px]">
                  {t("partnerShort")}
                </Link>
              ) : (
                <a href="#download" className="bg-brand-accent text-brand-primary px-4 py-1.5 rounded-full font-bold text-[13px]">
                  {t("downloadShort")}
                </a>
              )
            )}
            <div className="flex items-center justify-end">
              <button onClick={openMenu} aria-label="Open menu" className={`focus:outline-none p-1 transition-colors duration-500 ${navTheme === 'light' ? 'text-brand-primary' : 'text-white'}`}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className={`absolute top-0 right-0 w-72 h-full bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out ${menuVisible ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={e => { if (touchStartX.current !== null && e.changedTouches[0].clientX - touchStartX.current > 60) closeMenu(); }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                <Image src="/TactLink-Logo-core.webp" alt="TactLink" width={28} height={28} className="h-7 w-auto object-contain" />
                <span className="font-[family-name:var(--font-montserrat)] font-extrabold text-brand-primary text-base tracking-tight">TACTLINK</span>
              </Link>
              <button onClick={closeMenu} aria-label="Close menu" className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col px-3 py-4 gap-0.5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-semibold transition-colors ${
                    pathname === href
                      ? 'text-brand-accent border-l-4 border-brand-accent bg-brand-light pl-3'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {pathname !== '/contact' && (
              <div className="px-4 mt-2">
                {pathname === '/' ? (
                  <Link href="/contact" onClick={closeMenu} className="block w-full text-center bg-brand-accent text-brand-primary font-bold text-[15px] py-3 rounded-xl shadow-md shadow-brand-accent/20 hover:bg-yellow-300 transition-colors">
                    {t("becomePartner")}
                  </Link>
                ) : (
                  <a href="#download" onClick={closeMenu} className="block w-full text-center bg-brand-accent text-brand-primary font-bold text-[15px] py-3 rounded-xl shadow-md shadow-brand-accent/20 hover:bg-yellow-300 transition-colors">
                    {t("downloadApp")}
                  </a>
                )}
              </div>
            )}

            <div className="px-4 mt-auto mb-0 pt-6 border-t border-gray-100">
              <label className="block text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">{t("language")}</label>
              <div className="flex gap-2">
                {(['en', 'zh', 'id'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { switchLocale(lang); closeMenu(); }}
                    className={`flex-1 py-2 rounded-lg text-[13px] font-bold transition-colors ${
                      locale === lang ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {langLabel(lang)}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 mt-4 mb-8 pt-4 border-t border-gray-100">
              <label className="block text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">{t("location")}</label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={handleCountryChangeMobile}
                  className="w-full bg-gray-50 border border-gray-200 text-[15px] font-medium text-gray-700 p-3 pr-8 rounded-lg focus:outline-none appearance-none cursor-pointer"
                >
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
