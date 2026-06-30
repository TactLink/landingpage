import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/aaf2026",
          destination: `${process.env.AAF_ZONE_URL}/aaf2026`,
        },
        {
          source: "/aaf2026/:path*",
          destination: `${process.env.AAF_ZONE_URL}/aaf2026/:path*`,
        },
        {
          source: "/festivalcisadane",
          destination: `${process.env.CISADANE_ZONE_URL}/festivalcisadane`,
        },
        {
          source: "/festivalcisadane/:path*",
          destination: `${process.env.CISADANE_ZONE_URL}/festivalcisadane/:path*`,
        },
        {
          source: "/links",
          destination: `${process.env.LINKS_ZONE_URL}/links`,
        },
        {
          source: "/links/:path*",
          destination: `${process.env.LINKS_ZONE_URL}/links/:path*`,
        },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
