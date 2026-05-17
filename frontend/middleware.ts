import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/navigation";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
