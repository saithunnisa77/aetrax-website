'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShieldAlert, 
  HeartPulse, 
  Scale, 
  Factory, 
  GraduationCap, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Globe
} from 'lucide-react';

interface IndustryItem {
  id: string;
  name: string;
  shortCode: string;
  icon: React.ElementType;
  keyChallenges: string[];
  howAetraxHelps: string[];
  provenImpact: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'banking-financial-services',
    name: 'Banking and Financial Services',
    shortCode: 'BFS',
    icon: Building2,
    keyChallenges: [
      'High-volume document operations with zero tolerance for manual transcription error',
      'Complex policy, regulatory circulars, and rapidly evolving compliance mandates',
      'Strict audit trails required for every financial decision and automated step'
    ],
    howAetraxHelps: [
      'Reconciliation support pipelines with mathematical validation',
      'KYC document processing with cross-layout extraction & confidence scoring',
      'Regulatory policy assistants delivering answers with verified circular citations'
    ],
    provenImpact: 'Deterministic auditability with zero data egress outside banking perimeters.'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    shortCode: 'INS',
    icon: ShieldAlert,
    keyChallenges: [
      'Manual claims intake causing customer turnaround delays',
      'Varied, unstructured document formats across hospital bills, estimates, and police reports',
      'Inconsistent underwriting and policy interpretation across branch teams'
    ],
    howAetraxHelps: [
      'Claims document extraction pipelines directly feeding core adjudication systems',
      'Policy wording assistants for rapid clause verification and ambiguity resolution',
      'Traceable decision support providing transparent reasoning for underwriting'
    ],
    provenImpact: 'Accelerated claims intake cycles with measurable extraction accuracy gates.'
  },
  {
    id: 'healthcare-life-sciences',
    name: 'Healthcare and Life Sciences',
    shortCode: 'HLS',
    icon: HeartPulse,
    keyChallenges: [
      'Highly sensitive patient records requiring strict confidentiality protections',
      'Massive regulatory filings and clinical trials documentation',
      'Strict legal obligations under data protection and health privacy regulations'
    ],
    howAetraxHelps: [
      'Private AI deployed inside client infrastructure for clinical documentation review',
      'Permission-aware knowledge search and summarisation over clinical trials',
      'Fully sovereign environments ensuring patient telemetry never traverses public APIs'
    ],
    provenImpact: 'Strict data protection compliance combined with rapid medical document synthesis.'
  },
  {
    id: 'legal-compliance',
    name: 'Legal and Compliance',
    shortCode: 'LGC',
    icon: Scale,
    keyChallenges: [
      'Massive contract portfolios with dispersed obligation dates and covenants',
      'Ongoing regulatory changes requiring continual re-assessment of existing terms',
      'Time-consuming manual evidence gathering for internal audits and disputes'
    ],
    howAetraxHelps: [
      'Semantic clause search capable of contextual cross-jurisdiction comparison',
      'Key-term and indemnification extraction into structured compliance registers',
      'Fast, permissioned audit evidence retrieval with pinpointed source citations'
    ],
    provenImpact: 'Near-instantaneous contract discovery with precise verifiable citations.'
  },
  {
    id: 'manufacturing-operations',
    name: 'Manufacturing and Operations',
    shortCode: 'MFG',
    icon: Factory,
    keyChallenges: [
      'Critical institutional knowledge trapped in complex machinery manuals and SOPs',
      'Quality control telemetry fragmented across legacy silos and shift logs',
      'Frontline machine downtime while waiting for senior engineering diagnostics'
    ],
    howAetraxHelps: [
      'Field operations knowledge assistants querying dense schematics and SOPs at point of work',
      'Automated analysis of quality exception reports and root-cause clustering',
      'Agentic maintenance escalation workflows with technician approval gates'
    ],
    provenImpact: 'Immediate access to maintenance intelligence at the manufacturing floor.'
  },
  {
    id: 'public-sector-education',
    name: 'Public Sector and Education',
    shortCode: 'PSE',
    icon: GraduationCap,
    keyChallenges: [
      'High civic service volume exceeding current administrative staff capacity',
      'Strict data residency mandates under national data sovereignty legislation',
      'Large volumes of physical, scanned, and multilingual forms and citizen records'
    ],
    howAetraxHelps: [
      'Citizen and learner multilingual assistants built with strict hallucination controls',
      'Sovereign document automation pipelines deployed on dedicated domestic cloud/DC',
      'DPDP Act aligned workflows respecting individual privacy rights'
    ],
    provenImpact: 'High-availability public service scaling with guaranteed data sovereignty.'
  }
];

