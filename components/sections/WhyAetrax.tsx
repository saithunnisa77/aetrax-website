'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Terminal, 
  ArrowRight,
  Server,
  Database,
  Lock
} from 'lucide-react';

interface DifferentiatorItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  icon: React.ElementType;
  specs: { label: string; value: string }[];
  diagramType: 'lifecycle' | 'sovereign' | 'agnostic' | 'governed' | 'engineers';
}

const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    id: 'strategy-to-production',
    number: '01',
    title: 'Strategy to Production',
    headline: 'One accountable team across the full lifecycle.',
    description: 'We eliminate the traditional friction between strategy consultants and software delivery. One accountable team covers the entire journey, from initial use-case discovery to live, production-grade operations.',
    icon: Workflow,
    specs: [
      { label: 'Lifecycle Scope', value: 'Workshop → Production' },
      { label: 'Accountability', value: 'Single Unified Team' },
      { label: 'Gate Checks', value: 'Phase-gated Deliverables' }
    ],
    diagramType: 'lifecycle'
  },
  {
    id: 'sovereign-by-design',
    number: '02',
    title: 'Sovereign by Design',
    headline: 'Your data never leaves your controlled perimeter.',
    description: "Every architecture is engineered to deploy in your private cloud account, dedicated managed cloud, or customer-owned data centre. Full residency control with zero external training exposure.",
    icon: ShieldCheck,
    specs: [
      { label: 'Deployments', value: 'Client Cloud / DC / Air-gapped' },
      { label: 'Model Privacy', value: 'Never Trained on Client Data' },
      { label: 'Data Boundary', value: 'Zero Egress Isolation' }
    ],
    diagramType: 'sovereign'
  },
  {
    id: 'independent-model-agnostic',
    number: '03',
    title: 'Independent & Model-Agnostic',
    headline: 'The right model for each workload without vendor lock-in.',
    description: 'We benchmark and route workloads to the optimal engine — whether commercial hosted models (Claude, Gemini) or private open-weight models (Llama, Mistral, Qwen) running on your dedicated compute.',
    icon: Cpu,
    specs: [
      { label: 'Hosted Engines', value: 'Claude, Gemini, etc.' },
      { label: 'Open-Weight', value: 'Llama, Mistral, Qwen' },
      { label: 'Vendor Lock-in', value: '0% Proprietary Traps' }
    ],
    diagramType: 'agnostic'
  },
  {
    id: 'governed-and-measurable',
    number: '04',
    title: 'Governed & Measurable',
    headline: 'Auditability, safety rails, and live telemetry from day one.',
    description: 'Evaluation frameworks, cost monitoring, hallucination prevention, and complete query-to-source audit logs are standard engineering deliverables, not post-launch afterthoughts.',
    icon: Activity,
    specs: [
      { label: 'Evaluation Gates', value: 'Automated Test Suites' },
      { label: 'Traceability', value: 'Query → Context → Model Trace' },
      { label: 'Guardrails', value: 'Safety & Leakage Interceptors' }
    ],
    diagramType: 'governed'
  },
  {
    id: 'senior-engineers-direct-access',
    number: '05',
    title: 'Senior Engineers, Direct Access',
    headline: 'The specialists who scope your architecture write the code.',
    description: 'No junior staff handoffs or layers of account managers. Enterprise technology leaders work directly with seasoned AI systems architects and production backend engineers.',
    icon: Terminal,
    specs: [
      { label: 'Direct Access', value: 'Architect-level Pairing' },
      { label: 'Execution', value: 'Hands-on Production Code' },
      { label: 'Turnaround', value: 'High Technical Velocity' }
    ],
    diagramType: 'engineers'
  }
];

