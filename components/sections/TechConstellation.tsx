"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TechPill {
  label: string;
}

interface TechCategory {
  id: number;
  name: string;
  color: string;
  glowColor: string;
  pills: TechPill[];
}

const categories: TechCategory[] = [
  {
    id: 0,
    name: "Foundation Models",
    color: "#00D4FF",
    glowColor: "rgba(0,212,255,0.18)",
    pills: [
      { label: "Anthropic Claude" },
      { label: "Google Gemini" },
      { label: "Meta Llama" },
      { label: "Mistral" },
      { label: "Qwen" },
    ],
  },
  {
    id: 1,
    name: "AI Frameworks",
    color: "#7C3AED",
    glowColor: "rgba(124,58,237,0.18)",
    pills: [
      { label: "LangChain" },
      { label: "LangGraph" },
      { label: "AutoGen" },
      { label: "Model Context Protocol" },
    ],
  },
  {
    id: 2,
    name: "Data & Retrieval",
    color: "#06B6D4",
    glowColor: "rgba(6,182,212,0.18)",
    pills: [
      { label: "Qdrant" },
      { label: "PostgreSQL" },
      { label: "PaddleOCR" },
      { label: "FastAPI" },
      { label: "Vector Databases" },
      { label: "OCR Engines" },
    ],
  },
  {
    id: 3,
    name: "Cloud & Infrastructure",
    color: "#A78BFA",
    glowColor: "rgba(167,139,250,0.18)",
    pills: [
      { label: "Amazon Web Services" },
      { label: "AWS Bedrock" },
      { label: "Microsoft Azure" },
      { label: "Google Cloud" },
      { label: "On-premise Containers" },
    ],
  },
];

function Pill({
  label,
  color,
  glowColor,
  delay,
}: {
  label: string;
  color: string;
  glowColor: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.07,
        boxShadow: `0 0 16px ${glowColor}`,
        borderColor: color,
        color: color,
      }}
      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border cursor-default transition-colors duration-150"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
        color: "#A0A0B0",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {label}
    </motion.span>
  );
}

function CategoryCard({ category, inView }: { category: TechCategory; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.55,
        delay: category.id * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-2xl border border-[#1E1E30] bg-[#141420] p-6 overflow-hidden"
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-28 h-28 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${category.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Category header */}
      <div className="flex items-center gap-2.5 mb-5 relative z-10">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }}
        />
        <p
          className="text-xs font-bold tracking-[0.18em] uppercase"
          style={{ color: category.color }}
        >
          {category.name}
        </p>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.pills.map((pill, i) => (
          <Pill
            key={pill.label}
            label={pill.label}
            color={category.color}
            glowColor={category.glowColor}
            delay={inView ? category.id * 0.12 + i * 0.06 + 0.15 : 0}
          />
        ))}
      </div>

      {/* Subtle bottom connecting line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${category.color}30, transparent)`,
        }}
      />
    </motion.div>
  );
}

function ConstellationLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ opacity: 0.12 }}
      >
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* Diagonal connectors between quadrants */}
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#lineGrad1)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#lineGrad2)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <line
          x1="25%"
          y1="25%"
          x2="75%"
          y2="75%"
          stroke="url(#lineGrad1)"
          strokeWidth="0.8"
          strokeDasharray="3 10"
        />
        <line
          x1="75%"
          y1="25%"
          x2="25%"
          y2="75%"
          stroke="url(#lineGrad2)"
          strokeWidth="0.8"
          strokeDasharray="3 10"
        />
      </svg>
    </div>
  );
}

export default function TechConstellation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="technology" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] text-[#00D4FF] mb-4"
        >
          TECHNOLOGY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#F0F0F5] mb-4 leading-tight"
        >
          The tools we work with.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#6B7080] text-sm max-w-xl mb-14"
        >
          Technology references indicate tools Aetrax works with; they do not
          imply formal partnership.
        </motion.p>

        {/* 2×2 grid with constellation lines behind */}
        <div ref={sectionRef} className="relative">
          <ConstellationLines />

          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} inView={inView} />
            ))}
          </div>

          {/* Central glow node */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
            style={{ zIndex: 5 }}
          >
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full"
              style={{
                background: "#00D4FF",
                boxShadow: "0 0 20px 6px rgba(0,212,255,0.3)",
              }}
            />
          </div>
        </div>

        {/* Hosted vs Open-weight note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-6 text-xs text-[#6B7080]"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-px inline-block"
              style={{ background: "#00D4FF" }}
            />
            Hosted / managed models
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-px inline-block"
              style={{ background: "#7C3AED" }}
            />
            Open-weight / self-hosted options
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-px inline-block"
              style={{ background: "#A78BFA" }}
            />
            On-premise &amp; sovereign deployment available
          </div>
        </motion.div>
      </div>
    </section>
  );
}
