'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnswerOption {
  id: string;
  label: string;
}

interface Question {
  id: number;
  text: string;
  options: AnswerOption[];
}

interface Scores {
  Strategy: number;
  Data: number;
  Infrastructure: number;
  Security: number;
  Governance: number;
  Automation: number;
  Operations: number;
}

type Dimension = keyof Scores;

interface Recommendation {
  icon: string;
  text: string;
}

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Where is your data currently hosted?',
    options: [
      { id: 'q1a', label: 'On-premise data centres' },
      { id: 'q1b', label: 'Private cloud (single-tenant)' },
      { id: 'q1c', label: 'Public cloud (AWS / Azure / GCP)' },
      { id: 'q1d', label: 'Hybrid or mixed' },
      { id: 'q1e', label: 'Spread across systems — not centralised' },
    ],
  },
  {
    id: 2,
    text: 'How sensitive is the data AI would process?',
    options: [
      { id: 'q2a', label: 'Highly sensitive — strict controls required' },
      { id: 'q2b', label: 'Sensitive — some restrictions apply' },
      { id: 'q2c', label: 'Standard business data' },
      { id: 'q2d', label: 'Minimal sensitivity' },
    ],
  },
  {
    id: 3,
    text: 'Do you have AI use cases identified?',
    options: [
      { id: 'q3a', label: 'Yes — specific, prioritised use cases' },
      { id: 'q3b', label: 'Exploring broadly, nothing prioritised' },
      { id: 'q3c', label: 'Some ideas, but not validated' },
      { id: 'q3d', label: 'Starting from scratch' },
    ],
  },
  {
    id: 4,
    text: 'How mature is your data infrastructure?',
    options: [
      { id: 'q4a', label: 'Well-governed, clean, accessible' },
      { id: 'q4b', label: 'Partially organised — gaps exist' },
      { id: 'q4c', label: 'Significant data quality issues' },
      { id: 'q4d', label: 'Very early stage' },
    ],
  },
  {
    id: 5,
    text: 'Do AI outputs require human approval?',
    options: [
      { id: 'q5a', label: 'Yes — for all critical decisions' },
      { id: 'q5b', label: 'Yes — for high-risk decisions only' },
      { id: 'q5c', label: 'No — fully automated is acceptable' },
      { id: 'q5d', label: 'Depends on the use case' },
    ],
  },
  {
    id: 6,
    text: 'Do you need private or on-premise AI deployment?',
    options: [
      { id: 'q6a', label: 'Yes — data cannot leave our environment' },
      { id: 'q6b', label: 'Preferred but negotiable' },
      { id: 'q6c', label: 'No — cloud deployment is fine' },
      { id: 'q6d', label: 'Unsure' },
    ],
  },
  {
    id: 7,
    text: 'What is your biggest AI bottleneck?',
    options: [
      { id: 'q7a', label: "We don't know where to start" },
      { id: 'q7b', label: 'Data readiness and quality' },
      { id: 'q7c', label: 'Security and compliance requirements' },
      { id: 'q7d', label: 'Technology and infrastructure' },
      { id: 'q7e', label: 'Getting AI from prototype to production' },
      { id: 'q7f', label: 'Keeping AI reliable after launch' },
    ],
  },
];

// ─── Scoring Logic ────────────────────────────────────────────────────────────

