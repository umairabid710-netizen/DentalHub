# DentalHub — Modern Clinical Web Application & AI Triage Assistant for Dental Practices

Welcome to **DentalHub**, a premium, production-grade clinical web application designed to solve patient scheduling friction, eliminate after-hours inquiry abandonment, and streamline dental clinic operations.

---

## 🚀 Live URL & Repository

- **Live Staging URL**: [https://dental-hub-chi.vercel.app](https://dentalhub-clinic-demo.vercel.app) *(Placeholder)*
- **GitHub Repository**: [https://github.com/umairabid710-netizen/DentalHub](https://github.com/username/dentalhub) *(Placeholder)*

---

## 💡 The Problem DentalHub Solves

Local dental practices face three major operational bottlenecks:
1. **Missed After-Hours Inquiries**: 60%+ of patient searches occur outside normal clinic hours (evenings and weekends) when phone triage staff are offline, leading to high lead abandonment rates.
2. **Patient Scheduling Friction**: Multi-page forms or telephone queues disrupt the patient experience. Users expect a fast, interactive scheduling engine.
3. **Admin Triaging Fatigue**: Staff spend hours manually copying lead details from web contact forms, verifying insurance plans, and prioritizing emergency emergency visits.

### **Our Solution & Audience**
DentalHub is engineered for modern dental clinics, family practices, and specialized cosmetic dental surgeries. It bridges the gap between patient discovery and scheduling by providing:
- **Aura**: A self-triage, real-time AI receptionist widget active 24/7.
- **Dynamic Booking Engine**: A multi-step form that guides users to choose treatments, select doctors, specify dates/times, and persist data instantly.
- **Admin Lead Board**: An intuitive lead management CRM for clinic staff to triage, confirm, complete, or reject appointments.

---

## 🛠️ Feature Breakdown

### 🌟 1. Multi-Page Premium Responsive UI
Beautiful typography and layout styling tailored using custom corporate colors: Primary Teal (#0F766E), Deep Slate (#0F172A), and Soft Mint backgrounds (#F0FDF4). Fully mobile-responsive layouts.
- **Home (`/`)**: Hero section featuring custom Unsplash medical placeholders, Framer Motion "Before & After" makeover comparison slider, service overview, reviews, and dynamic FAQ accordion.
- **Services Hub (`/services`)**: In-depth pricing guides, duration, and descriptions for Invisalign, Dental Implants, Teeth Whitening, and Root Canals.
- **Our Team & Clinic (`/about`)**: Direct access to doctor profiles, clinical safety standards, and safety badges.
- **Contact & Location (`/contact`)**: Visual Google Map integration, emergency banners, and hotline indicators.

### 📅 2. Multi-Step Appointment Scheduler (`/book`)
A frictionless step-by-step form:
- **Step 1**: Choose dental treatment.
- **Step 2**: Choose clinician, date, and preferred time slot.
- **Step 3**: Capture patient name, email, phone, and symptoms.
- **Step 4**: Real-time confirmation showing sync status (Supabase PostgreSQL database write vs. localStorage fallback).

### 🤖 3. Aura — AI Triage Assistant Widget
A floating chat widget visible on every page. Aura handles user questions about clinic hours, pricing, insurance co-pays, and emergency guidance.

### 📊 4. Admin Lead CRM Dashboard (`/admin/dashboard`)
A dedicated clinic staff portal to manage leads:
- KPI summary cards (Total Leads, Pending Triage, Confirmed Patients, and Conversion Rates).
- Filter controls to search by name/phone/treatment and filter by status.
- State triggers to Confirm, Complete, Cancel, or Delete appointments.
- Local Storage Pre-population tools to seed data instantly for demo reviews.

---

## 🧠 AI Assistant Architecture ('Aura')

Aura utilizes the **Vercel AI SDK** to stream real-time JSON chunks from Google AI Studio models (configured for **Gemini 3.5 Flash / 1.5 Flash**) or Groq (configured for **Llama 3.1 70B**). 

### **Prompt Architecture & System Instructions**
Aura's core behavior is guided by the exact prompt defined in `src/app/api/chat/prompt.ts`:
```typescript
export const AURA_SYSTEM_PROMPT = `
You are Aura, the senior triage receptionist and virtual assistant for DentalHub.
Your tone is professional, warm, empathetic, and reassuring, as some patients may have dental anxiety.

## Business Context & Clinical Details
- **Location**: 450 Health Sciences Blvd.
- **Clinic Hours**:
  - Monday - Friday: 8:00 AM - 7:00 PM
  - Saturday: 9:00 AM - 4:00 PM
  - Sunday: Closed (Standby Emergency Call cases only)
- **Baseline Service Pricing**:
  - Teeth Whitening: $299 (in-chair professional laser whitening)
  - Dental Implants: $1,499+ (custom titanium post & porcelain crown restoration)
  - Invisalign Clear Aligners: $2,800+ (discreet invisible teeth straightening)
  - General Consult / Scaling / Cleans: Starting from $80.
- **Insurance**: Accept almost all major PPO insurance providers (e.g., Delta Dental, Aetna, MetLife, Cigna, Guardian). We process claims on behalf of patients to minimize out-of-pocket costs.

## Medical Emergency Triage Protocol
- **Emergency Symptoms**: Severe bleeding, throbbing unmanageable pain, facial swelling, jaw trauma, or a knocked-out/broken tooth.
- **Action**: Advise the user immediately to call our Priority Emergency Hotline directly at (800) 555-0199. Mention that we guarantee same-day priority appointments for emergency pain relief.

## Lead Collection & Scheduling Directives
1. **Gather Lead Info**: Politely request the user's Name, Phone Number, and desired Dental Service. Do this naturally during conversation rather than demanding all details at once.
2. **Scheduling Redirect**: Once you have answered their initial questions, or when they express interest in booking a slot, guide them to use our official [Online Scheduler](/book) by clicking the link directly. Always format the scheduling link as a markdown link: [Online Scheduler](/book) or [Book Appointment](/book). Keep your responses relatively concise.
`;
```

---

## 💻 Tech Stack & Integrations

- **Core Framework**: Next.js 15 (App Router, TypeScript, React 19)
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons & UI Primitives**: Lucide React, Radix UI Dialog & Slot
- **Database/Persistence**: Supabase (PostgreSQL Client)
- **AI Integrations**: Vercel AI SDK, Google AI Studio SDK, Groq Cloud API
- **Animations**: Framer Motion

---

## ⚙️ Local Setup & Environment Guide

Follow these steps to spin up DentalHub locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/username/dentalhub.git
cd dentalhub
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env.local` file in the root directory and define the following variables:
```env
# Google AI Studio Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
# Alternative Gemini Key (Optional)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Groq Cloud API Key (Optional fallback)
GROQ_API_KEY=your_groq_api_key_here

# Supabase PostgreSQL Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_role_key_here
```

*Note: If `NEXT_PUBLIC_SUPABASE_URL` is omitted, the application will automatically fall back to saving and listing appointments using local storage, making it completely functional in offline/disconnected environments.*

### **4. Database Setup**
Log in to your Supabase Console, open the SQL Editor of your project, and execute the SQL script in `supabase/schema.sql` to initialize your `appointments` table.

### **5. Run the Dev Server**
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

---

## 🖼️ Application Screenshots

### **1. DentalHub Premium Home Page**
![Home Page Screenshot](/public/dental_office.png)

### **2. Dynamic Appointment Scheduler**
*Screenshot placeholder for `/book` wizard*

### **3. Clinic Administration Board CRM**
*Screenshot placeholder for `/admin/dashboard` table*

### **4. AI Triage Widget ('Aura')**
*Screenshot placeholder for floating conversational widget*
