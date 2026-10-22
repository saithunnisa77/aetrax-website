"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Users,
  FileText,
  MapPin,
  WifiOff,
  Server,
  Cloud,
  Building2,
  ChevronRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type DeploymentKey = "client-cloud" | "managed-cloud" | "data-centre" | "air-gapped";

interface SecurityFeature {
  icon: React.ReactNode;
  label: string;
}

interface DeploymentOption {
  key: DeploymentKey;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ReactNode;
  boundaryLabel: string;
  appLayer: string;
  modelLabel: string;
  modelDesc: string;
  knowledgeDesc: string;
  dataLabel: string;
  accentColor: string;
  borderColor: string;
  airGapped?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const deployments: DeploymentOption[] = [
  {
    key: "client-cloud",
    title: "CLIENT CLOUD",
    shortTitle: "Client Cloud",
    description:
      "Deployed in your existing cloud account. You own the keys, the data and the deployment.",
    icon: <Cloud className="w-4 h-4" />,
    boundaryLabel: "YOUR CLOUD ACCOUNT",
    appLayer: "AI APPLICATION LAYER",
    modelLabel: "HOSTED AI MODELS",
    modelDesc: "Claude · Gemini · GPT",
    knowledgeDesc: "KNOWLEDGE BASE",
    dataLabel: "YOUR DATA",
    accentColor: "#00D4FF",
    borderColor: "rgba(0,212,255,0.4)",
  },
  {
    key: "managed-cloud",
    title: "MANAGED CLOUD",
    shortTitle: "Managed Cloud",
    description:
      "Aetrax-managed isolated environment. Dedicated tenancy, you keep control of your data.",
    icon: <Server className="w-4 h-4" />,
    boundaryLabel: "AETRAX MANAGED ENVIRONMENT",
    appLayer: "AI APPLICATION LAYER",
    modelLabel: "HOSTED AI MODELS",
    modelDesc: "Dedicated Tenant · Isolated VPC",
    knowledgeDesc: "KNOWLEDGE BASE",
    dataLabel: "YOUR DATA",
    accentColor: "#7C3AED",
    borderColor: "rgba(124,58,237,0.4)",
  },
  {
    key: "data-centre",
    title: "CLIENT DATA CENTRE",
    shortTitle: "Data Centre",
    description:
      "Deployed on-premise in your own infrastructure. AI runs where your data lives.",
    icon: <Building2 className="w-4 h-4" />,
    boundaryLabel: "YOUR DATA CENTRE",
    appLayer: "AI APPLICATION LAYER",
    modelLabel: "OPEN-WEIGHT MODELS",
    modelDesc: "Llama · Mistral · Qwen",
    knowledgeDesc: "KNOWLEDGE BASE",
    dataLabel: "YOUR DATA",
    accentColor: "#00D4FF",
    borderColor: "rgba(0,212,255,0.4)",
  },
  {
    key: "air-gapped",
    title: "ON-PREMISE / AIR-GAPPED",
    shortTitle: "Air-Gapped",
    description:
      "Fully isolated deployment with no external connectivity. Maximum data sovereignty.",
    icon: <WifiOff className="w-4 h-4" />,
    boundaryLabel: "YOUR SECURE FACILITY",
    appLayer: "AI APPLICATION LAYER",
    modelLabel: "OPEN-WEIGHT MODELS",
    modelDesc: "Locally Hosted · No Egress",
    knowledgeDesc: "KNOWLEDGE BASE",
    dataLabel: "YOUR DATA",
    accentColor: "#EF4444",
    borderColor: "rgba(239,68,68,0.4)",
    airGapped: true,
  },
];

const securityFeatures: SecurityFeature[] = [
  { icon: <Lock className="w-3.5 h-3.5" />, label: "Encryption at Rest & Transit" },
  { icon: <Users className="w-3.5 h-3.5" />, label: "Role-Based Access Control" },
  { icon: <Shield className="w-3.5 h-3.5" />, label: "Tenant Separation" },
  { icon: <FileText className="w-3.5 h-3.5" />, label: "Audit Logging" },
  { icon: <MapPin className="w-3.5 h-3.5" />, label: "Data Residency Controls" },
];

// ─── Animated data-flow dots ──────────────────────────────────────────────────

function DataFlowDot({ delay, accentColor }: { delay: number; accentColor: string }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
      animate={{ y: [60, -10], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: "linear",
      }}
    />
  );
}

// ─── Architecture Diagram ─────────────────────────────────────────────────────