function computeScores(answers: Record<number, string>): Scores {
  // Infrastructure — Q1
  const infraMap: Record<string, number> = {
    q1a: 55,
    q1b: 75,
    q1c: 90,
    q1d: 70,
    q1e: 20,
  };

  // Data — Q4
  const dataMap: Record<string, number> = {
    q4a: 95,
    q4b: 60,
    q4c: 30,
    q4d: 10,
  };

  // Strategy — Q3
  const stratMap: Record<string, number> = {
    q3a: 95,
    q3b: 45,
    q3c: 60,
    q3d: 15,
  };

  // Security — average of Q5 + Q6
  const secQ5Map: Record<string, number> = {
    q5a: 90,
    q5b: 80,
    q5c: 50,
    q5d: 65,
  };
  const secQ6Map: Record<string, number> = {
    q6a: 95,
    q6b: 75,
    q6c: 60,
    q6d: 50,
  };

  // Governance — Q5
  const govMap: Record<string, number> = {
    q5a: 95,
    q5b: 75,
    q5c: 40,
    q5d: 60,
  };

  // Automation — average of Q3 + Q7
  const autoQ3Map: Record<string, number> = {
    q3a: 90,
    q3b: 40,
    q3c: 55,
    q3d: 15,
  };
  const autoQ7Map: Record<string, number> = {
    q7a: 15,
    q7b: 40,
    q7c: 50,
    q7d: 45,
    q7e: 60,
    q7f: 70,
  };

  // Operations — Q7
  const opsMap: Record<string, number> = {
    q7a: 10,
    q7b: 35,
    q7c: 45,
    q7d: 40,
    q7e: 55,
    q7f: 75,
  };

  const get = (map: Record<string, number>, key: string | undefined, fallback = 50) =>
    key ? (map[key] ?? fallback) : fallback;

  const secScore = Math.round((get(secQ5Map, answers[5]) + get(secQ6Map, answers[6])) / 2);
  const autoScore = Math.round((get(autoQ3Map, answers[3]) + get(autoQ7Map, answers[7])) / 2);

  return {
    Strategy: get(stratMap, answers[3]),
    Data: get(dataMap, answers[4]),
    Infrastructure: get(infraMap, answers[1]),
    Security: secScore,
    Governance: get(govMap, answers[5]),
    Automation: autoScore,
    Operations: get(opsMap, answers[7]),
  };
}

// ─── Recommendations ──────────────────────────────────────────────────────────

function deriveRecommendations(answers: Record<number, string>): Recommendation[] {
  const recs: Recommendation[] = [];

  // Data immature
  if (['q4c', 'q4d'].includes(answers[4])) {
    recs.push({
      icon: '⬡',
      text: 'An AI Strategy and Readiness engagement could help prioritise use cases and assess your data readiness before any model work begins.',
    });
  }

  // No use cases or unclear
  if (['q3b', 'q3c', 'q3d'].includes(answers[3])) {
    recs.push({
      icon: '⬡',
      text: 'A Discovery and Scoping workshop can surface high-value AI use cases aligned to your business priorities — without committing to a full build.',
    });
  }

  // Sovereignty / data residency required
  if (['q6a', 'q6b'].includes(answers[6]) || answers[1] === 'q1a') {
    recs.push({
      icon: '⬡',
      text: 'Sovereign and Private AI deployment using open-weight models could address your data residency and compliance requirements without sending data to external APIs.',
    });
  }

  // In prototype stage or bottleneck is prototype-to-production
  if (answers[7] === 'q7e') {
    recs.push({
      icon: '⬡',
      text: 'A Proof of Value engagement on real data could validate your use case with a live system before full investment — reducing risk and accelerating buy-in.',
    });
  }

  // Reliability / post-launch
  if (answers[7] === 'q7f') {
    recs.push({
      icon: '⬡',
      text: 'AI Operations and Observability infrastructure — including drift detection, eval pipelines, and incident response — can keep production AI systems reliable at scale.',
    });
  }

  // Security bottleneck
  if (answers[7] === 'q7c' || ['q2a', 'q2b'].includes(answers[2])) {
    recs.push({
      icon: '⬡',
      text: 'Aetrax builds AI systems with security and governance embedded from design — not added as an afterthought. A Security Architecture review could map controls to your risk profile.',
    });
  }

  // Don't know where to start
  if (answers[7] === 'q7a') {
    recs.push({
      icon: '⬡',
      text: "An AI Readiness and Strategy engagement is the right starting point — helping you define what AI is actually worth pursuing in your context, and what it'll take to get there.",
    });
  }

  // Deduplicate and limit to 3
  const unique = recs.filter((r, i, arr) => arr.findIndex((x) => x.text === r.text) === i);
  return unique.slice(0, 3);
}

// ─── Radar Chart (pure SVG) ───────────────────────────────────────────────────

