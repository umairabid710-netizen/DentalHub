"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Search,
  Check,
  X,
  Trash2,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  Filter,
  UserCheck
} from "lucide-react";
import {
  fetchAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  Appointment
} from "@/lib/supabase";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [systemMessage, setSystemMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Load appointments
  const loadData = async () => {
    setLoading(true);
    const data = await fetchAppointments();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Show auto-dismiss messages
  const triggerMessage = (text: string, type: "success" | "error" = "success") => {
    setSystemMessage({ text, type });
    setTimeout(() => {
      setSystemMessage(null);
    }, 4000);
  };

  // Pre-populate mock appointments if local storage is empty
  const handlePrepopulateMock = () => {
    if (typeof window === "undefined") return;
    const existing = localStorage.getItem("dentalhub_appointments");
    if (!existing || JSON.parse(existing).length === 0) {
      const mockAppointments: Omit<Appointment, "">[] = [
        {
          id: "mock-1",
          created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
          full_name: "Sarah Connors",
          email: "sarah.c@gmail.com",
          phone: "(555) 019-2831",
          service: "Invisalign Clear Aligners",
          preferred_date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
          preferred_time: "10:30 AM",
          notes: "[Dentist: Dr. Clara Vance] Wants to discuss payment plans for Invisalign.",
          status: "pending"
        },
        {
          id: "mock-2",
          created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
          full_name: "David Miller",
          email: "david.m@yahoo.com",
          phone: "(555) 012-9842",
          service: "Teeth Whitening",
          preferred_date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
          preferred_time: "09:00 AM",
          notes: "[Dentist: Dr. Sarah Jenkins] Needs pre-wedding whitening treatment.",
          status: "confirmed"
        },
        {
          id: "mock-3",
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
          full_name: "Emma Watson",
          email: "emma.w@outlook.com",
          phone: "(555) 018-4720",
          service: "Dental Implants",
          preferred_date: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
          preferred_time: "01:00 PM",
          notes: "[Dentist: Dr. Marcus Thorne] Referral from general dentist for tooth #14 implant.",
          status: "pending"
        },
        {
          id: "mock-4",
          created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
          full_name: "Robert Downey",
          email: "robert.d@stark.com",
          phone: "(555) 011-3829",
          service: "Emergency Care",
          preferred_date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
          preferred_time: "03:30 PM",
          notes: "[Dentist: Dr. Marcus Thorne] Cracked crown, severe throbbing pain relief completed.",
          status: "completed"
        }
      ];
      localStorage.setItem("dentalhub_appointments", JSON.stringify(mockAppointments));
      triggerMessage("Demo dashboard data pre-populated successfully.");
      loadData();
    }
  };

  // Status Action Handlers
  const handleUpdateStatus = async (id: string, newStatus: Appointment["status"]) => {
    setActionLoadingId(id);
    const res = await updateAppointmentStatus(id, newStatus);
    setActionLoadingId(null);

    if (res.success) {
      triggerMessage(`Appointment status updated to ${newStatus}.`);
      // Update state locally
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
      );
    } else {
      triggerMessage(res.error || "Failed to update appointment.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment lead permanently?")) return;
    
    setActionLoadingId(id);
    const res = await deleteAppointment(id);
    setActionLoadingId(null);

    if (res.success) {
      triggerMessage("Appointment lead deleted successfully.");
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } else {
      triggerMessage(res.error || "Failed to delete appointment.", "error");
    }
  };

  // Computations for KPI cards
  const totalAppts = appointments.length;
  const pendingAppts = appointments.filter((a) => a.status === "pending").length;
  const confirmedAppts = appointments.filter((a) => a.status === "confirmed").length;
  const completedAppts = appointments.filter((a) => a.status === "completed").length;
  
  // Conversion Rate: Confirmed + Completed / Total
  const conversionRate = totalAppts > 0 
    ? Math.round(((confirmedAppts + completedAppts) / totalAppts) * 100)
    : 0;

  // Filtered appointments list
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.phone.includes(searchTerm) ||
      (appt.email && appt.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      appt.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || appt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex flex-col text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Clinic Lead Board
            </h1>
            <p className="text-sm text-slate-500 font-semibold mt-1">
              Manage patient requests, schedule final times, and track conversion rates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrepopulateMock}
              className="px-4 py-2 text-xs font-bold text-[#0F766E] bg-[#F0FDF4] hover:bg-[#E0FDF0] rounded-xl border border-[#0F766E]/20 transition-all cursor-pointer"
            >
              Pre-populate Demo Data
            </button>
            <button
              onClick={loadData}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              Refresh Table
            </button>
          </div>
        </div>

        {/* System Messages Banner */}
        {systemMessage && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 border shadow-sm animate-fade-in ${
              systemMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                : "bg-rose-50 text-rose-800 border-rose-100"
            }`}
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-xs font-bold">{systemMessage.text}</span>
          </div>
        )}

        {/* 1. Analytics KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Total */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-slate-50 rounded-2xl text-slate-500">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black text-slate-800">{totalAppts}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Leads</span>
            </div>
          </div>

          {/* Card 2: Pending */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-[#FEF3C7] text-[#D97706] rounded-2xl">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black text-[#D97706]">{pendingAppts}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Pending Triage</span>
            </div>
          </div>

          {/* Card 3: Confirmed */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-[#DCFCE7] text-[#16A34A] rounded-2xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black text-[#16A34A]">{confirmedAppts}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Confirmed</span>
            </div>
          </div>

          {/* Card 4: Conversion Rate */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-[#E0F2FE] text-[#0284C7] rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black text-[#0284C7]">{conversionRate}%</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Conversion Rate</span>
            </div>
          </div>

        </div>

        {/* 2. Filters & Searches Bar */}
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient name, phone, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl pl-11 pr-4 py-3 text-xs transition-all outline-none"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-2" />
            {[
              { id: "all", label: "All Statuses" },
              { id: "pending", label: "Pending" },
              { id: "confirmed", label: "Confirmed" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all outline-none border cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* 3. Main Data Table Board */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full border-4 border-slate-100 border-t-[#0F766E] animate-spin"></div>
              <span className="text-xs text-slate-400 font-bold">Synchronizing board leads...</span>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-2">
              <UserCheck className="w-12 h-12 text-slate-300 mb-2" />
              <h3 className="text-base font-extrabold text-slate-800">No leads found</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Try refining your filters or click &quot;Pre-populate Demo Data&quot; to test the admin layout interfaces.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4.5 text-xs font-bold uppercase text-slate-400 tracking-wider">Patient Details</th>
                    <th className="px-6 py-4.5 text-xs font-bold uppercase text-slate-400 tracking-wider">Treatment Requested</th>
                    <th className="px-6 py-4.5 text-xs font-bold uppercase text-slate-400 tracking-wider">Proposed Date & Time</th>
                    <th className="px-6 py-4.5 text-xs font-bold uppercase text-slate-400 tracking-wider">Status</th>
                    <th className="px-6 py-4.5 text-xs font-bold uppercase text-slate-400 tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((appt) => {
                    
                    // Parse dentist name if it's formatted in the notes
                    let dentistName = "Unassigned";
                    let cleanNotes = appt.notes || "";
                    if (appt.notes && appt.notes.startsWith("[Dentist: ")) {
                      const match = appt.notes.match(/^\[Dentist:\s*([^\]]+)\]/);
                      if (match) {
                        dentistName = match[1];
                        cleanNotes = appt.notes.replace(/^\[Dentist:\s*[^\]]+\]\s*/, "");
                      }
                    }

                    return (
                      <tr key={appt.id} className="hover:bg-slate-50/30 transition-colors">
                        
                        {/* Column 1: Patient details */}
                        <td className="px-6 py-5.5">
                          <div className="flex flex-col gap-1.5">
                            <span className="font-extrabold text-sm text-slate-800">{appt.full_name}</span>
                            <div className="flex flex-col gap-0.5 text-xs text-slate-500 font-semibold">
                              <span className="flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{appt.phone}</span>
                              </span>
                              {appt.email && (
                                <span className="flex items-center gap-1.5">
                                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span>{appt.email}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Treatment requested */}
                        <td className="px-6 py-5.5">
                          <div className="flex flex-col gap-1">
                            <span className="font-extrabold text-sm text-[#0F766E]">{appt.service}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold self-start">
                              Clinician: {dentistName}
                            </span>
                            {cleanNotes && (
                              <p className="text-xs text-slate-400 mt-1 max-w-xs line-clamp-2" title={cleanNotes}>
                                &quot;{cleanNotes}&quot;
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Column 3: Proposed slot */}
                        <td className="px-6 py-5.5">
                          <div className="flex flex-col gap-1 text-xs text-slate-700 font-bold">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#0F766E]" />
                              <span>{appt.preferred_date}</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-500">
                              <Clock className="w-3.5 h-3.5 text-[#0F766E]" />
                              <span>{appt.preferred_time}</span>
                            </span>
                          </div>
                        </td>

                        {/* Column 4: Status badge */}
                        <td className="px-6 py-5.5">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            appt.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-700"
                              : appt.status === "cancelled"
                              ? "bg-rose-50 text-rose-700"
                              : appt.status === "completed"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              appt.status === "confirmed"
                                ? "bg-emerald-500"
                                : appt.status === "cancelled"
                                ? "bg-rose-500"
                                : appt.status === "completed"
                                ? "bg-blue-500"
                                : "bg-amber-500 animate-ping"
                            }`}></span>
                            <span>{appt.status}</span>
                          </span>
                        </td>

                        {/* Column 5: Actions */}
                        <td className="px-6 py-5.5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            
                            {/* Confirm Button */}
                            {appt.status !== "confirmed" && appt.status !== "completed" && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, "confirmed")}
                                disabled={actionLoadingId === appt.id}
                                className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all outline-none cursor-pointer"
                                title="Confirm Appointment"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {/* Complete Button */}
                            {appt.status === "confirmed" && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, "completed")}
                                disabled={actionLoadingId === appt.id}
                                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-all outline-none cursor-pointer"
                                title="Mark as Completed"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}

                            {/* Cancel Button */}
                            {appt.status !== "cancelled" && appt.status !== "completed" && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, "cancelled")}
                                disabled={actionLoadingId === appt.id}
                                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-all outline-none cursor-pointer"
                                title="Cancel Appointment"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(appt.id)}
                              disabled={actionLoadingId === appt.id}
                              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-xl transition-all outline-none cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
