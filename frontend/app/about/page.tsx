import { useTranslation } from 'next-i18next';

export default function AboutPage() {
  const { t } = useTranslation('common');
  return (
    <main className="w-full min-h-screen px-0 py-0 bg-white text-brand-primary">
      <h1 className="text-4xl font-extrabold text-center text-tactlink-primary mb-12 tracking-tight">{t('about')}</h1>
      <section className="mb-20">
        <div className="max-w-3xl mx-auto bg-tactlink-light rounded-2xl shadow-lg p-10 flex flex-col items-center mb-16">
          <h2 className="text-2xl font-bold text-tactlink-primary mb-4 text-center">Our Story</h2>
          <p className="text-lg text-center text-tactlink-dark max-w-2xl">[Company story from Strapi will appear here]</p>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-tactlink-primary mb-4 text-center">Our Team</h2>
          <div className="flex flex-col items-center gap-8 mt-6 w-full">
            {/* Team faces from Strapi will appear here */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-3" />
              <div className="font-semibold text-lg">[Name]</div>
              <div className="text-sm text-gray-500">[Role]</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 