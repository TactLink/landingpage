"use client";
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from "react";

const COUNTRIES = ["Global", "Thailand", "Singapore", "Indonesia", "Malaysia", "Cambodia", "Vietnam", "Philippines"];

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Determine where the "Products" link should point based on current persona
  const isIndividualPersona = pathname === '/digital-namecard' || pathname === '/products-individual';
  const productsLinkUrl = isIndividualPersona ? '/products-individual' : '/products';

  useEffect(() => {
    // Load saved country from localStorage on mount
    const savedCountry = localStorage.getItem('tactlink_country');
    if (savedCountry && COUNTRIES.includes(savedCountry)) {
      setSelectedCountry(savedCountry);
    }

    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize state
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
            <Link href="/" className={`transition-colors text-[14px] font-medium py-1 ${pathname === '/' ? 'text-brand-accent' : isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>Home</Link>
            <Link href="/about" className={`transition-colors text-[14px] font-medium py-1 ${pathname === '/about' ? 'text-brand-accent' : isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>About</Link>
            <Link href={productsLinkUrl} className={`transition-colors text-[14px] font-medium py-1 ${pathname.startsWith('/products') ? 'text-brand-accent' : isScrolled ? 'text-gray-600 hover:text-brand-primary' : 'text-white/70 hover:text-white'}`}>Products</Link>
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
            <Link href="/contact" className="bg-brand-accent text-brand-primary hover:bg-white px-6 py-2.5 rounded-full font-bold text-[14px] shadow-lg shadow-brand-accent/20 transition-all transform hover:scale-[1.03]">
              Get Started
            </Link>
          </div>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/contact" className="bg-brand-accent text-brand-primary px-4 py-1.5 rounded-full font-bold text-[13px]">
            Start
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu" className={`focus:outline-none p-1 transition-colors ${isScrolled ? 'text-brand-primary' : 'text-white'}`}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-50" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 right-0 w-2/3 max-w-xs h-full bg-white text-brand-primary shadow-lg flex flex-col p-6 gap-6" onClick={e => e.stopPropagation()}>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="self-end mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link href="/" className={`py-3 px-4 rounded-xl ${pathname === '/' ? 'bg-brand-light text-brand-accent' : 'bg-gray-50 text-gray-800'} text-lg font-bold`} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" className={`py-3 px-4 rounded-xl ${pathname === '/about' ? 'bg-brand-light text-brand-accent' : 'bg-gray-50 text-gray-800'} text-lg font-bold`} onClick={() => setMobileOpen(false)}>About</Link>
            <Link href={productsLinkUrl} className={`py-3 px-4 rounded-xl ${pathname.startsWith('/products') ? 'bg-brand-light text-brand-accent' : 'bg-gray-50 text-gray-800'} text-lg font-bold`} onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/contact" className={`py-3 px-4 rounded-xl ${pathname === '/contact' ? 'bg-brand-light text-brand-accent' : 'bg-gray-50 text-gray-800'} text-lg font-bold`} onClick={() => setMobileOpen(false)}>Contact</Link>

            {/* Mobile Country Selector */}
            <div className="mt-4 border-t pt-4">
              <label className="block text-sm text-gray-500 mb-2 font-semibold">Location</label>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full bg-gray-100 border border-gray-200 text-lg font-bold p-3 rounded focus:outline-none"
              >
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 