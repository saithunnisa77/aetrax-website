'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import WhyAetrax from '@/components/sections/WhyAetrax';
import SolutionsPreview from '@/components/sections/SolutionsPreview';
import IndustriesPreview from '@/components/sections/IndustriesPreview';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0F] text-[#F0F0F5] overflow-x-hidden selection:bg-[#00D4FF]/20 selection:text-[#00D4FF]">
      {/* Sticky Premium Navbar */}
      <Navbar />

      {/* Hero Section with Interactive AI System Map */}
      <HeroSection />

      {/* Why Aetrax: 5 Architectural Differentiators */}
      <WhyAetrax />

      {/* Solutions Preview: 6 Enterprise AI Modules */}
      <SolutionsPreview />

      {/* Industries Preview: 6 High-Consequence Domains */}
      <IndustriesPreview />

      {/* Strong CTA Section */}
      <CTASection />

      {/* Premium Footer */}
      <Footer />
    </main>
  );
}
