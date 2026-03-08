"use client";

import Image from "next/image";
import { useState } from "react";

export default function DigitalNamecardPage() {
    const faqs = [
        { q: "What is a Digital Namecard?", a: "A digital namecard replaces physical business cards with a dynamic profile you can share via QR code or link." },
        { q: "Can I manage contacts I meet?", a: "Yes, you can scan physical cards using OCR and categorize your new contacts with tags." },
        { q: "Do I need an app to scan it?", a: "No, anyone can scan your QR code with their standard smartphone camera." },
        { q: "How much does it cost?", a: "We offer a free tier to get started, along with premium plans for advanced features." },
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <main className="w-full min-h-screen bg-white text-brand-primary overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="w-full bg-gradient-to-b from-[#374085] to-[#cfa086] text-brand-white flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-16 md:py-28 relative overflow-hidden">
                <div className="flex-1 z-10">
                    <div className="text-[16px] uppercase tracking-widest text-[#f5d9c3] mb-2 font-semibold">For Individuals & Professionals</div>
                    <h1 className="font-extrabold mb-4 md:mb-6 leading-tight text-[36px] md:text-[60px] text-white">Smart Digital <span className="text-brand-accent block md:inline">Business Cards</span></h1>
                    <h2 className="font-bold mb-4 md:mb-6 text-[20px] md:text-[26px] text-white">Never run out of business cards again.</h2>
                    <p className="mb-6 md:mb-8 max-w-xl text-[14px] md:text-[18px] text-white">Share your professional identity instantly, scan paper cards with our built-in OCR, and manage your network with smart tags. The last business card you'll ever need.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="/products" className="px-8 py-4 bg-brand-accent text-brand-primary rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-brand-primary hover:text-brand-white transition">
                            Create Your Free Card
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </a>
                        <a href="/" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg flex items-center justify-center hover:bg-white hover:text-brand-primary transition">
                            I run an Association
                        </a>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 z-10">
                    <div className="w-[320px] h-[640px] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl border-4 border-white/20">
                        <Image src="/feature1.png" alt="Digital Namecard Preview" layout="fill" objectFit="cover" className="rounded-3xl bg-white" priority />
                    </div>
                </div>
                {/* Decorative background shapes */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent opacity-20 rounded-full blur-3xl z-0" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent opacity-10 rounded-full blur-3xl z-0" />
            </section>

            {/* CORE FEATURES SECTION */}
            <section className="w-full py-24 px-4 md:px-0">
                <div className="max-w-7xl mx-auto flex flex-col gap-24">

                    {/* Dynamic Digital Identities */}
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:p-8">
                            <img src="/feature1.png" alt="Dynamic Digital Identities" className="w-full h-auto object-contain rounded-3xl shadow-inner border border-gray-100" style={{ boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.10)' }} />
                        </div>
                        <div className="w-full md:w-1/2 md:pl-12 md:p-8">
                            <div className="text-[16px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">Multiple Profiles</div>
                            <h3 className="font-bold mb-3 text-[30px] md:text-[40px] text-black leading-tight">Dynamic Digital Identities for Every Connection</h3>
                            <p className="mb-4 text-[18px] text-gray-700 leading-relaxed">Why limit yourself to one namecard? Create a distinct digital identity for every facet of your professional life. Whether you're at a conference, a casual meet-up, or a formal client meeting, effortlessly share the most relevant card via a single QR code.</p>
                        </div>
                    </div>

                    {/* Smart Contact Capture and Management */}
                    <div className="flex flex-col md:flex-row-reverse items-center">
                        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:p-8">
                            <img src="/feature2.png" alt="Smart Contact Capture and Management" className="w-full h-auto object-contain rounded-3xl shadow-inner border border-gray-100" style={{ boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.10)' }} />
                        </div>
                        <div className="w-full md:w-1/2 md:pr-12 md:p-8">
                            <div className="text-[16px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">Contact Manager</div>
                            <h3 className="font-bold mb-3 text-[30px] md:text-[40px] text-black leading-tight">Smart Contact Capture and Management</h3>
                            <p className="mb-4 text-[18px] text-gray-700 leading-relaxed">Beyond a simple address book, this platform gives you complete control over your network. Instantly share via QR code or easily digitize existing physical business cards using our built-in OCR scanner.</p>
                            <p className="mb-2 text-[18px] text-gray-700 leading-relaxed">Use customizable tags (e.g., "Client," "Event Attendee") to categorize and organize your new connections, making it simple to find a specific group when you need them most.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA SECTION */}
            <section className="w-full bg-brand-light py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">Ready to upgrade your networking?</h2>
                    <p className="text-xl text-gray-700 mb-10">Join thousands of professionals who have ditched paper for good.</p>
                    <a href="/products" className="inline-flex px-10 py-4 bg-brand-primary text-white rounded-full font-bold text-xl items-center gap-2 shadow-lg hover:bg-brand-accent hover:text-brand-primary transition transform hover:scale-105">
                        Get Started Now
                    </a>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="w-full py-24 px-4 md:px-0">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-extrabold text-brand-primary mb-12 text-center text-[30px] md:text-[40px] text-black">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
                                <button
                                    className="w-full flex justify-between items-center text-lg font-bold text-black focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    type="button"
                                >
                                    <span className="text-black text-left">{faq.q}</span>
                                    <span className="ml-4 text-brand-accent text-3xl font-light">{openFaq === idx ? '-' : '+'}</span>
                                </button>
                                {openFaq === idx && (
                                    <div className="mt-4 text-gray-600 text-lg leading-relaxed">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
