"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Clock,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  FileText,
  AlertCircle,
  Database
} from "lucide-react";
import { saveBooking, BookingData } from "@/lib/supabase";

interface SuccessData extends BookingData {
  id?: string;
  created_at?: string;
}

const DOCTORS = [
  { id: "vance", name: "Dr. Clara Vance", specialty: "Orthodontics & Invisalign" },
  { id: "thorne", name: "Dr. Marcus Thorne", specialty: "Oral Implants & Surgery" },
  { id: "jenkins", name: "Dr. Sarah Jenkins", specialty: "Cosmetic & Hygiene" }
];

const SERVICES = [
  { id: "whitening", name: "Teeth Whitening", icon: Sparkles },
  { id: "implants", name: "Dental Implants", icon: Heart },
  { id: "invisalign", name: "Invisalign Clear Aligners", icon: ShieldCheck },
  { id: "rootcanal", name: "Root Canal Therapy", icon: Clock },
  { id: "emergency", name: "Emergency Care", icon: ShieldAlert }
];

function BookingEngine() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successInfo, setSuccessInfo] = useState<{ provider: string; data: SuccessData } | null>(null);

  // Form State
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState("");
  const [consent, setConsent] = useState(false);

  // Pre-select service from URL query param
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && SERVICES.some(s => s.id === serviceParam)) {
      setSelectedService(serviceParam);
    }
  }, [searchParams]);

  // Navigate Steps
  const nextStep = () => {
    if (step === 1 && !selectedService) {
      setErrorMsg("Please select a dental service to proceed.");
      return;
    }
    if (step === 2 && (!selectedDoctor || !selectedDate || !selectedTime)) {
      setErrorMsg("Please select a dentist, preferred date, and time slot to proceed.");
      return;
    }
    setErrorMsg("");
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setErrorMsg("");
    setStep(prev => prev - 1);
  };

  // Submit Booking Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!patientName || !patientPhone) {
      setErrorMsg("Patient Name and Phone Number are required fields.");
      return;
    }

    if (!consent) {
      setErrorMsg("You must accept our clinic terms and consent checkbox to schedule.");
      return;
    }

    setLoading(true);

    const bookingPayload: BookingData = {
      name: patientName,
      phone: patientPhone,
      email: patientEmail || undefined,
      service: SERVICES.find(s => s.id === selectedService)?.name || selectedService,
      doctor: DOCTORS.find(d => d.id === selectedDoctor)?.name || selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      notes: patientNotes || undefined
    };

    const res = await saveBooking(bookingPayload);
    setLoading(false);

    if (res.success && res.data) {
      const returnedData = Array.isArray(res.data) ? res.data[0] : res.data;
      setSuccessInfo({
        provider: res.provider || "localStorage",
        data: {
          name: returnedData?.full_name || returnedData?.name || bookingPayload.name,
          phone: returnedData?.phone || bookingPayload.phone,
          email: returnedData?.email || bookingPayload.email,
          service: returnedData?.service || bookingPayload.service,
          doctor: bookingPayload.doctor,
          date: returnedData?.preferred_date || returnedData?.date || bookingPayload.date,
          time: returnedData?.preferred_time || returnedData?.time || bookingPayload.time,
          id: returnedData?.id,
          created_at: returnedData?.created_at
        }
      });
      // Clear form
      setSelectedService("");
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTime("09:00 AM");
      setPatientName("");
      setPatientPhone("");
      setPatientEmail("");
      setPatientNotes("");
      setConsent(false);
      setStep(4);
    } else {
      setErrorMsg(res.error || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
          Online Scheduling Portal
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Request your appointments in three simple steps. Backed by medical safety guarantees.
        </p>
      </div>

      {/* Step Indicators */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-10 bg-slate-50 border border-slate-100 p-4 sm:p-5 rounded-2xl">
          {[
            { id: 1, label: "Treatment", icon: Calendar },
            { id: 2, label: "Schedule", icon: CalendarDays },
            { id: 3, label: "Info Details", icon: FileText }
          ].map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.id
                    ? "bg-[#0F766E] text-white ring-4 ring-teal-100"
                    : step > s.id
                    ? "bg-teal-50 text-[#0F766E] border border-teal-200"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                {step > s.id ? "✓" : s.id}
              </div>
              <span
                className={`text-xs font-bold hidden sm:inline ${
                  step === s.id ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div className="flex items-center gap-2.5 p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl mb-6 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="flex flex-col gap-6 animate-slide-up">
          <h2 className="text-xl font-bold text-[#0F172A]">Step 1: Choose Your Dental Treatment</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const isSelected = selectedService === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedService(s.id);
                    setErrorMsg("");
                  }}
                  className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all border outline-none ${
                    isSelected
                      ? "border-[#0F766E] bg-[#F0FDF4] shadow-sm"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-colors ${
                      isSelected ? "bg-[#0F766E] text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">{s.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Click to select</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end mt-8 border-t border-slate-100 pt-6">
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl text-sm transition-all"
            >
              <span>Next: Select Dentist</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Doctor and Date */}
      {step === 2 && (
        <div className="flex flex-col gap-6 animate-slide-up">
          <h2 className="text-xl font-bold text-[#0F172A]">Step 2: Select Date & Doctor</h2>
          
          {/* Doctor Grid */}
          <div className="flex flex-col gap-3.5">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Choose Dental Expert
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DOCTORS.map((d) => {
                const isSelected = selectedDoctor === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDoctor(d.id);
                      setErrorMsg("");
                    }}
                    className={`p-5 rounded-2xl text-left border transition-all outline-none ${
                      isSelected
                        ? "border-[#0F766E] bg-[#F0FDF4]"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <span className="block font-extrabold text-sm text-slate-800">{d.name}</span>
                    <span className="block text-[10px] text-slate-500 font-semibold mt-1">{d.specialty}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="date" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Preferred Consultation Date
            </label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setErrorMsg("");
              }}
              className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
            />
          </div>

          {/* Time Slot Picker */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Preferred Consultation Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"].map((timeSlot) => {
                const isSelected = selectedTime === timeSlot;
                return (
                  <button
                    key={timeSlot}
                    type="button"
                    onClick={() => {
                      setSelectedTime(timeSlot);
                      setErrorMsg("");
                    }}
                    className={`py-3 rounded-xl border text-xs font-bold text-center transition-all outline-none ${
                      isSelected
                        ? "border-[#0F766E] bg-[#F0FDF4] text-[#0F766E]"
                        : "border-slate-100 bg-white hover:border-slate-200 text-slate-600"
                    }`}
                  >
                    {timeSlot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 border-t border-slate-100 pt-6">
            <button
              onClick={prevStep}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-700 font-semibold text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl text-sm transition-all"
            >
              <span>Next: Patient Info</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Patient Info Form */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-slide-up">
          <h2 className="text-xl font-bold text-[#0F172A]">Step 3: Complete Patient Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="pname" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Full Name *
              </label>
              <input
                id="pname"
                type="text"
                required
                placeholder="Jane Doe"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="pphone" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Phone Number *
              </label>
              <input
                id="pphone"
                type="tel"
                required
                placeholder="(555) 019-9000"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pemail" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Email Address
            </label>
            <input
              id="pemail"
              type="email"
              placeholder="jane@domain.com"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pnotes" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Medical Concerns or Symptoms
            </label>
            <textarea
              id="pnotes"
              rows={4}
              placeholder="Describe any symptoms, allergies, dental pain, or special requests..."
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 mt-2">
            <input
              id="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-4.5 w-4.5 accent-[#0F766E] border-slate-300 rounded focus:ring-[#0F766E] mt-0.5"
            />
            <label htmlFor="consent" className="text-xs text-slate-500 font-medium leading-relaxed">
              I consent to DentalHub storing my patient booking coordinates. I acknowledge that I will receive SMS/Email reminders regarding my clinical date.
            </label>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-700 font-semibold text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center gap-2 px-8 py-4 bg-[#0F766E] hover:bg-[#0D6962] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition-all"
            >
              {loading ? (
                <span>Securing appointment...</span>
              ) : (
                <>
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Confirm Appointment Booking</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Success Screen */}
      {step === 4 && successInfo && (
        <div className="bg-[#F0FDF4]/30 border border-[#0F766E]/10 p-8 sm:p-12 rounded-[2.5rem] flex flex-col items-center text-center animate-fade-in">
          <div className="p-4 bg-[#F0FDF4] text-[#0F766E] rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Booking Confirmed!
          </h2>
          
          <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
            Thank you, <strong>{successInfo.data.name}</strong>. Your appointment request has been recorded. Our team will contact you at <strong>{successInfo.data.phone}</strong> shortly to finalize the hour.
          </p>

          <div className="flex flex-col gap-2 mt-8 text-left text-xs bg-white border border-slate-100 p-5 rounded-2xl w-full max-w-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-400 font-semibold">Treatment</span>
              <span className="text-slate-800 font-bold">{successInfo.data.service}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="text-slate-400 font-semibold">Clinician</span>
              <span className="text-slate-800 font-bold">{successInfo.data.doctor}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="text-slate-400 font-semibold">Proposed Date</span>
              <span className="text-slate-800 font-bold">{successInfo.data.date}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <span className="text-slate-400 font-semibold">Proposed Time</span>
              <span className="text-slate-800 font-bold">{successInfo.data.time || "09:00 AM"}</span>
            </div>
            <div className="flex justify-between pt-2 items-center">
              <span className="text-slate-400 font-semibold">Database Persistence</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                successInfo.provider === "supabase"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}>
                <Database className="w-3 h-3" />
                <span>{successInfo.provider === "supabase" ? "Supabase Sync" : "Local Fallback"}</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-10 px-6 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl transition-all"
          >
            Schedule Another Appointment
          </button>
        </div>
      )}

    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 font-bold">Loading booking engine...</div>}>
      <BookingEngine />
    </Suspense>
  );
}
