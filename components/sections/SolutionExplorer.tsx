"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Solution {
  id: string;
  label: string;
  name: string;
  problem: string;
  approach: string;
  capabilities: string[];
  outcome: string;
  industries: string[];
  icon: React.FC<{ className?: string }>;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="2" />
    <line x1="23.5" y1="23.5" x2="32" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="17" y1="12" x2="17" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="18" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M26 4l6 6v18a2 2 0 01-2 2H14" stroke="currentColor" strokeWidth="2" />
    <path d="M26 4v6h6" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AgentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="34" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="30" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="34" cy="30" r="3" stroke="currentColor" strokeWidth="1.5" />
    <line x1="9" y1="11" x2="16" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="31" y1="11" x2="24" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9" y1="29" x2="16" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="31" y1="29" x2="24" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="18" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M13 18v-5a7 7 0 0114 0v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="27" r="2.5" fill="currentColor" />
    <line x1="20" y1="29.5" x2="20" y2="33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CompassIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
    <polygon points="20,8 24,20 20,18 16,20" fill="currentColor" opacity="0.8" />
    <polygon points="20,32 16,20 20,22 24,20" fill="currentColor" opacity="0.35" />
    <circle cx="20" cy="20" r="2" fill="currentColor" />
  </svg>
);

const MonitorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
    <line x1="14" y1="34" x2="26" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="28" x2="20" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <polyline points="8,22 13,16 18,19 23,13 28,17 32,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const solutions: Solution[] = [
  {
    id: "gen-ai-knowledge",
    label: "Find answers across enterprise knowledge",
    name: "Generative AI and Knowledge",
    problem:
      "Finding answers across large volumes of policies, contracts and records takes too long and produces inconsistent results.",
    approach:
      "Enterprise assistants and search that answer questions from your policies, contracts and records, with citations and permission-aware access.",
    capabilities: [
      "RAG (Retrieval-Augmented Generation)",
      "Enterprise knowledge assistants",
      "Copilots for teams and workflows",
      "Multilingual question answering",
    ],
    outcome: "Faster, consistent answers that people can check against the source.",
    industries: ["Financial Services", "Legal", "Healthcare", "Government", "Energy"],
    icon: SearchIcon,
  },
  {
    id: "doc-processing",
    label: "Process documents at scale",
    name: "Intelligent Document Processing",
    problem:
      "High volumes of invoices, forms, claims and contracts require manual data entry that is slow, error-prone and doesn't scale.",
    approach:
      "OCR and language-model pipelines that turn documents into validated, structured data for your core systems.",
    capabilities: [
      "OCR for scanned and handwritten input",
      "Field extraction across layouts",
      "Validation rules and confidence scoring",
      "Human-in-the-loop review",
    ],
    outcome: "Less manual data entry, with accuracy that can be measured.",
    industries: ["Insurance", "Banking", "Healthcare", "Logistics", "Public Sector"],
    icon: DocumentIcon,
  },
  {
    id: "agentic-automation",
    label: "Automate multi-step workflows",
    name: "Agentic Automation",
    problem:
      "Multi-step business processes involve too many systems and too much manual coordination to hand off to simple automation.",
    approach:
      "Multi-agent systems that plan, use enterprise tools and complete business processes end to end, with approvals and full audit trails.",
    capabilities: [
      "Multi-agent orchestration",
      "Tool and API integration through MCP",
      "Approval and escalation workflows",
      "Guardrails and spend controls",
    ],
    outcome: "Multi-step work completed reliably, with people kept in control.",
    industries: ["Operations", "Finance", "HR", "Supply Chain", "Customer Service"],
    icon: AgentIcon,
  },
  {
    id: "sovereign-ai",
    label: "Build a private AI environment",
    name: "Sovereign and Private AI",
    problem:
      "Your data is too sensitive to send to external AI services, but you still need the benefits of AI.",
    approach:
      "AI deployed inside your cloud account or data centre, including open-weight models, for data that must stay under your control.",
    capabilities: [
      "Private cloud deployment",
      "On-premise and air-gapped options",
      "Open-weight model hosting",
      "Data residency controls",
    ],
    outcome: "The benefits of AI without giving up control of the data.",
    industries: ["Defence", "Government", "Healthcare", "Banking", "Critical Infrastructure"],
    icon: LockIcon,
  },
  {
    id: "ai-strategy",
    label: "Identify AI opportunities",
    name: "AI Strategy and Readiness",
    problem:
      "AI potential is clear, but it's hard to know which use cases to pursue, where to start, and how to build the business case.",
    approach:
      "Identify and prioritise the AI opportunities that matter most, and prepare your data, people and platforms to deliver them.",
    capabilities: [
      "Use-case discovery and value mapping",
      "Data readiness assessment",
      "Roadmap and business case",
      "Governance and operating model",
    ],
    outcome: "A prioritised, funded AI roadmap that your teams can deliver.",
    industries: ["All Industries", "Enterprise", "Mid-market", "Public Sector"],
    icon: CompassIcon,
  },
  {
    id: "ai-engineering",
    label: "Make AI reliable in production",
    name: "AI Engineering and Operations",
    problem:
      "AI systems built in pilots often degrade after launch — outputs drift, costs rise, and there's no systematic way to know when things go wrong.",
    approach: "The engineering discipline that keeps AI dependable after launch.",
    capabilities: [
      "Evaluation suites and release gates",
      "Tracing and observability",
      "Cost and performance optimisation",
      "Model and prompt lifecycle management",
    ],
    outcome: "AI systems that stay accurate, compliant and cost-efficient.",
    industries: ["Technology", "Financial Services", "Healthcare", "Retail", "Telecoms"],
    icon: MonitorIcon,
  },
];

