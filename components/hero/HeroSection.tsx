'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence, useInView } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SystemNode {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

interface TooltipState {
  nodeId: string | null;
  x: number;
  y: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'data',
    title: 'DATA',
    icon: '⬡',
    description: 'Structured and unstructured data from your organisation',
    color: '#00D4FF',
  },
  {
    id: 'knowledge',
    title: 'KNOWLEDGE',
    icon: '◈',
    description: 'Indexed, permission-aware enterprise knowledge base',
    color: '#22D3EE',
  },
  {
    id: 'models',
    title: 'MODELS',
    icon: '⬟',
    description: 'Foundation models — hosted or open-weight, selected per workload',
    color: '#7C3AED',
  },
  {
    id: 'agents',
    title: 'AGENTS',
    icon: '◉',
    description: 'Orchestrated AI agents with tools, approvals and guardrails',
    color: '#8B5CF6',
  },
  {
    id: 'governance',
    title: 'GOVERNANCE',
    icon: '⬡',
    description: 'Evaluation, monitoring, audit trails and policy controls',
    color: '#00D4FF',
  },
  {
    id: 'production',
    title: 'PRODUCTION',
    icon: '◈',
    description: 'Live, monitored systems with cost and quality metrics',
    color: '#10B981',
  },
];

const NODE_APPEAR_DELAY = 0.15; // seconds between each node appearing
const LINE_DRAW_BASE_DELAY = 0.4; // offset after node appears before line draws

// ─── Sub-components ───────────────────────────────────────────────────────────

// Animated dashed connector between nodes
function ConnectorLine({
  index,
  reducedMotion,
  nodesVisible,
}: {
  index: number;
  reducedMotion: boolean | null;
  nodesVisible: boolean;
}) {
  const lineDelay = reducedMotion
    ? 0
    : (index + 1) * NODE_APPEAR_DELAY + LINE_DRAW_BASE_DELAY;

  return (
    <div className="relative flex flex-col items-center" style={{ height: '32px', width: '100%' }}>
      {/* Static track */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'rgba(0, 212, 255, 0.12)',
          transform: 'translateX(-50%)',
        }}
      />
      {/* Animated fill */}
      <motion.div
        initial={{ scaleY: reducedMotion ? 1 : 0, originY: 0 }}
        animate={nodesVisible ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.35, delay: lineDelay, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, #00D4FF, rgba(124,58,237,0.8))',
          transform: 'translateX(-50%)',
          transformOrigin: 'top',
          boxShadow: '0 0 6px #00D4FF88',
        }}
      />
      {/* Travelling dot */}
      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={nodesVisible ? { opacity: [0, 1, 0], y: [0, 28] } : { opacity: 0 }}
          transition={{
            duration: 1.2,
            delay: lineDelay + 0.4,
            repeat: Infinity,
            repeatDelay: 1.8,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#00D4FF',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 8px #00D4FF',
          }}
        />
      )}
    </div>
  );
}

