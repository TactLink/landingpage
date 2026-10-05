import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("namecardTitle"),
    description: t("namecardDesc"),
  };
}

export default function DigitalNamecardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
