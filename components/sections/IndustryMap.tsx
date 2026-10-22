"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Industry {
  id: number;
  name: string;
  challenges: string[];
  approach: string[];
}

const industries: Industry[] = [
  {
    id: 0,
    name: "Banking & Financial Services",
    challenges: [
      "High-volume document operations requiring manual review",
      "Complex policy and regulatory circulars with frequent updates",
      "Strict audit requirements with full traceability demands",
    ],
    approach: [
      "Reconciliation support with traceable, cited outputs",
      "KYC document processing at scale",
      "Policy assistants that cite source documents directly",
    ],
  },
  {
    id: 1,
    name: "Insurance",
    challenges: [
      "Manual claims intake across varied document formats",
      "Inconsistent underwriting decisions across teams",
      "Policy wording interpretation at high volumes",
    ],
    approach: [
      "Claims document extraction and structured data output",
      "Policy wording assistants with precise source citations",
      "Traceable decision support for underwriting workflows",
    ],
  },
  {
    id: 2,
    name: "Healthcare & Life Sciences",
    challenges: [
      "Sensitive records requiring strict data protection",
      "Large regulatory submissions demanding expert review",
      "Strict data residency and sovereignty obligations",
    ],
    approach: [
      "Private AI for document review without data leaving client environment",
      "Knowledge search and summarisation for clinical teams",
      "Deployment within the client's own infrastructure",
    ],
  },
  {
    id: 3,
    name: "Legal & Compliance",
    challenges: [
      "Large contract portfolios with complex obligation tracking",
      "Time-consuming evidence gathering for audits",
      "Key-term extraction from varied document structures",
    ],
    approach: [
      "Clause search across entire contract portfolios",
      "Key-term extraction into structured obligation registers",
      "Audit evidence retrieval with full citation chain",
    ],
  },
  {
    id: 4,
    name: "Manufacturing & Operations",
    challenges: [
      "Critical knowledge locked inside manuals and SOPs",
      "Quality data spread across many disconnected reports",
      "Slow access to operational expertise at point of work",
    ],
    approach: [
      "Operations knowledge assistants accessible on the shop floor",
      "Analysis of quality reports at the point of work",
      "SOP and manual search with contextual answers",
    ],
  },
  {
    id: 5,
    name: "Public Sector & Education",
    challenges: [
      "High service demand against constrained staffing",
      "Strict data residency rules and sovereign requirements",
      "Large volumes of forms and records requiring processing",
    ],
    approach: [
      "Citizen and learner assistants with guardrailed responses",
      "Document automation deployed under sovereign controls",
      "On-premise or national cloud deployment options",
    ],
  },
];

export default function IndustryMap() {
  const [activeId, setActiveId] = useState(0);
  const [prevId, setPrevId] = useState(0);

  const handleSelect = (id: number) => {
    if (id === activeId) return;
    setPrevId(activeId);
    setActiveId(id);
  };

  const direction = activeId > prevId ? 1 : -1;
  const active = industries[activeId];

  return (
    <section id="industries" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] text-[#00D4FF] mb-4"
        >
          INDUSTRIES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#F0F0F5] mb-12 leading-tight max-w-2xl"
        >
          Built for the industries where AI governance matters most.
        </motion.h2>

        {/* Tabs — horizontal scrollable */}
        <div className="mb-8 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => handleSelect(industry.id)}
                className="relative flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none border"
                style={{
                  borderColor:
                    activeId === industry.id ? "#00D4FF" : "#1E1E30",
                  background:
                    activeId === industry.id
                      ? "rgba(0,212,255,0.08)"
                      : "#141420",
                  color: activeId === industry.id ? "#00D4FF" : "#6B7080",
                }}
              >
                {activeId === industry.id && (
                  <motion.div
                    layoutId="industry-tab-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.05) 100%)",
                    }}
                    transition={{ type: "spring", duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">{industry.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content panel */}
        <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeId}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="rounded-2xl border border-[#1E1E30] bg-[#141420] overflow-hidden">
                {/* Panel header */}
                <div
                  className="px-8 py-5 border-b border-[#1E1E30]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,212,255,0.04) 0%, transparent 60%)",
                  }}
                >
                  <h3 className="text-lg font-semibold text-[#F0F0F5]">
                    {active.name}
                  </h3>
                </div>

                {/* Two column: Challenges | Approach */}
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1E1E30]">
                  {/* Challenges */}
                  <div className="p-8">
                    <p className="text-xs font-semibold tracking-widest text-[#6B7080] mb-5 uppercase flex items-center gap-2">
                      <span className="text-yellow-500">⚠</span> Challenges
                    </p>
                    <ul className="space-y-4">
                      {active.challenges.map((c, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.35 }}
                          className="flex items-start gap-3 text-sm text-[#A0A0B0] leading-relaxed"
                        >
                          <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full bg-[#6B7080] translate-y-1.5" />
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Aetrax Approach */}
                  <div className="p-8">
                    <p className="text-xs font-semibold tracking-widest text-[#00D4FF] mb-5 uppercase flex items-center gap-2">
                      <span>→</span> Aetrax Approach
                    </p>
                    <ul className="space-y-4">
                      {active.approach.map((a, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 + 0.1, duration: 0.35 }}
                          className="flex items-start gap-3 text-sm text-[#F0F0F5] leading-relaxed"
                        >
                          <span
                            className="mt-1 flex-shrink-0 text-[#00D4FF] font-bold"
                            aria-hidden
                          >
                            →
                          </span>
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Disclaimer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-xs text-[#6B7080] border border-[#1E1E30] rounded-lg px-5 py-3 bg-[#141420]"
        >
          <span className="font-medium text-[#A0A0B0]">Note:</span> Use cases
          shown are illustrative. Aetrax does not publish client names or case
          studies.
        </motion.p>
      </div>
    </section>
  );
}
