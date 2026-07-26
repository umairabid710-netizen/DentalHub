"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X, Heart, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#reviews", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Listen to scroll to update background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Top emergency announcement bar */}
      <div className="bg-[#0F172A] text-white py-2 px-4 text-sm font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Welcoming New Patients & Emergency Cases Same Day!</span>
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <a
              href="tel:+18005550199"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Emergency Hotline: (800) 555-0199</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3"
            : "bg-white border-b border-slate-100 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[#F0FDF4] text-[#0F766E] rounded-xl group-hover:scale-105 transition-transform duration-200">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xl tracking-tight text-[#0F172A]">
                  Dental<span className="text-[#0F766E]">Hub</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold -mt-1">
                  Clinic & Surgery
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-medium text-sm transition-colors hover:text-[#0F766E] ${
                    pathname === link.href ? "text-[#0F766E]" : "text-slate-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+18005550199"
                className="flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-50 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Emergency Call</span>
              </a>
              <Link
                href="#book"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] text-white hover:bg-[#0D6962] rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="tel:+18005550199"
                className="p-2.5 bg-rose-50 text-rose-700 rounded-xl hover:bg-rose-100 transition-colors"
                aria-label="Emergency Call"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 top-[105px] z-30 bg-slate-900 lg:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl z-40 py-6 px-4 flex flex-col gap-6 lg:hidden"
              >
                <div className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-semibold hover:bg-slate-50 transition-colors ${
                        pathname === link.href
                          ? "text-[#0F766E] bg-[#F0FDF4]"
                          : "text-slate-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <hr className="border-slate-100" />

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+18005550199"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 flex justify-center items-center gap-2 px-4 py-3.5 border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-50 rounded-xl text-base font-bold transition-all duration-200"
                  >
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span>Emergency Call</span>
                  </a>
                  <Link
                    href="#book"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 flex justify-center items-center gap-2 px-5 py-3.5 bg-[#0F766E] text-white hover:bg-[#0D6962] rounded-xl text-base font-bold transition-all duration-200 shadow-sm"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Appointment</span>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
