"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { addInquiry } from "@/lib/db-service";
import { Reveal } from "@/components/Reveal";
import CtaSection from "@/components/sections/cta-section";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // 1. Send Email using EmailJS
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
         throw new Error("EmailJS configuration is missing. Please contact support.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
           name: formData.name,
           email: formData.email,
           phone: formData.phone,
           subject: formData.subject,
           message: formData.message,
        },
        publicKey
      );

      // 2. Save to Database
      await addInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'new',
        created_at: new Date().toISOString(),
      });
      
      toast.success("Email sent successfully!", {
        description: "We have received your inquiry regarding " + formData.subject + ". Our team will get back to you shortly."
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      const errorMessage = error?.message || error?.text || "Please checks your internet connection or try again later.";
      toast.error("Failed to send message", {
        description: errorMessage
      });
    } finally {
      setSending(false);
    }
  };


  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot. 360002, Gujarat India",
      href: "https://www.google.com/maps?cid=1162576568112931297",
      color: "primary",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 942 642 9416",
      href: "tel:+919426429416",
      color: "secondary",
    },
    {
      icon: Mail,
      title: "Email",
      content: "omesh_tank@yahoo.com",
      href: "mailto:omesh_tank@yahoo.com",
      color: "accent",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sat: 09:00AM - 09:00PM",
      href: null,
      color: "primary",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-background">
      <Header />
      <div className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact <span className="text-gradient">Us</span></h1>
            <p className="text-zinc-400 max-w-xl mx-auto">Get in touch with our expert team for inquiries, support, or quotes.</p>
         </div>
      </div>

      <Reveal>
        <section className="py-12 bg-background relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => {
                // const colors = getColorClasses(info.color);
                const Content = (
                  <div className={`p-6 rounded-2xl glass-card h-full group hover:bg-white/5`}>
                    <div className={`w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon size={22} className="text-primary" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {info.title}
                    </h4>
                    <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors leading-relaxed">
                      {info.content}
                    </p>
                  </div>
                );

                return info.href ? (
                  <a key={index} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {Content}
                  </a>
                ) : (
                  <div key={index}>{Content}</div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl glass border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full" />
                
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8 relative z-10 w-full block">Get In Touch</span>
                <h3 className="text-3xl font-bold text-white mb-3 relative z-10">
                  Send Us a Message
                </h3>
                <p className="text-zinc-400 mb-8 max-w-md relative z-10">
                  Have a question or need a quote? Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:border-primary/50 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:border-primary/50 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:border-primary/50 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    />
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white focus:border-primary/50 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-zinc-900 text-zinc-500">Select Subject</option>
                        <option value="repair" className="bg-zinc-900">Computer Repair</option>
                        <option value="networking" className="bg-zinc-900">Networking</option>
                        <option value="products" className="bg-zinc-900">Products Inquiry</option>
                        <option value="consultation" className="bg-zinc-900">IT Consultation</option>
                        <option value="other" className="bg-zinc-900">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:border-primary/50 focus:bg-black/60 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    {sending ? 'Sending...' : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </div>

              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6673399999997!2d70.78!3d22.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1021cf8e5b5f7361!2sKonark%20Computers!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Konark Computers Location"
                  className="grayscale-[0.5] hover:grayscale-0 contrast-125 opacity-90 hover:opacity-100 transition-all duration-700"
                />
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
