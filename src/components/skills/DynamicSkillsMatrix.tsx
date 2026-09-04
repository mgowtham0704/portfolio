import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Award,
  Cpu,
  Database,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

interface SkillItem {
  name: string;
  category: 'languages' | 'genai' | 'data-eng';
  level: number;
  tags: string[];
  iconText: string;
  glowColor: string;
}

export const DynamicSkillsMatrix: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('ai-ml-engineer');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Group 1: Languages & Frameworks
  const languagesAndFrameworks: SkillItem[] = [
    { name: 'Python', category: 'languages', level: 98, tags: ['Vectorized', 'OOP', 'AsyncIO'], iconText: 'Py', glowColor: '#EF4444' },
    { name: 'SQL', category: 'languages', level: 92, tags: ['Complex Joins', 'Window Funcs', 'Indexing'], iconText: 'SQL', glowColor: '#EF4444' },
    { name: 'PyTorch', category: 'languages', level: 90, tags: ['Neural Nets', 'CNNs', 'Loss Functions'], iconText: 'PT', glowColor: '#EF4444' },
    { name: 'FastAPI', category: 'languages', level: 88, tags: ['Pydantic v2', 'Async Endpoints', 'OpenAPI'], iconText: 'API', glowColor: '#EF4444' },
    { name: 'OpenCV', category: 'languages', level: 89, tags: ['Image Processing', 'Streams', 'Bounding Boxes'], iconText: 'CV', glowColor: '#EF4444' },
  ];

  // Group 2: Generative AI Tools
  const genAiTools: SkillItem[] = [
    { name: 'LangGraph', category: 'genai', level: 96, tags: ['StateGraph', 'Multi-Agent', 'Checkpointers'], iconText: 'LG', glowColor: '#F59E0B' },
    { name: 'LangChain', category: 'genai', level: 94, tags: ['Chains', 'Retrieval', 'Memory'], iconText: 'LC', glowColor: '#F59E0B' },
    { name: 'Ollama', category: 'genai', level: 96, tags: ['Local LLMs', 'Llama 3', 'Mistral', 'Zero-Cost'], iconText: 'Oll', glowColor: '#F59E0B' },
    { name: 'Deep Learning', category: 'genai', level: 92, tags: ['YOLO', 'Backpropagation', 'Optimizers'], iconText: 'DL', glowColor: '#F59E0B' },
    { name: 'Object Detection', category: 'genai', level: 94, tags: ['Helmet Gating', 'Edge Real-time', 'NMS'], iconText: 'OD', glowColor: '#F59E0B' },
  ];

  // Group 3: Data Engineering & Edge
  const dataEngAndEdge: SkillItem[] = [
    { name: 'Apache Airflow', category: 'data-eng', level: 95, tags: ['DAG Scheduling', 'Cron 5-Min', 'Operators'], iconText: 'Air', glowColor: '#8B5CF6' },
    { name: 'Docker', category: 'data-eng', level: 86, tags: ['Containers', 'Compose', 'Isolation'], iconText: 'Dkr', glowColor: '#8B5CF6' },
    { name: 'Git & Linux', category: 'data-eng', level: 90, tags: ['Bash Scripting', 'CI/CD', 'Systemd'], iconText: 'Sh', glowColor: '#8B5CF6' },
    { name: 'IoT Hardware Sensors', category: 'data-eng', level: 91, tags: ['Ultrasonic', 'GPIO Relays', 'Microcontrollers'], iconText: 'IoT', glowColor: '#8B5CF6' },
  ];

  const benchmarkRoles = [
    {
      id: 'ai-ml-engineer',
      title: 'AI / Machine Learning Engineer',
      matchScore: 97,
      topMatches: ['LangGraph', 'Python (Core)', 'PyTorch', 'Computer Vision', 'LangChain', 'Ollama'],
      summary: 'Exceptionally strong candidate with proven multi-agent orchestration, local LLM deployment, and custom deep learning model experience.'
    },
    {
      id: 'data-engineer',
      title: 'ETL & Data Platform Engineer',
      matchScore: 94,
      topMatches: ['Apache Airflow', 'MySQL / SQL', 'ETL Data Pipelines', 'Data Cleansing', 'Vectorized Python'],
      summary: 'Solid foundation in scheduled DAG automation, connection reliability, schema assertion guards, and database optimization.'
    },
    {
      id: 'genai-agent-dev',
      title: 'Generative AI & LLM Systems Specialist',
      matchScore: 99,
      topMatches: ['LangGraph StateGraph', 'Pydantic Output Validation', 'Ollama Local LLMs', 'Prompt Engineering', 'LangChain'],
      summary: 'Top-tier proficiency in stateful multi-agent graphs, typed cognitive workflows, and zero-cost local LLM inference.'
    },
    {
      id: 'iot-edge-ai',
      title: 'IoT & Edge Intelligence Developer',
      matchScore: 92,
      topMatches: ['IoT Hardware Sensors', 'Serial / GPIO Microcontrollers', 'YOLO Helmet Detection', 'Smart City Grid'],
      summary: 'Proven ability to bridge machine learning models with physical microcontrollers, sensors, and real-time hardware actuators.'
    }
  ];

  const currentBenchmark = benchmarkRoles.find((r) => r.id === selectedRole) || benchmarkRoles[0];

  return (
    <section
      id="skills"
      className="py-24 relative bg-[#0D0E15] border-t border-white/10 overflow-hidden"
    >
      {/* Cinematic glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EF4444]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#8B5CF6]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141F] border border-[#EF4444]/30 text-xs font-mono text-[#EF4444]">
              <Cpu className="w-3.5 h-3.5" />
              <span>03 // Core Engines &amp; Tech Stack</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Interactive Categorical Matrices
            </h2>
            <p className="text-sm sm:text-base text-[#8F94A6] leading-relaxed font-sans">
              Floating cloud blocks with spring physics. Hovering over any individual card triggers an intense micro-glow drop-shadow response.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13141F] border border-white/10 text-xs font-mono text-[#EF4444]">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Micro-Glow Active</span>
          </div>
        </div>

        {/* 3 Categorical Cloud Blocks (Languages & Frameworks, Generative AI Tools, Data Engineering & Edge) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Block 1: Languages & Frameworks (Gentle floating motion) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-3xl bg-[#13141F]/90 border border-[#EF4444]/20 hover:border-[#EF4444]/60 p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all group"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#EF4444] uppercase font-bold tracking-wider">
                  Category 01
                </span>
                <h3 className="text-xl font-bold text-white font-display">Languages &amp; Frameworks</h3>
              </div>
            </div>

            <p className="text-xs text-[#8F94A6] mt-3 leading-relaxed">
              Execution engines powering high-throughput data processing, backpropagation, and APIs.
            </p>

            <div className="mt-5 space-y-3">
              {languagesAndFrameworks.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => {
                    soundFx.playHover();
                    setHoveredSkill(skill.name);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    hoveredSkill === skill.name
                      ? 'bg-[#181A28] border-[#EF4444] shadow-glow-crimson scale-[1.02]'
                      : 'bg-[#0D0E15]/80 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#EF4444]/15 text-[#EF4444] font-mono text-xs font-bold flex items-center justify-center">
                        {skill.iconText}
                      </span>
                      <span className="text-sm font-bold text-white font-sans">{skill.name}</span>
                    </div>
                    <span className="text-xs font-mono text-[#EF4444] font-bold">{skill.level}%</span>
                  </div>

                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#EF4444] to-[#F59E0B] transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {skill.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono text-[#8F94A6] bg-[#13141F] px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Block 2: Generative AI Tools (Gentle floating motion) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="rounded-3xl bg-[#13141F]/90 border border-[#F59E0B]/20 hover:border-[#F59E0B]/60 p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all group"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#F59E0B] uppercase font-bold tracking-wider">
                  Category 02
                </span>
                <h3 className="text-xl font-bold text-white font-display">Generative AI Tools</h3>
              </div>
            </div>

            <p className="text-xs text-[#8F94A6] mt-3 leading-relaxed">
              Autonomous cognitive graph swarms, local LLM deployment, and deep learning vision.
            </p>

            <div className="mt-5 space-y-3">
              {genAiTools.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => {
                    soundFx.playHover();
                    setHoveredSkill(skill.name);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    hoveredSkill === skill.name
                      ? 'bg-[#181A28] border-[#F59E0B] shadow-glow-orange scale-[1.02]'
                      : 'bg-[#0D0E15]/80 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] font-mono text-xs font-bold flex items-center justify-center">
                        {skill.iconText}
                      </span>
                      <span className="text-sm font-bold text-white font-sans">{skill.name}</span>
                    </div>
                    <span className="text-xs font-mono text-[#F59E0B] font-bold">{skill.level}%</span>
                  </div>

                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {skill.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono text-[#8F94A6] bg-[#13141F] px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Block 3: Data Engineering & Edge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="rounded-3xl bg-[#13141F]/90 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all group"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8B5CF6] uppercase font-bold tracking-wider">
                  Category 03
                </span>
                <h3 className="text-xl font-bold text-white font-display">Data Engineering &amp; Edge</h3>
              </div>
            </div>

            <p className="text-xs text-[#8F94A6] mt-3 leading-relaxed">
              Automated Airflow DAG orchestration, containers, Linux environments, and physical IoT sensors.
            </p>

            <div className="mt-5 space-y-3">
              {dataEngAndEdge.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => {
                    soundFx.playHover();
                    setHoveredSkill(skill.name);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    hoveredSkill === skill.name
                      ? 'bg-[#181A28] border-[#8B5CF6] shadow-glow-purple scale-[1.02]'
                      : 'bg-[#0D0E15]/80 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] font-mono text-xs font-bold flex items-center justify-center">
                        {skill.iconText}
                      </span>
                      <span className="text-sm font-bold text-white font-sans">{skill.name}</span>
                    </div>
                    <span className="text-xs font-mono text-[#8B5CF6] font-bold">{skill.level}%</span>
                  </div>

                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EF4444] transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {skill.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono text-[#8F94A6] bg-[#13141F] px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ATS Recruiter Compatibility Inspector Benchmark */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#13141F] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF4444]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Role buttons (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-[#EF4444] text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Recruiter ATS Score &amp; Keyword Alignment</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Live ATS Benchmark Matrix
              </h3>
              <p className="text-xs sm:text-sm text-[#8F94A6] leading-relaxed">
                Choose a job profile to see Gowtham&apos;s verified keyword overlap and match score based on actual technical deliverables.
              </p>

              {/* Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {benchmarkRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedRole(role.id);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedRole === role.id
                        ? 'bg-[#181A28] border-[#EF4444] text-white shadow-glow-crimson'
                        : 'bg-[#0D0E15] border-white/5 text-[#8F94A6] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold truncate text-white">{role.title}</p>
                    <p className="text-[11px] font-mono text-[#EF4444] mt-0.5 font-bold">
                      {role.matchScore}% Match Index
                    </p>
                  </button>
                ))}
              </div>

              {/* Matched Keywords */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase text-[#8F94A6] font-bold block mb-2">
                  Matched Core Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentBenchmark.topMatches.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 text-xs font-mono text-[#10B981] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Ring Gauge (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0D0E15] border border-white/10 text-center flex flex-col items-center justify-center space-y-3">
              <div className="relative w-28 h-28 rounded-full bg-[#13141F] border-4 border-[#EF4444] shadow-glow-crimson flex items-center justify-center">
                <span className="text-4xl font-black font-mono text-white">
                  {currentBenchmark.matchScore}%
                </span>
                <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#10B981] text-[10px] font-mono font-bold text-black uppercase">
                  Optimal Match
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-bold text-white">{currentBenchmark.title}</h4>
                <p className="text-xs text-[#8F94A6] mt-1 leading-relaxed max-w-xs mx-auto">
                  {currentBenchmark.summary}
                </p>
              </div>

              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-crimson transition-all hover:scale-102"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Initiate Interview Scheduling</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
