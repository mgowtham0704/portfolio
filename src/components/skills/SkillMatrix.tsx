import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Award,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';
import { soundFx } from '../../lib/soundFx';

export const SkillMatrix: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedBenchmarkRole, setSelectedBenchmarkRole] = useState('ai-ml-engineer');

  const benchmarkRoles = [
    {
      id: 'ai-ml-engineer',
      title: 'AI / Machine Learning Engineer',
      matchScore: 96,
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
      matchScore: 98,
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

  const currentBenchmark = benchmarkRoles.find((r) => r.id === selectedBenchmarkRole) || benchmarkRoles[0];

  return (
    <section id="skills" className="py-24 relative bg-[#07080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
            <Zap className="w-3.5 h-3.5" />
            <span>Technical Taxonomy & ATS Benchmark</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Skills Matrix
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Verified proficiencies across AI engineering, deep learning, automated Airflow data pipelines, and embedded IoT architectures.
          </p>
        </div>

        {/* 2-Column Layout: Skills Categories + ATS Benchmark Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Skill Category Tabs & Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {RESUME_DATA.skillsBreakdown.map((cat, idx) => {
                const isActive = activeCategoryIndex === idx;
                return (
                  <button
                    key={cat.title}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveCategoryIndex(idx);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-glow-sm scale-102'
                        : 'bg-[#0D0F1E] border border-white/10 text-foreground-muted hover:text-white'
                    }`}
                  >
                    <span>{cat.title.split(' ')[0]} {cat.title.split(' ')[1] || ''}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Category Skills List */}
            <div className="p-6 rounded-3xl bg-[#0D0F1E] border border-white/10 space-y-5 shadow-2xl">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {RESUME_DATA.skillsBreakdown[activeCategoryIndex].title}
                </h3>
                <p className="text-xs text-foreground-muted mt-1">
                  {RESUME_DATA.skillsBreakdown[activeCategoryIndex].description}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {RESUME_DATA.skillsBreakdown[activeCategoryIndex].skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        {skill.featured && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-primary/20 text-primary border border-primary/40 font-semibold">
                            Core
                          </span>
                        )}
                      </div>
                      <span className="text-primary font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-700 shadow-glow-sm"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {skill.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono text-foreground-subtle bg-black/40 px-2 py-0.5 rounded border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills Badges */}
            <div className="p-5 rounded-3xl bg-[#0D0F1E] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                Leadership & Engineering Culture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RESUME_DATA.softSkills.map((s) => (
                  <div key={s.title} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {s.title}
                    </p>
                    <p className="text-[11px] text-foreground-muted leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive ATS & Role Benchmark Calculator (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D0F1E] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Role Fit & ATS Benchmark</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Recruiter ATS Compatibility
                </h3>
                <p className="text-xs text-foreground-muted mt-1">
                  Select a target role to calculate Gowtham&apos;s heuristic ATS score and skill keyword mapping.
                </p>
              </div>

              {/* Role Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benchmarkRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedBenchmarkRole(role.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedBenchmarkRole === role.id
                        ? 'bg-primary/20 border-primary text-white shadow-glow-sm'
                        : 'bg-white/5 border-white/10 text-foreground-muted hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{role.title}</p>
                    <p className="text-[10px] font-mono text-primary mt-0.5">{role.matchScore}% Match</p>
                  </button>
                ))}
              </div>

              {/* Calculated Score Display Gauge */}
              <div className="p-5 rounded-2xl bg-[#07080F] border border-white/10 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary shadow-glow-md relative">
                  <span className="text-3xl font-black font-mono text-white">
                    {currentBenchmark.matchScore}%
                  </span>
                  <div className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-emerald-500 text-[9px] font-mono font-bold text-black uppercase">
                    High Fit
                  </div>
                </div>

                <p className="text-sm font-bold text-white pt-2">
                  Target: {currentBenchmark.title}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed max-w-sm mx-auto">
                  {currentBenchmark.summary}
                </p>
              </div>

              {/* Verified Keywords & Skills */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase text-foreground-subtle font-bold">
                  Matched Core Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentBenchmark.topMatches.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => soundFx.playClick()}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-glow-sm transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Proceed with Interview Scheduling</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
