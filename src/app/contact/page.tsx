"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldAlert,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-50">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F0FDF4] bg-[#0F766E]/40 px-3.5 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-4 tracking-tight">
            Contact & Location Details
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Reach out to our patient care desk for queries, custom quotes, billing coordination, or directions.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Map and Contact Info */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Clinic Coordinates</h2>
              
              <div className="flex flex-col gap-5 text-sm text-slate-600">
                <a
                  href="https://maps.google.com/?q=123+Teal+Avenue,+Suite+100,+Slate+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 hover:text-[#0F766E] transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Physical Address</span>
                    <span>123 Teal Avenue, Suite 100, Slate City</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase group-hover:text-[#0F766E] mt-1.5">
                      <span>Open Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Working Hours</span>
                    <span>Monday - Friday: 8:00 AM - 6:00 PM</span>
                    <span className="block mt-0.5">Saturday: 9:00 AM - 3:00 PM</span>
                    <span className="block text-rose-500 font-semibold mt-1">Sunday: Emergency Cases Only</span>
                  </div>
                </div>

                <a
                  href="tel:+18005550199"
                  className="flex items-start gap-3.5 hover:text-[#0F766E] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Clinic Phone</span>
                    <span>(800) 555-0199</span>
                  </div>
                </a>

                <a
                  href="mailto:care@dentalhub.com"
                  className="flex items-start gap-3.5 hover:text-[#0F766E] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Support Email</span>
                    <span>care@dentalhub.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-sm relative bg-slate-200">
              <iframe
                title="DentalHub Clinic Street Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4283995819777!2d-73.98741368459385!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f97bdb102b%3A0xe5295c808b261273!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1655000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Send Us a Quick Message</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="cname" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Your Full Name *
                </label>
                <input
                  id="cname"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="cemail" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Email Address *
                </label>
                <input
                  id="cemail"
                  type="email"
                  required
                  placeholder="jane@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="csubject" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Subject / Topic
                </label>
                <input
                  id="csubject"
                  type="text"
                  placeholder="e.g. Insurance coordination, veneers price quote"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="cmessage" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Message *
                </label>
                <textarea
                  id="cmessage"
                  rows={5}
                  required
                  placeholder="Describe your inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-4 bg-[#0F766E] hover:bg-[#0D6962] text-white font-bold rounded-xl text-base shadow-sm transition-all flex justify-center items-center gap-2 cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
                <span>Submit Inquiry Details</span>
              </button>
            </form>

            {/* Submission feedback */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center animate-fade-in z-10">
                <div className="p-4 bg-[#F0FDF4] text-[#0F766E] rounded-full mb-4">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">Message Sent!</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-sm leading-relaxed">
                  Thank you, {formData.name}. Your inquiry regarding &ldquo;{formData.subject || "General Inquiry"}&rdquo; has been submitted. A patient care representative will reply to <strong>{formData.email}</strong> shortly.
                </p>
                <span className="text-[10px] uppercase tracking-wider text-[#0F766E] font-bold mt-8 animate-pulse">
                  Returning to form in a few seconds...
                </span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Emergency Callout Banner */}
      <section className="bg-rose-50 border-t border-rose-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
              <div className="p-4 bg-rose-100 text-rose-800 rounded-2xl">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Are You in Pain? Contact Our Emergency Line!
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Available same-day for wisdom extractions, pulp infections, swelling, or trauma.
                </p>
              </div>
            </div>
            <a
              href="tel:+18005550199"
              className="flex justify-center items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-base font-bold shadow-md shadow-rose-900/10 transition-all hover:scale-102"
            >
              <Phone className="w-5 h-5" />
              <span>Call Emergency Line: (800) 555-0199</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
