"use client";
import Link from "next/link";
import Image from 'next/image';
import { useState } from "react";

export default function Navbar() {
  // Removed: const { t } = useTranslation('common');
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Link href="/products" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize font-bold">Products</Link>
          <Link href="/contact" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize font-bold">Contact</Link>
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
            <Link href="/products" className="py-2 px-2 rounded hover:bg-brand-light text-lg font-bold" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/contact" className="py-2 px-2 rounded hover:bg-brand-light text-lg font-bold" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
} 