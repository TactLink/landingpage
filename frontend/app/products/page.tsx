import Image from "next/image";

export default function ProductsPage() {
  return (
    <main className="w-full min-h-screen px-0 py-0 bg-white text-brand-primary">
      {/* Download section */}
      <div className="w-full flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-b from-[#374085] to-[#cfa086] md:py-16 md:mb-12">
        <div className="mb-4 text-center text-2xl md:text-4xl font-extrabold text-white md:mb-8">Get the TactLink App</div>
        <div className="mb-2 text-center text-[16px] md:text-xl max-w-xl text-white md:mb-8">Download the TactLink app for your device and start connecting instantly. Scan the QR code or tap the button below.</div>
        {/* Desktop: QR codes */}
        <div className="hidden md:flex gap-20 items-center mt-8">
          <div className="flex flex-col items-center">
            <Image src="/googleplay.png" alt="Download for Android" width={120} height={120} />
            <span className="mt-4 font-semibold text-white text-lg">Android</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/appstore.png" alt="Download for iOS" width={120} height={120} />
            <span className="mt-4 font-semibold text-white text-lg">iOS</span>
          </div>
        </div>
        {/* Mobile: Download button */}
        <div className="flex md:hidden flex-col items-center mt-6 gap-4 w-full">
          <a href="https://play.google.com/store/apps/details?id=com.tactlink.app&pli=1" className="w-full max-w-xs flex justify-center">
            <Image src="/googleplaylink.png" alt="Download for Android" width={200} height={60} />
          </a>
          <a href="https://apps.apple.com/vn/app/tactlink/id1469516661" className="w-full max-w-xs flex justify-center">
            <Image src="/appstorelink.png" alt="Download for iOS" width={200} height={60} />
          </a>
        </div>
      </div>
      {/* FEATURES SECTION (copied from home page) */}
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
                    <button className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Get Started Now
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
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
                    <button className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Get Started Now
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
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
                    <button className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
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
                    <button className="mt-4 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-base flex items-center gap-2 shadow hover:bg-brand-primary hover:text-brand-white transition">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 