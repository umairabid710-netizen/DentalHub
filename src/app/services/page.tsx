"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Clock,
  ShieldAlert,
  DollarSign,
  Calendar,
  Activity,
  CheckCircle
} from "lucide-react";

const DETAILED_SERVICES = [
  {
    id: "whitening",
    title: "Teeth Whitening",
    tagline: "Shine Bright with Laser Precision",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600&auto=format&fit=crop",
    price: "$250 - $450",
    duration: "45 - 60 Mins",
    description: "Our in-office laser whitening uses safe, medically tested bleaching gels combined with specialized blue light technology to break down deep dental stains instantly. Get results up to 8 shades lighter in just one session.",
    symptoms: ["Yellowing teeth", "Coffee/Tea/Wine stains", "Tobacco discoloration", "Dull smile"],
    steps: [
      "Preparation: Gums are fully shielded with barrier protective gel.",
      "Application: High-grade hydrogen peroxide bleaching paste is applied.",
      "Activation: Advanced blue laser light accelerates the chemical whitening.",
      "Rinse & Seal: Finished with a fluoride varnish to strengthen enamel."
    ]
  },
  {
    id: "implants",
    title: "Dental Implants",
    tagline: "Permanent, Lifelike Restorations",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600&auto=format&fit=crop",
    price: "$1,500 - $3,500",
    duration: "2 - 3 Sessions",
    description: "A permanent titanium root is placed into your jawbone, acting as a post for a custom porcelain crown. Implants look, feel, and function exactly like natural teeth and prevent bone recession.",
    symptoms: ["Missing teeth", "Loose dentures", "Difficulty chewing", "Bite alignment shifts"],
    steps: [
      "Consultation: 3D CBCT digital bone scanning & mapping.",
      "Implant Placement: Precise micro-surgical installation of the titanium post.",
      "Healing: Osseointegration (post fuses with jawbone over 3-6 months).",
      "Crown Attachment: Placement of a hand-crafted custom porcelain crown."
    ]
  },
  {
    id: "invisalign",
    title: "Invisalign Clear Aligners",
    tagline: "Discreet Orthodontic Straightening",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?q=80&w=600&auto=format&fit=crop",
    price: "$2,800 - $5,500",
    duration: "6 - 18 Months",
    description: "Align your teeth invisibly and comfortably using a series of custom-molded medical grade clear plastic trays. Trays are removable, meaning no dietary restrictions or difficult brushing.",
    symptoms: ["Crooked teeth", "Crowding", "Overbite/Underbite", "Gaps between teeth"],
    steps: [
      "3D Scan: iTero intraoral scanner maps out a digital model of your teeth.",
      "Custom Plan: Digitally visualize your weekly teeth shifts before starting.",
      "Trays Delivery: Receive your sequence of custom clear active aligners.",
      "Monitoring: Brief progress checkups every 6-8 weeks."
    ]
  },
  {
    id: "rootcanal",
    title: "Root Canal Therapy",
    tagline: "Painless Infection Removal",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=600&auto=format&fit=crop",
    price: "$490 - $950",
    duration: "60 - 90 Mins",
    description: "Don't let fear keep you in pain. Our microscope-guided root canal treatments clear infection from the root canals gently. We utilize specialized numbing techniques to ensure the process is completely pain-free.",
    symptoms: ["Severe throbbing pain", "Sensitivity to hot/cold", "Gum swelling", "Tooth darkening"],
    steps: [
      "Numbing: Targeted local anesthesia ensures full sensory isolation.",
      "Access: Small entry is made to expose the infected pulp chambers.",
      "Cleaning: Micro-files clean out infection, sanitized with antimicrobial wash.",
      "Sealing: Sealed with gutta-percha and reinforced with a final dental crown."
    ]
  },
  {
    id: "emergency",
    title: "Emergency Dental Care",
    tagline: "Immediate Pain Relief & Trauma Care",
    icon: ShieldAlert,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop",
    price: "$90 Consultation",
    duration: "Same-Day Appointment",
    description: "We reserve emergency slots daily for urgent patients. Whether you have severe dental pain, a knocked-out tooth, broken crown, or swelling, our doctors will diagnose and treat your issue on the same day.",
    symptoms: ["Broken/Knocked-out teeth", "Abscess or swelling", "Severe unmanageable pain", "Bleeding gums"],
    steps: [
      "Priority triage: Immediate checkup upon arrival at the clinic.",
      "Diagnosis: Urgent digital x-ray of the affected tooth.",
      "Pain Management: Fast administration of local numbing or painkillers.",
      "Treatment: Same-day repair, extraction, or temporary filling placement."
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50">
      
      {/* Top Header Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F0FDF4] bg-[#0F766E]/40 px-3.5 py-1.5 rounded-full">
            Treatment Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-4 tracking-tight">
            Specialized Dental Services Hub
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            From basic cleanings to complex implant restorations, our clinic utilizes state-of-the-art technology to provide modern, pain-free oral care.
          </p>
        </div>
      </section>

      {/* Services List Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-16">
          {DETAILED_SERVICES.map((serv, idx) => {
            const Icon = serv.icon;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={serv.id}
                id={serv.id}
                className={`bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 scroll-mt-24`}
              >
                
                {/* Visual Image Column */}
                <div className={`lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-inner ${isEven ? "lg:order-1" : "lg:order-12"}`}>
                  <Image
                    src={serv.image}
                    alt={serv.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                    <Clock className="w-3.5 h-3.5 text-[#0F766E]" />
                    <span>{serv.duration}</span>
                  </div>
                </div>

                {/* Content Details Column */}
                <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? "lg:order-12" : "lg:order-1"}`}>
                  <div>
                    {/* Header line */}
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#F0FDF4] text-[#0F766E] rounded-xl">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-[#0F172A]">{serv.title}</h2>
                        <span className="text-xs text-[#0F766E] font-semibold uppercase tracking-wider">{serv.tagline}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-500 mt-6 leading-relaxed">
                      {serv.description}
                    </p>

                    {/* Price and Duration grids */}
                    <div className="grid grid-cols-2 gap-4 my-6 py-4 border-y border-slate-100 bg-slate-50/50 px-4 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#0F766E] shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Est. Price</span>
                          <span className="text-sm font-extrabold text-slate-700">{serv.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#0F766E] shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Procedure</span>
                          <span className="text-sm font-extrabold text-slate-700">{serv.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Symptoms & Procedure details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-3">Target Symptoms</h4>
                        <ul className="flex flex-col gap-2">
                          {serv.symptoms.map((symptom, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                              <span className="h-1.5 w-1.5 bg-rose-500 rounded-full shrink-0"></span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-3">Procedure Details</h4>
                        <ul className="flex flex-col gap-2">
                          {serv.steps.slice(0, 3).map((step, stIdx) => (
                            <li key={stIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                              <span className="font-medium">{step.substring(step.indexOf(":") + 1)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>

                  {/* Booking CTA row */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-slate-400 font-semibold">
                      * Prices may vary depending on patient clinical complexity.
                    </span>
                    <Link
                      href={`/book?service=${serv.id}`}
                      className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-[#0F766E] hover:bg-[#0D6962] text-white rounded-xl text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Treatment</span>
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
