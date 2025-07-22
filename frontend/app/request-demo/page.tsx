export default function RequestDemoPage() {
  return (
    <main className="w-full min-h-screen px-0 py-0 bg-white text-brand-primary">
      <section className="mb-20">
        <h1 className="text-4xl font-extrabold text-center text-tactlink-primary mb-12 tracking-tight">Request a Demo</h1>
        <div className="bg-tactlink-light rounded-2xl shadow-lg p-10 flex flex-col items-center">
          <form className="w-full flex flex-col gap-6 max-w-md mx-auto">
            <input className="border rounded px-4 py-3 text-lg" placeholder="Name" />
            <input className="border rounded px-4 py-3 text-lg" placeholder="Email" type="email" />
            <input className="border rounded px-4 py-3 text-lg" placeholder="Company" />
            <input className="border rounded px-4 py-3 text-lg" placeholder="Country" />
            <textarea className="border rounded px-4 py-3 text-lg" placeholder="Message" rows={3} />
            <button type="submit" className="bg-tactlink-primary text-tactlink-white px-6 py-3 rounded hover:bg-tactlink-accent hover:text-tactlink-dark transition font-bold text-lg mt-2">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
} 