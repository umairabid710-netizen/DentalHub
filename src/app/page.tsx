"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Calendar,
  ShieldCheck,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Heart,
  ChevronRight,
  Star,
  Eye,
  Check,
  TrendingUp
} from "lucide-react";

const SERVICES = [
  {
    title: "Teeth Whitening",
    icon: Sparkles,
    desc: "Achieve a dazzling smile that is up to 8 shades lighter with our advanced clinical in-chair laser bleaching.",
    price: "From $250",
    href: "/services#whitening"
  },
  {
    title: "Dental Implants",
    icon: Heart,
    desc: "Permanent titanium implants that look, feel, and function exactly like natural teeth for lifelong comfort.",
    price: "From $1,500",
    href: "/services#implants"
  },
  {
    title: "Invisalign",
    icon: ShieldCheck,
    desc: "Straighten your teeth invisibly and comfortably without the metal wires, brackets, or dietary restrictions.",
    price: "From $2,800",
    href: "/services#invisalign"
  },
  {
    title: "Root Canal Therapy",
    icon: Clock,
    desc: "Microscope-guided, 100% painless therapy to preserve your natural tooth structure and eliminate infection.",
    price: "From $490",
    href: "/services#rootcanal"
  },
  {
    title: "Emergency Care",
    icon: ShieldAlert,
    desc: "Dedicated daily priority slots for immediate pain relief, wisdom teeth, broken fillings, or tooth extractions.",
    price: "Immediate Slot",
    href: "/services#emergency"
  }
];

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    role: "Invisalign Patient",
    rating: 5,
    comment: "The team at DentalHub is outstanding! My Invisalign process was smooth, and the results are better than I ever imagined. The environment feels more like a spa than a dentist's office."
  },
  {
    name: "David Chen",
    role: "Cosmetic Restoration",
    rating: 5,
    comment: "I had two porcelain veneers placed, and they look completely natural. The dentist took so much care matching the color and shape. Highly recommend for any cosmetic work!"
  },
  {
    name: "Elena Rostova",
    role: "Emergency Treatment",
    rating: 5,
    comment: "Had severe toothache on a Saturday night. They scheduled me Sunday morning and relieved the pain immediately. Truly lifesavers!"
  }
];

const FAQS = [
  {
    q: "Are you accepting new patients?",
    a: "Yes! We are always happy to welcome new patients of all ages. We offer comprehensive initial examinations and customized treatment planning."
  },
  {
    q: "Do you accept dental insurance?",
    a: "We work with almost all major dental insurance providers and submit claims directly on your behalf to minimize out-of-pocket costs."
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call us immediately at (800) 555-0199. We reserve daily emergency slots for immediate treatment, including on weekends."
  }
];

