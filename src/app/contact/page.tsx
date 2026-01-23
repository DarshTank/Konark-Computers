"use client";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PageBanner from "@/components/sections/page-banner";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { addInquiry } from "@/lib/db-service";

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
      color: "sky",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 942 642 9416",
      href: "tel:+919426429416",
      color: "emerald",
    },
    {
      icon: Mail,
      title: "Email",
      content: "omesh_tank@yahoo.com",
      href: "mailto:omesh_tank@yahoo.com",
      color: "violet",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sat: 09:00AM - 09:00PM",
      href: null,
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      sky: { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400" },
      emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
      violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400" },
      orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
    };
    return colors[color] || colors.sky;
  };

  return (
    <main className="min-h-screen w-full bg-[#030712]">
      <Header />
      <PageBanner title="Contact Us" />

      <section className="py-20 bg-[#030712]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const colors = getColorClasses(info.color);
              const Content = (
                <div className={`p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all h-full group`}>
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4`}>
                    <info.icon size={22} className={colors.text} />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {info.title}
                  </h4>
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
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
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
                <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">Get In Touch</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-zinc-500 mb-8">
                Have a question or need a quote? Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:border-sky-500 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-zinc-900">Select Subject</option>
                    <option value="repair" className="bg-zinc-900">Computer Repair</option>
                    <option value="networking" className="bg-zinc-900">Networking</option>
                    <option value="products" className="bg-zinc-900">Products Inquiry</option>
                    <option value="consultation" className="bg-zinc-900">IT Consultation</option>
                    <option value="other" className="bg-zinc-900">Other</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-sky-500 focus:outline-none transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            </div>

            <div className="rounded-2xl overflow-hidden border border-zinc-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6673399999997!2d70.78!3d22.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1021cf8e5b5f7361!2sKonark%20Computers!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Konark Computers Location"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sky-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Need Immediate Assistance?
              </h3>
              <p className="text-white/80">
                Call us now for quick support and service
              </p>
            </div>
            <a
              href="tel:+919426429416"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl hover:bg-zinc-100 transition-all"
            >
              <Phone size={20} />
              +91 942 642 9416
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
