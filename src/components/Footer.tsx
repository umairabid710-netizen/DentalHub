"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Highlight Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-3 bg-[#0F766E]/10 text-[#0F766E] rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Certified Dental Care</h4>
              <p className="text-sm text-slate-400 mt-1">
                Accredited clinic utilizing the latest FDA-approved dental technologies.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-3 bg-[#0F766E]/10 text-[#0F766E] rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Award-Winning Experts</h4>
              <p className="text-sm text-slate-400 mt-1">
                A dedicated team of top-tier clinicians and orthodontists.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-3 bg-[#0F766E]/10 text-[#0F766E] rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">24/7 Dental Emergency</h4>
              <p className="text-sm text-slate-400 mt-1">
                Round-the-clock priority line for dental pain and operations.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Multi-column links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-12">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="p-2 bg-[#F0FDF4] text-[#0F766E] rounded-xl group-hover:scale-105 transition-transform duration-200">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xl tracking-tight text-white">
                  Dental<span className="text-[#0F766E]">Hub</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold -mt-1">
                  Clinic & Surgery
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing modern, pain-free dental healthcare that focuses on long-term wellness, comfort, and state-of-the-art aesthetics.
            </p>

            <div className="flex flex-col gap-3.5 text-sm text-slate-300">
              <a
                href="https://maps.google.com/?q=123+Teal+Avenue,+Suite+100,+Slate+City"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#0F766E] transition-colors"
              >
                <MapPin className="w-4.5 h-4.5 text-[#0F766E] shrink-0 mt-0.5" />
                <span>123 Teal Avenue, Suite 100, Slate City</span>
              </a>
              <a
                href="tel:+18005550199"
                className="flex items-center gap-2.5 hover:text-[#0F766E] transition-colors"
              >
                <Phone className="w-4.5 h-4.5 text-[#0F766E] shrink-0" />
                <span>(800) 555-0199</span>
              </a>
              <a
                href="mailto:care@dentalhub.com"
                className="flex items-center gap-2.5 hover:text-[#0F766E] transition-colors"
              >
                <Mail className="w-4.5 h-4.5 text-[#0F766E] shrink-0" />
                <span>care@dentalhub.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-white text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-[#0F766E]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "#about", label: "About Our Clinic" },
                { href: "#services", label: "Dental Services" },
                { href: "#reviews", label: "Patient Reviews" },
                { href: "#contact", label: "Contact Us" },
                { href: "#book", label: "Request Appointment" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:text-[#0F766E] transition-colors group text-slate-400 hover:translate-x-1 duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-bold text-white text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-[#0F766E]">
              Our Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { href: "#services", label: "Preventive Care & Cleans" },
                { href: "#services", label: "Cosmetic & Veneers" },
                { href: "#services", label: "Restorative Fillings" },
                { href: "#services", label: "Orthodontics & Invisalign" },
                { href: "#services", label: "Dental Implants" },
                { href: "#services", label: "Root Canal Therapy" },
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 hover:text-[#0F766E] transition-colors group text-slate-400 hover:translate-x-1 duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Office Hours */}
          <div>
            <h3 className="font-bold text-white text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-[#0F766E]">
              Office Hours
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-2 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400 font-medium">Monday - Friday</span>
                  <span className="text-white font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 font-medium">Saturday</span>
                  <span className="text-white font-semibold">9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                  <span className="text-rose-400 font-medium">Sunday</span>
                  <span className="text-rose-400 font-bold bg-rose-950/20 px-2 py-0.5 rounded text-xs">
                    Emergencies Only
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#0F766E] bg-[#F0FDF4]/5 px-3 py-2 border border-[#0F766E]/20 rounded-lg">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Call emergency line for Sunday appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 mt-4 border-t border-slate-800/80 text-xs text-slate-500">
          <div>
            <p>© {currentYear} DentalHub. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="#map" className="hover:text-slate-300 transition-colors">
              Site Map
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
              { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
              { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
              { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 border border-slate-800 hover:border-[#0F766E] hover:text-[#0F766E] text-slate-400 rounded-lg transition-all duration-200"
                aria-label={soc.label}
              >
                <soc.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
