"use client";
import Link from "next/link";
import Image from 'next/image';

export default function Navbar() {
  // Removed: const { t } = useTranslation('common');

  return (
    <nav className="w-full bg-brand-white shadow-md text-brand-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and main nav links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="TactLink Logo" width={100} height={100} priority />
            {/* Optionally, keep the company name next to the logo: */}
            {/* <span className="font-bold text-xl tracking-tight text-brand-accent">{t('company')}</span> */}
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize">Home</Link>
            <Link href="/about" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize">About</Link>
            <Link href="/products" className="hover:bg-brand-light rounded px-2 py-1 transition text-[18px] capitalize">Products</Link>
          </div>
        </div>
        {/* Request Demo button on the right */}
        <div className="hidden md:flex items-center">
          <Link href="/request-demo" className="bg-brand-accent text-brand-primary px-4 py-2 rounded hover:bg-brand-primary hover:text-brand-white transition font-bold text-[18px] capitalize">Request Demo</Link>
        </div>
        {/* Language switcher hidden for now */}
        <div className="md:hidden">
          {/* Mobile menu button placeholder */}
        </div>
      </div>
    </nav>
  );
} 