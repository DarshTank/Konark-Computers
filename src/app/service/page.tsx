import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import { Monitor, Wifi, HardDrive, Cpu, Shield, Wrench, Server, Printer, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: Monitor,
      title: "Computer Repair",
      description: "We help to resolve all types of computer and Laptop problems and improve the speed and performance of your computer and Laptop. Our technicians provide computer support for all brands of laptops and desktops, including HP, Dell, Lenovo, Asus, Sony, Acer, Samsung and Toshiba.",
    },
    {
      icon: Wifi,
      title: "Networking",
      description: "While a wireless network helps keep your office connected, an unsecure one can leave you prone to security problems. KONARK will not only help you configure your wireless router and adapter, but we will also secure your network, and show you how to use the new network and prevent any vulnerabilities.",
    },
    {
      icon: HardDrive,
      title: "Data Recovery",
      description: "Lost important data? Our data recovery experts can help retrieve your valuable files from damaged hard drives, SSDs, USB drives, and memory cards. We use advanced tools and techniques to recover data safely.",
    },
    {
      icon: Cpu,
      title: "Hardware Upgrade",
      description: "Boost your computer's performance with our hardware upgrade services. We can upgrade RAM, hard drives to SSDs, graphics cards, and more to give your system new life and improved speed.",
    },
    {
      icon: Shield,
      title: "Virus Removal",
      description: "Critical inspection for possible defects, virus checking & system tuning & optimization. Boost speed and performance of your computer. Resolve conflicts with software and driver. Fix problems with Internet browsing and related issues.",
    },
    {
      icon: Wrench,
      title: "Laptop Repair",
      description: "Expert laptop repair services including screen replacement, keyboard repair, battery replacement, motherboard repair, and more. We service all major brands with genuine parts.",
    },
    {
      icon: Server,
      title: "Server Maintenance",
      description: "KONARK provides multi-vendor support for servers with customized service-level maintenance programs. Full on-site maintenance agreements available for businesses of all sizes.",
    },
    {
      icon: Printer,
      title: "Printer Service",
      description: "Complete printer repair and maintenance services including inkjet, laser, and multi-function printers. We also provide cartridge refilling and replacement services.",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <PageBanner title="Our Services" />

      <section className="py-20 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
              <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">What We Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Professional IT Solutions
            </h2>
            <p className="text-zinc-400">
              Fast and Easy online support for your computer and laptop at your doorsteps. We provide comprehensive IT solutions for all your technology needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-5 group-hover:bg-sky-500 transition-colors">
                  <service.icon size={28} className="text-sky-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-sky-400 transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Service Process
            </h2>
            <p className="text-zinc-400">
              Easy and effective way to get your device repaired
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Diagnose", desc: "We thoroughly diagnose your device to identify all issues" },
                { step: "02", title: "Quote", desc: "Get a transparent quote with no hidden charges" },
                { step: "03", title: "Repair", desc: "Expert technicians fix your device with quality parts" },
                { step: "04", title: "Deliver", desc: "Quick return of your fully functional device" },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto group-hover:border-sky-500/30 transition-all duration-300 group-hover:-translate-y-1">
                      <span className="text-2xl font-bold text-zinc-500 group-hover:text-sky-400 transition-colors">{item.step}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sky-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Need Help With Your Device?
              </h3>
              <p className="text-white/80">
                Contact us today for a free consultation and quote
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl hover:bg-zinc-100 transition-all"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
              <a 
                href="tel:+919426429416" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
