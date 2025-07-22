"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
  // Placeholder partners
  const partners = [
    { id: 'sbf', name: 'SBF', logo: '/logo-sbf.svg', url: 'https://www.sbf.org.sg/' },
    { id: 'ybln', name: 'YBLN', logo: '/logo-ybln.jpeg', url: 'https://www.sbf.org.sg/about-us/our-communities/business-networks/young-business-leaders-network' },
    { id: 'jci', name: 'JCI', logo: '/logo-jci.jpg', url: 'https://jci.cc/' },
    { id: 'lions', name: 'Lions', logo: '/logo-lions.jpg', url: 'https://www.lionsclubs.org/' },
    { id: 'sbfa', name: 'SBFA', logo: '/logo-sbfa.jpg', url: 'https://sbfa.org.sg/' },
    { id: 'toastmaster', name: 'Toastmaster', logo: '/logo-toastmaster.png', url: 'https://www.toastmasters.org/' },
  ];
  // FAQ
  const faqs = [
    { q: "What is TactLink?", a: "TactLink is a smart directory and networking platform for associations and events." },
    { q: "How do I request a demo?", a: "Fill out the form above and our team will contact you based on your country." },
    { q: "Is TactLink available on mobile?", a: "Yes, TactLink is available as a web and mobile application." },
    { q: "How does the Digital Fishbowl work?", a: "It uses QR codes for registration and digital draws at events." },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const partnerBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Only run on client
    if (window.innerWidth >= 768) return; // Only auto-scroll on mobile

    const el = partnerBarRef.current;
    if (!el) return;

    let animationFrame: number;
    const scrollStep = 1;

    function animate() {
      if (!el) return;
      if (el.scrollWidth > el.clientWidth) {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollLeft = 0; // Loop back to start
        } else {
          el.scrollLeft += scrollStep;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <main className="w-full min-h-screen bg-white text-brand-primary overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-[#374085] to-[#cfa086] text-brand-white flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-16 md:py-28 relative overflow-hidden">
        <div className="flex-1 z-10">
          <h1 className="font-extrabold mb-4 md:mb-6 leading-tight text-[36px] md:text-[70px] text-white">Networking, <span className="text-brand-accent block md:inline">Reimagined</span></h1>
          <h2 className="font-bold mb-4 md:mb-6 text-[20px] md:text-[30px] text-white">Smart directory & association networking tools</h2>
          <p className="mb-6 md:mb-8 max-w-xl text-[14px] md:text-[16px] text-white">Move beyond paper business cards. We provide a dynamic digital business card and a smart directory to keep your professional network connected, searchable, and always up-to-date, fostering collaboration and growth.</p>
          <a href="/products" className="w-full flex justify-center md:justify-start">
            <span className="inline-block mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
              Try For Free
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </a>
        </div>
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 z-10">
          {/* Device mockup placeholder replaced with hero image */}
          <div className="w-[320px] h-[640px] rounded-3xl flex items-center justify-center relative overflow-hidden">
            <Image src="/hero.png" alt="Hero" layout="fill" objectFit="cover" className="rounded-3xl" priority />
          </div>
        </div>
        {/* Decorative background shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent opacity-10 rounded-full blur-3xl z-0" />
      </section>

      {/* PARTNERS BAR */}
      <section className="w-full bg-gradient-to-b from-[#cfa086] to-[#cfa08600] py-6 px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-black font-semibold text-[16px] uppercase tracking-widest mb-2 ">Our Key Partnerships</div>
          <div ref={partnerBarRef} className="flex justify-center items-center gap-4 overflow-x-auto scrollbar-hide py-2 relative snap-x snap-mandatory touch-pan-x scroll-smooth md:pointer-events-auto pointer-events-none">
            {/* Left fade boxes */}
            <div className="w-24 h-24 rounded-xl bg-white opacity-20" />
            <div className="w-24 h-24 rounded-xl bg-white opacity-50" />
            <div className="w-24 h-24 rounded-xl bg-white opacity-80" />
            {/* Partner logos */}
            {partners.map((partner) => (
              <div key={partner.id} className="flex flex-col items-center w-24 h-24 justify-center snap-center">
                <a href={partner.url || '#'} target={partner.url ? '_blank' : undefined} rel={partner.url ? 'noopener noreferrer' : undefined} className="bg-white rounded-xl shadow p-0 flex items-center justify-center w-24 h-24">
                  <img src={partner.logo} alt={partner.name} className="h-16 w-16 object-contain" />
                </a>
              </div>
            ))}
            {/* Right fade boxes */}
            <div className="w-24 h-24 rounded-xl bg-white opacity-80" />
            <div className="w-24 h-24 rounded-xl bg-white opacity-50" />
            <div className="w-24 h-24 rounded-xl bg-white opacity-20" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full py-20 px-4 md:px-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          {/* For Individuals */}
          <div>
            <h2 className="font-extrabold text-brand-primary mb-12 text-center text-[30px] text-black">For Individuals</h2>
            <div className="flex flex-col gap-16">
              {/* Dynamic Digital Identities for Every Connection */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:p-8">
                  <img src="/feature1.png" alt="Dynamic Digital Identities" className="w-full h-auto object-contain rounded-3xl shadow-inner" style={{boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.10)'}} />
                </div>
                <div className="w-full md:w-1/2 md:pl-12 md:p-8">
                  <div className="text-[16px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">Digital Namecard</div>
                  <h3 className="font-bold mb-3 text-[30px] text-black">Dynamic Digital Identities for Every Connection</h3>
                  <p className="mb-2 text-[16px] text-black">Why limit yourself to one namecard? Create a distinct digital identity for every facet of your professional life. Whether you're at a conference, a casual meet-up, or a formal client meeting, effortlessly share the most relevant digital namecard via a single QR code. Need to share your business and personal contact details? Share both simultaneously with one scan, ensuring you always make the right impression and never miss an opportunity.</p>
                  <div className="w-full flex justify-center md:justify-start">
                    <a href="/products" className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Get Started Now
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* Smart Contact Capture and Management */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:p-8">
                  <img src="/feature2.png" alt="Smart Contact Capture and Management" className="w-full h-auto object-contain rounded-3xl shadow-inner" style={{boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.10)'}} />
                </div>
                <div className="w-full md:w-1/2 md:pr-12 md:p-8">
                  <div className="text-[16px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">smart directory</div>
                  <h3 className="font-bold mb-3 text-[30px] text-black">Smart Contact Capture and Management</h3>
                  <p className="mb-2 text-[16px] text-black">Beyond a simple address book, this platform gives you complete control over your network. You can instantly share your digital business card via a unique QR code or easily digitize existing physical business cards using our built-in OCR scanner. The new contact is seamlessly added to your network. From there, you can use customizable tags (e.g., "Client," "Event Attendee," "Marketing Lead") to categorize and organize your new connections. This intelligence allows you to effortlessly search and filter your network, making it simple to find a specific group or individual when you need them most.</p>
                  <div className="w-full flex justify-center md:justify-start">
                    <a href="/products" className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Get Started Now
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* For Associations & Events */}
          <div>
            <h2 className="font-extrabold text-brand-primary mb-12 text-center text-[30px] text-black">For Associations & Events</h2>
            <div className="flex flex-col gap-16">
              {/* Association Directory */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:p-8">
                  <img src="/feature3.png" alt="Association Directory" className="w-full h-auto object-contain rounded-3xl shadow-inner" style={{boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.10)'}} />
                </div>
                <div className="w-full md:w-1/2 md:pr-12 md:p-8">
                  <div className="text-[16px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">Association Directory</div>
                  <h3 className="font-bold mb-3 text-[30px] text-black">The Living Heart of Your Community</h3>
                  <p className="mb-2 text-[16px] text-black">Transform your static member list into a dynamic, interactive community hub. Our Association Directory feature is designed to empower both administrators and members, fostering a vibrant ecosystem for connection and collaboration.</p>
                  
                  <div className="mt-4 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-brand-light rounded-xl p-4 shadow flex items-start gap-3">
                      {/* Admin icon */}
                      <svg className="w-7 h-7 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      <div>
                        <span className="font-semibold text-[16px] text-black">For Administrators</span><br />
                        <span className="text-[16px] text-black">Easily manage member from a single database, saving you valuable time.</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-brand-light rounded-xl p-4 shadow flex items-start gap-3">
                      {/* Member icon */}
                      <svg className="w-7 h-7 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-1.13a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"/></svg>
                      <div>
                        <span className="font-semibold text-[16px] text-black">For Members</span><br />
                        <span className="text-[16px] text-black">Easily connect and collaborate within their community.</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center md:justify-start">
                    <a href="/contact" className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* Digital Fishbowl for Events */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:p-8">
                  <img src="/feature4.png" alt="Digital Fishbowl for Events" className="w-full h-auto object-contain rounded-3xl shadow-inner" style={{boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.10)'}} />
                </div>
                <div className="w-full md:w-1/2 md:pl-12 md:p-8">
                  <div className="text-[16px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">Digital Fishbowl</div>
                  <h3 className="font-bold mb-3 text-[30px] text-black">Revolutionize Event Networking</h3>
                  <p className="mb-2 text-[16px] text-black">Transform every gathering from a simple attendance list into a powerful networking opportunity.</p>
                  
                  <div className="mt-4 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-brand-light rounded-xl p-4 shadow flex items-start gap-3">
                      {/* Organizer icon: clipboard-check */}
                      <svg className="w-7 h-7 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/>
                      </svg>
                      <div>
                        <span className="font-semibold text-[16px] text-black">For Event Organizers</span><br />
                        <span className="text-[16px] text-black">Automate check-in with QR code registration. Provide a living, digital directory that extends the value of your event long after it's over.</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-brand-light rounded-xl p-4 shadow flex items-start gap-3">
                      {/* Participant icon: user-group */}
                      <svg className="w-7 h-7 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-1.13a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"/>
                      </svg>
                      <div>
                        <span className="font-semibold text-[16px] text-black">For Participants</span><br />
                        <span className="text-[16px] text-black">Easily share your digital business card and instantly see attendee profiles, building a lasting contact in your network.</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center md:justify-start">
                    <a href="/contact" className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* Dedicated Support */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:p-8">
                  <img src="/feature5.png" alt="Dedicated Local Support" className="w-full h-auto object-contain rounded-3xl shadow-inner" style={{boxShadow: 'inset 0 4px 24px 0 rgba(0,0,0,0.10)'}} />
                </div>
                <div className="w-full md:w-1/2 md:pr-12 md:p-8">
                  <div className="text-[16px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">localized bd team</div>
                  <h3 className="font-bold mb-3 text-[30px] text-black">Dedicated Local Support: Your Partner in Success</h3>
                  <p className="mb-2 text-[16px] text-black">We believe that our partnership begins, not ends, at the point of sale. That's why we provide comprehensive support delivered by a dedicated local team right here in your country.</p>
                  <p className="mb-2 text-[16px] text-black">From hands-on onboarding for a seamless launch to continuous technical support with quick response times, our local experts are your partners, committed to your long-term success.</p>
                  <div className="w-full flex justify-center md:justify-start">
                    <a href="/contact" className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Contact Us Now
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE / DEMO FORM */}
      {/*
      <section className="w-full bg-brand-primary py-20 px-4 md:px-0 flex justify-center items-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center">
          <h2 className="font-extrabold mb-6 text-[30px] text-black">Request a Demo</h2>
          <form className="w-full flex flex-col gap-5">
            <input className="border border-brand-light rounded-lg px-4 py-3 text-lg text-black" placeholder="Name" />
            <input className="border border-brand-light rounded-lg px-4 py-3 text-lg text-black" placeholder="Email" type="email" />
            <input className="border border-brand-light rounded-lg px-4 py-3 text-lg text-black" placeholder="Company" />
            <input className="border border-brand-light rounded-lg px-4 py-3 text-lg text-black" placeholder="Country" />
            <textarea className="border border-brand-light rounded-lg px-4 py-3 text-lg text-black" placeholder="Message" rows={3} />
            <button type="submit" className="bg-brand-accent text-brand-primary px-6 py-3 rounded-full font-bold text-lg mt-2 hover:bg-brand-primary hover:text-brand-white transition text-black">Submit</button>
          </form>
        </div>
      </section>
      */}

      {/* FAQ SECTION */}
      <section className="w-full py-20 px-4 md:px-0 bg-brand-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-extrabold text-brand-primary mb-8 text-center text-[30px] text-black">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6">
                <button
                  className="w-full flex justify-between items-center text-lg font-semibold text-black focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  type="button"
                >
                  <span className="text-black">{faq.q}</span>
                  <span className="ml-4 text-brand-accent text-2xl">{openFaq === idx ? '-' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="mt-4 text-black text-base">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
  );
}
