"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      association: formData.get("association"),
      email: formData.get("email"),
      country: formData.get("country"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 flex flex-col gap-6 relative overflow-hidden">
      {/* Subtle glow inside form */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 blur-[60px] rounded-full pointer-events-none" />

      {success && (
        <div className="bg-[#3edc72]/10 border border-[#3edc72]/30 text-[#3edc72] px-4 py-3 rounded-xl relative z-10 font-medium text-sm">
          Your message has been successfully sent! Our team will reach out to you shortly.
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl relative z-10 font-medium text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-white/80">Full Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" className="px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white/5 text-white placeholder-white/30 transition-all shadow-inner" required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="association" className="text-sm font-semibold text-white/80">Association / Company</label>
          <input type="text" id="association" name="association" placeholder="Your Organization Name" className="px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white/5 text-white placeholder-white/30 transition-all shadow-inner" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-white/80">Email Address</label>
          <input type="email" id="email" name="email" placeholder="john@example.com" className="px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white/5 text-white placeholder-white/30 transition-all shadow-inner" required />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="text-sm font-semibold text-white/80">Region / Country</label>
          <select id="country" name="country" className="px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white/5 text-white transition-all appearance-none cursor-pointer shadow-inner" required defaultValue="">
            <option value="" disabled className="bg-[#0f1430] text-white/50">Select your region</option>
            <option value="singapore" className="bg-[#0f1430]">Singapore</option>
            <option value="thailand" className="bg-[#0f1430]">Thailand</option>
            <option value="cambodia" className="bg-[#0f1430]">Cambodia</option>
            <option value="malaysia" className="bg-[#0f1430]">Malaysia</option>
            <option value="indonesia" className="bg-[#0f1430]">Indonesia</option>
            <option value="vietnam" className="bg-[#0f1430]">Vietnam</option>
            <option value="philippines" className="bg-[#0f1430]">Philippines</option>
            <option value="bangladesh" className="bg-[#0f1430]">Bangladesh</option>
            <option value="other" className="bg-[#0f1430]">Other Global</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        <label htmlFor="message" className="text-sm font-semibold text-white/80">How can we help you?</label>
        <textarea id="message" name="message" rows={4} placeholder="Tell us a bit about your network size and current challenges..." className="px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white/5 text-white placeholder-white/30 transition-all resize-none shadow-inner" required></textarea>
      </div>

      <button disabled={loading} type="submit" className="mt-4 bg-brand-accent hover:bg-white text-brand-primary disabled:opacity-50 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-brand-accent/20 hover:scale-[1.02] relative z-10">
        {loading ? "Sending..." : "Send Message"} {!loading && <Send size={18} className="text-brand-primary" />}
      </button>
      <p className="text-xs text-white/40 text-center mt-2 relative z-10">By submitting this form, you agree to our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.</p>
    </form>
  );
}