// ─── Tile Component ───────────────────────────────────────────────────────────

interface TileProps {
  solution: Solution;
  onClick: () => void;
  index: number;
}

const Tile: React.FC<TileProps> = ({ solution, onClick, index }) => {
  const Icon = solution.icon;
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative flex flex-col items-start gap-4 p-6 rounded-2xl text-left w-full
        bg-[#141420] border border-[#1E1E30] cursor-pointer overflow-hidden
        hover:border-[#00D4FF]/60 hover:shadow-[0_0_32px_rgba(0,212,255,0.12)]
        transition-all duration-300"
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Corner accent */}
      <span
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(0,212,255,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#0F0F1A] border border-[#1E1E30] group-hover:border-[#00D4FF]/40 transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#6B7080] group-hover:text-[#00D4FF] transition-colors duration-300" />
      </div>

      <p className="text-[#F0F0F5] text-base font-medium leading-snug pr-4">{solution.label}</p>

      <div className="flex items-center gap-1.5 mt-auto">
        <span className="text-xs text-[#6B7080] group-hover:text-[#00D4FF] transition-colors duration-300">
          {solution.name}
        </span>
        <svg
          className="w-3.5 h-3.5 text-[#6B7080] group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all duration-300"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 7h8M7 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.button>
  );
};

// ─── Detail Panel ─────────────────────────────────────────────────────────────

interface DetailPanelProps {
  solution: Solution;
  onBack: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ solution, onBack }) => {
  const Icon = solution.icon;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      key={solution.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-8 text-sm text-[#6B7080] hover:text-[#00D4FF] transition-colors duration-200 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to all options
      </button>

      {/* Card */}
      <div className="rounded-2xl border border-[#1E1E30] bg-[#141420] overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-8 border-b border-[#1E1E30]"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.04) 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0A0A0F] border border-[#00D4FF]/30">
              <Icon className="w-7 h-7 text-[#00D4FF]" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#00D4FF] mb-1 uppercase">
                Aetrax Solution
              </p>
              <h3 className="text-2xl font-bold text-[#F0F0F5]">{solution.name}</h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            {/* Problem */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#7C3AED] uppercase mb-2">
                The Problem
              </p>
              <p className="text-[#6B7080] leading-relaxed">{solution.problem}</p>
            </div>

            {/* Approach */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#00D4FF] uppercase mb-2">
                Aetrax Approach
              </p>
              <p className="text-[#F0F0F5] leading-relaxed">{solution.approach}</p>
            </div>

            {/* Outcome */}
            <div className="p-4 rounded-xl border border-[#1E1E30] bg-[#0F0F1A]">
              <p className="text-xs font-semibold tracking-widest text-[#6B7080] uppercase mb-2">
                Expected Outcome
              </p>
              <p className="text-[#F0F0F5] font-medium">{solution.outcome}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Capabilities */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#6B7080] uppercase mb-3">
                Capabilities
              </p>
              <ul className="space-y-2">
                {solution.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                    <span className="text-[#F0F0F5] text-sm">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#6B7080] uppercase mb-3">
                Relevant Industries
              </p>
              <div className="flex flex-wrap gap-2">
                {solution.industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-[#1E1E30] bg-[#0F0F1A] text-[#6B7080]"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => scrollTo("solutions")}
                className="flex-1 py-3 px-5 rounded-xl text-sm font-semibold
                  border border-[#00D4FF]/50 text-[#00D4FF] bg-[#00D4FF]/5
                  hover:bg-[#00D4FF]/15 hover:border-[#00D4FF]
                  transition-all duration-200"
              >
                Explore {solution.name.split(" ")[0]} Solution
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex-1 py-3 px-5 rounded-xl text-sm font-semibold
                  bg-[#00D4FF] text-[#0A0A0F]
                  hover:bg-[#33DDFF] hover:shadow-[0_0_24px_rgba(0,212,255,0.35)]
                  transition-all duration-200"
              >
                Talk to Aetrax
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SolutionExplorer() {
  const [selected, setSelected] = useState<Solution | null>(null);

  return (
    <section
      id="solution-explorer"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="w-8 h-px bg-[#00D4FF]" />
          <span className="text-xs font-semibold tracking-widest text-[#00D4FF] uppercase">
            Start Here
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0F0F5] mb-4 max-w-2xl"
        >
          What are you trying to{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #00D4FF 0%, #7C3AED 100%)",
            }}
          >
            make AI do?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#6B7080] text-lg mb-12 max-w-xl"
        >
          Select an objective to see the Aetrax solution that addresses it.
        </motion.p>

        {/* Content area */}
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {solutions.map((sol, i) => (
                <Tile
                  key={sol.id}
                  solution={sol}
                  index={i}
                  onClick={() => setSelected(sol)}
                />
              ))}
            </motion.div>
          ) : (
            <DetailPanel
              key={`detail-${selected.id}`}
              solution={selected}
              onBack={() => setSelected(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
