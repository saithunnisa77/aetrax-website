'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Approach', href: '#why-aetrax' },
  { label: 'Trust', href: '#why-aetrax' },
  { label: 'Technology', href: '#solutions' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-[#1E1E30] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Aetrax Logo */}
          <a href="#" className="flex flex-col group focus-visible:outline-none">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#F0F0F5] group-hover:text-[#00D4FF] transition-colors">
              AETRAX
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase -mt-1">
              AI SOLUTIONS
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-[#A0A5B5] hover:text-[#F0F0F5] hover:bg-[#141420]/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/20 text-xs font-mono font-medium tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(0,212,255,0.1)]"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141420] border border-[#1E1E30] text-[#F0F0F5] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0A0A0F] border-b border-[#1E1E30] px-4 pt-3 pb-6 space-y-3"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#A0A5B5] hover:text-[#F0F0F5] hover:bg-[#141420] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#1E1E30]">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-[#00D4FF] text-[#0A0A0F] font-semibold text-sm tracking-wide"
              >
                <span>Start a conversation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
