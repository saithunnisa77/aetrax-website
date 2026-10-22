'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  BookOpen, 
  FileText, 
  Bot, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2,
  Layers,
  ChevronRight
} from 'lucide-react';

interface SolutionItem {
  id: string;
  tag: string;
  title: string;
  oneLiner: string;
  icon: React.ElementType;
  capabilities: string[];
  outcome: string;
  industries: string[];
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'strategy-readiness',
    tag: 'SOL-01',
    title: 'AI Strategy and Readiness',
    oneLiner: 'Identify and prioritise high-impact AI opportunities; prepare data, teams and platforms for execution.',
    icon: Compass,
    capabilities: [
      'Use-case discovery and value mapping',
      'Data readiness assessment and audit',
      'Roadmap and business case formulation',
      'AI governance and operating model definition'
    ],
    outcome: 'A prioritised, funded AI roadmap that your teams can actually deliver.',
    industries: ['Banking & FS', 'Insurance', 'Healthcare', 'Public Sector']
  },
  {
    id: 'generative-ai-knowledge',
    tag: 'SOL-02',
    title: 'Generative AI and Knowledge',
    oneLiner: 'Enterprise assistants and search grounded in policies, contracts and records with cited provenance.',
    icon: BookOpen,
    capabilities: [
      'Retrieval-augmented generation (RAG)',
      'Enterprise knowledge assistants',
      'Copilots for teams and domain workflows',
      'Multilingual question answering'
    ],
    outcome: 'Faster, consistent answers that stakeholders can verify directly against source records.',
    industries: ['Banking & FS', 'Insurance', 'Legal & Compliance', 'Manufacturing']
  },
  {
    id: 'intelligent-document-processing',
    tag: 'SOL-03',
    title: 'Intelligent Document Processing',
    oneLiner: 'OCR and language-model pipelines that turn invoices, claims and contracts into structured core data.',
    icon: FileText,
    capabilities: [
      'OCR for scanned and handwritten input',
      'Field extraction resilient across varied layouts',
      'Validation rules and confidence scoring',
      'Human-in-the-loop review interfaces'
    ],
    outcome: 'Drastic reduction in manual data entry with mathematically measurable extraction accuracy.',
    industries: ['Banking & FS', 'Insurance', 'Legal & Compliance', 'Public Sector']
  },
  {
    id: 'agentic-automation',
    tag: 'SOL-04',
    title: 'Agentic Automation',
    oneLiner: 'Multi-agent systems that plan, invoke enterprise tools and complete business processes end to end.',
    icon: Bot,
    capabilities: [
      'Multi-agent orchestration and task decomposition',
      'Tool and API integration via Model Context Protocol (MCP)',
      'Approval and escalation checkpoints',
      'Guardrails and spend control limits'
    ],
    outcome: 'Multi-step complex work completed autonomously, keeping people firmly in control of approvals.',
    industries: ['Banking & FS', 'Insurance', 'Manufacturing & Ops', 'Public Sector']
  },
  {
    id: 'sovereign-private-ai',
    tag: 'SOL-05',
    title: 'Sovereign and Private AI',
    oneLiner: 'AI deployed inside your cloud perimeter or on-premise data centre using open-weight models.',
    icon: ShieldCheck,
    capabilities: [
      'Private cloud deployment (AWS, Azure, GCP)',
      'On-premise and air-gapped environment hosting',
      'Open-weight model hosting (Llama, Mistral, Qwen)',
      'Strict data residency and privacy enforcement'
    ],
    outcome: 'The full capabilities of cutting-edge AI without ever relinquishing control of sensitive proprietary data.',
    industries: ['Healthcare & Life Sciences', 'Legal & Compliance', 'Banking & FS', 'Public Sector']
  },
  {
    id: 'ai-engineering-operations',
    tag: 'SOL-06',
    title: 'AI Engineering and Operations',
    oneLiner: 'The engineering discipline, automated evaluation suites and telemetry that keep AI dependable after launch.',
    icon: Cpu,
    capabilities: [
      'Continuous evaluation suites and release gates',
      'End-to-end tracing and runtime observability',
      'Inference cost and latency optimisation',
      'Model, prompt, and policy lifecycle management'
    ],
    outcome: 'Production AI systems that remain accurate, strictly compliant, and cost-efficient over time.',
    industries: ['All Enterprise Workloads', 'Mission-Critical Ops', 'Financial Systems']
  }
];

