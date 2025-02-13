"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JobOpportunites from "@/components/JobOpportunities";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <CTA />
        <JobOpportunites />
      </main>
      <Footer />
    </div>
  );
}
