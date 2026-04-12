"use client";
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect, useRef } from "react";

const COUNTRIES = ["Global", "Thailand", "Singapore", "Indonesia", "Malaysia", "Cambodia", "Vietnam", "Philippines", "Bangladesh"];

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const touchStartX = useRef<number | null>(null);

  const openMenu = () => { setMobileOpen(true); requestAnimationFrame(() => setMenuVisible(true)); };
  const closeMenu = () => { setMenuVisible(false); setTimeout(() => setMobileOpen(false), 300); };

  useEffect(() => {
    // Load saved country or auto-detect via IP
    const savedCountry = localStorage.getItem('tactlink_country');
    if (savedCountry && COUNTRIES.includes(savedCountry)) {
      setSelectedCountry(savedCountry);
    } else {
      const COUNTRY_MAP: Record<string, string> = {
        TH: 'Thailand', SG: 'Singapore', ID: 'Indonesia',
        MY: 'Malaysia', KH: 'Cambodia', VN: 'Vietnam', PH: 'Philippines', BD: 'Bangladesh',
      };
      fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
          const detected = COUNTRY_MAP[data.country_code] || 'Global';
          setSelectedCountry(detected);
          localStorage.setItem('tactlink_country', detected);
          window.dispatchEvent(new Event('countryChange'));
        })
        .catch(() => {}); // silently fall back to Global
    }

    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    localStorage.setItem('tactlink_country', newCountry);
    // Dispatch event so other components (like page.tsx) can re-fetch partners
    window.dispatchEvent(new Event('countryChange'));
  };

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-white/5 backdrop-blur-md border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/TactLink-Logo-core.png" alt="TactLink Logo" width={120} height={40} className="h-8 w-auto object-contain" priority />
            <span className={`font-[family-name:var(--font-montserrat)] font-extrabold text-xl tracking-tight transition-colors ${isScrolled ? 'text-brand-primary' : 'text-white'}`}>TACTLINK</span>
          </Link>
        </div>
        {/* Right Section: Links + Country + CTA */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {/* Main nav links */}
          <div className="flex gap-6 items-center">
            <Link href="/" className={`transition-colors text-[14px] font-medium py-1 ${pathname === '/' ? 'text-brand-accent' : isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>Platform / Associations</Link>
            <Link href="/digital-namecard" className={`transition-colors text-[14px] font-medium py-1 ${pathname === '/digital-namecard' ? 'text-brand-accent' : isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>Digital Namecard</Link>
            <Link href="/about" className={`transition-colors text-[14px] font-medium py-1 ${pathname === '/about' ? 'text-brand-accent' : isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>About</Link>
            <Link href="/contact" className={`transition-colors text-[14px] font-medium py-1 ${pathname === '/contact' ? 'text-brand-accent' : isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>Contact</Link>
          </div>

          <div className={`flex items-center gap-5 border-l pl-5 transition-colors ${isScrolled ? 'border-gray-300' : 'border-white/20'}`}>
            {/* Minimal Country Dropdown */}
            <div className={`relative flex items-center transition-colors cursor-pointer group ${isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="bg-transparent text-[13px] font-medium text-inherit focus:outline-none appearance-none cursor-pointer pr-4"
              >
                {COUNTRIES.map(country => (
                  <option key={country} value={country} className="text-gray-900">{country}</option>
                ))}
              </select>
              <svg className="w-3 h-3 opacity-50 absolute right-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>

            {/* CTA Bookend */}
            <Link href={pathname === '/' ? '/contact' : '#download'} className="bg-brand-accent text-brand-primary hover:bg-white px-6 py-2.5 rounded-full font-bold text-[14px] shadow-lg shadow-brand-accent/20 transition-all transform hover:scale-[1.03]">
              {pathname === '/' ? 'Become a Partner' : 'Download App'}
            </Link>
          </div>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center gap-3">
          <Link href={pathname === '/' ? '/contact' : '#download'} className="bg-brand-accent text-brand-primary px-4 py-1.5 rounded-full font-bold text-[13px]">
            {pathname === '/' ? 'Partner' : 'Download'}
          </Link>
          <button onClick={openMenu} aria-label="Open menu" className={`focus:outline-none p-1 transition-colors ${isScrolled ? 'text-brand-primary' : 'text-white'}`}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      </nav>
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        >
          {/* Dim backdrop — separate from the panel so blur doesn't bleed */}
          <div className="absolute inset-0 bg-black/60" />
          <div
            className={`absolute top-0 right-0 w-72 h-full bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out ${menuVisible ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={e => { if (touchStartX.current !== null && e.changedTouches[0].clientX - touchStartX.current > 60) closeMenu(); }}
          >
            {/* Header with logo */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                <Image src="/TactLink-Logo-core.png" alt="TactLink" width={28} height={28} className="h-7 w-auto object-contain" />
                <span className="font-[family-name:var(--font-montserrat)] font-extrabold text-brand-primary text-base tracking-tight">TACTLINK</span>
              </Link>
              <button onClick={closeMenu} aria-label="Close menu" className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-3 py-4 gap-0.5">
              {[
                { href: '/', label: 'Platform / Associations' },
                { href: '/digital-namecard', label: 'Digital Namecard' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
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

            {/* CTA */}
            <div className="px-4 mt-4">
              <Link
                href={pathname === '/' ? '/contact' : '#download'}
                onClick={closeMenu}
                className="block w-full text-center bg-brand-accent text-brand-primary font-bold text-[15px] py-3 rounded-xl shadow-md shadow-brand-accent/20 hover:bg-yellow-300 transition-colors"
              >
                {pathname === '/' ? 'Become a Partner' : 'Download App'}
              </Link>
            </div>

            {/* Country Selector */}
            <div className="px-4 mt-auto mb-8 pt-6 border-t border-gray-100 mt-6">
              <label className="block text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Location</label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
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