export default function SolutionsPreview() {
  const [selectedSolution, setSelectedSolution] = useState<string>(SOLUTIONS[0].id);
  const active = SOLUTIONS.find((s) => s.id === selectedSolution) || SOLUTIONS[0];
  const ActiveIcon = active.icon;

  return (
    <section id="solutions" className="relative py-28 bg-[#0A0A0F] border-t border-[#1E1E30] overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#141420] border border-[#1E1E30] text-xs font-mono text-[#00D4FF] mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F0F0F5] tracking-tight">
              Enterprise AI Solutions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#6B7080] leading-relaxed">
              Engineered as composable enterprise components. From strategic readiness to sovereign multi-agent systems operating in production.
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-2 font-mono text-xs text-[#6B7080]">
            <span>TOTAL MODULES: 06</span>
            <span>•</span>
            <span className="text-[#00D4FF]">SYSTEMS ONLINE</span>
          </div>
        </div>

        {/* Desktop & Tablet: Interactive Split Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Solution Selector Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOLUTIONS.map((sol) => {
              const Icon = sol.icon;
              const isSelected = sol.id === selectedSolution;
              return (
                <button
                  key={sol.id}
                  onClick={() => setSelectedSolution(sol.id)}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group relative ${
                    isSelected
                      ? 'bg-[#141420] border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.08)]'
                      : 'bg-[#0F0F1A]/80 border-[#1E1E30] hover:bg-[#141420]/50 hover:border-[#1E1E30]/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="font-mono text-[10px] text-[#6B7080] tracking-wider px-2 py-0.5 rounded bg-[#0A0A0F] border border-[#1E1E30]">
                      {sol.tag}
                    </span>
                    <Icon className={`w-4 h-4 transition-colors ${
                      isSelected ? 'text-[#00D4FF]' : 'text-[#6B7080] group-hover:text-[#F0F0F5]'
                    }`} />
                  </div>

                  <div>
                    <h3 className={`text-base font-semibold tracking-tight transition-colors ${
                      isSelected ? 'text-[#F0F0F5]' : 'text-[#A0A5B5] group-hover:text-[#F0F0F5]'
                    }`}>
                      {sol.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#6B7080] line-clamp-2 leading-relaxed">
                      {sol.oneLiner}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1E1E30] flex items-center justify-between w-full text-[11px] font-mono">
                    <span className="text-[#6B7080]">{sol.capabilities.length} Capabilities</span>
                    <span className={`flex items-center space-x-1 ${
                      isSelected ? 'text-[#00D4FF]' : 'text-[#6B7080] group-hover:text-[#F0F0F5]'
                    }`}>
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Inspection Panel */}
          <div className="lg:col-span-6">
            <div className="h-full bg-[#0F0F1A] border border-[#1E1E30] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between border-b border-[#1E1E30] pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#00D4FF]">{active.tag} // ARCHITECTURE BLUEPRINT</div>
                      <h4 className="text-xl sm:text-2xl font-semibold text-[#F0F0F5] tracking-tight mt-0.5">
                        {active.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#A0A5B5] leading-relaxed">
                  {active.oneLiner}
                </p>

                {/* Capabilities Checklist */}
                <div className="mt-6">
                  <div className="font-mono text-xs text-[#6B7080] uppercase tracking-wider mb-3">
                    ENGINEERED CAPABILITIES
                  </div>
                  <div className="space-y-2.5">
                    {active.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-[#0A0A0F] border border-[#1E1E30]">
                        <CheckCircle2 className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#F0F0F5] font-mono leading-relaxed">
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurable Outcome */}
                <div className="mt-6 p-4 rounded-xl bg-[#141420] border border-[#1E1E30]/80">
                  <div className="text-[11px] font-mono text-[#00D4FF] uppercase tracking-wider mb-1">
                    TARGET OUTCOME
                  </div>
                  <div className="text-sm text-[#F0F0F5] leading-relaxed">
                    {active.outcome}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Actions */}
              <div className="mt-8 pt-6 border-t border-[#1E1E30] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="font-mono text-[10px] text-[#6B7080] mr-1">DEPLOYED IN:</span>
                  {active.industries.map((ind, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0A0F] border border-[#1E1E30] text-[#A0A5B5]">
                      {ind}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/20 text-xs font-mono tracking-wider transition-colors"
                >
                  <span>ENGAGE ARCHITECTS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
