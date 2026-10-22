'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Shield, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';

export default function CTASection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@aetrax.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0A0A0F] border-t border-[#1E1E30] overflow-hidden">
      {/* Background glow and subtle line work */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#00D4FF]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Console Box */}
          <div className="bg-[#0F0F1A] border border-[#1E1E30] rounded-2xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Top Technical Metadata */}
            <div className="flex items-center justify-between pb-6 border-b border-[#1E1E30] text-xs font-mono text-[#6B7080]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
                <span className="text-[#F0F0F5]">AETRAX // CLIENT ENGAGEMENT GATE</span>
              </div>
              <div>BENGALURU • INTERNATIONAL</div>
            </div>

            {/* Central Call to Action Content */}
            <div className="py-8 text-center sm:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#141420] border border-[#1E1E30] text-xs font-mono text-[#00D4FF] mb-6">
                <Terminal className="w-3.5 h-3.5" />
                <span>DIRECT ACCESS TO SENIOR ARCHITECTS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F0F0F5] tracking-tight">
                Have an AI problem <br className="hidden sm:inline" />
                <span className="text-[#00D4FF]">worth solving?</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#A0A5B5] max-w-2xl leading-relaxed">
                Connect directly with our engineering team to assess technical feasibility, evaluate data residency constraints, or scope a Proof of Value.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="mailto:hello@aetrax.in?subject=Enterprise%20AI%20Inquiry%20-%20Aetrax"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#00A3C4] text-[#0A0A0F] font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Start a conversation</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#141420] border border-[#1E1E30] text-[#F0F0F5] hover:border-[#00D4FF]/40 text-sm font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#00D4FF]" />
                      <span className="text-[#00D4FF]">Copied hello@aetrax.in</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#6B7080]" />
                      <span>hello@aetrax.in</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust & Governance Guarantees */}
              <div className="mt-10 pt-8 border-t border-[#1E1E30] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#6B7080]">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#00D4FF] shrink-0" />
                  <span>Strict NDA & Data Protection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#00D4FF] shrink-0" />
                  <span>No Junior Staff Handoffs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#00D4FF] shrink-0" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
