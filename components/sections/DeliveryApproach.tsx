"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Phase {
  id: number;
  number: string;
  name: string;
  focus: string;
  deliverable: string;
  steps: string[];
}

const phases: Phase[] = [
  {
    id: 0,
    number: "01",
    name: "ASSESS",
    focus:
      "Understand processes, data and constraints, and agree measurable success criteria.",
    deliverable: "Prioritised use cases and success metrics",
    steps: ["Input", "Processes / Data / Constraints", "Analysis", "Prioritised Use Cases"],
  },
  {
    id: 1,
    number: "02",
    name: "PROVE",
    focus:
      "Build a working solution on real data and evaluate it against real cases.",
    deliverable: "Working pilot and evaluation report",
    steps: ["Real Data", "Working Pilot", "Evaluation", "Report"],
  },
  {
    id: 2,
    number: "03",
    name: "INDUSTRIALISE",
    focus:
      "Add security, integration, scalability and governance, then deploy in the chosen environment.",
    deliverable: "Production system, documentation and training",
    steps: ["Security", "Integration", "Scalability", "Governance", "Production Deploy"],
  },
  {
    id: 3,
    number: "04",
    name: "OPERATE",
    focus:
      "Keep evaluating, monitoring and optimising quality, latency and cost.",
    deliverable: "Regular performance reports and improvements",
    steps: ["Evaluation", "Monitoring", "Optimisation", "Reports"],
  },
];

function StepDiagram({ steps, active }: { steps: string[]; active: boolean }) {
  const [litStep, setLitStep] = useState(-1);

  useEffect(() => {
    if (!active) {
      setLitStep(-1);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setLitStep(i);
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [active, steps]);

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={
              litStep >= idx
                ? { opacity: 1, scale: 1 }
                : { opacity: 0.35, scale: 0.95 }
            }
            transition={{ duration: 0.3 }}
            className="relative px-3 py-2 rounded-md border text-xs font-medium whitespace-nowrap"
            style={{
              borderColor: litStep >= idx ? "#00D4FF" : "#1E1E30",
              color: litStep >= idx ? "#00D4FF" : "#6B7080",
              background: litStep >= idx ? "rgba(0,212,255,0.07)" : "#141420",
              boxShadow:
                litStep >= idx ? "0 0 12px rgba(0,212,255,0.2)" : "none",
            }}
          >
            {litStep >= idx && (
              <motion.span
                layoutId={`glow-${idx}`}
                className="absolute inset-0 rounded-md"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)",
                }}
              />
            )}
            {step}
          </motion.div>
          {idx < steps.length - 1 && (
            <motion.svg
              width="20"
              height="10"
              viewBox="0 0 20 10"
              animate={{ opacity: litStep > idx ? 1 : 0.2 }}
              transition={{ duration: 0.3 }}
            >
              <polyline
                points="0,5 14,5"
                stroke={litStep > idx ? "#00D4FF" : "#1E1E30"}
                strokeWidth="1.5"
                fill="none"
              />
              <polyline
                points="10,1 14,5 10,9"
                stroke={litStep > idx ? "#00D4FF" : "#1E1E30"}
                strokeWidth="1.5"
                fill="none"
              />
            </motion.svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function DeliveryApproach() {
  const [activePhase, setActivePhase] = useState(0);
  const [prevPhase, setPrevPhase] = useState(0);

  const handlePhaseChange = (id: number) => {
    setPrevPhase(activePhase);
    setActivePhase(id);
  };

  const direction = activePhase > prevPhase ? 1 : -1;

  return (
    <section id="approach" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] text-[#00D4FF] mb-4"
        >
          DELIVERY APPROACH
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#F0F0F5] mb-4 leading-tight"
        >
          From first workshop to production system.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#6B7080] text-base max-w-2xl mb-16"
        >
          Every engagement moves through four phases. Each ends with a decision
          point before further investment.
        </motion.p>

        {/* Phase Stepper — Desktop */}
        <div className="hidden md:flex items-start mb-0 relative">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="flex items-center flex-1">
              {/* Tab */}
              <button
                onClick={() => handlePhaseChange(phase.id)}
                className="flex flex-col items-start flex-1 group relative pb-6 focus:outline-none"
              >
                {/* Active indicator line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#00D4FF]"
                  initial={false}
                  animate={{ width: activePhase === phase.id ? "100%" : "0%" }}
                  transition={{ duration: 0.35 }}
                  style={{ borderRadius: 2 }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1E1E30]" />

                <motion.span
                  animate={{
                    color: activePhase === phase.id ? "#00D4FF" : "#6B7080",
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-bold mb-1 tabular-nums"
                >
                  {phase.number}
                </motion.span>
                <motion.span
                  animate={{
                    color: activePhase === phase.id ? "#F0F0F5" : "#6B7080",
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-semibold tracking-widest"
                >
                  {phase.name}
                </motion.span>
              </button>

              {/* Connector */}
              {idx < phases.length - 1 && (
                <div className="w-8 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Phase Stepper — Mobile */}
        <div className="flex md:hidden flex-col gap-2 mb-8">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => handlePhaseChange(phase.id)}
              className="flex items-center gap-4 px-4 py-3 rounded-lg border transition-colors duration-200 text-left"
              style={{
                borderColor:
                  activePhase === phase.id ? "#00D4FF" : "#1E1E30",
                background:
                  activePhase === phase.id
                    ? "rgba(0,212,255,0.06)"
                    : "#141420",
              }}
            >
              <span
                className="text-lg font-bold tabular-nums"
                style={{
                  color: activePhase === phase.id ? "#00D4FF" : "#6B7080",
                }}
              >
                {phase.number}
              </span>
              <span
                className="text-sm font-semibold tracking-widest"
                style={{
                  color: activePhase === phase.id ? "#F0F0F5" : "#6B7080",
                }}
              >
                {phase.name}
              </span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="relative overflow-hidden" style={{ minHeight: 300 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activePhase}
              custom={direction}
              initial={{ opacity: 0, x: direction * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 48 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="mt-10 md:mt-8 rounded-2xl border border-[#1E1E30] bg-[#141420] p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: focus */}
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-[#6B7080] mb-3 uppercase">
                      Focus
                    </p>
                    <p className="text-[#F0F0F5] text-lg leading-relaxed">
                      {phases[activePhase].focus}
                    </p>

                    {/* Deliverable badge */}
                    <div className="mt-6">
                      <p className="text-xs font-semibold tracking-widest text-[#6B7080] mb-3 uppercase">
                        Deliverable
                      </p>
                      <span
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                        style={{
                          borderColor: "rgba(124,58,237,0.5)",
                          background: "rgba(124,58,237,0.12)",
                          color: "#C4B5FD",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M2 7l3.5 3.5L12 3.5"
                            stroke="#C4B5FD"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {phases[activePhase].deliverable}
                      </span>
                    </div>
                  </div>

                  {/* Right: step diagram */}
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-[#6B7080] mb-3 uppercase">
                      Process Flow
                    </p>
                    <StepDiagram
                      steps={phases[activePhase].steps}
                      active={true}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-[#6B7080] italic"
        >
          We don&rsquo;t jump from idea straight to production.
        </motion.p>
      </div>
    </section>
  );
}
