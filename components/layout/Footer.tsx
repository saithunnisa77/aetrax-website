'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Generative AI', href: '#solutions' },
      { label: 'Document Intelligence', href: '#solutions' },
      { label: 'Agentic Automation', href: '#solutions' },
      { label: 'Sovereign AI', href: '#solutions' },
      { label: 'AI Operations', href: '#solutions' },
      { label: 'AI Strategy', href: '#solutions' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Financial Services', href: '#industries' },
      { label: 'Healthcare & Life Sciences', href: '#industries' },
      { label: 'Manufacturing', href: '#industries' },
      { label: 'Government & Defence', href: '#industries' },
      { label: 'Retail & Consumer', href: '#industries' },
      { label: 'Legal & Professional Services', href: '#industries' },
    ],
  },
  {
    heading: 'Approach',
    links: [
      { label: 'Discovery & Strategy', href: '#approach' },
      { label: 'Design & Architecture', href: '#approach' },
      { label: 'Build & Integrate', href: '#approach' },
      { label: 'Operate & Optimise', href: '#approach' },
      { label: 'Responsible AI', href: '#responsible-ai' },
      { label: 'Security Framework', href: '#security' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Technology Stack', href: '#technology' },
      { label: 'Deployment Options', href: '#deployment' },
      { label: 'Careers', href: '#careers' },
      { label: 'Start a Conversation', href: '#contact' },
      { label: 'hello@aetrax.in', href: 'mailto:hello@aetrax.in' },
    ],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

function FooterLogo() {
  return (
    <div className="flex flex-col gap-1">
      <a
        href="#"
        aria-label="Aetrax — back to top"
        className="flex flex-col leading-none group w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
      >
        <span
          className="text-3xl font-black tracking-[0.12em] uppercase"
          style={{
            background: 'linear-gradient(135deg, #F0F0F5 0%, #00D4FF 50%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AETRAX
        </span>
        <span className="text-[10px] font-medium tracking-[0.22em] text-[#6B7080] uppercase mt-[-2px]">
          AI Solutions
        </span>
      </a>
      <p className="mt-4 text-sm leading-relaxed text-[#6B7080] max-w-xs">
        Designing, building and operating secure, measurable enterprise AI
        systems — delivered with engineering rigour.
      </p>
      <a
        href="mailto:hello@aetrax.in"
        className="mt-4 inline-flex items-center gap-2 text-sm text-[#00D4FF] hover:text-[#F0F0F5] transition-colors duration-200 group w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
        aria-label="Email Aetrax at hello@aetrax.in"
      >
        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
        <span>hello@aetrax.in</span>
        <ExternalLink
          className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

interface FooterColumnProps {
  column: FooterColumn;
}

function FooterColumnBlock({ column }: FooterColumnProps) {
  return (
    <motion.div variants={columnVariants} className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold tracking-[0.18em] text-[#F0F0F5] uppercase">
        {column.heading}
      </h3>
      <ul className="flex flex-col gap-2" role="list">
        {column.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-[#6B7080] hover:text-[#F0F0F5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className="relative bg-[#0F0F1A] border-t border-[#1E1E30]"
      aria-label="Site footer"
    >
      {/* Subtle top gradient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #00D4FF33 30%, #7C3AED33 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top section ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Logo + tagline — spans 1 col on md, 1 of 5 on lg */}
            <motion.div variants={fadeUpVariants} className="lg:col-span-1">
              <FooterLogo />
            </motion.div>

            {/* Link grid — 2 cols on sm, 4 cols on lg spanning 4 */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {FOOTER_COLUMNS.map((col) => (
                <FooterColumnBlock key={col.heading} column={col} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-[#1E1E30]" aria-hidden="true" />

        {/* ── Legal note ── */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="py-5 text-xs text-[#6B7080]/70 leading-relaxed"
        >
          Technology references indicate tools Aetrax works with; they do not
          imply formal partnership or endorsement by those technology providers.
        </motion.p>

        {/* ── Divider ── */}
        <div className="h-px bg-[#1E1E30]" aria-hidden="true" />

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6"
        >
          <p className="text-xs text-[#6B7080]">
            &copy; {currentYear} Aetrax. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://aetrax.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6B7080] hover:text-[#F0F0F5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
              aria-label="Visit aetrax.in (opens in new tab)"
            >
              aetrax.in
            </a>
            <span className="text-[#1E1E30]" aria-hidden="true">
              ·
            </span>
            <a
              href="mailto:hello@aetrax.in"
              className="text-xs text-[#6B7080] hover:text-[#00D4FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
              aria-label="Email hello@aetrax.in"
            >
              hello@aetrax.in
            </a>
            <span className="text-[#1E1E30]" aria-hidden="true">
              ·
            </span>
            <a
              href="#"
              className="text-xs text-[#6B7080] hover:text-[#F0F0F5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
            >
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
