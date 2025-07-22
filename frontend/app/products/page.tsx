import { useTranslation } from 'next-i18next';

export default function ProductsPage() {
  const { t } = useTranslation('common');
  return (
    <main className="w-full min-h-screen px-0 py-0 bg-white text-brand-primary">
      <h1 className="text-3xl font-bold mb-6">{t('products')}</h1>
      <section className="mb-20">
        <h2 className="text-4xl font-extrabold text-center text-tactlink-primary mb-12 tracking-tight">Features</h2>
        <div className="max-w-3xl mx-auto space-y-28">
          <div className="bg-tactlink-light rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-tactlink-primary mb-2 text-center">Smart Contact Management</h3>
            <p className="text-lg text-center text-tactlink-dark">An intelligent hub for all your contacts. Instantly call, email, or message, and exchange digital business cards with ease.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-16 flex flex-col md:flex-row items-center md:gap-32">
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
              <img
                src="/feature2.png"
                alt="Association Directory"
                className="w-full h-auto object-contain rounded-3xl shadow-inner"
                style={{ boxShadow: "inset 0 4px 24px 0 rgba(0,0,0,0.10)" }}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <div className="text-[10px] uppercase tracking-widest text-brand-primary mb-1 font-semibold">Feature</div>
              <h3 className="font-bold mb-3 text-[30px] text-black">Association Directory</h3>
              <p className="mb-2 text-[16px] text-black">Admins manage members, while members connect, collaborate, and communicate within their community.</p>
              <button className="mt-2 px-4 py-2 bg-brand-accent text-brand-primary rounded-full font-bold text-xs hover:bg-brand-primary hover:text-brand-white transition">See more</button>
            </div>
          </div>
          <div className="bg-tactlink-light rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-tactlink-primary mb-2 text-center">Digital Fishbowl for Events</h3>
            <p className="text-lg text-center text-tactlink-dark">QR code registration and digital fishbowl draws for seamless event networking and meaningful connections.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-tactlink-primary mb-2 text-center">Dedicated Support</h3>
            <p className="text-lg text-center text-tactlink-dark">Expert team assists associations with onboarding, setup, and event support.</p>
          </div>
          <div className="bg-tactlink-light rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-tactlink-primary mb-2 text-center">Local Technical Support</h3>
            <p className="text-lg text-center text-tactlink-dark">Technical support teams across Southeast Asia for fast, localized assistance.</p>
          </div>
        </div>
      </section>
    </main>
  );
} 