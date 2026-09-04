import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Percent,
  CheckSquare,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Bot,
  Copy,
  Check,
  Play,
  RotateCcw,
  Zap,
  Terminal,
  Cpu
} from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  model: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  borderColor: string;
  description: string;
  inputSchema: string;
  outputSchema: string;
  mockPayload: Record<string, unknown>;
}

export const MultiAgentCanvas: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('resume_parser');
  const [copied, setCopied] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simActiveIndex, setSimActiveIndex] = useState(0);

  const nodes: AgentNode[] = [
    {
      id: 'resume_parser',
      name: 'Resume Parser',
      role: 'Document Ingestion & Entity Normalizer',
      model: 'Ollama (Llama-3-8B)',
      icon: FileText,
      color: '#EF4444',
      borderColor: 'border-[#EF4444]',
      description: 'Parses unstructured PDF/Docx resumes into normalized JSON tokens, extracting work histories, educational degrees, and technical skill taxonomy.',
      inputSchema: 'class RawResumePayload(BaseModel):\n    file_bytes: bytes\n    file_type: str = "pdf"\n    extract_tables: bool = True',
      outputSchema: 'class ParsedResumeState(BaseModel):\n    candidate_name: str\n    contact_info: Dict[str, str]\n    skills: List[str]\n    experience: List[JobEntry]\n    education: List[AcademicDegree]',
      mockPayload: {
        agent: 'resume_parser',
        status: 'SUCCESS',
        latency_ms: 184,
        candidate_name: 'Gowtham M',
        normalized_skills: ['Python', 'LangGraph', 'PyTorch', 'Apache Airflow', 'Ollama', 'SQL', 'FastAPI'],
        cgpa: 7.45,
        university: 'Mahendra Engineering College',
        token_count: 1420,
      },
    },
    {
      id: 'ats_scorer',
      name: 'ATS Scorer',
      role: 'Deterministic Heuristic & Density Scorer',
      model: 'Ollama (Mistral-7B)',
      icon: Percent,
      color: '#F59E0B',
      borderColor: 'border-[#F59E0B]',
      description: 'Evaluates resume structure against industry standard ATS algorithms, calculating keyword frequency, density ratios, and formatting compliance.',
      inputSchema: 'class ATSScoringInput(BaseModel):\n    parsed_profile: ParsedResumeState\n    target_job_taxonomy: List[str]',
      outputSchema: 'class ATSScoreOutput(BaseModel):\n    overall_score: float = Field(ge=0.0, le=100.0)\n    section_scores: Dict[str, float]\n    formatting_warnings: List[str]',
      mockPayload: {
        agent: 'ats_scorer',
        status: 'SUCCESS',
        overall_ats_score: 96.8,
        keyword_density_index: 0.94,
        formatting_compliance: '100% Clean / No Unparsed Tables',
        matched_high_value_terms: ['Multi-Agent', 'StateGraph', 'ETL DAGs', 'Edge AI'],
      },
    },
    {
      id: 'constraint_checker',
      name: 'Constraint Checker',
      role: 'Pydantic Type & Invariant Validator',
      model: 'Python Native Pydantic Guard',
      icon: CheckSquare,
      color: '#8B5CF6',
      borderColor: 'border-[#8B5CF6]',
      description: 'Zero-hallucination barrier ensuring that extracted skills and experience timestamps obey mathematical reality and typed schema invariants.',
      inputSchema: 'class InvariantGuardInput(BaseModel):\n    state_data: Dict[str, Any]\n    strict_mode: bool = True',
      outputSchema: 'class GuardValidationResult(BaseModel):\n    passed: bool\n    invariant_violations: List[str]\n    sanitized_state: Dict[str, Any]',
      mockPayload: {
        agent: 'constraint_checker',
        status: 'VALIDATED',
        violations_count: 0,
        schema_drift_detected: false,
        sanitized_attributes: 42,
        integrity_check: 'PASSED_CLEAN',
      },
    },
    {
      id: 'job_matcher',
      name: 'Job Matcher',
      role: 'Semantic Vector & Role Fit Matcher',
      model: 'Ollama (Llama-3-8B) + FAISS',
      icon: GitBranch,
      color: '#EF4444',
      borderColor: 'border-[#EF4444]',
      description: 'Calculates cosine similarity across technical competencies, mapping candidate vector embeddings to target job requisitions.',
      inputSchema: 'class JobMatchRequest(BaseModel):\n    candidate_embedding: List[float]\n    job_description_vector: List[float]\n    threshold: float = 0.85',
      outputSchema: 'class MatchResult(BaseModel):\n    similarity_index: float\n    aligned_domains: List[str]\n    confidence_tier: Literal["OPTIMAL", "HIGH", "MODERATE"]',
      mockPayload: {
        agent: 'job_matcher',
        target_role: 'AI / Machine Learning Systems Engineer',
        semantic_similarity: 0.982,
        fit_verdict: 'OPTIMAL_MATCH',
        domain_alignment: ['Agentic Workflows', 'Airflow Pipelines', 'Computer Vision'],
      },
    },
    {
      id: 'gap_analyzer',
      name: 'Gap Analyzer',
      role: 'Technical Skill Delta & Curve Mapper',
      model: 'Ollama (Mistral-7B)',
      icon: ShieldCheck,
      color: '#F59E0B',
      borderColor: 'border-[#F59E0B]',
      description: 'Identifies missing prerequisite skills, architectural gaps, and estimates the learning curve required for 100% role mastery.',
      inputSchema: 'class GapAnalysisInput(BaseModel):\n    matched_skills: List[str]\n    required_skills: List[str]',
      outputSchema: 'class GapAnalysisOutput(BaseModel):\n    missing_prerequisites: List[str]\n    upskilling_pathways: List[str]\n    estimated_ramp_up_days: int',
      mockPayload: {
        agent: 'gap_analyzer',
        critical_gaps_found: 0,
        minor_recommends: ['Kubernetes Helm Charts for Airflow Multi-node Clusters'],
        ramp_up_estimate: 'Immediate / Zero Day Ramp-Up Required',
      },
    },
    {
      id: 'recommendation_engine',
      name: 'Recommendation Engine',
      role: 'Resume Tailoring & Bullet Optimizer',
      model: 'Ollama (Llama-3-8B)',
      icon: Sparkles,
      color: '#8B5CF6',
      borderColor: 'border-[#8B5CF6]',
      description: 'Rewrites and customizes bullet points dynamically for maximum recruiter impact while strictly respecting factual ground truth.',
      inputSchema: 'class BulletOptimizationPrompt(BaseModel):\n    bullet_point: str\n    target_metrics: List[str]\n    tone: str = "authoritative"',
      outputSchema: 'class OptimizedBullet(BaseModel):\n    rewritten_text: str\n    quantifiable_lift: str\n    clarity_score: float',
      mockPayload: {
        agent: 'recommendation_engine',
        tailored_bullets_generated: 4,
        action_verb_enhancement: '+34% Impact Multiplier',
        factual_grounding_verified: true,
      },
    },
    {
      id: 'executive_summary',
      name: 'Executive Summary',
      role: 'Hiring Manager Brief Synthesizer',
      model: 'Ollama (Llama-3-8B)',
      icon: Bot,
      color: '#EF4444',
      borderColor: 'border-[#EF4444]',
      description: 'Generates a high-density 1-page executive summary briefing recruiters with core strengths, proof-of-work metrics, and interview readiness.',
      inputSchema: 'class BriefSynthesisInput(BaseModel):\n    all_agent_states: Dict[str, Any]',
      outputSchema: 'class ExecutiveBrief(BaseModel):\n    executive_summary: str\n    top_3_strengths: List[str]\n    recommended_action: Literal["FAST_TRACK_INTERVIEW", "SCHEDULE_SCREEN", "HOLD"]',
      mockPayload: {
        agent: 'executive_summary',
        decision: 'FAST_TRACK_INTERVIEW',
        summary_verdict: 'Gowtham M demonstrates elite proficiency in stateful Multi-Agent graphs, Apache Airflow ETL pipelines, and IoT Edge AI.',
        confidence: '99.4%',
      },
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const handleCopy = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(JSON.stringify(activeNode.mockPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    soundFx.playClick();
    if (simulationRunning) return;
    setSimulationRunning(true);
    setSimActiveIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < nodes.length) {
        setSimActiveIndex(current);
        setActiveNodeId(nodes[current].id);
        soundFx.playHover();
      } else {
        clearInterval(interval);
        setSimulationRunning(false);
        soundFx.playSuccess();
      }
    }, 850);
  };

  return (
    <section
      id="multi-agent-system"
      className="py-24 relative bg-[#0D0E15] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient Radial Blobs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EF4444]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#F59E0B]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141F] border border-[#EF4444]/30 text-xs font-mono text-[#EF4444]">
              <Cpu className="w-3.5 h-3.5" />
              <span>01 // Advanced Multi-Agent Architectures</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              7-Agent LangGraph Workflow Hub
            </h2>
            <p className="text-sm sm:text-base text-[#8F94A6] leading-relaxed font-sans">
              Autonomous cognitive graph breaking candidate resume parsing, ATS scoring, constraint checking, and job matching into deterministic micro-agents.
            </p>
          </div>

          {/* 100% Local Deployment Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#13141F] border border-[#EF4444]/40 shadow-glow-crimson backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wide">
                100% Local Deployment (Ollama)
              </span>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={simulationRunning}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white font-mono text-xs font-bold shadow-glow-crimson flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {simulationRunning ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Simulating Swarm...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Pipeline Flow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Interactive Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 7-Node Interactive Visual Flowchart (7 cols on LG) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="p-5 rounded-3xl bg-[#13141F]/90 border border-white/10 shadow-2xl backdrop-blur-xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-[#8F94A6]">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#EF4444]" />
                  <span>Interactive Node Flowchart</span>
                </div>
                <span>Click any node to inspect payload</span>
              </div>

              {/* Node Sequence List */}
              <div className="mt-4 space-y-3 relative">
                {/* SVG connection wire */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#EF4444] via-[#F59E0B] to-[#8B5CF6] opacity-30 pointer-events-none" />

                {nodes.map((node, index) => {
                  const isSelected = activeNodeId === node.id;
                  const isSimActive = simulationRunning && simActiveIndex === index;
                  const Icon = node.icon;

                  return (
                    <motion.div
                      key={node.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => {
                        soundFx.playClick();
                        setActiveNodeId(node.id);
                      }}
                      className={`relative z-10 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isSelected || isSimActive
                          ? 'bg-[#181A28] border-[#EF4444] shadow-glow-crimson scale-[1.01]'
                          : 'bg-[#0D0E15]/80 border-white/5 hover:border-white/20 hover:bg-[#13141F]'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 truncate">
                        {/* Node Number & Icon */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all"
                          style={{
                            backgroundColor: `${node.color}20`,
                            color: node.color,
                            border: `1px solid ${node.color}50`,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#8F94A6]">
                              0{index + 1} //
                            </span>
                            <span className="text-sm sm:text-base font-bold text-white font-sans">
                              {node.name}
                            </span>
                          </div>
                          <p className="text-xs text-[#8F94A6] truncate font-sans">
                            {node.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[#8F94A6] hidden sm:inline-block">
                          {node.model}
                        </span>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Code-Like Terminal & Pydantic Payloads (5 cols on LG) */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl bg-[#13141F] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
              >
                {/* Terminal Header */}
                <div className="px-5 py-3.5 bg-[#0D0E15] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono text-white font-semibold ml-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#EF4444]" />
                      agent_inspector.py // {activeNode.id}
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#8F94A6] hover:text-white transition-all"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Node Summary */}
                <div className="p-5 space-y-4">
                  <div>
                    <span
                      className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${activeNode.color}20`,
                        color: activeNode.color,
                      }}
                    >
                      {activeNode.role}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1.5 font-display">
                      {activeNode.name}
                    </h3>
                    <p className="text-xs text-[#8F94A6] mt-1 leading-relaxed">
                      {activeNode.description}
                    </p>
                  </div>

                  {/* Schema Tab View */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[#8F94A6] uppercase font-bold">
                      Output Pydantic Model Contract:
                    </span>
                    <pre className="p-3 rounded-xl bg-[#0D0E15] border border-white/5 text-[11px] font-mono text-[#EF4444] overflow-x-auto leading-relaxed">
                      <code>{activeNode.outputSchema}</code>
                    </pre>
                  </div>

                  {/* Live JSON Payload Stream */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8F94A6]">
                      <span className="uppercase font-bold">Live Serialized State Payload:</span>
                      <span className="text-emerald-400 font-bold">200 OK</span>
                    </div>
                    <pre className="p-3.5 rounded-xl bg-[#0D0E15] border border-white/5 text-xs font-mono text-[#F59E0B] overflow-x-auto max-h-56 leading-relaxed">
                      <code>{JSON.stringify(activeNode.mockPayload, null, 2)}</code>
                    </pre>
                  </div>
                </div>

                {/* Terminal Footer Info */}
                <div className="px-5 py-3 bg-[#0D0E15] border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8F94A6]">
                  <span>Engine: {activeNode.model}</span>
                  <span className="text-[#10B981] flex items-center gap-1 font-bold">
                    <Zap className="w-3 h-3" />
                    Zero Cloud Cost
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