// Individual system node card
function SystemNodeCard({
  node,
  index,
  reducedMotion,
  nodesVisible,
  activeTooltip,
  onActivate,
  onDeactivate,
}: {
  node: SystemNode;
  index: number;
  reducedMotion: boolean | null;
  nodesVisible: boolean;
  activeTooltip: string | null;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}) {
  const isActive = activeTooltip === node.id;
  const delay = reducedMotion ? 0 : index * NODE_APPEAR_DELAY;

  const floatVariants = !reducedMotion
    ? {
        animate: {
          y: [0, -4, 0],
          transition: {
            duration: 3 + index * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          },
        },
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : 24 }}
      animate={
        nodesVisible
          ? { opacity: 1, x: 0, ...(floatVariants.animate || {}) }
          : { opacity: 0, x: 24 }
      }
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
      onMouseEnter={() => onActivate(node.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(node.id)}
      onBlur={onDeactivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          isActive ? onDeactivate() : onActivate(node.id);
        }
        if (e.key === 'Escape') onDeactivate();
      }}
      tabIndex={0}
      role="button"
      aria-label={`${node.title}: ${node.description}`}
      aria-expanded={isActive}
      style={{ outline: 'none' }}
    >
      <motion.div
        animate={
          isActive
            ? { scale: 1.03, boxShadow: `0 0 24px ${node.color}44, 0 0 8px ${node.color}22` }
            : {
                scale: 1,
                boxShadow: `0 0 12px ${node.color}18, inset 0 0 20px ${node.color}06`,
              }
        }
        transition={{ duration: 0.2 }}
        style={{
          background: 'rgba(20, 20, 32, 0.85)',
          border: `1px solid ${isActive ? node.color + '60' : node.color + '28'}`,
          borderRadius: '10px',
          padding: '10px 16px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Icon */}
        <motion.span
          animate={
            !reducedMotion
              ? { opacity: [0.6, 1, 0.6] }
              : {}
          }
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
          style={{
            fontSize: '18px',
            color: node.color,
            lineHeight: 1,
            filter: `drop-shadow(0 0 4px ${node.color})`,
            minWidth: '20px',
            textAlign: 'center',
          }}
          aria-hidden="true"
        >
          {node.icon}
        </motion.span>

        {/* Title */}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#F0F0F5',
            fontFamily: 'monospace',
          }}
        >
          {node.title}
        </span>

        {/* Status dot */}
        <motion.div
          animate={!reducedMotion ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 + 0.5 }}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: node.color,
            marginLeft: 'auto',
            boxShadow: `0 0 6px ${node.color}`,
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="tooltip"
            style={{
              position: 'absolute',
              left: 'calc(100% + 12px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15, 15, 26, 0.98)',
              border: `1px solid ${node.color}40`,
              borderRadius: '8px',
              padding: '10px 14px',
              width: '220px',
              zIndex: 50,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 16px ${node.color}18`,
              backdropFilter: 'blur(12px)',
              pointerEvents: 'none',
            }}
          >
            {/* Arrow */}
            <div
              style={{
                position: 'absolute',
                left: '-6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '10px',
                height: '10px',
                background: 'rgba(15,15,26,0.98)',
                border: `1px solid ${node.color}40`,
                borderRight: 'none',
                borderTop: 'none',
                rotate: '45deg',
              }}
              aria-hidden="true"
            />
            <p
              style={{
                fontSize: '12px',
                color: '#9CA3AF',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {node.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// The full AI System Map
function AISystemMap({ reducedMotion }: { reducedMotion: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleActivate = useCallback((id: string) => setActiveTooltip(id), []);
  const handleDeactivate = useCallback(() => setActiveTooltip(null), []);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
      }}
      aria-label="AI System Architecture Map"
    >
      {/* Grid background behind map */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-40px -60px',
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          borderRadius: '16px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Glow orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '300px',
          background:
            'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Nodes and connectors */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {SYSTEM_NODES.map((node, index) => (
          <React.Fragment key={node.id}>
            <SystemNodeCard
              node={node}
              index={index}
              reducedMotion={reducedMotion}
              nodesVisible={isInView}
              activeTooltip={activeTooltip}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
            />
            {index < SYSTEM_NODES.length - 1 && (
              <ConnectorLine
                index={index}
                reducedMotion={reducedMotion}
                nodesVisible={isInView}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          delay: reducedMotion ? 0 : SYSTEM_NODES.length * NODE_APPEAR_DELAY + 0.5,
          duration: 0.5,
        }}
        style={{
          marginTop: '16px',
          textAlign: 'center',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(107,112,128,0.7)',
          fontFamily: 'monospace',
        }}
      >
        AETRAX REFERENCE ARCHITECTURE
      </motion.div>
    </div>
  );
}

// Animated arrow for "EXPERIMENT → PRODUCTION" label
function AnimatedArrow({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ color: '#00D4FF', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600 }}>
        FROM EXPERIMENT
      </span>
      <motion.span
        animate={!reducedMotion ? { x: [0, 4, 0] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ color: '#00D4FF', fontSize: '13px', display: 'inline-block' }}
        aria-hidden="true"
      >
        →
      </motion.span>
      <span style={{ color: '#00D4FF', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600 }}>
        PRODUCTION
      </span>
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll helpers
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
    }
  }, [reducedMotion]);

  // Text stagger variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <section
      aria-label="Hero"
      style={{
        minHeight: '100vh',
        background: '#0A0A0F',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Global grid background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Ambient glow blobs ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content wrapper ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(80px, 12vh, 120px) clamp(20px, 5vw, 64px) clamp(60px, 8vh, 100px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(48px, 6vw, 96px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ════ LEFT COLUMN — Text ════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* Eyebrow label */}
          <motion.div variants={itemVariants}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#00D4FF',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              <motion.span
                animate={!reducedMotion ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#00D4FF',
                  display: 'inline-block',
                  boxShadow: '0 0 8px #00D4FF',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              Enterprise AI Solutions
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(32px, 4.5vw, 58px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#F0F0F5',
              margin: 0,
            }}
          >
            Enterprise AI,{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              delivered
            </span>
            {' '}with engineering rigour.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.7,
              color: '#9CA3AF',
              margin: 0,
              maxWidth: '480px',
            }}
          >
            Design, build and operate AI systems that create measurable value — securely,
            governably, and where your data needs to stay.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '4px' }}
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={!reducedMotion ? { scale: 1.03, y: -1 } : {}}
              whileTap={!reducedMotion ? { scale: 0.98 } : {}}
              onClick={() => scrollTo('solutions')}
              style={{
                padding: '14px 28px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
                color: '#0A0A0F',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.01em',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(0,212,255,0.25)',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 0 32px rgba(0,212,255,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 0 24px rgba(0,212,255,0.25)';
              }}
            >
              Explore Your AI Opportunity
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={!reducedMotion ? { scale: 1.03, y: -1 } : {}}
              whileTap={!reducedMotion ? { scale: 0.98 } : {}}
              onClick={() => scrollTo('contact')}
              style={{
                padding: '13px 28px',
                borderRadius: '8px',
                border: '1px solid rgba(0,212,255,0.3)',
                background: 'rgba(0,212,255,0.06)',
                color: '#F0F0F5',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'rgba(0,212,255,0.6)';
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(0,212,255,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'rgba(0,212,255,0.3)';
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(0,212,255,0.06)';
              }}
            >
              Talk to Aetrax
            </motion.button>
          </motion.div>

          {/* Experiment → Production label */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingTop: '8px',
              paddingBottom: '2px',
              borderTop: '1px solid rgba(30,30,48,0.8)',
            }}
          >
            <AnimatedArrow reducedMotion={reducedMotion} />
          </motion.div>
        </motion.div>

        {/* ════ RIGHT COLUMN — AI System Map ════ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'clamp(16px, 3vw, 40px)',
          }}
        >
          <AISystemMap reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0.4,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: '#6B7080',
            fontFamily: 'monospace',
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={!reducedMotion ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '20px',
            height: '30px',
            border: '1px solid rgba(107,112,128,0.4)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '5px',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '8px',
              borderRadius: '2px',
              background: 'rgba(107,112,128,0.6)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
