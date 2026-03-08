"use client";
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from "react";

const COUNTRIES = ["Global", "Thailand", "Singapore", "Indonesia", "Malaysia", "Cambodia", "Vietnam", "Philippines"];

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Global");
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
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    localStorage.setItem('tactlink_country', newCountry);
    // Dispatch event so other components (like page.tsx) can re-fetch partners
    window.dispatchEvent(new Event('countryChange'));
  };

  return (
    <nav className="w-full bg-brand-white shadow-md text-brand-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="TactLink Logo" width={100} height={100} priority />
          </Link>
        </div>
        {/* Main nav links on the right */}
        <div className="hidden md:flex gap-6 items-center ml-auto">
          <Link href="/" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize font-bold">Home</Link>
          <Link href="/about" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize font-bold">About</Link>
          <Link href={productsLinkUrl} className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize font-bold">Products</Link>
          <Link href="/contact" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize font-bold">Contact</Link>

          {/* Country Selector */}
          <div className="relative flex items-center bg-gray-100 rounded-md px-2 py-1 ml-4 border border-gray-200">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-transparent text-[16px] font-semibold text-gray-700 focus:outline-none appearance-none cursor-pointer pr-4"
            >
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-2 pointer-events-none">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu" className="focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
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
            <Link href="/" className="py-2 px-2 rounded hover:bg-brand-light text-lg font-bold" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/about" className="py-2 px-2 rounded hover:bg-brand-light text-lg font-bold" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href={productsLinkUrl} className="py-2 px-2 rounded hover:bg-brand-light text-lg font-bold" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/contact" className="py-2 px-2 rounded hover:bg-brand-light text-lg font-bold" onClick={() => setMobileOpen(false)}>Contact</Link>

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