import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DentalAssistant from "@/components/chat/DentalAssistant";

export const metadata: Metadata = {
  title: "DentalHub Clinic & Surgery | Modern Family & Cosmetic Dentistry",
  description: "Welcome to DentalHub Clinic & Surgery. Experience premium dental care, Invisalign, cosmetic dentistry, and same-day dental emergency services with our expert clinicians.",
  keywords: [
    "dental clinic",
    "dentist near me",
    "cosmetic dentistry",
    "dental implants",
    "Invisalign",
    "emergency dentist",
    "teeth whitening",
    "dental hub"
  ],
  authors: [{ name: "DentalHub Team" }],
  openGraph: {
    title: "DentalHub Clinic & Surgery | Modern Family & Cosmetic Dentistry",
    description: "Experience modern, premium dental care with state-of-the-art procedures and custom client-focused aesthetics.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased bg-white text-[#0F172A]">
        <Header />
        <main>{children}</main>
        <Footer />
        <DentalAssistant />
      </body>
    </html>
  );
}