export default function WhyAetrax() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const current = DIFFERENTIATORS[activeTab];

  return (
    <section id="why-aetrax" className="relative py-28 bg-[#0A0A0F] border-t border-[#1E1E30] overflow-hidden">
      {/* Background technical grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1E1E30 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#141420] border border-[#1E1E30] text-xs font-mono text-[#00D4FF] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            <span>ARCHITECTURAL ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F0F0F5] tracking-tight">
            What sets <span className="text-[#00D4FF]">Aetrax</span> apart
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B7080] leading-relaxed">
            Enterprise AI requires more than wrapping foundation APIs. We bring systems engineering discipline, sovereign deployment protocols, and uncompromised governance to every client workload.
          </p>
        </div>

        {/* Interactive Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Column */}
          <div className="lg:col-span-5 space-y-3">
            {DIFFERENTIATORS.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-[#141420] border-[#00D4FF]/40 shadow-[0_0_25px_rgba(0,212,255,0.08)]'
                      : 'bg-[#0F0F1A]/80 border-[#1E1E30] hover:bg-[#141420]/60 hover:border-[#1E1E30]/80'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg font-mono text-xs border ${
                      isActive 
                        ? 'bg-[#00D4FF]/10 border-[#00D4FF]/30 text-[#00D4FF]' 
                        : 'bg-[#0A0A0F] border-[#1E1E30] text-[#6B7080] group-hover:text-[#F0F0F5]'
                    }`}>
                      {item.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm sm:text-base font-medium tracking-tight ${
                          isActive ? 'text-[#F0F0F5]' : 'text-[#A0A5B5] group-hover:text-[#F0F0F5]'
                        }`}>
                          {item.title}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${
                          isActive ? 'text-[#00D4FF] translate-x-1' : 'text-[#6B7080] opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                      <p className="mt-1 text-xs text-[#6B7080] line-clamp-1">
                        {item.headline}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-[#00D4FF] rounded-r"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Details / Control-Room Visualization Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#0F0F1A] border border-[#1E1E30] rounded-2xl p-6 sm:p-8 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-[#1E1E30] pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
                  <span className="font-mono text-xs text-[#6B7080] uppercase tracking-wider">
                    SPECIFICATION [{current.number}] // {current.id.toUpperCase()}
                  </span>
                </div>
                <div className="font-mono text-xs text-[#00D4FF] bg-[#00D4FF]/5 px-2.5 py-1 rounded border border-[#00D4FF]/20">
                  VERIFIED PRINCIPLE
                </div>
              </div>

              {/* Principle Headline and Narrative */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#F0F0F5] tracking-tight">
                  {current.headline}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#A0A5B5] leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Interactive Visual Blueprint for Selected Principle */}
              <div className="my-6 p-4 rounded-xl bg-[#0A0A0F] border border-[#1E1E30]">
                {current.diagramType === 'sovereign' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-[#6B7080] uppercase tracking-wider">DATA PERIMETER BOUNDARY</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-3 rounded bg-[#141420] border border-[#1E1E30] flex items-center space-x-2">
                        <Database className="w-4 h-4 text-[#00D4FF]" />
                        <span className="text-[#F0F0F5]">Client Cloud</span>
                      </div>
                      <div className="p-3 rounded bg-[#141420] border border-[#1E1E30] flex items-center space-x-2">
                        <Server className="w-4 h-4 text-[#00D4FF]" />
                        <span className="text-[#F0F0F5]">Customer DC</span>
                      </div>
                      <div className="p-3 rounded bg-[#141420] border border-[#00D4FF]/40 text-[#00D4FF] flex items-center space-x-2 shadow-[0_0_12px_rgba(0,212,255,0.1)]">
                        <Lock className="w-4 h-4 text-[#00D4FF]" />
                        <span>Air-Gapped Ops</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#6B7080] pt-1">
                      <span>✓ In-transit / At-rest TLS 1.3 Encryption</span>
                      <span className="text-[#00D4FF]">Zero External Egress</span>
                    </div>
                  </div>
                )}

                {current.diagramType === 'lifecycle' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-[#6B7080] uppercase tracking-wider">DELIVERY PHASE PIPELINE</div>
                    <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center">
                      <div className="p-2.5 rounded bg-[#141420] border border-[#1E1E30]">
                        <div className="text-[#6B7080] text-[10px]">PHASE 1</div>
                        <div className="text-[#F0F0F5] font-semibold mt-0.5">Assess</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#141420] border border-[#1E1E30]">
                        <div className="text-[#6B7080] text-[10px]">PHASE 2</div>
                        <div className="text-[#F0F0F5] font-semibold mt-0.5">Prove</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#141420] border border-[#1E1E30]">
                        <div className="text-[#6B7080] text-[10px]">PHASE 3</div>
                        <div className="text-[#F0F0F5] font-semibold mt-0.5">Industrialise</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#00D4FF]/10 border border-[#00D4FF]/40 text-[#00D4FF]">
                        <div className="text-[10px] text-[#00D4FF]/80">PHASE 4</div>
                        <div className="font-semibold mt-0.5">Operate</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-[#6B7080] pt-1 text-center">
                      Discrete milestone gates with evaluation sign-offs before production rollout.
                    </div>
                  </div>
                )}

                {current.diagramType === 'agnostic' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-[#6B7080] uppercase tracking-wider">ROUTING ENGINE BENCHMARK</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded bg-[#141420] border border-[#1E1E30]">
                        <div className="text-[#00D4FF] font-medium">Hosted Foundation</div>
                        <div className="text-[#A0A5B5] text-[11px] mt-1">Anthropic Claude • Google Gemini</div>
                      </div>
                      <div className="p-3 rounded bg-[#141420] border border-[#1E1E30]">
                        <div className="text-[#00D4FF] font-medium">Sovereign Open-Weight</div>
                        <div className="text-[#A0A5B5] text-[11px] mt-1">Meta Llama • Mistral • Qwen</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-[#6B7080]">Workload-matched selection based on latency, residency, and cost budgets.</div>
                  </div>
                )}

                {current.diagramType === 'governed' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-[#6B7080] uppercase tracking-wider">SAFETY & AUDIT CONTROL PLANE</div>
                    <div className="p-3 rounded bg-[#141420] border border-[#1E1E30] flex items-center justify-between">
                      <span className="text-[#F0F0F5]">Query Pipeline</span>
                      <span className="text-[#6B7080]">→ Prompt Gate → Model Execution → Citation Check →</span>
                      <span className="text-[#00D4FF]">Audit Log</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="p-1.5 rounded bg-[#0A0A0F] border border-[#1E1E30] text-[#A0A5B5]">DPDP 2023 Aligned</div>
                      <div className="p-1.5 rounded bg-[#0A0A0F] border border-[#1E1E30] text-[#A0A5B5]">Zero Prompt Leakage</div>
                      <div className="p-1.5 rounded bg-[#0A0A0F] border border-[#1E1E30] text-[#A0A5B5]">Human Approval Loops</div>
                    </div>
                  </div>
                )}

                {current.diagramType === 'engineers' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-[#6B7080] uppercase tracking-wider">ENGAGEMENT MODEL</div>
                    <div className="p-3 rounded bg-[#141420] border border-[#1E1E30] flex flex-col sm:flex-row items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <Terminal className="w-4 h-4 text-[#00D4FF]" />
                        <span className="text-[#F0F0F5]">Client Engineering & C-Suite</span>
                      </div>
                      <span className="text-[#00D4FF] font-mono">⇄ Direct Pairing ⇄</span>
                      <div className="text-[#A0A5B5]">Aetrax Core Architects</div>
                    </div>
                    <div className="text-[11px] text-[#6B7080] text-center">Zero intermediary translation layers. Pure technical execution.</div>
                  </div>
                )}
              </div>

              {/* Technical Specifications Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#1E1E30] pt-4 mt-auto">
                {current.specs.map((spec, i) => (
                  <div key={i} className="font-mono">
                    <div className="text-[11px] text-[#6B7080] uppercase">{spec.label}</div>
                    <div className="text-xs sm:text-sm text-[#F0F0F5] font-medium mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
