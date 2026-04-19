"use client";
import { useState, useEffect } from "react";
import { STRAPI_URL } from "../../lib/strapi";

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
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/countries?sort=order:asc,name:asc&filters[publishedAt][$notNull]=true`)
      .then((r) => r.json())
      .then((json) => {
        const names = (json.data ?? []).map((c: { attributes: { name: string } }) => c.attributes.name);
        setCountries(names);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch(`${STRAPI_URL}/api/demo-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: form }),
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
            <select className="border rounded px-4 py-3 text-lg" name="country" required onChange={handleChange} value={form.country}>
              <option value="">Select Country</option>
              {countries.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <button type="submit" className="bg-tactlink-primary text-tactlink-white px-6 py-3 rounded hover:bg-tactlink-accent hover:text-tactlink-dark transition font-bold text-lg mt-2">Submit</button>
            <div>{status}</div>
          </form>
        </div>
      </section>
    </main>
  );
}
