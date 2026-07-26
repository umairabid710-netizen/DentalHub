"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Check,
  Calendar,
  X,
  Eye
} from "lucide-react";
import Link from "next/link";

const DOCTORS = [
  {
    name: "Dr. Clara Vance, DDS",
    role: "Lead Orthodontist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    bio: "Dr. Vance is a board-certified Orthodontist with over 12 years of experience. She specializes in Invisalign clear aligners and modern invisible braces. Graduated from Harvard School of Dental Medicine.",
    qualifications: ["DDS, Harvard Dental School", "Board Certified Orthodontist", "Elite Invisalign Gold Provider"]
  },
  {
    name: "Dr. Marcus Thorne, DMD",
    role: "Oral Implantologist & Surgeon",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    bio: "Dr. Thorne specializes in micro-surgical implant placement and complex bone grafting. He is dedicated to providing completely pain-free surgical restorations using computer-guided surgery models.",
    qualifications: ["DMD, Penn Dental Medicine", "Fellowship in Oral Implantology", "15+ Years Implant Surgery Experience"]
  },
  {
    name: "Dr. Sarah Jenkins, RDH",
    role: "Cosmetic Dentist & Hygiene Specialist",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=400&auto=format&fit=crop",
    bio: "Dr. Jenkins focuses on aesthetic smiles, porcelain veneers, and cosmetic teeth whitening. Her gentle clinical approach has cured hundreds of patients of their dental anxieties.",
    qualifications: ["DDS, Columbia Dental Medicine", "AACD Active Member", "Specialist in Pain-Free Local Sedation"]
  }
];

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800",
    title: "Reception & Welcoming Lounge"
  },
  {
    url: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=800",
    title: "State-of-the-Art Surgery Room"
  },
  {
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800",
    title: "Digital 3D Diagnostic Lab"
  },
  {
    url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=800",
    title: "Private Consultation Suite"
  }
];

const STANDARDS = [
  {
    title: "HEPA 13 Medical Air Filtration",
    desc: "Every clinic room features custom positive-pressure ventilation circulating fresh medical-grade filtered air every 6 minutes."
  },
  {
    title: "Class B Autoclave Sterilization",
    desc: "All instruments undergo rigorous pre-vacuum Class B autoclave steam sterilizing before double-sealing."
  },
  {
    title: "Low-Radiation Digital Scans",
    desc: "Our digital X-rays and 3D CBCT scans operate at up to 90% lower radiation compared to traditional dental films."
  },
  {
    title: "Disposable Single-Use Barriers",
    desc: "Protective film barriers on chairs, controls, and handles are stripped and completely replaced after every single consultation."
  }
];

export default function AboutPage() {
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string } | null>(null);

  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F0FDF4] bg-[#0F766E]/40 px-3.5 py-1.5 rounded-full">
            Our Clinic Credential
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-4 tracking-tight">
            Meet the DentalHub Team
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Learn about our world-class medical specialists, hygiene standards, and tour our state-of-the-art facilities.
          </p>
        </div>
      </section>

      {/* 2. Doctor Profiles Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-full">
            Medical Staff
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mt-4">
            Board-Certified Dental Specialists
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Our clinicians participate in continuous international training programs to offer you the latest advancements in dentistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {DOCTORS.map((doc, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Doctor Headshot */}
                <div className="relative w-full aspect-[4/5] bg-slate-200">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover hover:scale-102 transition-transform duration-500"
                  />
                  {/* Overlay Specialty Badge */}
                  <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[#0F766E] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-slate-100">
                    {doc.role}
                  </span>
                </div>

                {/* Info */}
                <div className="p-8">
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">{doc.name}</h3>
                  <p className="text-xs text-slate-400 font-bold mb-4 uppercase tracking-wider">{doc.role}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {doc.bio}
                  </p>

                  <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-3">Qualifications</h4>
                  <ul className="flex flex-col gap-2">
                    {doc.qualifications.map((qual, qIdx) => (
                      <li key={qIdx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Check className="w-4 h-4 text-[#0F766E] shrink-0" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA footer */}
              <div className="p-8 pt-0 mt-4">
                <Link
                  href="/book"
                  className="w-full flex justify-center items-center gap-2 px-5 py-3 border border-slate-200 hover:border-[#0F766E] hover:bg-[#F0FDF4]/35 text-[#0F172A] rounded-xl text-sm font-bold transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#0F766E]" />
                  <span>Book with {doc.name.split(",")[0]}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Gallery Virtual Tour */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-full">
              Virtual Tour
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] mt-4 mb-4">
              Explore Our State-of-the-Art Clinic
            </h2>
            <p className="text-sm text-slate-500">
              Click any photo to open the interactive high-definition viewer. Take a digital walk around our hygienic lounge and surgery rooms.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg(img)}
                className="group relative aspect-video rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-slate-200 cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay filter */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/90 rounded-full text-[#0F766E] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                
                {/* Title badge bottom */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-center">
                  <span className="text-xs font-bold text-slate-800">{img.title}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Hygiene & Safety Standards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-full mb-4">
              Clinical Quality
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] leading-tight mb-6">
              Our Uncompromised Hygiene & Safety Protocol
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              We align with strict ADA (American Dental Association) and CDC standards. Your biological safety is our highest priority.
            </p>
            
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#F0FDF4] border border-[#0F766E]/20">
              <ShieldCheck className="w-8 h-8 text-[#0F766E] shrink-0" />
              <div>
                <h4 className="font-extrabold text-[#0F172A] text-sm">Class A Hospital Rating</h4>
                <p className="text-xs text-slate-600 mt-0.5">Complies fully with standard dental biosafety directives.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STANDARDS.map((std, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
                <div className="h-2.5 w-2.5 bg-[#0F766E] rounded-full mb-4"></div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2">{std.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-fade-in p-2">
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Image */}
            <div className="relative aspect-video w-full bg-slate-100 rounded-2xl overflow-hidden">
              <Image
                src={lightboxImg.url}
                alt={lightboxImg.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Title Bar */}
            <div className="p-5 text-center">
              <h3 className="font-extrabold text-slate-900 text-base">{lightboxImg.title}</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">DentalHub Clinic & Surgery Facilities</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