function ArchitectureDiagram({ deployment }: { deployment: DeploymentOption }) {
  const blocks = [
    {
      label: deployment.modelLabel,
      sub: deployment.modelDesc,
      color: deployment.accentColor,
      bgOpacity: "0.08",
    },
    {
      label: deployment.knowledgeDesc,
      sub: "Vector Store · Embeddings · Search Index",
      color: "#00D4FF",
      bgOpacity: "0.06",
    },
    {
      label: deployment.dataLabel,
      sub: "Documents · Databases · APIs",
      color: "#7C3AED",
      bgOpacity: "0.06",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Outer boundary */}
      <motion.div
        key={deployment.key + "-boundary"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl border p-5"
        style={{
          borderColor: deployment.borderColor,
          background: `linear-gradient(135deg, rgba(20,20,32,0.9) 0%, rgba(10,10,15,0.95) 100%)`,
          boxShadow: `0 0 40px ${deployment.accentColor}14`,
        }}
      >
        {/* Air-gapped badge */}
        {deployment.airGapped && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-500/10 border border-red-500/60 rounded-full px-4 py-1"
          >
            <WifiOff className="w-3 h-3 text-red-400" />
            <span className="text-[10px] font-bold text-red-400 tracking-widest">
              NO EXTERNAL CONNECTIVITY
            </span>
          </motion.div>
        )}

        {/* Boundary label */}
        <div className="text-[10px] font-bold tracking-[0.2em] mb-4" style={{ color: deployment.accentColor }}>
          {deployment.boundaryLabel}
        </div>

        {/* App layer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-white/8 bg-white/[0.03] p-3 mb-3"
        >
          <div className="text-[10px] font-semibold text-[#F0F0F5]/60 tracking-widest mb-3">
            {deployment.appLayer}
          </div>

          {/* Model + Knowledge row */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {blocks.slice(0, 2).map((block, i) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-md border p-2.5 text-center"
                style={{
                  borderColor: `${block.color}40`,
                  background: `rgba(${block.color === "#00D4FF" ? "0,212,255" : block.color === "#7C3AED" ? "124,58,237" : "0,212,255"},0.07)`,
                }}
              >
                <div className="text-[9px] font-bold tracking-widest" style={{ color: block.color }}>
                  {block.label}
                </div>
                <div className="text-[8px] text-[#6B7080] mt-0.5">{block.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Data block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-md border p-2.5 text-center"
            style={{
              borderColor: "rgba(124,58,237,0.4)",
              background: "rgba(124,58,237,0.07)",
            }}
          >
            <div className="text-[9px] font-bold tracking-widest text-[#7C3AED]">
              {blocks[2].label}
            </div>
            <div className="text-[8px] text-[#6B7080] mt-0.5">{blocks[2].sub}</div>
          </motion.div>
        </motion.div>

        {/* Data flow animation column */}
        <div className="relative h-6 overflow-hidden mb-3">
          {[0, 0.6, 1.2].map((delay) => (
            <DataFlowDot key={delay} delay={delay} accentColor={deployment.accentColor} />
          ))}
        </div>

        {/* Security features */}
        <div className="flex flex-wrap gap-2">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1"
            >
              <span style={{ color: deployment.accentColor }}>{feature.icon}</span>
              <span className="text-[9px] text-[#F0F0F5]/70 font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DeploymentSelector() {
  const [selected, setSelected] = useState<DeploymentKey>("client-cloud");
  const [displayKey, setDisplayKey] = useState<DeploymentKey>("client-cloud");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentDeployment = deployments.find((d) => d.key === displayKey)!;

  function handleSelect(key: DeploymentKey) {
    if (key === selected || isTransitioning) return;
    setIsTransitioning(true);
    setSelected(key);
    setTimeout(() => {
      setDisplayKey(key);
      setIsTransitioning(false);
    }, 250);
  }

  return (
    <section id="security" className="relative py-28 bg-[#0A0A0F] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold tracking-[0.25em] text-[#00D4FF] mb-4"
        >
          SOVEREIGN AI
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F0F0F5] mb-4 leading-tight"
        >
          Where does your data need to stay?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7080] text-lg mb-12 max-w-2xl"
        >
          Select a deployment model to see how your AI architecture is structured.
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          {/* ── Left: selector tabs ─────────────────────── */}
          <div className="space-y-3">
            {deployments.map((dep, i) => {
              const isActive = selected === dep.key;
              return (
                <motion.button
                  key={dep.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleSelect(dep.key)}
                  className="w-full text-left rounded-xl border p-4 cursor-pointer transition-all duration-300 group"
                  style={{
                    borderColor: isActive ? dep.accentColor + "80" : "#1E1E30",
                    background: isActive
                      ? `rgba(${dep.key === "managed-cloud" ? "124,58,237" : dep.key === "air-gapped" ? "239,68,68" : "0,212,255"},0.07)`
                      : "#141420",
                    boxShadow: isActive ? `0 0 20px ${dep.accentColor}20` : "none",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{
                        background: isActive ? dep.accentColor + "20" : "rgba(255,255,255,0.04)",
                        color: isActive ? dep.accentColor : "#6B7080",
                      }}
                    >
                      {dep.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[10px] font-bold tracking-[0.18em] mb-1 transition-colors duration-300"
                        style={{ color: isActive ? dep.accentColor : "#6B7080" }}
                      >
                        {dep.title}
                      </div>
                      <p
                        className="text-sm leading-relaxed transition-colors duration-300"
                        style={{ color: isActive ? "#F0F0F5" : "#6B7080" }}
                      >
                        {dep.description}
                      </p>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 shrink-0 mt-1 transition-all duration-300"
                      style={{
                        color: isActive ? dep.accentColor : "#1E1E30",
                        transform: isActive ? "translateX(2px)" : "none",
                      }}
                    />
                  </div>
                </motion.button>
              );
            })}

            {/* DPDP note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="rounded-xl border border-[#1E1E30] bg-[#141420] p-4 mt-2"
            >
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#00D4FF] mt-0.5 shrink-0" />
                <p className="text-[12px] text-[#6B7080] leading-relaxed">
                  <span className="text-[#F0F0F5] font-medium">DPDP Act, 2023 — </span>
                  Designed with India's Digital Personal Data Protection Act in mind. Backed by NDAs and data processing agreements.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Right: architecture diagram ─────────────── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!isTransitioning && (
                <motion.div
                  key={displayKey}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ArchitectureDiagram deployment={currentDeployment} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-[#0A0A0F] transition-all duration-300 hover:brightness-110 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #00D4FF, #7C3AED)" }}
              >
                Discuss your deployment requirements
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
