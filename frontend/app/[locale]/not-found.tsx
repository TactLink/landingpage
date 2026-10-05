import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <main data-navbar-theme="dark" className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-[#1A1F4C] via-[#374085] to-[#cfa086] text-white">
      <p className="font-extrabold text-[80px] md:text-[120px] leading-none text-brand-accent">404</p>
      <h1 className="font-extrabold text-[28px] md:text-[38px] mt-4">{t("title")}</h1>
      <p className="text-white/80 mt-3 max-w-md">{t("desc")}</p>
      <Link href="/" className="mt-8 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold hover:bg-white transition-all duration-300">
        {t("backHome")}
      </Link>
    </main>
  );
}
