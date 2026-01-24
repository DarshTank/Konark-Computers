"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import Image from "next/image";
import { Star, Quote, Award, Users, Briefcase, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getYearsOfExperience, FOUNDING_YEAR } from "@/lib/experience";
import { getSettings } from "@/lib/db-service";

import { Reveal } from "@/components/Reveal";

export default function AboutUs() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [tagline, setTagline] = useState("To Win Your Smile");
  const yearsExp = getYearsOfExperience();

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings.tagline) setTagline(settings.tagline);
    });
  }, []);

  // Auto-play for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 5); // 5 is testimonials.length
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Rajesh Patel",
      company: "ABC Industries",
      rating: 5,
      review: "Excellent service! Konark Computers has been maintaining our office network for over 5 years. Their response time is excellent and the technicians are very knowledgeable. Highly recommended for any business looking for reliable IT support.",
    },
    {
      name: "Priya Shah",
      company: "Shah Enterprises",
      rating: 5,
      review: "I had a critical data loss situation and Konark Computers recovered all my important files. Their data recovery service is top-notch. The team is professional and they kept me informed throughout the process.",
    },
    {
      name: "Mehul Joshi",
      company: "Joshi & Associates",
      rating: 5,
      review: "Very satisfied with their laptop repair service. My laptop was fixed within 24 hours and at a very reasonable price. The staff is friendly and explains everything clearly. Will definitely use their services again.",
    },
    {
      name: "Anita Mehta",
      company: "Mehta Hospital",
      rating: 5,
      review: "Konark Computers has been our IT partner for hospital systems maintenance. Their 24/7 support is invaluable for healthcare operations. Trustworthy and dependable service provider.",
    },
    {
      name: "Suresh Kumar",
      company: "Kumar Trading Co.",
      rating: 5,
      review: "Best computer service center in Rajkot! They upgraded our entire office with new systems and set up our network perfectly. Great value for money and excellent after-sales support.",
    },
  ];

  const tenReasons = [
    "Ensure Critical Security updates are applied monthly.",
    "Regular review and management of Firewall, virus, and spyware protection tools.",
    "Identify trends in network issues resulting from daily use of servers and workstations by office staff preventing or eliminating down-time.",
    "Data recovery readiness through backup management and data testing.",
    "Reduce or eliminate problems through server and workstation standardization.",
    "Prevent storage issues and server crashes through management of hard drive resources.",
    "Identify issues via event log analysis before they create problems.",
    "Maintain network speed and efficiency via regular server optimization.",
    "Regular maintenance for your network provides peace of mind.",
    "Predictable monthly budget and support minimizes financial and technical surprises.",
  ];

  const stats = [
    { icon: Award, value: `${yearsExp}+`, label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Briefcase, value: '10K+', label: 'Projects Done' },
    { icon: Clock, value: '24/7', label: 'Support' },
  ];

  return (
    <main className="min-h-screen w-full bg-background">
      <Header />
      <PageBanner title="About Us" />

      <Reveal>
        <section className="py-24 bg-background overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="relative group perspective-1000">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:rotate-y-2">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4/omesh-1768586097607.png?width=800&height=800&resize=contain"
                    alt="Omesh Tank - Founder"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute -bottom-6 right-6 p-6 rounded-2xl glass border border-white/20 shadow-xl backdrop-blur-md transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h4 className="text-2xl font-bold text-white mb-1">Omesh Tank</h4>
                  <p className="text-sm font-medium text-primary">Founder & CEO</p>
                </div>
              </div>

                <div className="lg:pt-8">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">{tagline}</span>

                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
                    Welcome to <span className="text-gradient">Konark Computers</span>
                  </h2>

                <div className="space-y-6 text-zinc-400 mb-10 text-lg leading-relaxed">
                  <p>
                    We would like to introduce ourselves as the well-established, experienced and efficient PC integrator & Maintenance Professional. We have established in {FOUNDING_YEAR}. We have vast experience for maintaining Computer and Network for BANK, Other Corporate Client, Industrial Corporation, Hospitals and Educational Institutes & University.
                  </p>
                  <p>
                    We feel proud that in such work where knowledge, experience and Rapid Complaint Response are most important, we didn&apos;t give them a single opportunity to say any word of complain.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-primary mb-10 italic text-zinc-300 text-lg">
                  &ldquo;Our commitment is to provide the best service possible to our clients, ensuring their technology drives their success.&rdquo;
                  <div className="mt-4 text-sm font-bold text-primary not-italic">- Omesh Tank</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <stat.icon size={20} className="text-primary" />
                        </div>
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                      </div>
                      <p className="text-xs font-medium text-zinc-500 ml-1 group-hover:text-zinc-400 transition-colors">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-20 bg-black/40 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Our Commitment</span>
              <p className="text-zinc-300 text-lg leading-relaxed">
                KONARK Computers offers customized service-level maintenance programs, providing full on-site maintenance agreements. As an authorized service provider for industry-leading manufacturers, KONARK provides multi-vendor support for servers, desktops, printers and networks.
              </p>
            </div>

            <div className="max-w-4xl mx-auto p-8 rounded-3xl glass-card border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <p className="text-zinc-300 text-lg relative z-10">
                Should a problem arise within your systems, our 24 x 365 maintenance solutions will provide the following: Certified engineers with required parts, local spare parts inventory ensuring cost savings, rapid fix and restoration of normal operations with minimal downtime and involvement by your IT staff.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Kwik Konark</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                What Does <span className="text-gradient">Kwik Konark</span> Provide?
              </h2>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-primary/30 transition-all duration-300">
                 <h3 className="text-xl font-bold text-white mb-4">Ongoing Support</h3>
                 <p className="text-zinc-400 leading-relaxed">
                   Kwik Konark provides ongoing and immediate technical support for your computer network, systematically managed by our certified IT professionals and support staff. Konark&apos;s support professionals not only take care of your company&apos;s technology on a regular basis, but also implement and maintain the strategic technology plan for your company.
                 </p>
              </div>
               <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-secondary/30 transition-all duration-300">
                 <h3 className="text-xl font-bold text-white mb-4">Predictable Results</h3>
                 <p className="text-zinc-400 leading-relaxed">
                   The end result of a computer maintenance plan is an office that is happy and productive with a budget line item that is predictable. Plans are customized to your company&apos;s budget, computer usage levels, number of computers, servers, how you adopt technology, and how involved you want to be.
                 </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-24 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                10 Reasons Every Business Needs <span className="text-gradient">Proactive Maintenance</span>
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {tenReasons.map((reason, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <p className="text-zinc-300 pt-2 leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">Testimonials</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                What Our <span className="text-gradient">Customers Say</span>
              </h2>
              <p className="text-zinc-400 text-lg">
                Don&apos;t just take our word for it. Here&apos;s what our valued customers have to say about our services.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
              <div className="p-10 md:p-14 rounded-3xl glass-card border border-white/10 relative transition-all duration-500">
                <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/10" />
                
                <div className="text-center relative z-10">
                  <div className="flex justify-center gap-1.5 mb-8">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-accent fill-accent shadow-glow" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed italic mb-10 font-light">
                    &ldquo;{testimonials[activeTestimonial].review}&rdquo;
                  </p>
                  
                  <div className="flex items-center justify-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <h5 className="text-xl font-bold text-white">
                        {testimonials[activeTestimonial].name}
                      </h5>
                      <p className="text-sm text-primary font-medium uppercase tracking-wide">
                        {testimonials[activeTestimonial].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mb-16">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeTestimonial === index 
                      ? 'w-12 bg-primary' 
                      : 'w-3 bg-zinc-700 hover:bg-zinc-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>


          </div>
        </section>
      </Reveal>

      <section className="py-20 bg-background border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src="/assets/images/threebestrated.png"
              alt="ThreeBest Rated"
              width={150}
              height={80}
              className="rounded-lg mix-blend-screen"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/MSME-e1452579997430-20.png"
              alt="MSME Certified"
              width={180}
              height={70}
              className="bg-white p-3 rounded-xl hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
