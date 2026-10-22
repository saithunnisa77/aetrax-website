"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Principle {
  id: number;
  name: string;
  commitment: string;
  icon: React.ReactNode;
}

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 2L3 6v5c0 4.55 3.4 8.74 8 9.93C16.6 19.74 20 15.55 20 11V6L11 2z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);
const EyeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <ellipse cx="11" cy="11" rx="8" ry="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M4 12l5 5L18 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const PersonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M4 19c0-3.866 3.134-7 7-7h0c3.866 0 7 3.134 7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
const ScalesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <line x1="11" y1="3" x2="11" y2="19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="4" y1="3" x2="18" y2="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M4 3l-3 6h6L4 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M18 3l-3 6h6L18 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="4" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M7 10V7a4 4 0 018 0v3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="11" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const principles: Principle[] = [
  {
    id: 0,
    name: "Transparency",
    commitment:
      "Answers cite their sources, and every request can be traced from input to output.",
    icon: <EyeIcon />,
  },
  {
    id: 1,
    name: "Reliability",
    commitment:
      "Solutions are evaluated against real cases before release and monitored continuously afterwards.",
    icon: <CheckIcon />,
  },
  {
    id: 2,
    name: "Safety",
    commitment:
      "Guardrails protect against prompt injection, data leakage, and harmful or off-policy outputs.",
    icon: <ShieldIcon />,
  },
  {
    id: 3,
    name: "Human Oversight",
    commitment:
      "People approve high-impact actions and review low-confidence results.",
    icon: <PersonIcon />,
  },
  {
    id: 4,
    name: "Fairness",
    commitment:
      "Outputs are tested for bias and for inconsistent treatment across user groups and cases.",
    icon: <ScalesIcon />,
  },
  {
    id: 5,
    name: "Privacy",
    commitment:
      "Data is kept to the minimum needed, protected, never used to train models, and stored where the client requires.",
    icon: <LockIcon />,
  },
];

function PrincipleCard({ principle }: { principle: Principle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: principle.id * 0.07 }}
      className="relative rounded-xl border p-5 cursor-default overflow-hidden transition-all duration-300"
      style={{
        borderColor: hovered ? "#00D4FF" : "#1E1E30",
        background: hovered ? "rgba(0,212,255,0.06)" : "#141420",
        boxShadow: hovered ? "0 0 28px rgba(0,212,255,0.15)" : "none",
      }}
    >
      {/* Glow overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top left, rgba(0,212,255,0.1) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-start gap-4 relative z-10">
        <motion.div
          animate={{ color: hovered ? "#00D4FF" : "#6B7080" }}
          transition={{ duration: 0.2 }}
          className="mt-0.5 flex-shrink-0"
        >
          {principle.icon}
        </motion.div>

        <div className="min-w-0">
          <motion.p
            animate={{ color: hovered ? "#F0F0F5" : "#C8C8D4" }}
            transition={{ duration: 0.2 }}
            className="font-semibold text-sm mb-2"
          >
            {principle.name}
          </motion.p>

          <AnimatePresence>
            {hovered ? (
              <motion.p
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
                className="text-sm text-[#A0A0B0] leading-relaxed overflow-hidden"
              >
                {principle.commitment}
              </motion.p>
            ) : (
              <motion.p
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-[#6B7080] leading-relaxed line-clamp-2"
              >
                {principle.commitment}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function PulsingRing() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer animated rings */}
      {[1.6, 1.35, 1.1].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#00D4FF]"
          style={{
            width: 120 * scale,
            height: 120 * scale,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.18, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Core box */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center rounded-2xl border-2 text-center"
        style={{
          width: 120,
          height: 120,
          borderColor: "#00D4FF",
          background: "rgba(0,212,255,0.06)",
          boxShadow: "0 0 40px rgba(0,212,255,0.2), inset 0 0 20px rgba(0,212,255,0.05)",
        }}
        animate={{
          boxShadow: [
            "0 0 30px rgba(0,212,255,0.18), inset 0 0 15px rgba(0,212,255,0.04)",
            "0 0 55px rgba(0,212,255,0.32), inset 0 0 25px rgba(0,212,255,0.09)",
            "0 0 30px rgba(0,212,255,0.18), inset 0 0 15px rgba(0,212,255,0.04)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-bold tracking-[0.15em] text-[#00D4FF] leading-tight">
          AI
          <br />
          SYSTEM
        </span>
      </motion.div>
    </div>
  );
}

export default function ResponsibleAI() {
  return (
    <section id="responsible-ai" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0A0A0F]">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] text-[#00D4FF] mb-4"
        >
          RESPONSIBLE AI
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#F0F0F5] mb-4 leading-tight"
        >
          Governance is not a feature.{" "}
          <span className="text-[#7C3AED]">It&rsquo;s the foundation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#6B7080] text-base max-w-2xl mb-16"
        >
          Six principles built into every Aetrax system from day one.
        </motion.p>

        {/* Main layout: grid + central element */}
        <div className="grid lg:grid-cols-[1fr_180px_1fr] gap-8 items-start">
          {/* Left column — 3 principles */}
          <div className="grid gap-4">
            {principles.slice(0, 3).map((p) => (
              <PrincipleCard key={p.id} principle={p} />
            ))}
          </div>

          {/* Center — pulsing AI system */}
          <div className="hidden lg:flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-6">
              {/* Governance label top */}
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  className="w-px bg-gradient-to-b from-transparent to-[#00D4FF]"
                  style={{ height: 48 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[9px] tracking-[0.2em] text-[#00D4FF] font-semibold rotate-0">
                  GOVERNANCE
                </span>
              </div>

              <PulsingRing />

              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] tracking-[0.2em] text-[#00D4FF] font-semibold">
                  LAYER
                </span>
                <motion.div
                  className="w-px bg-gradient-to-t from-transparent to-[#00D4FF]"
                  style={{ height: 48 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </div>
          </div>

          {/* Right column — 3 principles */}
          <div className="grid gap-4">
            {principles.slice(3).map((p) => (
              <PrincipleCard key={p.id} principle={p} />
            ))}
          </div>
        </div>

        {/* Mobile center element */}
        <div className="flex lg:hidden justify-center mt-10 mb-10">
          <PulsingRing />
        </div>
      </div>
    </section>
  );
}