export default function Home() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F0FDF4] via-white to-white pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Floating Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-teal-200 text-[#0F766E] rounded-full text-xs font-bold shadow-sm mb-6 animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-[#0F766E] animate-pulse"></span>
                <Star className="w-3.5 h-3.5 fill-[#0F766E] text-[#0F766E]" />
                <span>#1 Rated Dental Clinic in Slate City</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-none mb-6">
                A Premium Smile <br className="hidden sm:inline" />
                Deserves <span className="text-[#0F766E] bg-gradient-to-r from-[#0F766E] to-[#1E3A8A] bg-clip-text text-transparent">World-Class</span> Care.
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Experience anxiety-free, state-of-the-art dental clinical treatments inside our boutique clinic. Led by board-certified doctors dedicated to aesthetic brilliance and patient comfort.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/book"
                  className="flex justify-center items-center gap-2 px-8 py-4 bg-[#0F766E] hover:bg-[#0D6962] text-white rounded-2xl text-base font-bold transition-all duration-200 shadow-md shadow-teal-900/10 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </Link>
                
                <a
                  href="tel:+18005550199"
                  className="flex justify-center items-center gap-2 px-8 py-4 border-2 border-[#0F172A] hover:bg-slate-50 text-[#0F172A] rounded-2xl text-base font-bold transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call (800) 555-0199</span>
                </a>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-12 pt-8 border-t border-slate-100 w-full">
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0F172A]">15k+</span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Happy Patients</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0F172A]">99.8%</span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Success Rate</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0F172A]">25+</span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Awards Won</span>
                </div>
              </div>
            </div>

            {/* Right Media Graphic */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/dental_office.png"
                  alt="Modern DentalHub Clinic Interior"
                  fill
                  priority
                  className="object-cover hover:scale-102 transition-transform duration-700 ease-out"
                />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className="p-2.5 bg-[#F0FDF4] text-[#0F766E] rounded-xl shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F172A]">100% Pain-Free Guarantee</h4>
                    <p className="text-xs text-slate-500">Advanced local anesthesia & sedation methods</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Before & After Slider Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Description Column */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-full mb-4">
                Smile Makeovers
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-6">
                Interactive Before & After Makeover Gallery
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Slide the handle on the smile image to see the incredible transformation results our orthodontics and whitening experts can deliver. Real results from real patients.
              </p>
              
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="p-2 bg-[#F0FDF4] rounded-lg text-[#0F766E]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm">Professional scaling & plaque extraction</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="p-2 bg-[#F0FDF4] rounded-lg text-[#0F766E]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm">Full crown and veneer alignment correction</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="p-2 bg-[#F0FDF4] rounded-lg text-[#0F766E]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm">In-chair laser brightening up to 8 shades lighter</span>
                </div>
              </div>
              
              <Link
                href="/book"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl transition-all shadow-sm"
              >
                <span>Request Your Makeover Consult</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Interactive Slider Column */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-xl aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white select-none">
                
                {/* Before Image (Bottom Layer) */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop"
                    alt="Dental teeth stained before restoration"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  {/* Before Label Badge */}
                  <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                    Before Treatment
                  </span>
                </div>

                {/* After Image (Top Layer, clipped) */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
                    alt="Dental teeth whitened and aligned after restoration"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  {/* After Label Badge */}
                  <span className="absolute bottom-4 right-4 bg-[#0F766E]/95 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg z-10">
                    After Makeover
                  </span>
                </div>

                {/* Slider bar & drag handle overlay */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#0F766E] border-2 border-white rounded-full flex items-center justify-center shadow-2xl text-white">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* HTML range slider for interactive input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Before and after teeth restoration slider"
                />

              </div>
              <p className="text-xs text-slate-400 font-semibold mt-4 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Drag the visual slider left and right to inspect comparison details</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Grid Section */}
      <section id="services" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-full">
              Our Specialties
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-4 mb-4">
              Premium Dental Services Tailored for You
            </h2>
            <p className="text-base text-slate-500">
              We cover all dental categories utilizing state-of-the-art diagnostic imaging and modern clinical methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((serv, idx) => {
              const IconComp = serv.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col justify-between p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="p-3.5 bg-[#F0FDF4] text-[#0F766E] rounded-2xl w-fit group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-6 mb-3">{serv.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{serv.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-50">
                    <span className="text-sm font-bold text-[#0F766E]">{serv.price}</span>
                    <Link
                      href={`/services#${serv.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "")}`}
                      className="flex items-center gap-1 text-xs font-bold text-[#0F172A] hover:text-[#0F766E] transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4.5 h-4.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Emergency Banner CTA Section */}
      <section className="bg-rose-50 border-y border-rose-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
              <div className="p-4 bg-rose-100 text-rose-800 rounded-2xl">
                <ShieldAlert className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Experiencing Severe Tooth Pain or Trauma?
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  We guarantee same-day emergency slots for pain relief, extractions, and broken teeth.
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

      {/* 5. Patient Reviews (Testimonials) */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-4 mb-4">
              What Our Beautiful Patients Say
            </h2>
            <p className="text-sm text-slate-500">
              Read honest stories from our clients who achieved their dream smiles at our practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3.5 mt-8 pt-4 border-t border-slate-200/50">
                  <div className="w-10 h-10 bg-[#F0FDF4] text-[#0F766E] font-bold rounded-full flex items-center justify-center text-sm uppercase">
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0F172A]">{rev.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Accordion FAQs Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-full">
              Faq
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left font-bold text-[#0F172A] text-sm sm:text-base hover:text-[#0F766E] transition-colors outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl text-[#0F766E]">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
