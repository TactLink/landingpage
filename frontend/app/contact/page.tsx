import Image from "next/image";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, LifeBuoy, Newspaper, MessageCircle, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | TactLink",
  description: "Have questions or want to partner with us? Get in touch with the TactLink team. We're here to help you revolutionize your professional networking.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-gray-50 text-brand-primary pt-20">
      {/* Full-bleed map image at the top with overlay and hero text */}
      <div className="relative w-full h-[300px] md:h-[450px] mb-12 z-10 overflow-hidden">
        <Image
          src="/map.png"
          alt="TactLink Map"
          layout="fill"
          objectFit="cover"
          className="rounded-none object-center"
          priority
        />
        {/* Deep blue overlay for text readability */}
        <div className="absolute inset-0 bg-brand-primary/85" />
        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <h1 className="font-extrabold mb-4 text-4xl md:text-6xl text-white text-center">
            Let's connect
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/90 text-center font-medium">
            Ready to upgrade your association's network, or just have a question? <br className="hidden md:block"/>
            We're here to help you grow across Southeast Asia.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Smart Partnership Form */}
        <div className="flex-1 lg:max-w-2xl flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold text-brand-primary mb-2">Partner with TactLink</h2>
            <p className="text-gray-600 mb-6">
              Looking to implement TactLink for your association or enterprise? Fill out the form below and we'll route your inquiry directly to our regional business development team.
            </p>
          </div>

          <form className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50 transition-all" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="association" className="text-sm font-semibold text-gray-700">Association / Company</label>
                <input type="text" id="association" placeholder="Your Organization Name" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50 transition-all" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50 transition-all" required />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="text-sm font-semibold text-gray-700">Region / Country</label>
                <select id="country" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50 transition-all appearance-none cursor-pointer" required>
                  <option value="" disabled selected>Select your region</option>
                  <option value="singapore">Singapore 🇸🇬</option>
                  <option value="thailand">Thailand 🇹🇭</option>
                  <option value="cambodia">Cambodia 🇰🇭</option>
                  <option value="malaysia">Malaysia 🇲🇾</option>
                  <option value="indonesia">Indonesia 🇮🇩</option>
                  <option value="other">Other Global</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-gray-700">How can we help you?</label>
              <textarea id="message" rows={4} placeholder="Tell us a bit about your network size and current challenges..." className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary bg-gray-50 transition-all resize-none" required></textarea>
            </div>

            <button type="submit" className="mt-2 bg-brand-primary hover:bg-[#2a3068] text-white font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md">
              Send Message <Send size={18} />
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">By submitting this form, you agree to our Privacy Policy.</p>
          </form>
        </div>

        {/* Right Column: Other Inquiries & Global Offices */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* Other Inquiries */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-brand-primary">Other Inquiries</h2>
            <div className="flex flex-col gap-3">
              <a href="mailto:support@tactlink.com" className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-primary/30 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                  <LifeBuoy size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-primary mb-0.5">App Support</h3>
                  <p className="text-gray-500 text-sm">Facing issues with the mobile app? We can help.</p>
                </div>
              </a>

              <a href="mailto:press@tactlink.com" className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-primary/30 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                  <Newspaper size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-primary mb-0.5">Press & Media</h3>
                  <p className="text-gray-500 text-sm">Story angles, media assets, and PR.</p>
                </div>
              </a>

               <a href="mailto:info@tactlink.com" className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-primary/30 transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-primary mb-0.5">General Questions</h3>
                  <p className="text-gray-500 text-sm">Anything else you'd like to know.</p>
                </div>
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          {/* Global Offices */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-brand-primary">Global Offices</h2>
            
            {/* HQ Contact */}
            <div className="bg-brand-primary rounded-xl p-6 shadow-md text-white relative overflow-hidden group">
              <div className="absolute right-[-10px] top-[-10px] opacity-10 group-hover:scale-110 transition-transform pointer-events-none">
                <MapPin size={100} />
              </div>
              <h3 className="font-bold text-xl mb-4 relative z-10 flex items-center gap-2">
                Headquarters <span className="text-brand-light font-medium text-sm">Singapore</span>
              </h3>
              
              <div className="flex flex-col gap-3 relative z-10 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 opacity-80 shrink-0" size={16} />
                  <a href="mailto:info@tactlink.com" className="hover:underline">info@tactlink.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 opacity-80 shrink-0" size={16} />
                  <a href="tel:+6587141991" className="hover:underline">+65 87141991</a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 opacity-80 shrink-0" size={20} />
                  <span>14 Arumugam Road, #03-06<br/>LTC Building C<br/>Singapore 409959</span>
                </div>
              </div>
            </div>

            {/* Regional Contacts Compact */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="text-xl shrink-0">🇹🇭</div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-brand-primary">Thailand</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="text-xl shrink-0">🇰🇭</div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-brand-primary">Cambodia</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="text-xl shrink-0">🇲🇾</div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-brand-primary">Malaysia</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="text-xl shrink-0">🇮🇩</div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-brand-primary">Indonesia</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}