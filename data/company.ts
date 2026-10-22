// ─────────────────────────────────────────────────────────────────────────────
// Aetrax Company Data
// All data sourced exclusively from the official Aetrax company profile.
// ─────────────────────────────────────────────────────────────────────────────

export const COMPANY = {
  name: 'Aetrax',
  descriptor: 'AI Solutions',
  tagline: 'Enterprise AI, delivered with engineering rigour.',
  description:
    "Aetrax helps organisations design, build and operate AI systems that create measurable value. Every system is secure by design, governed from day one, and deployed where the client's data needs to stay.",
  website: 'aetrax.in',
  email: 'hello@aetrax.in',
  headquarters: 'Bengaluru, Karnataka, India',
  coverage: 'Clients across India and internationally',
  mission:
    "Make AI genuinely useful for organisations, without asking them to give up control of their data.",
  vision:
    "To be the AI partner that organisations trust with their most important and sensitive work, known for systems that perform in production.",
  copyright: '© 2026 Aetrax. All rights reserved.',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Differentiator {
  id: string
  title: string
  description: string
  icon: string
}

export interface ServiceLine {
  id: string
  name: string
  description: string
  offerings: string[]
}

export interface Solution {
  id: string
  title: string
  icon: string
  description: string
  capabilities: string[]
  outcome: string
  industries: string[]
  color: 'cyan' | 'violet' | 'blue' | 'emerald' | 'amber' | 'rose'
}

export interface Industry {
  id: string
  name: string
  icon: string
  challenges: string[]
  solutions: string[]
  examples: string[]
}

export interface DeliveryPhase {
  number: number
  name: string
  focus: string
  deliverable: string
  steps: string[]
}

export interface EngagementModel {
  id: string
  name: string
  description: string
  bestFor: string
  features: string[]
}

export interface ResponsibleAIPrinciple {
  id: string
  title: string
  icon: string
  description: string
  commitment: string
}

export interface SecurityCapability {
  id: string
  category: string
  title: string
  description: string
  features: string[]
}

export interface TechStack {
  foundationModels: string[]
  aiFrameworks: string[]
  dataRetrieval: string[]
  cloudInfra: string[]
}

export interface Career {
  id: string
  role: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
}

export interface DeploymentOption {
  id: string
  label: string
  description: string
  layers: string[]
}

export interface NavItem {
  label: string
  href: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Differentiators
// ─────────────────────────────────────────────────────────────────────────────

export const DIFFERENTIATORS: Differentiator[] = [
  {
    id: 'engineering-first',
    title: 'Engineering-First Culture',
    description:
      'We write production-quality code, not prototypes. Every system we deliver is built to be maintained, scaled, and evolved — not just demonstrated.',
    icon: 'Code2',
  },
  {
    id: 'data-sovereignty',
    title: 'Data Sovereignty by Default',
    description:
      'Your data stays where your policies require. We deploy into your cloud account, your data centre, or fully air-gapped environments — without compromise.',
    icon: 'ShieldCheck',
  },
  {
    id: 'governance-from-day-one',
    title: 'Governance from Day One',
    description:
      'Compliance, auditability, and responsible-AI controls are designed in from the start, not retrofitted at the end. We make governance a feature, not a constraint.',
    icon: 'Scale',
  },
  {
    id: 'measurable-outcomes',
    title: 'Measurable Outcomes',
    description:
      'Every engagement is framed around business value. We define success metrics before we write a line of code and instrument every system to track them.',
    icon: 'BarChart3',
  },
  {
    id: 'deep-domain-expertise',
    title: 'Deep Domain Expertise',
    description:
      'Our teams combine AI/ML engineering with domain knowledge across BFSI, healthcare, manufacturing, and the public sector — understanding the nuances that make solutions succeed.',
    icon: 'Brain',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Service Lines
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICE_LINES: ServiceLine[] = [
  {
    id: 'ai-strategy',
    name: 'AI Strategy & Advisory',
    description:
      'We help leadership teams understand where AI creates the most value in their organisation, and build a roadmap to get there responsibly.',
    offerings: [
      'AI readiness assessment',
      'Use-case prioritisation and business case development',
      'AI governance framework design',
      'Technology selection and architecture advisory',
      'Responsible AI policy development',
      'Build-vs-buy-vs-partner analysis',
    ],
  },
  {
    id: 'ai-engineering',
    name: 'AI Engineering & Delivery',
    description:
      'We design, build, and deploy AI systems that work in production — from proof-of-concept to full-scale enterprise rollout.',
    offerings: [
      'Custom LLM-powered application development',
      'RAG (Retrieval-Augmented Generation) pipeline design and implementation',
      'ML model development, fine-tuning, and optimisation',
      'Data platform and pipeline engineering',
      'AI system integration with existing enterprise systems',
      'API and microservices development for AI capabilities',
      'Evaluation, testing, and red-teaming of AI systems',
    ],
  },
  {
    id: 'ai-operations',
    name: 'AI Operations & Managed Services',
    description:
      'AI systems require ongoing attention. We provide the monitoring, maintenance, and continuous improvement that keeps production AI performing.',
    offerings: [
      'Production monitoring and observability for AI systems',
      'Model performance tracking and drift detection',
      'Continuous evaluation and improvement cycles',
      'Incident response and support',
      'Retraining and model refresh pipelines',
      'Capacity planning and cost optimisation',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Solutions
// ─────────────────────────────────────────────────────────────────────────────

export const SOLUTIONS: Solution[] = [
  {
    id: 'knowledge-intelligence',
    title: 'Knowledge & Document Intelligence',
    icon: 'FileSearch',
    description:
      'Transform large, unstructured document repositories into accurate, auditable knowledge systems. Our RAG-based platforms allow employees and customers to query documents, policies, contracts, and reports in natural language — with cited, verifiable answers.',
    capabilities: [
      'Retrieval-Augmented Generation (RAG) pipeline design and optimisation',
      'Multi-format document ingestion (PDF, Word, Excel, scanned images via OCR)',
      'Semantic chunking and hybrid search (dense + sparse retrieval)',
      'Source citation and answer grounding for auditability',
      'Access-controlled retrieval (answers scoped to user permissions)',
      'Hallucination mitigation through retrieval validation',
      'Multi-language support for Indian and international languages',
      'Summarisation, comparison, and extraction across large document sets',
    ],
    outcome:
      'Employees find answers in seconds instead of hours. Compliance teams can audit exactly which documents informed each answer. Knowledge no longer walks out the door when people leave.',
    industries: ['bfsi', 'legal', 'healthcare', 'public-sector', 'enterprise'],
    color: 'cyan',
  },
  {
    id: 'process-automation',
    title: 'Intelligent Process Automation',
    icon: 'Workflow',
    description:
      'Move beyond rule-based RPA to AI-driven automation that handles exceptions, reads unstructured inputs, and improves over time. We automate document-heavy, decision-intensive workflows that traditional automation cannot handle.',
    capabilities: [
      'Intelligent document processing (IDP) for invoices, claims, forms, and contracts',
      'Multi-step agentic workflows with human-in-the-loop controls',
      'Structured data extraction from unstructured documents',
      'Automated classification and routing of documents and cases',
      'Exception handling with configurable approval workflows',
      'Integration with ERP, CRM, and core business systems',
      'Audit trails and compliance logging for regulated workflows',
      'Straight-through processing rate optimisation',
    ],
    outcome:
      'Processing times measured in days drop to minutes. Error rates fall. Teams are freed from repetitive processing to focus on judgement-intensive work where humans add most value.',
    industries: ['bfsi', 'healthcare', 'manufacturing', 'public-sector'],
    color: 'violet',
  },
  {
    id: 'conversational-ai',
    title: 'Conversational AI & Virtual Assistants',
    icon: 'MessageSquare',
    description:
      'Build AI assistants that go far beyond scripted chatbots. Our conversational systems understand context, handle complex multi-turn interactions, integrate with live data systems, and know when to escalate to a human.',
    capabilities: [
      'LLM-powered conversational AI with deep domain grounding',
      'Multi-channel deployment (web, mobile, WhatsApp, Teams, email)',
      'Real-time integration with CRM, ERP, and core systems for live data',
      'Contextual memory and multi-turn conversation management',
      'Intelligent escalation and handoff to human agents',
      'Voice interface support (IVR integration)',
      'Multi-language support including Hindi and regional Indian languages',
      'Analytics and conversation quality monitoring',
    ],
    outcome:
      'Customers receive immediate, accurate responses at any hour. Support teams handle higher-complexity issues. First-contact resolution rates improve significantly.',
    industries: ['bfsi', 'healthcare', 'retail', 'enterprise'],
    color: 'blue',
  },
  {
    id: 'decision-analytics',
    title: 'Decision Intelligence & Analytics',
    icon: 'BarChart3',
    description:
      'Embed AI into your decision-making processes. We build systems that surface insights from complex data, predict outcomes, and recommend actions — helping organisations make faster, better-informed decisions with appropriate human oversight.',
    capabilities: [
      'Predictive analytics models for risk, demand, churn, and fraud',
      'AI-powered dashboards and natural language data exploration',
      'Anomaly detection for operational and financial data',
      'Credit scoring and risk assessment models',
      'Demand forecasting and inventory optimisation',
      'Customer segmentation and behaviour modelling',
      'Scenario analysis and simulation tools',
      'Explainable AI outputs for regulated decision-making',
    ],
    outcome:
      'Decisions previously based on intuition or lagging reports are now grounded in real-time intelligence. Risk is caught earlier. Opportunities are identified before competitors see them.',
    industries: ['bfsi', 'manufacturing', 'retail', 'healthcare'],
    color: 'emerald',
  },
  {
    id: 'ai-developer-tools',
    title: 'AI-Augmented Developer & Knowledge Tools',
    icon: 'Terminal',
    description:
      'Accelerate internal teams with AI tools designed for your specific environment. We build coding assistants trained on your codebase, knowledge management systems for internal expertise, and productivity tools grounded in your organisation\'s own data.',
    capabilities: [
      'Internal coding assistants trained on proprietary codebases',
      'Technical documentation search and generation',
      'Code review and vulnerability detection automation',
      'Internal knowledge base and expertise search systems',
      'Meeting summarisation and action item extraction',
      'HR and policy Q&A assistants',
      'Onboarding and training content generation',
      'Deployed on private infrastructure — no data leaves your environment',
    ],
    outcome:
      'Developer velocity increases measurably. Institutional knowledge becomes accessible to everyone, not just those who have been there longest. New employees onboard faster.',
    industries: ['enterprise', 'technology', 'manufacturing'],
    color: 'amber',
  },
  {
    id: 'ai-platform',
    title: 'AI Platform Engineering',
    icon: 'Layers',
    description:
      'For organisations building AI capabilities at scale, we design and implement the foundational platform — the data infrastructure, model serving layer, governance framework, and tooling that makes enterprise AI sustainable and governable.',
    capabilities: [
      'Enterprise AI platform architecture and implementation',
      'Data lakehouse and vector database design',
      'Model registry, versioning, and governance tooling',
      'Inference infrastructure optimisation (latency, cost, throughput)',
      'MLOps and LLMOps pipeline engineering',
      'Fine-tuning infrastructure for custom model training',
      'AI observability and evaluation frameworks',
      'Multi-tenant platform design for internal AI teams',
    ],
    outcome:
      'Individual AI projects become a scalable capability. Teams can experiment and ship faster. Governance and cost controls are enforced at the platform level, not left to individual project teams.',
    industries: ['enterprise', 'technology', 'bfsi'],
    color: 'rose',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Industries
// ─────────────────────────────────────────────────────────────────────────────

export const INDUSTRIES: Industry[] = [
  {
    id: 'bfsi',
    name: 'Banking, Financial Services & Insurance',
    icon: 'Landmark',
    challenges: [
      'Regulatory compliance across RBI, SEBI, IRDAI, and international frameworks',
      'High document volumes in lending, claims, and onboarding workflows',
      'Fraud detection at scale with low false-positive tolerances',
      'Customer service demands across channels and languages',
      'Data residency and sovereignty requirements',
      'Auditability requirements for AI-driven decisions',
    ],
    solutions: [
      'Knowledge & Document Intelligence for policy, regulatory, and contract documents',
      'Intelligent Process Automation for loan processing, claims handling, and KYC',
      'Decision Intelligence for credit risk, fraud detection, and portfolio analytics',
      'Conversational AI for customer service across web, mobile, and WhatsApp',
      'Explainable AI for audit-ready decision documentation',
    ],
    examples: [
      'Loan application processing automation reducing turnaround from days to hours',
      'Insurance claims triage and straight-through processing',
      'Regulatory document Q&A for compliance teams',
      'Real-time fraud pattern detection',
      'Customer onboarding document verification and extraction',
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    icon: 'HeartPulse',
    challenges: [
      'Sensitive patient data requiring strict privacy and access controls',
      'Complex clinical documentation and coding workflows',
      'Regulatory compliance (HIPAA, DPDPA, clinical trial regulations)',
      'Fragmented data across clinical, operational, and administrative systems',
      'High-stakes decisions requiring explainable AI with human oversight',
    ],
    solutions: [
      'Clinical document intelligence for medical records, discharge summaries, and reports',
      'Intelligent automation for billing, coding, and prior authorisation workflows',
      'Decision intelligence for clinical operations and resource planning',
      'Patient engagement conversational AI with privacy controls',
      'Research literature search and synthesis tools',
    ],
    examples: [
      'Medical record summarisation for clinical teams',
      'Insurance prior authorisation automation',
      'Clinical trial document processing and extraction',
      'Patient FAQ and appointment management assistants',
      'Pharmacovigilance document review acceleration',
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrial',
    icon: 'Factory',
    challenges: [
      'Operational data from multiple systems with limited integration',
      'Predictive maintenance and quality control demands',
      'Supply chain complexity and demand volatility',
      'Technical documentation across products, processes, and compliance',
      'Skills gaps and institutional knowledge retention',
    ],
    solutions: [
      'Decision intelligence for demand forecasting and inventory optimisation',
      'Intelligent document processing for technical manuals, SOPs, and compliance docs',
      'Predictive analytics for equipment maintenance and quality control',
      'AI-augmented developer and knowledge tools for engineering teams',
      'Supply chain analytics and scenario modelling',
    ],
    examples: [
      'Equipment failure prediction from sensor and maintenance data',
      'Quality inspection assistance with anomaly detection',
      'Technical SOP and manual search for shop-floor teams',
      'Demand forecasting for production planning',
      'Supplier risk monitoring and analytics',
    ],
  },
  {
    id: 'public-sector',
    name: 'Government & Public Sector',
    icon: 'Building2',
    challenges: [
      'Stringent data sovereignty and localisation requirements',
      'Large document volumes in policy, compliance, and citizen services',
      'Auditability and transparency requirements for AI-assisted decisions',
      'Legacy system integration constraints',
      'Multi-language requirements across Indian languages',
    ],
    solutions: [
      'Knowledge intelligence for policy, regulatory, and scheme documents',
      'Intelligent automation for application processing and compliance workflows',
      'Conversational AI for citizen services in multiple languages',
      'Decision intelligence for resource allocation and programme monitoring',
      'On-premise and air-gapped deployment for classified environments',
    ],
    examples: [
      'Scheme eligibility Q&A for citizens in regional languages',
      'Regulatory document search for internal compliance teams',
      'Application processing automation for government services',
      'Policy synthesis and comparison for policy teams',
      'Procurement document analysis and risk flagging',
    ],
  },
  {
    id: 'legal',
    name: 'Legal & Professional Services',
    icon: 'Gavel',
    challenges: [
      'High-volume contract and document review requirements',
      'Privileged information requiring strict access controls',
      'Research across vast legal and regulatory corpora',
      'Billable time pressure on routine document tasks',
      'Auditability of AI-assisted legal work product',
    ],
    solutions: [
      'Contract intelligence and clause extraction at scale',
      'Legal research Q&A grounded in firm\'s own document library',
      'Due diligence document processing and risk flagging',
      'Knowledge management for case law and precedents',
      'Document drafting assistance with house-style grounding',
    ],
    examples: [
      'Contract review and obligation extraction across large document sets',
      'Legal research assistant grounded in firm knowledge bases',
      'Due diligence automation for M&A transactions',
      'Regulatory change impact analysis across contract portfolios',
      'NDAs and standard agreement drafting assistance',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise & Technology',
    icon: 'Building',
    challenges: [
      'Scaling AI capabilities across distributed teams',
      'Fragmented knowledge across tools, documents, and people',
      'Developer productivity and code quality at scale',
      'AI governance across multiple concurrent projects',
      'Cost management for AI infrastructure and API usage',
    ],
    solutions: [
      'AI Platform Engineering for scalable enterprise AI infrastructure',
      'AI-augmented developer tools grounded in proprietary codebases',
      'Internal knowledge intelligence across documentation and expertise',
      'Conversational AI for internal operations and HR',
      'AI governance frameworks and policy tooling',
    ],
    examples: [
      'Internal coding assistant trained on proprietary codebase',
      'Enterprise knowledge search across Confluence, SharePoint, and internal docs',
      'HR policy Q&A and onboarding assistant',
      'Meeting intelligence and action item extraction',
      'AI platform engineering for multi-team deployment',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Delivery Phases
// ─────────────────────────────────────────────────────────────────────────────

export const DELIVERY_PHASES: DeliveryPhase[] = [
  {
    number: 1,
    name: 'Discover',
    focus: 'Understand the problem deeply before proposing a solution',
    deliverable: 'Problem definition, success metrics, and feasibility assessment',
    steps: [
      'Stakeholder interviews to understand the real problem, not just the stated problem',
      'Review of existing data, systems, and processes',
      'AI feasibility assessment — is AI the right tool, and is the data ready?',
      'Success metric definition — what does measurable success look like?',
      'Risk and compliance identification',
      'Rough effort and timeline estimation',
    ],
  },
  {
    number: 2,
    name: 'Design',
    focus: 'Architect the right system, not the most impressive one',
    deliverable: 'System architecture, data design, and governance framework',
    steps: [
      'Solution architecture design with deployment model selection',
      'Data pipeline and preparation design',
      'Security and access control architecture',
      'Governance framework design — human oversight, audit trails, escalation paths',
      'Evaluation framework — how we will measure quality and performance',
      'Integration design with existing enterprise systems',
      'Responsible AI impact assessment',
    ],
  },
  {
    number: 3,
    name: 'Build',
    focus: 'Deliver working software in production-quality iterations',
    deliverable: 'Working, tested AI system ready for production',
    steps: [
      'Iterative development in two-week sprints with working software each sprint',
      'Data pipeline engineering and data preparation',
      'Model development, fine-tuning, or RAG pipeline implementation',
      'Integration development with enterprise systems',
      'Evaluation-driven development — measuring quality continuously',
      'Security hardening and penetration testing',
      'User acceptance testing with real users and real data',
    ],
  },
  {
    number: 4,
    name: 'Operate',
    focus: 'Run the system well and improve it continuously',
    deliverable: 'Production system with monitoring, governance, and improvement cycles',
    steps: [
      'Production deployment and go-live support',
      'Monitoring and observability setup — latency, quality, usage, cost',
      'Model drift detection and alerting',
      'Continuous evaluation against defined success metrics',
      'Regular performance reviews and improvement cycles',
      'User feedback collection and incorporation',
      'Documentation, training, and knowledge transfer',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Engagement Models
// ─────────────────────────────────────────────────────────────────────────────

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: 'project',
    name: 'Fixed-Scope Project',
    description:
      'Defined deliverable, defined timeline, defined cost. Best for organisations with clear requirements and a specific system to build.',
    bestFor: 'Clear, well-scoped AI systems with defined requirements',
    features: [
      'Fixed price and timeline',
      'Defined deliverables and success criteria',
      'Full project team dedicated to delivery',
      'Regular milestone reviews',
      'Handover and knowledge transfer included',
    ],
  },
  {
    id: 'discovery',
    name: 'Discovery & Strategy',
    description:
      'A structured engagement to define the right AI roadmap before committing to building. Ends with a clear, prioritised plan and business case.',
    bestFor: 'Organisations earlier in their AI journey, or exploring a new domain',
    features: [
      'Stakeholder interviews and current-state assessment',
      'Use-case identification and prioritisation',
      'AI readiness and data quality assessment',
      'Governance and risk framework recommendations',
      'Detailed roadmap and business case',
    ],
  },
  {
    id: 'team-extension',
    name: 'Team Extension',
    description:
      'Experienced AI engineers embedded within your existing team. Best for organisations with internal product ownership who need AI engineering depth.',
    bestFor: 'Internal AI teams needing specialist AI/ML engineering resource',
    features: [
      'Senior AI/ML engineers embedded with your team',
      'Works within your processes and tools',
      'Flexible scaling up or down',
      'Access to Aetrax specialist network',
      'Knowledge transfer to internal team',
    ],
  },
  {
    id: 'managed-service',
    name: 'Managed AI Service',
    description:
      'Ongoing operation, monitoring, and continuous improvement of your AI systems. We run the system so your team can focus on using it.',
    bestFor: 'Production AI systems needing ongoing operational excellence',
    features: [
      'Production monitoring and alerting',
      'Model performance tracking and drift detection',
      'Continuous improvement cycles',
      'Incident response and support SLA',
      'Monthly performance reporting',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Responsible AI Principles
// ─────────────────────────────────────────────────────────────────────────────

export const RESPONSIBLE_AI: ResponsibleAIPrinciple[] = [
  {
    id: 'human-oversight',
    title: 'Human Oversight',
    icon: 'Users',
    description:
      'Every high-stakes AI system we build includes explicit human oversight mechanisms. AI recommends; humans decide where it matters.',
    commitment:
      'We design human-in-the-loop controls into every system that affects consequential decisions. Escalation paths and override mechanisms are requirements, not optional extras.',
  },
  {
    id: 'transparency',
    title: 'Transparency & Explainability',
    icon: 'Eye',
    description:
      'Users should understand what the AI is doing and why. We build systems that can explain their outputs and make their reasoning traceable.',
    commitment:
      'We implement source citation, confidence indicators, and audit logging in every production system. We do not deploy black-box systems for high-stakes decisions.',
  },
  {
    id: 'fairness',
    title: 'Fairness & Non-Discrimination',
    icon: 'Scale',
    description:
      'AI systems must not create or amplify unfair outcomes. We actively assess and mitigate bias in models and training data.',
    commitment:
      'We conduct bias assessments at design time and evaluation time. We recommend against deploying systems with unmitigated discriminatory outcomes.',
  },
  {
    id: 'privacy',
    title: 'Privacy by Design',
    icon: 'Lock',
    description:
      'Data privacy is a design constraint, not an afterthought. We minimise data use, enforce access controls, and build for compliance from day one.',
    commitment:
      'We conduct data minimisation analysis before building. We enforce access-controlled retrieval so users only see what they are authorised to see.',
  },
  {
    id: 'reliability',
    title: 'Reliability & Safety',
    icon: 'ShieldCheck',
    description:
      'AI systems must behave predictably and safely. We implement robust evaluation, testing, and safeguards — including adversarial testing for high-risk applications.',
    commitment:
      'We run structured evaluation suites before every production deployment. For high-risk systems, we conduct red-teaming to identify failure modes before they reach users.',
  },
  {
    id: 'accountability',
    title: 'Accountability',
    icon: 'ClipboardCheck',
    description:
      'Clear lines of accountability for AI system behaviour, from design through to operation. We document, audit, and review.',
    commitment:
      'We maintain comprehensive audit logs, document model limitations and known failure modes, and conduct regular post-deployment reviews against defined success metrics.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Security Capabilities
// ─────────────────────────────────────────────────────────────────────────────

export const SECURITY: SecurityCapability[] = [
  {
    id: 'deployment-isolation',
    category: 'Infrastructure',
    title: 'Deployment Isolation',
    description:
      'Every client deployment is fully isolated. We do not run multi-tenant shared AI infrastructure.',
    features: [
      'Single-tenant deployment architecture',
      'Client cloud, managed cloud, on-premise, or air-gapped options',
      'No cross-client data exposure by design',
      'Dedicated compute and storage per client',
    ],
  },
  {
    id: 'data-protection',
    category: 'Data',
    title: 'Data Protection',
    description:
      'Client data is encrypted at rest and in transit, with key management controlled by the client where required.',
    features: [
      'Encryption at rest (AES-256) and in transit (TLS 1.3)',
      'Client-managed encryption keys available',
      'Data classification and handling controls',
      'No training or use of client data for model improvement without explicit consent',
    ],
  },
  {
    id: 'access-control',
    category: 'Access',
    title: 'Access Control & Identity',
    description:
      'Fine-grained access controls ensure users only interact with AI capabilities and data they are authorised to access.',
    features: [
      'Integration with enterprise identity providers (SSO, SAML, OAuth)',
      'Role-based access control (RBAC) for AI features and data',
      'Access-controlled retrieval — RAG answers scoped to user permissions',
      'Privileged access management for administrative functions',
    ],
  },
  {
    id: 'audit-logging',
    category: 'Compliance',
    title: 'Audit Logging & Compliance',
    description:
      'Comprehensive audit trails for every interaction with AI systems, supporting regulatory compliance and internal governance.',
    features: [
      'Full audit log of user queries and AI responses',
      'Source document citation for every AI answer',
      'Tamper-evident log storage',
      'Exportable audit reports for compliance teams',
    ],
  },
  {
    id: 'model-security',
    category: 'AI-Specific',
    title: 'AI Model Security',
    description:
      'Specific security controls for AI systems, including protection against prompt injection, jailbreaks, and data extraction attacks.',
    features: [
      'Prompt injection detection and mitigation',
      'Output filtering and content safety controls',
      'Rate limiting and abuse detection',
      'Red-teaming and adversarial testing for high-risk deployments',
    ],
  },
  {
    id: 'operational-security',
    category: 'Operations',
    title: 'Operational Security',
    description:
      'Security throughout the development and operational lifecycle, not just at deployment.',
    features: [
      'Secure development practices and code review',
      'Dependency scanning and vulnerability management',
      'Security incident response procedures',
      'Regular security reviews and penetration testing',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Technology Stack
// ─────────────────────────────────────────────────────────────────────────────

export const TECHNOLOGY: TechStack = {
  foundationModels: [
    'OpenAI GPT-4o / GPT-4 Turbo',
    'Anthropic Claude 3.5 / Claude 3',
    'Google Gemini 1.5 Pro',
    'Meta Llama 3 / Llama 3.1',
    'Mistral Large / Mixtral',
    'Cohere Command R+',
    'Microsoft Phi-3',
    'Custom fine-tuned models',
  ],
  aiFrameworks: [
    'LangChain & LangGraph',
    'LlamaIndex',
    'Hugging Face Transformers',
    'OpenAI SDK',
    'Semantic Kernel',
    'AutoGen',
    'DSPy',
    'RAGAS (evaluation)',
  ],
  dataRetrieval: [
    'Pinecone',
    'Weaviate',
    'Qdrant',
    'pgvector (PostgreSQL)',
    'Elasticsearch',
    'Azure AI Search',
    'Chroma',
    'Redis Vector Search',
  ],
  cloudInfra: [
    'Amazon Web Services (AWS)',
    'Microsoft Azure',
    'Google Cloud Platform (GCP)',
    'On-premise / Private Cloud',
    'Air-gapped deployments',
    'Kubernetes / Docker',
    'Terraform (IaC)',
    'NVIDIA GPU infrastructure',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Careers
// ─────────────────────────────────────────────────────────────────────────────

export const CAREERS: Career[] = [
  {
    id: 'senior-ai-engineer',
    role: 'Senior AI / ML Engineer',
    department: 'Engineering',
    location: 'Bengaluru (Hybrid)',
    type: 'Full-time',
    description:
      'Design and build production AI systems for enterprise clients. You will work on RAG pipelines, LLM integrations, and AI platform engineering across a range of industries.',
    requirements: [
      'Strong Python engineering skills',
      'Experience with LLMs, RAG, and AI application development',
      'Familiarity with LangChain, LlamaIndex, or similar frameworks',
      'Production engineering mindset — you care about reliability, not just demos',
      'Ability to work directly with clients and communicate technical concepts clearly',
    ],
  },
  {
    id: 'ml-platform-engineer',
    role: 'ML Platform Engineer',
    department: 'Engineering',
    location: 'Bengaluru (Hybrid)',
    type: 'Full-time',
    description:
      'Build the infrastructure and tooling that makes enterprise AI scalable, governable, and cost-effective. Focus on MLOps, LLMOps, and AI platform engineering.',
    requirements: [
      'Experience with MLOps tooling (MLflow, Kubeflow, or similar)',
      'Strong Kubernetes and cloud infrastructure skills',
      'Python and infrastructure-as-code experience',
      'Understanding of model serving, monitoring, and observability',
      'Interest in making AI engineering practices repeatable and scalable',
    ],
  },
  {
    id: 'ai-solutions-consultant',
    role: 'AI Solutions Consultant',
    department: 'Solutions',
    location: 'Bengaluru (Hybrid)',
    type: 'Full-time',
    description:
      'Bridge business problems and technical solutions. You will work with clients to understand their needs, shape AI solutions, and guide them through delivery. Combines deep AI knowledge with client-facing skills.',
    requirements: [
      'Background in consulting, product management, or pre-sales',
      'Strong understanding of AI/ML capabilities and limitations',
      'Excellent communication and presentation skills',
      'Ability to build business cases and ROI frameworks for AI investments',
      'Experience working with enterprise clients in regulated industries preferred',
    ],
  },
  {
    id: 'data-engineer',
    role: 'Data Engineer',
    department: 'Engineering',
    location: 'Bengaluru (Hybrid)',
    type: 'Full-time',
    description:
      'Build the data foundations that AI systems depend on. Design and implement data pipelines, document processing systems, and data platforms for AI workloads.',
    requirements: [
      'Strong SQL and Python skills',
      'Experience with data pipeline tools (Airflow, dbt, Spark, or similar)',
      'Familiarity with document processing (PDF, OCR, unstructured data)',
      'Experience with cloud data platforms (AWS, Azure, or GCP)',
      'Interest in how data quality directly impacts AI system quality',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Deployment Options
// ─────────────────────────────────────────────────────────────────────────────

export const DEPLOYMENT_OPTIONS: DeploymentOption[] = [
  {
    id: 'client-cloud',
    label: 'Client Cloud',
    description: 'Deployed in your existing cloud account — you retain full control',
    layers: [
      'Your Cloud Account',
      'Isolated Deployment',
      'Private AI Models',
      'Application Layer',
      'Access Control',
      'Audit Logging',
    ],
  },
  {
    id: 'managed-cloud',
    label: 'Managed Cloud',
    description: 'Aetrax-managed isolated cloud environment — full isolation, less operational overhead',
    layers: [
      'Aetrax-Managed Cloud',
      'Dedicated Tenant',
      'Isolated Network',
      'Managed AI Models',
      'Application Layer',
      'Audit Logging',
    ],
  },
  {
    id: 'client-datacenter',
    label: 'Client Data Centre',
    description: 'On-premise in your own infrastructure — data never leaves your facility',
    layers: [
      'Your Data Centre',
      'On-Premise Servers',
      'Private Network',
      'Local AI Models',
      'Application Layer',
      'Audit Logging',
    ],
  },
  {
    id: 'air-gapped',
    label: 'On-Premise / Air-Gapped',
    description: 'Fully isolated, no external connectivity — for the most sensitive environments',
    layers: [
      'Air-Gapped Environment',
      'Isolated Hardware',
      'No External Network',
      'Offline AI Models',
      'Application Layer',
      'Tamper-Evident Logs',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Items
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions',       href: '#solutions'       },
  { label: 'Industries',      href: '#industries'      },
  { label: 'Approach',        href: '#approach'        },
  { label: 'Responsible AI',  href: '#responsible-ai'  },
  { label: 'Security',        href: '#security'        },
  { label: 'Technology',      href: '#technology'      },
  { label: 'Careers',         href: '#careers'         },
  { label: 'Contact',         href: '#contact'         },
]
