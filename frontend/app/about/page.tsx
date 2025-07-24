import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-white text-brand-primary">
      {/* Part 1: Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 relative overflow-hidden bg-gradient-to-b from-[#374085] to-[#cfa086]">
        {/* Decorative background shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent opacity-10 rounded-full blur-3xl z-0" />
        {/* Optional SVG for extra depth */}
        {/* <svg className="absolute inset-0 w-full h-full z-0" ... /> */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">More Than a Network. A Revolution.</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-0 drop-shadow">At TactLink, we're digitizing connection to build stronger communities, foster global collaboration, and protect our planet. We believe that every great opportunity starts with a simple, meaningful link between people.</p>
        </div>
      </section>

      {/* Part 2: Our Story Section */}
      <section className="w-full py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text Column */}
          <div className="flex-1 flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">Born From Experience, Driven by Purpose</h2>
            <p className="mb-4 text-black text-lg">Our journey began not in a boardroom, but in the bustling halls of large-scale professional events. As passionate networkers ourselves, we lived the frustration firsthand: pockets full of paper business cards, countless missed connections, and the nagging feeling that valuable business matching opportunities were slipping away.</p>
            <p className="mb-4 text-black text-lg">Traditional networking was broken. Information was static, easily lost, and failed to bridge the gap for international collaboration. We saw colleagues and friends, full of potential, unable to connect effectively simply because the tools were outdated.</p>
            <p className="mb-4 text-black text-lg">This shared frustration became our inspiration. We envisioned a world where networking was seamless, intelligent, and dynamic. That vision is TactLink—a digital solution born from a real-world need, built for a global community of forward-thinkers.</p>
          </div>
          {/* Image Column */}
          <div className="flex-1 flex justify-center items-center min-h-[300px]">
            <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] bg-gray-200 rounded-3xl flex items-center justify-center">
              {/* Image placeholder for Our Story */}
              {/* <Image src="/about-story.png" alt="Our Story" fill className="object-cover rounded-3xl" /> */}
              <span className="text-gray-400">[Image Placeholder]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Our Solution Section */}
      <section className="w-full py-20 px-4 bg-tactlink-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-primary mb-12">Intelligent Networking, Reimagined</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1 */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow p-8">
              {/* Icon placeholder */}
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-brand-accent/10 rounded-full">
                <Image src="/value1.png" alt="Internal Bonds Icon" width={100} height={100} className="object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-brand-primary">Strengthen Internal Bonds</h3>
              <p className="text-black">Our smart directory is tailor-made for professional associations and organizations, creating a vibrant, accessible internal network where members can easily find and connect with each other.</p>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow p-8">
              {/* Icon placeholder */}
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-brand-accent/10 rounded-full">
                <Image src="/value2.png" alt="Event Networking Icon" width={100} height={100} className="object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-brand-primary">Supercharge Your Events</h3>
              <p className="text-black">Transform any gathering with powerful event networking tools. Using simple QR codes, attendees can exchange information instantly, creating a dynamic and engaging experience that moves beyond the limitations of paper.</p>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow p-8">
              {/* Icon placeholder */}
              <div className="w-20
               h-20 mb-4 flex items-center justify-center bg-brand-accent/10 rounded-full">
                <Image src="/value3.png" alt="Global Collaboration Icon" width={100} height={100} className="object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-brand-primary">Unlock Global Collaboration</h3>
              <p className="text-black">Break down geographical barriers. TactLink provides the readily accessible information needed to foster crucial business connections on an international scale, ensuring no opportunity is ever lost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 4: Our Vision & Commitment Section */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-8">Networking with a Conscience</h2>
          <p className="mb-4 text-lg text-black">We believe that progress should not come at the expense of our planet. The endless cycle of printing, distributing, and discarding paper business cards contributes to deforestation—a global challenge we are committed to addressing.</p>
          <p className="mb-4 text-lg text-black">Our mission is to build connections that benefit both people and the planet. By replacing paper with a superior digital tool, we empower individuals while championing sustainability.</p>
          <p className="mb-4 text-lg text-black font-semibold">TactLink is our contribution to a better future, proudly aligning our mission with the United Nations Sustainable Development Goals (SDGs). By creating a tool that promotes responsible consumption (Goal 12), supports climate action (Goal 13), protects life on land (Goal 15), and fosters global partnerships (Goal 17), we are committed to the idea that effective networking can and should be a force for good.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mt-8 w-full max-w-lg mx-auto">
            <Image src="/sdg12.png" alt="SDG 12: Responsible Consumption and Production" width={120} height={120} />
            <Image src="/sdg13.png" alt="SDG 13: Climate Action" width={120} height={120} />
            <Image src="/sdg15.png" alt="SDG 15: Life on Land" width={120} height={120} />
            <Image src="/sdg17.png" alt="SDG 17: Partnerships for the Goals" width={120} height={120} />
          </div>
        </div>
      </section>



{/* Leadership Team Section */}
<section className="w-full bg-white py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">Meet the Leadership Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">Our leadership team combines deep industry expertise with a passion for innovation to build the future of networking and connection.</p>
          </div>
          {/* Team Member Grid */}
          <ul role="list" className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <li className="text-center">
              <Image src="/cdanny.jpg" alt="Danny Ong" width={128} height={128} className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover" />
              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">Danny Ong</h3>
              <p className="text-base leading-6 text-blue-600">CEO & Founder</p>
              <p className="mt-4 text-sm leading-6 text-gray-600">Managing Partner at GDPS International and recognized in "Successful People in Malaysia and Singapore" by British Publishing House.</p>
              
            </li>
            {/* Card 2 */}
            <li className="text-center">
              <img src="/cjeremy.jpg" alt="Jeremy Ong" className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover" />
              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">Jeremy Ong</h3>
              <p className="text-base leading-6 text-blue-600">CTO</p>
              <p className="mt-4 text-sm leading-6 text-gray-600">A Deep Learning Expert from Neura Robotics GmbH with a Ph.D. from Monash University who secured pre-seed funding from Nvidia & Cradle Fund.</p>
              
            </li>
            {/* Card 3 */}
            <li className="text-center">
              <img src="/cgoh.jpg" alt="Goh Chen Yi" className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover" />
              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">Goh Chen Yi</h3>
              <p className="text-base leading-6 text-blue-600">CFO</p>
              <p className="mt-4 text-sm leading-6 text-gray-600">Audit Partner at Thelyx and a MOF Licensed Tax Agent & Auditor holding multiple fellowships including MIA, MICPA, FCCA, and ASEAN CPA.</p>
              
            </li>
          </ul>
        </div>
      </section>
      
      {/* Part 5: Call to Action Section */}
      <section className="w-full pb-24 py-16 px-4 bg-tactlink-light ">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">Join the Movement</h2>
          <p className="mb-8 text-lg text-black">Ready to transform how you connect, collaborate, and contribute? Step into the future of networking.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="flex-1 px-6 py-3 bg-brand-accent text-brand-primary rounded-full font-bold text-lg shadow hover:bg-brand-primary hover:text-brand-white transition text-center">Explore TactLink Features</a>
            <a href="/contact" className="flex-1 px-6 py-3 border-2 border-brand-accent text-brand-accent rounded-full font-bold text-lg shadow hover:bg-brand-accent hover:text-brand-white transition text-center bg-white">Get Started Today</a>
          </div>
        </div>
      </section>

      
    </main>
  );
} 