"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SolutionModule {
  id: string;
  number: string;
  layer: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  outcome: string;
  industries: string[];
  accentColor: string;
  glowColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const modules: SolutionModule[] = [
  {
    id: "strategy",
    number: "01",
    layer: "STRATEGY LAYER",
    name: "AI Strategy and Readiness",
    tagline: "Identify and prioritise the AI opportunities that matter most",
    description:
      "Identify and prioritise the AI opportunities that matter most, and prepare your data, people and platforms to deliver them.",
    capabilities: [
      "Use-case discovery and value mapping",
      "Data readiness assessment",
      "Roadmap and business case",
      "Governance and operating model",
    ],
    outcome: "A prioritised, funded AI roadmap that your teams can deliver.",
    industries: ["All Industries", "Enterprise", "Mid-market", "Public Sector"],
    accentColor: "#7C3AED",
    glowColor: "rgba(124,58,237,0.25)",
  },
  {
    id: "doc-intelligence",
    number: "02",
    layer: "DOCUMENT INTELLIGENCE",
    name: "Intelligent Document Processing",
    tagline: "Turn documents into validated, structured data",
    description:
      "OCR and language-model pipelines that turn documents into validated, structured data for your core systems.",
    capabilities: [
      "OCR for scanned and handwritten input",
      "Field extraction across layouts",
      "Validation rules and confidence scoring",
      "Human-in-the-loop review",
    ],
    outcome: "Less manual data entry, with accuracy that can be measured.",
    industries: ["Insurance", "Banking", "Healthcare", "Logistics", "Public Sector"],
    accentColor: "#00D4FF",
    glowColor: "rgba(0,212,255,0.2)",
  },
  {
    id: "knowledge",
    number: "03",
    layer: "KNOWLEDGE & GENERATIVE AI",
    name: "Generative AI and Knowledge",
    tagline: "Enterprise assistants that answer from your own data",
    description:
      "Enterprise assistants and search that answer questions from your policies, contracts and records, with citations and permission-aware access.",
    capabilities: [
      "RAG (Retrieval-Augmented Generation)",
      "Enterprise knowledge assistants",
      "Copilots for teams and workflows",
      "Multilingual question answering",
    ],
    outcome: "Faster, consistent answers that people can check against the source.",
    industries: ["Financial Services", "Legal", "Healthcare", "Government", "Energy"],
    accentColor: "#00D4FF",
    glowColor: "rgba(0,212,255,0.2)",
  },
  {
    id: "agentic",
    number: "04",
    layer: "AGENTIC AUTOMATION",
    name: "Agentic Automation",
    tagline: "Multi-agent systems that complete end-to-end business processes",
    description:
      "Multi-agent systems that plan, use enterprise tools and complete business processes end to end, with approvals and full audit trails.",
    capabilities: [
      "Multi-agent orchestration",
      "Tool and API integration through MCP",
      "Approval and escalation workflows",
      "Guardrails and spend controls",
    ],
    outcome: "Multi-step work completed reliably, with people kept in control.",
    industries: ["Operations", "Finance", "HR", "Supply Chain", "Customer Service"],
    accentColor: "#00D4FF",
    glowColor: "rgba(0,212,255,0.2)",
  },
  {
    id: "sovereign",
    number: "05",
    layer: "PRIVATE AI DEPLOYMENT",
    name: "Sovereign and Private AI",
    tagline: "AI inside your perimeter — no data leaves your control",
    description:
      "AI deployed inside your cloud account or data centre, including open-weight models, for data that must stay under your control.",
    capabilities: [
      "Private cloud deployment",
      "On-premise and air-gapped options",
      "Open-weight model hosting",
      "Data residency controls",
    ],
    outcome: "The benefits of AI without giving up control of the data.",
    industries: ["Defence", "Government", "Healthcare", "Banking", "Critical Infrastructure"],
    accentColor: "#7C3AED",
    glowColor: "rgba(124,58,237,0.25)",
  },
  {
    id: "operations",
    number: "06",
    layer: "ENGINEERING & OPERATIONS",
    name: "AI Engineering and Operations",
    tagline: "Keep AI systems accurate, compliant and cost-efficient after launch",
    description: "The engineering discipline that keeps AI dependable after launch.",
    capabilities: [
      "Evaluation suites and release gates",
      "Tracing and observability",
      "Cost and performance optimisation",
      "Model and prompt lifecycle management",
    ],
    outcome: "AI systems that stay accurate, compliant and cost-efficient.",
    industries: ["Technology", "Financial Services", "Healthcare", "Retail", "Telecoms"],
    accentColor: "#00D4FF",
    glowColor: "rgba(0,212,255,0.2)",
  },
];

