import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Appointment {
  id: string;
  created_at: string;
  full_name: string;
  email?: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

// Map old BookingData interface for backwards compatibility
export interface BookingData {
  name: string;
  email?: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  notes?: string;
  time?: string; // New optional time field
}

/**
 * Saves a new appointment request. Fallbacks to localStorage if Supabase is unconfigured.
 */
export async function saveBooking(data: BookingData) {
  const preferredTime = data.time || "09:00 AM"; // Fallback to default time if not provided
  
  // Format dentist/doctor name into the notes so it is captured in the schema constraint
  const combinedNotes = data.notes 
    ? `[Dentist: ${data.doctor}] ${data.notes}`
    : `[Dentist: ${data.doctor}]`;

  const appointmentPayload = {
    full_name: data.name,
    email: data.email || null,
    phone: data.phone,
    service: data.service,
    preferred_date: data.date,
    preferred_time: preferredTime,
    notes: combinedNotes,
    status: "pending"
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: result, error } = await supabase
        .from("appointments")
        .insert([appointmentPayload])
        .select();

      if (error) throw error;
      return { success: true, provider: "supabase", data: result };
    } catch (err) {
      console.error("Supabase insert error:", err);
      const errMsg = err instanceof Error ? err.message : "Failed to insert booking into Supabase.";
      return { success: false, error: errMsg };
    }
  } else {
    // Fallback: save to Local Storage
    try {
      const existing = localStorage.getItem("dentalhub_appointments");
      const appointments = existing ? JSON.parse(existing) : [];
      const newAppointment = {
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        created_at: new Date().toISOString(),
        ...appointmentPayload,
      };
      appointments.push(newAppointment);
      localStorage.setItem("dentalhub_appointments", JSON.stringify(appointments));
      console.warn("Supabase not configured. Saved booking to localStorage:", newAppointment);
      return { success: true, provider: "localStorage", data: newAppointment };
    } catch (err) {
      console.error("Local storage save error:", err);
      const errMsg = err instanceof Error ? err.message : "Failed to save booking to Local Storage.";
      return { success: false, error: errMsg };
    }
  }
}

/**
 * Fetches all appointments from Supabase or LocalStorage.
 */
export async function fetchAppointments(): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Supabase fetch error:", err);
      // Fallback to localStorage even if fetch fails to keep UI alive
      return getLocalStorageAppointments();
    }
  } else {
    return getLocalStorageAppointments();
  }
}

/**
 * Updates status of an appointment.
 */
export async function updateAppointmentStatus(id: string, status: Appointment["status"]) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Supabase update error:", err);
      return { success: false, error: err instanceof Error ? err.message : "Update failed" };
    }
  } else {
    try {
      const appointments = getLocalStorageAppointments();
      const updated = appointments.map((appt) => 
        appt.id === id ? { ...appt, status } : appt
      );
      localStorage.setItem("dentalhub_appointments", JSON.stringify(updated));
      return { success: true };
    } catch {
      return { success: false, error: "Failed to update local storage" };
    }
  }
}

/**
 * Deletes an appointment.
 */
export async function deleteAppointment(id: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Supabase delete error:", err);
      return { success: false, error: err instanceof Error ? err.message : "Delete failed" };
    }
  } else {
    try {
      const appointments = getLocalStorageAppointments();
      const filtered = appointments.filter((appt) => appt.id !== id);
      localStorage.setItem("dentalhub_appointments", JSON.stringify(filtered));
      return { success: true };
    } catch {
      return { success: false, error: "Failed to delete from local storage" };
    }
  }
}

// Helper for local storage access
function getLocalStorageAppointments(): Appointment[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = localStorage.getItem("dentalhub_appointments");
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.error("Error reading localStorage appointments:", err);
    return [];
  }
}
