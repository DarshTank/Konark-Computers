"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import Image from "next/image";
import { Star, Quote, Award, Users, Briefcase, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getYearsOfExperience, FOUNDING_YEAR } from "@/lib/experience";
import { getSettings } from "@/lib/db-service";

export default function AboutUs() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [tagline, setTagline] = useState("To Win Your Smile");
  const yearsExp = getYearsOfExperience();

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings.tagline) setTagline(settings.tagline);
    });
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
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <PageBanner title="About Us" />

      <section className="py-20 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4/omesh-1768586097607.png?width=8000&height=8000&resize=contain"
                  alt="Omesh Tank - Founder"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 left-4 right-4 p-4 rounded-xl bg-sky-500 text-center">
                <h4 className="text-xl font-bold text-white">Omesh Tank</h4>
                <p className="text-sm text-white/80">Founder & CEO</p>
              </div>
            </div>

              <div className="lg:pt-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
                  <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">{tagline}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Welcome to Konark Computers
                </h2>

              <div className="space-y-4 text-zinc-400 mb-8">
                <p>
                  We would like to introduce ourselves as the well-established, experienced and efficient PC integrator & Maintenance Professional. We have established in {FOUNDING_YEAR}. We have vast experience for maintaining Computer and Network for BANK, Other Corporate Client, Industrial Corporation, Hospitals and Educational Institutes & University.
                </p>
                <p>
                  We feel proud that in such work where knowledge, experience and Rapid Complaint Response are most important, we didn&apos;t give them a single opportunity to say any word of complain.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 border-l-4 border-l-sky-500">
                <p className="text-zinc-300 italic">- Omesh Tank</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center">
                        <stat.icon size={18} className="text-sky-400" />
                      </div>
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-zinc-500 ml-12">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Our Services</span>
            </div>
            <p className="text-zinc-400">
              KONARK Computers offers customized service-level maintenance programs, providing full on-site maintenance agreements. As an authorized service provider for industry-leading manufacturers, KONARK provides multi-vendor support for servers, desktops, printers and networks.
            </p>
          </div>

          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <p className="text-zinc-400">
              Should a problem arise within your systems, our 24 x 365 maintenance solutions will provide the following: Certified engineers with required parts, local spare parts inventory ensuring cost savings, rapid fix and restoration of normal operations with minimal downtime and involvement by your IT staff.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <span className="text-xs font-semibold text-violet-400 tracking-wide uppercase">Kwik Konark</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              What Does Kwik Konark Provide?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-zinc-400">
              Kwik Konark provides ongoing and immediate technical support for your computer network, systematically managed by our certified IT professionals and support staff. Konark&apos;s support professionals not only take care of your company&apos;s technology on a regular basis, but also implement and maintain the strategic technology plan for your company based on your business goals and budget.
            </p>
            <p className="text-zinc-400">
              The end result of a computer maintenance plan is an office that is happy and productive with a budget line item that is predictable. Plans are customized to your company&apos;s budget, computer usage levels, number of computers, servers, how you adopt technology, and how involved you want to be with your network and budget.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <span className="text-xs font-semibold text-orange-400 tracking-wide uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              10 Reasons Every Business Needs Proactive Maintenance
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {tenReasons.map((reason, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm text-zinc-400">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">Testimonials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-zinc-500">
              Don&apos;t just take our word for it. Here&apos;s what our valued customers have to say about our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="p-8 md:p-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 relative">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-sky-500/20" />
              
              <div className="text-center relative z-10">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-lg text-zinc-300 leading-relaxed italic mb-8">
                  &ldquo;{testimonials[activeTestimonial].review}&rdquo;
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h5 className="text-lg font-semibold text-white">
                      {testimonials[activeTestimonial].name}
                    </h5>
                    <p className="text-sm text-sky-400">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: activeTestimonial === index ? 32 : 8,
                  backgroundColor: activeTestimonial === index ? '#0ea5e9' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeTestimonial === index 
                    ? 'bg-zinc-800 border border-sky-500/30' 
                    : 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <h5 className="text-sm font-semibold text-white truncate">
                      {testimonial.name}
                    </h5>
                    <p className="text-xs text-sky-400 mb-2">
                      {testimonial.company}
                    </p>
                    <p className="text-xs text-zinc-500 line-clamp-2">
                      {testimonial.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-10">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/icons/kon-1.gif"
              alt="ThreeBest Rated"
              width={150}
              height={80}
              className="rounded-lg"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/MSME-e1452579997430-20.png"
              alt="MSME Certified"
              width={180}
              height={70}
              className="bg-white p-2 rounded-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