export default function IndustriesPreview() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(INDUSTRIES[0].id);
  const active = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];
  const ActiveIcon = active.icon;

  return (
    <section id="industries" className="relative py-28 bg-[#0F0F1A] border-t border-[#1E1E30] overflow-hidden">
      {/* Background technical accent */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #1E1E30 1px, transparent 1px), linear-gradient(to bottom, #1E1E30 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#141420] border border-[#1E1E30] text-xs font-mono text-[#00D4FF] mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>INDUSTRY DOMAINS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F0F0F5] tracking-tight">
            Engineered for high-consequence sectors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B7080] leading-relaxed">
            Where accuracy, data residency, and audit trails cannot be compromised. We tailor sovereign AI architectures to industry-specific constraints.
          </p>
        </div>

        {/* Tab Selector for Industries */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-[#1E1E30] gap-2 border-b border-[#1E1E30]">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isSelected = ind.id === selectedIndustry;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-lg border font-mono text-xs whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-[#141420] border-[#00D4FF]/40 text-[#F0F0F5] shadow-[0_0_15px_rgba(0,212,255,0.08)]'
                    : 'bg-[#0A0A0F]/60 border-transparent text-[#6B7080] hover:text-[#A0A5B5] hover:border-[#1E1E30]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#00D4FF]' : 'text-[#6B7080]'}`} />
                <span>{ind.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-[#00D4FF]/10 text-[#00D4FF]' : 'bg-[#141420] text-[#6B7080]'
                }`}>
                  {ind.shortCode}
                </span>
              </button>
            );
          })}
        </div>

        {/* Industry Detailed Control Card */}
        <div className="bg-[#0A0A0F] border border-[#1E1E30] rounded-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1E1E30] gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-[#00D4FF] tracking-wider uppercase">
                  DOMAIN SPECIFICATION // {active.shortCode}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#F0F0F5] tracking-tight mt-0.5">
                  {active.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs text-[#6B7080]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00D4FF]" />
              <span>SOVEREIGN READY</span>
            </div>
          </div>

          {/* 2-Column Problem vs Solution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Key Challenges */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#E5A84B] tracking-wider uppercase">
                <AlertCircle className="w-4 h-4 text-[#E5A84B]" />
                <span>Critical Industry Bottlenecks</span>
              </div>

              <div className="space-y-3">
                {active.keyChallenges.map((challenge, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#141420]/60 border border-[#1E1E30] flex items-start space-x-3">
                    <span className="font-mono text-xs text-[#6B7080] mt-0.5">0{i + 1}</span>
                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: How Aetrax Helps */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF] tracking-wider uppercase">
                <CheckCircle className="w-4 h-4 text-[#00D4FF]" />
                <span>Aetrax Engineered Deployments</span>
              </div>

              <div className="space-y-3">
                {active.howAetraxHelps.map((sol, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#141420] border border-[#00D4FF]/20 flex items-start space-x-3 shadow-[0_0_15px_rgba(0,212,255,0.03)]">
                    <span className="font-mono text-xs text-[#00D4FF] mt-0.5">→</span>
                    <p className="text-xs sm:text-sm text-[#F0F0F5] leading-relaxed font-mono">
                      {sol}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Proven Baseline Banner */}
          <div className="mt-8 p-4 rounded-xl bg-[#141420]/80 border border-[#1E1E30] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="text-xs sm:text-sm text-[#A0A5B5] font-mono">
                <strong className="text-[#F0F0F5]">Production Constraint:</strong> {active.provenImpact}
              </span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center space-x-2 text-xs font-mono text-[#00D4FF] hover:underline"
            >
              <span>DISCUSS {active.shortCode} WORKLOADS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