const DIMENSIONS: Dimension[] = [
  'Strategy',
  'Data',
  'Infrastructure',
  'Security',
  'Governance',
  'Automation',
  'Operations',
];

interface RadarChartProps {
  scores: Scores;
  animate: boolean;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function buildPolygonPoints(cx: number, cy: number, values: number[], maxR: number): string {
  return values
    .map((v, i) => {
      const angle = (360 / values.length) * i;
      const r = (v / 100) * maxR;
      const pt = polarToCartesian(cx, cy, r, angle);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');
}

const RadarChart: React.FC<RadarChartProps> = ({ scores, animate }) => {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 115;
  const rings = [20, 40, 60, 80, 100];

  const values = DIMENSIONS.map((d) => scores[d]);

  const [progress, setProgress] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const animatedValues = values.map((v) => v * progress);
  const polygonPoints = buildPolygonPoints(cx, cy, animatedValues, maxR);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="mx-auto"
    >
      {/* Ring grid lines */}
      {rings.map((pct) => {
        const r = (pct / 100) * maxR;
        const pts = DIMENSIONS.map((_, i) => {
          const angle = (360 / DIMENSIONS.length) * i;
          const pt = polarToCartesian(cx, cy, r, angle);
          return `${pt.x},${pt.y}`;
        }).join(' ');
        return (
          <polygon
            key={pct}
            points={pts}
            fill="none"
            stroke="#1E1E30"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {DIMENSIONS.map((_, i) => {
        const angle = (360 / DIMENSIONS.length) * i;
        const outer = polarToCartesian(cx, cy, maxR, angle);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="#1E1E30"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled polygon (animated) */}
      <polygon
        points={polygonPoints}
        fill="rgba(0, 212, 255, 0.15)"
        stroke="#00D4FF"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Dots at each vertex */}
      {animatedValues.map((v, i) => {
        const angle = (360 / DIMENSIONS.length) * i;
        const r = (v / 100) * maxR;
        const pt = polarToCartesian(cx, cy, r, angle);
        return (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={4}
            fill="#00D4FF"
            stroke="#0A0A0F"
            strokeWidth="2"
          />
        );
      })}

      {/* Labels */}
      {DIMENSIONS.map((dim, i) => {
        const angle = (360 / DIMENSIONS.length) * i;
        const labelR = maxR + 22;
        const pt = polarToCartesian(cx, cy, labelR, angle);
        const score = scores[dim];

        // Adjust text-anchor based on position
        let anchor: 'start' | 'middle' | 'end' = 'middle';
        const normalised = ((angle % 360) + 360) % 360;
        if (normalised > 20 && normalised < 160) anchor = 'start';
        else if (normalised > 200 && normalised < 340) anchor = 'end';

        return (
          <g key={dim}>
            <text
              x={pt.x}
              y={pt.y - 4}
              textAnchor={anchor}
              fill="#F0F0F5"
              fontSize="11"
              fontWeight="600"
              fontFamily="inherit"
            >
              {dim}
            </text>
            <text
              x={pt.x}
              y={pt.y + 10}
              textAnchor={anchor}
              fill="#00D4FF"
              fontSize="10"
              fontFamily="inherit"
            >
              {Math.round(score * progress)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── Score Bar ────────────────────────────────────────────────────────────────

interface ScoreBarProps {
  label: Dimension;
  value: number;
  delay: number;
  animate: boolean;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, value, delay, animate }) => {
  const shouldReduce = useReducedMotion();

  const barVariants = {
    hidden: { width: '0%' },
    visible: {
      width: `${value}%`,
      transition: {
        duration: shouldReduce ? 0 : 0.8,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scoreColor =
    value >= 75 ? '#00D4FF' : value >= 50 ? '#7C3AED' : '#6B7080';

  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-xs font-medium text-[#F0F0F5] text-right">
        {label}
      </span>
      <div
        className="relative flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: '#1E1E30' }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: scoreColor }}
          variants={barVariants}
          initial="hidden"
          animate={animate ? 'visible' : 'hidden'}
        />
      </div>
      <span className="w-8 shrink-0 text-xs font-mono font-semibold" style={{ color: scoreColor }}>
        {value}
      </span>
    </div>
  );
};

// ─── Check Icon ───────────────────────────────────────────────────────────────

const CheckIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <circle cx="9" cy="9" r="9" fill="#00D4FF" fillOpacity="0.15" />
    <path
      d="M5.5 9.5L7.5 11.5L12.5 6.5"
      stroke="#00D4FF"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

type Phase = 'intro' | 'questions' | 'results';

const ReadinessAssessment: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0); // 0-indexed
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward, -1 = backward
  const [scores, setScores] = useState<Scores | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [resultsRevealed, setResultsRevealed] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalQuestions = QUESTIONS.length;
  const question = QUESTIONS[currentQ];

  // Reset option refs when question changes
  useEffect(() => {
    optionRefs.current = [];
  }, [currentQ]);

  // Keyboard navigation within options
  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = optionRefs.current[idx + 1];
        next?.focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = optionRefs.current[idx - 1];
        prev?.focus();
      }
    },
    []
  );

  const selectAnswer = useCallback(
    (optionId: string) => {
      const qId = question.id;
      setAnswers((prev) => ({ ...prev, [qId]: optionId }));
    },
    [question.id]
  );

  const goNext = useCallback(() => {
    if (!answers[question.id]) return;
    if (currentQ < totalQuestions - 1) {
      setDirection(1);
      setCurrentQ((q) => q + 1);
    } else {
      // Compute results
      const s = computeScores(answers);
      const r = deriveRecommendations(answers);
      setScores(s);
      setRecommendations(r);
      setPhase('results');
      setResultsRevealed(false);
      setTimeout(() => setResultsRevealed(true), shouldReduce ? 0 : 200);
    }
  }, [answers, currentQ, question.id, totalQuestions, shouldReduce]);

  const goBack = useCallback(() => {
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ((q) => q - 1);
    } else {
      setPhase('intro');
    }
  }, [currentQ]);

  const retake = useCallback(() => {
    setAnswers({});
    setCurrentQ(0);
    setScores(null);
    setRecommendations([]);
    setResultsRevealed(false);
    setPhase('intro');
  }, []);

  // Slide variants
  const slideVariants = {
    enter: (d: number) => ({
      x: shouldReduce ? 0 : d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: shouldReduce ? 0 : d > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const slideTransition = {
    duration: shouldReduce ? 0 : 0.3,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  };

  // Section label & heading fade-in
  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="assessment"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#00D4FF' }}
          >
            AI Readiness
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-semibold leading-tight mb-4"
            style={{ color: '#F0F0F5' }}
          >
            How ready is your organisation
            <br className="hidden sm:block" /> for production AI?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-base"
            style={{ color: '#6B7080' }}
          >
            Answer a few questions to get an indicative snapshot of your AI readiness.
          </motion.p>
        </motion.div>

        {/* Assessment Card */}
        <motion.div
          className="rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: '#141420',
            borderColor: '#1E1E30',
          }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            {/* ── Intro ── */}
            {phase === 'intro' && (
              <motion.div
                key="intro"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="p-8 sm:p-10 text-center"
              >
                {/* Hexagon icon */}
                <div className="mb-6 flex justify-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(124,58,237,0.15) 100%)',
                      border: '1px solid rgba(0,212,255,0.2)',
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path
                        d="M16 2L28.7 9.5V24.5L16 30L3.3 24.5V9.5L16 2Z"
                        stroke="#00D4FF"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M16 8L24.7 13V23L16 28L7.3 23V13L16 8Z"
                        fill="rgba(0,212,255,0.12)"
                        stroke="#00D4FF"
                        strokeWidth="1"
                        strokeOpacity="0.5"
                      />
                    </svg>
                  </div>
                </div>

                <h3
                  className="mb-3 text-xl font-semibold"
                  style={{ color: '#F0F0F5' }}
                >
                  Indicative Aetrax Readiness Snapshot
                </h3>
                <p className="mb-8 text-sm leading-relaxed" style={{ color: '#6B7080' }}>
                  7 questions · ~2 minutes · No personal data required
                </p>

                <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  {[
                    { icon: '⬡', title: 'Seven dimensions', desc: 'Strategy, Data, Infrastructure, Security, Governance, Automation, Operations' },
                    { icon: '⬡', title: 'Radar profile', desc: 'A visual readiness snapshot across all dimensions' },
                    { icon: '⬡', title: 'Tailored pointers', desc: 'Recommendations based on your specific answers' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl p-4"
                      style={{ backgroundColor: '#0F0F1A', border: '1px solid #1E1E30' }}
                    >
                      <p className="mb-1 text-xs font-semibold" style={{ color: '#00D4FF' }}>
                        {item.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: '#6B7080' }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setPhase('questions'); setCurrentQ(0); }}
                  className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
                    color: '#0A0A0F',
                    focusOutlineColor: '#00D4FF',
                  } as React.CSSProperties}
                  aria-label="Start AI readiness assessment"
                >
                  Begin Assessment
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </motion.div>
            )}

            {/* ── Questions ── */}
            {phase === 'questions' && (
              <motion.div
                key={`q-${currentQ}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                {/* Progress bar */}
                <div
                  className="px-8 sm:px-10 pt-8 pb-6"
                  style={{ borderBottom: '1px solid #1E1E30' }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: '#6B7080' }}>
                      Question {currentQ + 1} of {totalQuestions}
                    </span>
                    <span className="text-xs font-medium" style={{ color: '#6B7080' }}>
                      {Math.round(((currentQ + 1) / totalQuestions) * 100)}% complete
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full rounded-full overflow-hidden"
                    style={{ backgroundColor: '#1E1E30' }}
                    role="progressbar"
                    aria-valuenow={currentQ + 1}
                    aria-valuemin={1}
                    aria-valuemax={totalQuestions}
                    aria-label={`Question ${currentQ + 1} of ${totalQuestions}`}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #7C3AED 0%, #00D4FF 100%)',
                      }}
                      initial={{ width: `${(currentQ / totalQuestions) * 100}%` }}
                      animate={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
                      transition={{ duration: shouldReduce ? 0 : 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Question body */}
                <div className="px-8 sm:px-10 py-8">
                  <h3
                    className="mb-6 text-lg sm:text-xl font-semibold leading-snug"
                    style={{ color: '#F0F0F5' }}
                    id={`question-${question.id}`}
                  >
                    {question.text}
                  </h3>

                  <div
                    role="group"
                    aria-labelledby={`question-${question.id}`}
                    className="flex flex-col gap-3"
                  >
                    {question.options.map((opt, idx) => {
                      const isSelected = answers[question.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          ref={(el) => { optionRefs.current[idx] = el; }}
                          onClick={() => selectAnswer(opt.id)}
                          onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                          aria-pressed={isSelected}
                          aria-label={opt.label}
                          className="group flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          style={{
                            backgroundColor: isSelected ? 'rgba(0,212,255,0.08)' : '#0F0F1A',
                            border: isSelected
                              ? '1px solid rgba(0,212,255,0.4)'
                              : '1px solid #1E1E30',
                            color: isSelected ? '#F0F0F5' : '#6B7080',
                            outlineColor: '#00D4FF',
                            minHeight: '44px',
                          }}
                        >
                          <span className="flex-1">{opt.label}</span>
                          {isSelected && <CheckIcon />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                      onClick={goBack}
                      className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        color: '#6B7080',
                        outlineColor: '#00D4FF',
                      }}
                      aria-label="Go to previous question"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M13 8H3M7 12L3 8L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Back
                    </button>

                    <button
                      onClick={goNext}
                      disabled={!answers[question.id]}
                      className="flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
                      style={{
                        background: answers[question.id]
                          ? 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)'
                          : '#1E1E30',
                        color: answers[question.id] ? '#0A0A0F' : '#6B7080',
                        outlineColor: '#00D4FF',
                      }}
                      aria-label={
                        currentQ < totalQuestions - 1 ? 'Go to next question' : 'View results'
                      }
                    >
                      {currentQ < totalQuestions - 1 ? 'Next' : 'View Results'}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Results ── */}
            {phase === 'results' && scores && (
              <motion.div
                key="results"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="px-8 sm:px-10 py-10"
              >
                {/* Results header */}
                <motion.div
                  className="mb-8 text-center"
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p
                    className="mb-1 text-xs font-semibold tracking-widest uppercase"
                    style={{ color: '#00D4FF' }}
                  >
                    Your Profile
                  </p>
                  <h3
                    className="text-xl sm:text-2xl font-semibold"
                    style={{ color: '#F0F0F5' }}
                  >
                    Indicative Aetrax Readiness Snapshot
                  </h3>
                </motion.div>

                {/* Radar chart + score bars side by side on larger screens */}
                <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
                  {/* Radar */}
                  <motion.div
                    className="w-full lg:w-1/2 flex justify-center"
                    initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <RadarChart scores={scores} animate={resultsRevealed} />
                  </motion.div>

                  {/* Score bars */}
                  <motion.div
                    className="w-full lg:w-1/2 flex flex-col justify-center gap-4"
                    initial="hidden"
                    animate={resultsRevealed ? 'visible' : 'hidden'}
                    variants={{
                      visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
                    }}
                  >
                    {DIMENSIONS.map((dim, i) => (
                      <motion.div
                        key={dim}
                        variants={{
                          hidden: { opacity: 0, x: shouldReduce ? 0 : 16 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                        }}
                      >
                        <ScoreBar
                          label={dim}
                          value={scores[dim]}
                          delay={i * 0.08 + 0.3}
                          animate={resultsRevealed}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Disclaimer */}
                <motion.div
                  className="mb-8 rounded-xl px-5 py-4"
                  style={{ backgroundColor: '#0F0F1A', border: '1px solid #1E1E30' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7080' }}>
                    <span className="font-semibold" style={{ color: '#F0F0F5' }}>
                      Disclaimer:{' '}
                    </span>
                    This is an indicative snapshot based on your self-reported selections. It is not a scientifically validated assessment. Scores are illustrative and intended to prompt reflection, not to definitively characterise your organisation's AI maturity.
                  </p>
                </motion.div>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <h4
                      className="mb-4 text-sm font-semibold tracking-wide uppercase"
                      style={{ color: '#F0F0F5' }}
                    >
                      Where Aetrax could help
                    </h4>
                    <div className="flex flex-col gap-3">
                      {recommendations.map((rec, i) => (
                        <motion.div
                          key={i}
                          className="flex gap-3 rounded-xl px-5 py-4"
                          style={{
                            backgroundColor: '#0F0F1A',
                            border: '1px solid #1E1E30',
                          }}
                          initial={{ opacity: 0, x: shouldReduce ? 0 : -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.75 + i * 0.1,
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            aria-hidden="true"
                            className="mt-0.5 shrink-0"
                          >
                            <path
                              d="M9 1.5L16 5.5V12.5L9 16.5L2 12.5V5.5L9 1.5Z"
                              stroke="#00D4FF"
                              strokeWidth="1.25"
                              fill="rgba(0,212,255,0.08)"
                            />
                          </svg>
                          <p className="text-sm leading-relaxed" style={{ color: '#6B7080' }}>
                            {rec.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <a
                    href="#contact"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      background: 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
                      color: '#0A0A0F',
                      outlineColor: '#00D4FF',
                    }}
                    aria-label="Discuss your AI readiness results with an Aetrax engineer"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M14 10c0 .4-.1.8-.3 1.1L12 14l-1.5-.5-1 1.5H5c-.6 0-1-.4-1-1v-1H2.5C1.7 14 1 13.3 1 12.5v-9C1 2.7 1.7 2 2.5 2h9c.8 0 1.5.7 1.5 1.5V5h1c.3 0 .5.2.5.5V10z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Discuss this with an Aetrax engineer
                  </a>
                  <button
                    onClick={retake}
                    className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      backgroundColor: '#0F0F1A',
                      border: '1px solid #1E1E30',
                      color: '#6B7080',
                      outlineColor: '#00D4FF',
                    }}
                    aria-label="Retake the AI readiness assessment"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8a6 6 0 1 0 1.5-4M2 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Retake assessment
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadinessAssessment;
