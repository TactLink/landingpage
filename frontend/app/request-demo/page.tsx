"use client";
import { useState } from "react";

export default function RequestDemoPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    role: "",
    memberSize: "",
    country: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch('http://localhost:1337/api/demo-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: form }), // wrap form in data
    });
    if (res.ok) setStatus("Request sent!");
    else setStatus("Error sending request.");
  };

  return (
    <main className="w-full min-h-screen px-0 py-0 bg-white text-brand-primary">
      <section className="mb-20">
        <h1 className="text-4xl font-extrabold text-center text-tactlink-primary mb-12 tracking-tight">Request a Demo</h1>
        <div className="bg-tactlink-light rounded-2xl shadow-lg p-10 flex flex-col items-center">
          <form className="w-full flex flex-col gap-6 max-w-md mx-auto" onSubmit={handleSubmit}>
            <input className="border rounded px-4 py-3 text-lg" name="name" placeholder="Name" required onChange={handleChange} />
            <input className="border rounded px-4 py-3 text-lg" name="phone" placeholder="Phone Number" required onChange={handleChange} />
            <input className="border rounded px-4 py-3 text-lg" name="email" placeholder="Email" type="email" required onChange={handleChange} />
            <input className="border rounded px-4 py-3 text-lg" name="organization" placeholder="Organization Name" required onChange={handleChange} />
            <input className="border rounded px-4 py-3 text-lg" name="role" placeholder="Role" required onChange={handleChange} />
            <input className="border rounded px-4 py-3 text-lg" name="memberSize" placeholder="Member Size" required onChange={handleChange} />
            <select className="border rounded px-4 py-3 text-lg" name="country" required onChange={handleChange}>
              <option value="">Select Country</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Singapore">Singapore</option>
            </select>
            <button type="submit" className="bg-tactlink-primary text-tactlink-white px-6 py-3 rounded hover:bg-tactlink-accent hover:text-tactlink-dark transition font-bold text-lg mt-2">Submit</button>
            <div>{status}</div>
          </form>
        </div>
      </section>
    </main>
  );
} 