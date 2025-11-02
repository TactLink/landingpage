import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | TactLink",
  description: "Have questions or want to partner with us? Get in touch with the TactLink team. We're here to help you revolutionize your professional networking.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen px-0 py-0 bg-white text-brand-primary">
      {/* Full-bleed map image at the top with overlay and hero text */}
      <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 h-[240px] md:h-[600px] mb-4 z-10 overflow-hidden mt-0 pt-0">
        <Image
          src="/map.png"
          alt="TactLink Map"
          layout="fill"
          objectFit="contain"
          className="rounded-none"
          priority
        />
        {/* Blue overlay as gradient: 0% at top to 100% at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#37408500] to-[#374085]" />
        {/* Hero text over the map, always fills the map height */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 py-6">
          <h1 className="font-extrabold mb-2 md:mb-4 leading-tight text-[28px] md:text-[70px] text-white text-center drop-shadow-lg">Contact Us</h1>
          <p className="mb-2 md:mb-8 max-w-2xl text-[12px] md:text-[16px] text-white text-center drop-shadow">Reach out to our team for support, partnership, or general inquiries. We're here to help you connect and grow across Southeast Asia.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:gap-8 mt-8 pb-16">
        {/* HQ contact */}
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-3">
          <span className="font-bold text-xl text-brand-primary">Headquarter (Singapore)</span>
          <span>Email: info@tactlink.com</span>
          <span>Tel: +65 87141991</span>
          <span>Address: 14 Arumugam Road, #03-06 LTC Building C, Singapore 409959</span>
        </div>
        {/* Country contacts label */}
        <div className="font-bold text-lg text-brand-primary mt-8 mb-1">Country Contacts</div>
        {/* Country contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-light rounded-xl p-6 shadow flex flex-col gap-2">
            <span className="font-bold text-lg text-brand-primary">Thailand</span>
            <span>Email: info.thailand@tactlink.com</span>
          </div>
          <div className="bg-brand-light rounded-xl p-6 shadow flex flex-col gap-2">
            <span className="font-bold text-lg text-brand-primary">Cambodia</span>
            <span>Email: info.cambodia@tactlink.com</span>
          </div>
          <div className="bg-brand-light rounded-xl p-6 shadow flex flex-col gap-2">
            <span className="font-bold text-lg text-brand-primary">Malaysia</span>
            <span>Email: info.malaysia@tactlink.com</span>
          </div>
          <div className="bg-brand-light rounded-xl p-6 shadow flex flex-col gap-2">
            <span className="font-bold text-lg text-brand-primary">Indonesia</span>
            <span>Email: infoindonesia@tactlink.com</span>
          </div>
        </div>
      </div>
    </main>
  );
} 