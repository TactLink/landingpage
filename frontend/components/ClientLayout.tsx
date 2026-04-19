"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CountryDetectBanner from "./CountryDetectBanner";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <CountryDetectBanner />
    </>
  );
} 