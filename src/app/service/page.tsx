"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import { Monitor, Wifi, HardDrive, Cpu, Shield, Wrench, Server, Printer, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import CtaSection from "@/components/sections/cta-section";

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
    <main className="min-h-screen w-full bg-background">
      <Header />
      <PageBanner title="Our Services" />

      <Reveal>
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">What We Offer</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Professional <span className="text-gradient">IT Solutions</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Fast and Easy online support for your computer and laptop at your doorsteps. We provide comprehensive IT solutions for all your technology needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group p-8 rounded-3xl glass-card hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={32} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-24 bg-black/40 border-y border-white/5 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">How It Works</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Service <span className="text-gradient">Process</span>
              </h2>
              <p className="text-zinc-400 text-lg">
                Easy and effective way to get your device repaired
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent dashed-line" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  { step: "01", title: "Diagnose", desc: "We thoroughly diagnose your device to identify all issues" },
                  { step: "02", title: "Quote", desc: "Get a transparent quote with no hidden charges" },
                  { step: "03", title: "Repair", desc: "Expert technicians fix your device with quality parts" },
                  { step: "04", title: "Deliver", desc: "Quick return of your fully functional device" },
                ].map((item, index) => (
                  <div key={index} className="text-center group relative">
                    <div className="relative inline-block mb-8">
                      <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mx-auto group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 relative z-10">
                        <span className="text-3xl font-bold text-zinc-600 group-hover:text-primary transition-colors">{item.step}</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <CtaSection />
      </Reveal>


      <Footer />
    </main>
  );
}
