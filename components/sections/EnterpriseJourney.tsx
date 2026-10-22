"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Stage {
  number: string;
  name: string;
  description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stages: Stage[] = [
  {
    number: "01",
    name: "QUESTION",
    description:
      "A business question is defined and measurable success criteria are agreed.",
  },
  {
    number: "02",
    name: "DATA",
    description:
      "Relevant data sources are identified, assessed for quality, and made accessible.",
  },
  {
    number: "03",
    name: "RETRIEVAL",
    description:
      "A retrieval layer is built to surface the right information at query time.",
  },
  {
    number: "04",
    name: "MODEL",
    description:
      "The appropriate model is selected and configured for the workload.",
  },
  {
    number: "05",
    name: "EVALUATION",
    description:
      "The system is evaluated against real cases before it goes near users.",
  },
  {
    number: "06",
    name: "GOVERNANCE",
    description:
      "Guardrails, audit trails, access controls and policies are applied.",
  },
  {
    number: "07",
    name: "DEPLOYMENT",
    description:
      "The system is deployed in the chosen environment with monitoring in place.",
  },
  {
    number: "08",
    name: "MONITORING",
    description:
      "Quality, latency, cost and drift are tracked continuously after launch.",
  },
];

// ─── Stage accent colours ─────────────────────────────────────────────────────

const stageAccents: string[] = [
  "#00D4FF", // 01 QUESTION  — cyan
  "#00D4FF", // 02 DATA
  "#7C3AED", // 03 RETRIEVAL — violet
  "#7C3AED", // 04 MODEL
  "#F59E0B", // 05 EVALUATION — amber
  "#EF4444", // 06 GOVERNANCE — red
  "#10B981", // 07 DEPLOYMENT — emerald
  "#00D4FF", // 08 MONITORING — cyan
];

// ─── Individual stage row ─────────────────────────────────────────────────────

function StageRow({
  stage,
  index,
  total,
  accent,
}: {
  stage: Stage;
  index: number;
  total: number;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          setPassed(false);
        } else {
          // If scrolled past (top out of view)
          if (entry.boundingClientRect.top < 0) {
            setPassed(true);
            setActive(false);
          } else {
            setActive(false);
            setPassed(false);
          }
        }
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLit = active || passed;

  return (
    <div ref={ref} className="relative flex gap-0">
      {/* ── Vertical pipeline ── */}
      <div className="flex flex-col items-center mr-6 w-8 shrink-0">
        {/* Connector line above */}
        {index > 0 && (
          <motion.div
            className="w-px flex-1 min-h-[24px]"
            style={{
              background: isLit
                ? `linear-gradient(to bottom, ${stageAccents[index - 1]}, ${accent})`
                : "#1E1E30",
              transition: "background 0.6s ease",
            }}
          />
        )}

        {/* Number orb */}
        <motion.div
          animate={{
            backgroundColor: isLit ? accent + "22" : "rgba(30,30,48,0.6)",
            borderColor: isLit ? accent : "#1E1E30",
            boxShadow: isLit ? `0 0 16px ${accent}55, 0 0 4px ${accent}44` : "none",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10"
        >
          <motion.span
            animate={{ color: isLit ? accent : "#3a3a52" }}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-bold font-mono"
          >
            {stage.number}
          </motion.span>
        </motion.div>

        {/* Connector line below */}
        {index < total - 1 && (
          <motion.div
            className="w-px flex-1 min-h-[24px]"
            style={{
              background: isLit ? accent : "#1E1E30",
              transition: "background 0.6s ease",
            }}
          />
        )}
      </div>

      {/* ── Content card ── */}
      <motion.div
        animate={{
          opacity: isLit ? 1 : 0.3,
          x: isLit ? 0 : -6,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex-1 pb-10"
      >
        {/* Glow backdrop when active */}
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at left center, ${accent}0f 0%, transparent 70%)`,
            }}
          />
        )}

        <div
          className="relative rounded-xl border p-5 transition-all duration-500"
          style={{
            borderColor: isLit ? accent + "33" : "#1E1E30",
            background: isLit ? "rgba(20,20,32,0.9)" : "rgba(14,14,20,0.5)",
          }}
        >
          {/* Stage name */}
          <motion.p
            animate={{ color: isLit ? accent : "#3a3a52" }}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-bold tracking-[0.2em] mb-2"
          >
            {stage.name}
          </motion.p>

          {/* Description */}
          <motion.p
            animate={{ color: isLit ? "#F0F0F5" : "#3a3a52" }}
            transition={{ duration: 0.4 }}
            className="text-sm leading-relaxed"
          >
            {stage.description}
          </motion.p>

          {/* Active indicator pulse */}
          {active && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-4 right-4 w-2 h-2 rounded-full"
              style={{ backgroundColor: accent }}
            >
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EnterpriseJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // Track filled height of the full pipeline bar
  const pipelineHeight = useTransform(smoothProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-28 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
            transform: "translate(20%, -20%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)",
            transform: "translate(-20%, 20%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.25em] text-[#00D4FF] mb-4"
          >
            HOW PRODUCTION AI IS ENGINEERED
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0F0F5] leading-tight mb-4"
          >
            A simplified view of how production AI systems are engineered.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#6B7080] text-sm italic"
          >
            This is not a case study. It is a structural view of how Aetrax builds AI.
          </motion.p>
        </div>

        {/* Pipeline */}
        <div className="relative">
          {stages.map((stage, i) => (
            <StageRow
              key={stage.number}
              stage={stage}
              index={i}
              total={stages.length}
              accent={stageAccents[i]}
            />
          ))}
        </div>

        {/* Terminal node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex items-center gap-4"
        >
          <div className="flex flex-col items-center mr-6 w-8">
            <div className="w-px h-6 bg-[#1E1E30]" />
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: "#00D4FF",
                background: "rgba(0,212,255,0.12)",
                boxShadow: "0 0 20px rgba(0,212,255,0.3)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#00D4FF]" />
            </div>
          </div>
          <div
            className="rounded-xl border border-[#00D4FF]/30 bg-[#141420] px-5 py-3 text-sm font-semibold text-[#00D4FF] tracking-wider"
            style={{ boxShadow: "0 0 20px rgba(0,212,255,0.1)" }}
          >
            PRODUCTION AI SYSTEM — LIVE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