// ─── Animated Connector ───────────────────────────────────────────────────────

const Connector: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className="relative flex flex-col items-center py-1 select-none">
    <div className="relative w-px h-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#1E1E30]" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: active
            ? "linear-gradient(180deg, #00D4FF 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(0,212,255,0.35) 0%, transparent 100%)",
        }}
        animate={{ scaleY: [0, 1, 0], originY: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    <div
      className="w-1.5 h-1.5 rounded-full border"
      style={{
        borderColor: active ? "#00D4FF" : "#1E1E30",
        background: active ? "#00D4FF" : "transparent",
      }}
    />
    <div className="relative w-px h-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#1E1E30]" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: active
            ? "linear-gradient(180deg, transparent 0%, #7C3AED 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.25) 100%)",
        }}
        animate={{ scaleY: [0, 1, 0], originY: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      />
    </div>
  </div>
);

// ─── Module Block ─────────────────────────────────────────────────────────────

interface ModuleBlockProps {
  mod: SolutionModule;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const ModuleBlock: React.FC<ModuleBlockProps> = ({ mod, isActive, onClick, index }) => (
  <motion.button
    layout
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    onClick={onClick}
    className="relative w-full text-left group cursor-pointer"
    whileTap={{ scale: 0.99 }}
  >
    {/* Glow layer */}
    <div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      style={{ boxShadow: `0 0 40px ${mod.glowColor}` }}
    />

    <div
      className="relative rounded-xl border transition-all duration-300 overflow-hidden"
      style={{
        background: isActive ? "#141428" : "#141420",
        borderColor: isActive ? mod.accentColor : "#1E1E30",
        boxShadow: isActive ? `0 0 32px ${mod.glowColor}` : "none",
      }}
    >
      {/* Active indicator bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl transition-all duration-300"
        style={{
          background: isActive
            ? `linear-gradient(180deg, ${mod.accentColor} 0%, ${mod.accentColor}55 100%)`
            : "transparent",
        }}
      />

      <div className="px-6 py-5 flex items-center gap-5">
        {/* Number badge */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold tracking-wider transition-colors duration-300"
          style={{
            background: isActive ? `${mod.accentColor}18` : "#0F0F1A",
            border: `1px solid ${isActive ? mod.accentColor + "50" : "#1E1E30"}`,
            color: isActive ? mod.accentColor : "#6B7080",
          }}
        >
          {mod.number}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[10px] font-semibold tracking-widest mb-0.5 uppercase transition-colors duration-300"
            style={{ color: isActive ? mod.accentColor : "#6B7080" }}
          >
            {mod.layer}
          </p>
          <p
            className="font-semibold text-sm truncate transition-colors duration-300"
            style={{ color: isActive ? "#F0F0F5" : "#B8B8C8" }}
          >
            {mod.name}
          </p>
          <p className="text-xs text-[#6B7080] truncate mt-0.5 group-hover:text-[#9B9BAA] transition-colors duration-200">
            {mod.tagline}
          </p>
        </div>

        {/* Arrow */}
        <svg
          className="flex-shrink-0 w-4 h-4 transition-all duration-300"
          style={{ color: isActive ? mod.accentColor : "#2A2A3E" }}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </motion.button>
);

// ─── Detail Panel ─────────────────────────────────────────────────────────────

interface DetailPanelProps {
  mod: SolutionModule;
  onClose: () => void;
  isMobile: boolean;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ mod, onClose, isMobile }) => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  const panelVariants = isMobile
    ? {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
      }
    : {
        initial: { x: 60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 60, opacity: 0 },
      };

  return (
    <>
      {/* Backdrop (mobile only) */}
      {isMobile && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      <motion.div
        key={mod.id}
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={
          isMobile
            ? "fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden max-h-[85vh] flex flex-col"
            : "relative rounded-2xl overflow-hidden flex flex-col h-full"
        }
        style={{ background: "#141420", border: `1px solid ${mod.accentColor}40` }}
      >
        {/* Drag handle (mobile) */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-[#2A2A3E]" />
          </div>
        )}

        {/* Header */}
        <div
          className="flex-shrink-0 px-6 py-5 border-b flex items-start justify-between gap-4"
          style={{
            borderColor: `${mod.accentColor}25`,
            background: `linear-gradient(135deg, ${mod.accentColor}08 0%, transparent 60%)`,
          }}
        >
          <div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mb-1"
              style={{ color: mod.accentColor }}
            >
              {mod.layer}
            </p>
            <h3 className="text-lg font-bold text-[#F0F0F5] leading-tight">{mod.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-[#1E1E30] text-[#6B7080] hover:text-[#F0F0F5] hover:border-[#2A2A3E] transition-colors duration-200 mt-0.5"
          >
            <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Description */}
          <p className="text-[#F0F0F5] leading-relaxed text-sm">{mod.description}</p>

          {/* Capabilities */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#6B7080] mb-3">
              Capabilities
            </p>
            <ul className="space-y-2.5">
              {mod.capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: mod.accentColor }}
                  />
                  <span className="text-[#F0F0F5] text-sm">{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div
            className="p-4 rounded-xl border"
            style={{
              background: `${mod.accentColor}08`,
              borderColor: `${mod.accentColor}25`,
            }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#6B7080] mb-1.5">
              Expected Outcome
            </p>
            <p className="text-[#F0F0F5] text-sm font-medium">{mod.outcome}</p>
          </div>

          {/* Industries */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#6B7080] mb-3">
              Relevant Industries
            </p>
            <div className="flex flex-wrap gap-2">
              {mod.industries.map((ind) => (
                <span
                  key={ind}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-[#1E1E30] bg-[#0F0F1A] text-[#6B7080]"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 px-6 py-5 border-t border-[#1E1E30]">
          <button
            onClick={scrollToContact}
            className="w-full py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: mod.accentColor,
              color: "#0A0A0F",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px ${mod.glowColor}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Talk to Aetrax about this
          </button>
        </div>
      </motion.div>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SolutionsArchitecture() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeModule = modules.find((m) => m.id === activeId) ?? null;

  const handleModuleClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="solutions"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#0F0F1A" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 80% 50%, rgba(124,58,237,0.05) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 80%, rgba(0,212,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-[#7C3AED]" />
            <span className="text-xs font-semibold tracking-widest text-[#7C3AED] uppercase">
              Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0F0F5] mb-4"
          >
            Six components.{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #7C3AED 0%, #00D4FF 100%)",
              }}
            >
              One coherent AI system.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#6B7080] text-lg max-w-xl"
          >
            Each solution module connects to the others. Click any component to explore it.
          </motion.p>
        </div>

        {/* Layout: pipeline + panel */}
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6 items-start`}>
          {/* Pipeline column */}
          <div className={`${isMobile ? "w-full" : activeModule ? "w-[420px] flex-shrink-0" : "w-full max-w-2xl mx-auto"} transition-all duration-500`}>
            <div className="flex flex-col">
              {modules.map((mod, i) => (
                <div key={mod.id}>
                  <ModuleBlock
                    mod={mod}
                    isActive={activeId === mod.id}
                    onClick={() => handleModuleClick(mod.id)}
                    index={i}
                  />
                  {i < modules.length - 1 && (
                    <div className="flex justify-center">
                      <Connector active={activeId === mod.id || activeId === modules[i + 1].id} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Panel (desktop inline) */}
          {!isMobile && (
            <div className={`flex-1 transition-all duration-500 ${activeModule ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <AnimatePresence mode="wait">
                {activeModule && !isMobile && (
                  <DetailPanel
                    key={activeModule.id}
                    mod={activeModule}
                    onClose={() => setActiveId(null)}
                    isMobile={false}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Panel (mobile bottom sheet) */}
        {isMobile && (
          <AnimatePresence>
            {activeModule && (
              <DetailPanel
                key={activeModule.id}
                mod={activeModule}
                onClose={() => setActiveId(null)}
                isMobile={true}
              />
            )}
          </AnimatePresence>
        )}

        {/* No selection hint */}
        {!activeModule && !isMobile && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#2A2A3E] text-sm mt-8 italic select-none"
          >
            Click any module to explore its details →
          </motion.p>
        )}
      </div>
    </section>
  );
}
