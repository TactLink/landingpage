"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchStrapiCollection } from "../../lib/strapi";
import ReactMarkdown from "react-markdown";

export default function DigitalNamecardPage() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);

    const testimonials = [
        { name: "Arifin K.", role: "Serial Entrepreneur", text: "TactLink completely changed how I network across SE Asia. I effortlessly manage different profiles for my e-commerce ventures and tech startups. So professional!" },
        { name: "Nadia P.", role: "Startup Founder", text: "The OCR scanner is a lifesaver after regional pitch events. What used to take me hours of manual data entry now takes 5 minutes. My investor pipeline is always up to date." },
        { name: "Wei Jie T.", role: "SME Owner", text: "Sleek, fast, and always works. I get compliments from enterprise clients every time they scan my QR code. Ditching paper was the best choice for my business." }
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeCountry, setActiveCountry] = useState("Global");

    useEffect(() => {
        const load = () => setActiveCountry(localStorage.getItem('tactlink_country') || 'Global');
        load();
        window.addEventListener('countryChange', load);
        return () => window.removeEventListener('countryChange', load);
    }, []);

    useEffect(() => {
        fetchStrapiCollection("faqs", { "sort[0]": "order:asc", "sort[1]": "id:asc", "filters[page][$in][0]": "namecard", "filters[page][$in][1]": "both" })
            .then((data) => {
                if (data) setFaqs(data.map((f: any) => ({ q: f.question, a: f.answer })));
            })
            .catch(() => {});
    }, []);


    return (
        <main className="w-full min-h-screen bg-white selection:bg-brand-accent selection:text-brand-primary">
            
            {/* HERO SECTION */}
            <section data-navbar-theme="dark" className="relative w-full min-h-screen overflow-hidden bg-[#0A0D1E]">
                {/* Background Gradients */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/20 blur-[120px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#374085]/40 blur-[150px] mix-blend-screen pointer-events-none" />

                {/* ── DESKTOP layout (md+): side by side, vertically centered ── */}
                <div className="hidden md:flex max-w-7xl mx-auto px-6 md:px-12 lg:px-16 min-h-screen items-center justify-center gap-12 lg:gap-24 relative z-10 pt-10 pb-16">
                    <div className="w-1/2 max-w-xl text-left flex flex-col items-start">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                            <span className="text-sm font-medium text-white tracking-widest uppercase">The Last Namecard You'll Need</span>
                        </div>
                        <h1 className="text-[56px] lg:text-[64px] leading-[1.1] font-extrabold text-white mb-5 tracking-tight">
                            Your Network, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#f8cdab]">In Your Pocket.</span>
                        </h1>
                        <p className="text-[18px] text-white/70 mb-8 max-w-lg leading-relaxed font-light">
                            Instantly share dynamic digital identities, scan paper cards with AI-powered OCR, and manage connections effortlessly.
                        </p>
                        <div className="flex flex-row items-center gap-3">
                            <a href="https://apps.apple.com/vn/app/tactlink/id1469516661" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-105 hover:opacity-90">
                                <Image src="/appstorelink.png" alt="Download on the App Store" width={140} height={42} className="h-[42px] w-auto object-contain" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.tactlink.app&pli=1" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-105 hover:opacity-90">
                                <Image src="/googleplaylink.png" alt="Get it on Google Play" width={140} height={42} className="h-[42px] w-auto object-contain" />
                            </a>
                        </div>
                        <div className="mt-6 flex items-center gap-3 opacity-80">
                            <div className="flex -space-x-2">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0A0D1E] bg-[#374085] flex items-center justify-center overflow-hidden">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/80 translate-y-0.5"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[13px] font-semibold text-white">10,000+ Cards Shared</span>
                                <span className="text-[11px] text-white/60 inline-flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                    Available in 8 Countries
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Desktop phone */}
                    <div className={`h-[65vh] lg:h-[72vh] aspect-[305/678] shrink-0 relative transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="absolute inset-2 bg-gradient-to-tr from-brand-accent to-[#374085] rounded-[2.5rem] blur-2xl opacity-40 animate-pulse" />
                        <div className="relative w-full h-full bg-black rounded-[3rem] p-[4px] shadow-2xl border-[5px] border-[#2A2D3E]">
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
                                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-top">
                                    <source src="/hero.webm" type="video/webm" />
                                    <source src="/hero.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── MOBILE layout: text top, phone peek at bottom ── */}
                <div className="md:hidden flex flex-col min-h-screen relative z-10">
                    {/* Text */}
                    <div className="flex flex-col items-center text-center px-6 pt-28 pb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
                            <span className="text-[13px] font-medium text-white tracking-widest uppercase">The Last Namecard You'll Need</span>
                        </div>
                        <h1 className="text-[38px] leading-[1.1] font-extrabold text-white mb-4 tracking-tight">
                            Your Network, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#f8cdab]">In Your Pocket.</span>
                        </h1>
                        <p className="text-[15px] text-white/70 mb-6 leading-relaxed font-light max-w-sm">
                            Share digital namecards, scan paper cards with OCR, and manage all your connections in one app.
                        </p>
                        {/* Compact side-by-side badges */}
                        <div className="flex flex-row gap-3 mb-6">
                            <a href="https://apps.apple.com/vn/app/tactlink/id1469516661" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-105 hover:opacity-90">
                                <Image src="/appstorelink.png" alt="Download on the App Store" width={130} height={38} className="h-[38px] w-auto object-contain" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.tactlink.app&pli=1" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-105 hover:opacity-90">
                                <Image src="/googleplaylink.png" alt="Get it on Google Play" width={130} height={38} className="h-[38px] w-auto object-contain" />
                            </a>
                        </div>
                        <div className="flex items-center gap-3 opacity-80">
                            <div className="flex -space-x-2">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0A0D1E] bg-[#374085] flex items-center justify-center overflow-hidden">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/80 translate-y-0.5"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[12px] font-semibold text-white">10,000+ Cards Shared</span>
                                <span className="text-[10px] text-white/60 inline-flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                    Available in 8 Countries
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Phone peek — grows from bottom, clipped by section overflow-hidden */}
                    <div className="flex-1 flex items-end justify-center pb-0">
                        <div className={`w-[72%] max-w-[280px] aspect-[305/678] relative transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                            <div className="absolute inset-2 bg-gradient-to-tr from-brand-accent to-[#374085] rounded-[2rem] blur-2xl opacity-40 animate-pulse" />
                            <div className="relative w-full h-full bg-black rounded-[2rem] p-[4px] shadow-2xl border-[4px] border-[#2A2D3E]">
                                <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-black">
                                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-top">
                                        <source src="/hero.webm" type="video/webm" />
                                        <source src="/hero.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE 1: DIGITAL NAMECARD */}
            <section data-navbar-theme="light" className="w-full py-24 px-6 md:px-12 lg:px-16 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col gap-32">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Text */}
                        <div className="w-full md:w-1/2 flex flex-col items-start">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-sm font-bold uppercase tracking-widest mb-6">
                                <span className="w-2 h-2 rounded-full bg-brand-accent inline-block" />
                                Feature 01 — Digital Namecard
                            </div>
                            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 mb-6 leading-tight">
                                Make &amp; share your <span className="text-brand-accent">digital identity.</span>
                            </h2>
                            <p className="mb-6 text-[16px] md:text-[18px] text-gray-600 leading-relaxed font-light">
                                Build a beautiful, dynamic namecard that reflects who you are — then share it instantly with anyone, anywhere.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    { icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2", label: "Create multiple identities — work, personal, freelance, and more." },
                                    { icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", label: "Share via QR code — no app needed on the receiver's end." },
                                    { icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", label: "Share a link via message, email, or social — one tap, instant profile." },
                                    { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Customise your card with your photo, bio, links, and social handles." },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                        </div>
                                        <span className="text-[15px] leading-relaxed font-light text-gray-700">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Namecard Video */}
                        <div className="w-full md:w-1/2 relative flex justify-center py-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-[#374085]/10 rounded-[3rem] transform rotate-2 scale-105 z-0" />
                            <div className="relative z-10 w-full max-w-[240px] lg:max-w-[260px] aspect-[305/678] overflow-hidden rounded-[2rem] shadow-2xl border border-gray-100 bg-black">
                                <video autoPlay loop muted playsInline className="w-full h-full object-cover object-top">
                                    <source src="/mockups/namecard-global.webm" type="video/webm" />
                                    <source src="/mockups/namecard-global.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE 2: SMART DIRECTORY */}
            <section data-navbar-theme="light" className="w-full py-24 px-6 md:px-12 lg:px-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col gap-32">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                        {/* Text */}
                        <div className="w-full md:w-1/2 flex flex-col items-start">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/20 text-brand-accent text-sm font-bold uppercase tracking-widest mb-6">
                                <span className="w-2 h-2 rounded-full bg-brand-accent inline-block" />
                                Feature 02 — Smart Directory
                            </div>
                            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 mb-6 leading-tight">
                                Collect, manage &amp; <span className="text-brand-accent">stay connected.</span>
                            </h2>
                            <p className="mb-6 text-[16px] md:text-[18px] text-gray-600 leading-relaxed font-light">
                                Every connection you make lives in one smart, searchable directory — and the relationship doesn't stop at the exchange.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    { icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z", label: "Scan physical business cards instantly with AI-powered OCR." },
                                    { icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", label: "Collect namecards via QR scan — saved automatically to your directory." },
                                    { icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z", label: "Tag and organise contacts — Client, Event Attendee, Marketing Lead, and more." },
                                    { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Chat directly with your connections from within the app." },
                                    { icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", label: "Follow updates and posts from people in your network." },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                                        </div>
                                        <span className="text-[15px] leading-relaxed font-light text-gray-700">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Directory Screenshot */}
                        <div className="w-full md:w-1/2 relative flex justify-center py-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-brand-accent/10 rounded-[3rem] transform -rotate-2 scale-105 z-0" />
                            <div className="relative z-10 w-full max-w-[240px] lg:max-w-[260px] aspect-[305/678] overflow-hidden rounded-[2rem] shadow-2xl border border-gray-100 bg-gray-100 group">
                                <Image
                                    src="/mockups/directory-global.png"
                                    alt="Smart Directory"
                                    fill
                                    className="object-cover object-top transition-all duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PREMIUM FEATURES SECTION */}
            <section data-navbar-theme="light" className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 tracking-tight">Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">premium</span> is better</h2>
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">Take your networking to the next level with powerful tools designed exclusively for professionals.</p>
                    </div>

                    <div className="bg-white rounded-[3rem] shadow-2xl shadow-brand-primary/5 border border-gray-100 p-8 md:p-16 relative overflow-hidden">
                        {/* Decorative Background inside card */}
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px]" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                            {/* Feature 1 */}
                            <div className="flex items-start gap-6 group">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center flex-shrink-0 text-brand-primary transition-transform group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z M4 6h16M4 18h16" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-device login</h3>
                                    <p className="text-gray-600 leading-relaxed">Access your cards and directory seamlessly across all your phones, tablets, and computers.</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-start gap-6 group">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center flex-shrink-0 text-brand-primary transition-transform group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Secretary account</h3>
                                    <p className="text-gray-600 leading-relaxed">Give your assistant or team member access to manage your contacts and follow-ups on your behalf.</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-start gap-6 group">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center flex-shrink-0 text-brand-primary transition-transform group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Contacts export</h3>
                                    <p className="text-gray-600 leading-relaxed">Export your entire network directory directly into CRM platforms like Salesforce, HubSpot, or as CSV.</p>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="flex items-start gap-6 group">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center flex-shrink-0 text-brand-primary transition-transform group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unlimited contacts</h3>
                                    <p className="text-gray-600 leading-relaxed">No cap on your network. Store, organize, and search an unlimited number of connections.</p>
                                </div>
                            </div>

                            {/* Feature 5 */}
                            <div className="flex items-start gap-6 group md:col-span-2 md:max-w-xl md:mx-auto">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center flex-shrink-0 text-brand-primary transition-transform group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unlimited cards</h3>
                                    <p className="text-gray-600 leading-relaxed">Create tailored digital identities for every context. One for business, one for freelance, and one for personal networking—with zero limits.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BRIDGE / REFERRAL SECTION */}
            <section data-navbar-theme="dark" className="py-28 relative overflow-hidden bg-gradient-to-br from-[#1A1F4C] via-[#374085] to-[#cfa086]">
                {/* Abstract Design Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#cfa086]/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
                </div>
                
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#374085]/40 text-brand-accent text-sm font-bold uppercase tracking-widest mb-8 border border-white/10 shadow-lg shadow-black/20 backdrop-blur-md">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Unlock Premium For Free
                    </div>
                    <h2 className="text-4xl md:text-[54px] font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
                        Refer your Association, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#f8cdab]">Get Premium for Life.</span>
                    </h2>
                    <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                        Love TactLink? Help your community go paperless. Introduce TactLink to your association or chamber of commerce, and if they partner with us, we’ll upgrade your personal account to TactLink Premium completely free.
                    </p>
                    <a href="/contact?subject=Association+Referral" className="inline-flex px-8 py-4 bg-brand-accent text-brand-primary rounded-full font-bold text-lg items-center gap-2 shadow-xl shadow-brand-accent/20 hover:scale-[1.03] hover:bg-white hover:text-brand-primary transition-all duration-300">
                        Refer an Association Now
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </a>
                </div>
            </section>

            {/* SOCIAL PROOF SECTION */}
            <section data-navbar-theme="dark" className="py-24 bg-brand-primary text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-[32px] md:text-[48px] font-extrabold mb-4 tracking-tight">Loved by Professionals everywhere.</h2>
                        <p className="text-lg text-white/70">Join thousands who have revolutionized how they network.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                                <div className="flex text-brand-accent mb-4">
                                    {[1,2,3,4,5].map(i => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <p className="text-lg leading-relaxed mb-6">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-accent to-[#374085] flex items-center justify-center font-bold text-lg">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold">{t.name}</div>
                                        <div className="text-sm text-white/60">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section data-navbar-theme="light" className="py-24 bg-gray-50 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-[32px] md:text-[48px] font-extrabold text-brand-primary mb-6 tracking-tight">Ready to ditch the paper cards?</h2>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Download the TactLink app today and create your first dynamic digital identity in less than 2 minutes.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="https://apps.apple.com/vn/app/tactlink/id1469516661" className="h-[60px] transition-transform hover:scale-105">
                            <Image src="/appstorelink.png" alt="Download for iOS" width={200} height={60} className="h-full w-auto object-contain" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.tactlink.app&pli=1" className="h-[60px] transition-transform hover:scale-105">
                            <Image src="/googleplaylink.png" alt="Download for Android" width={200} height={60} className="h-full w-auto object-contain" />
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section data-navbar-theme="light" className="w-full py-24 px-4 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-extrabold text-brand-primary mb-12 text-center text-[32px] md:text-[40px] tracking-tight">Got Questions?</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
                                <button
                                    className="w-full flex justify-between items-center text-lg font-bold text-gray-900 focus:outline-none p-6 text-left"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    <span>{faq.q}</span>
                                    <span className={`ml-4 text-brand-accent text-3xl font-light transition-transform duration-300 ${openFaq === idx ? 'rotate-45 text-gray-400' : ''}`}>+</span>
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="text-gray-600 leading-relaxed text-[16px] prose prose-sm max-w-none"><ReactMarkdown>{faq.a}</ReactMarkdown></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
