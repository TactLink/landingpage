"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-[#0A0D1E] text-white/80 py-16 mt-0 text-[15px] border-t border-white/10">
      {/* Decorative Orbs */}
      <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[100%] rounded-full bg-brand-accent/10 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-10%] w-[40%] h-[100%] rounded-full bg-[#374085]/20 blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Top/Middle: Logo & Description / Links & Social */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16 px-4">
          
          {/* Logo & Info */}
          <div className="flex flex-col items-start gap-6">
            <a href="/" className="flex items-center gap-2">
              <img src="/TactLink-Logo-core.png" alt="TactLink" className="h-8 w-auto object-contain brightness-0 invert" />
              <span className="font-[family-name:var(--font-montserrat)] font-extrabold text-xl tracking-tight text-white">TACTLINK</span>
            </a>
            <p className="text-white/60 leading-relaxed font-light text-[14px] max-w-xs">
              Reimagine Networking with Smart Directory. Transform professional networking, go paperless, foster collaboration, and grow your community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start md:items-center gap-6">
            <h3 className="text-white font-bold tracking-widest uppercase text-xs">Quick Links</h3>
            <nav className="flex flex-col items-start md:items-center gap-3 text-[14px]">
              <a href="/" className="hover:text-white hover:translate-x-1 transition-all duration-300">Home</a>
              <a href="/about" className="hover:text-white hover:translate-x-1 transition-all duration-300">About</a>
              <a href="/digital-namecard" className="hover:text-white hover:translate-x-1 transition-all duration-300">Digital Namecard</a>
              <a href="/terms" className="hover:text-white hover:translate-x-1 transition-all duration-300">Terms &amp; Conditions</a>
              <a href="/privacy" className="hover:text-white hover:translate-x-1 transition-all duration-300">Privacy Policy</a>
            </nav>
          </div>

          {/* Social Media & Contact */}
          <div className="flex flex-col items-start md:items-end gap-6 md:ml-auto w-full">
            <h3 className="text-white font-bold tracking-widest uppercase text-xs">Connect</h3>
            <div className="flex flex-row items-center gap-4">
              <a href="https://web.facebook.com/TactLink" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-white/70 hover:text-white">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/tactlinksmartdirectory/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-white/70 hover:text-white">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/tactlink/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-white/70 hover:text-white">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
            
            <div className="flex flex-col md:items-end gap-1 mt-4 text-[13px] text-white/50 text-left md:text-right">
              <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>14 Arumugam Road, #03-06 LTC Building C</span>
              <span>Singapore 409959</span>
            </div>
          </div>

        </div>

        {/* Bottom divider and Copyright */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between w-full px-4 text-[13px] text-white/40">
          <div>&copy; {new Date().getFullYear()} <span className="text-white/80 font-bold">TactLink</span>. All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>

      </div>
    </footer>
  );
} 