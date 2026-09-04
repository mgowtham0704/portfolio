import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, CheckCircle2, Play, Cpu, RefreshCw } from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

gsap.registerPlugin(ScrollTrigger);

export const AiLabStyleSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('langgraph');
  const [isSimulating, setIsSimulating] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<string[]>([
    'System initialized: LangGraph v0.2.20 runtime ready.',
    'Local Ollama instance detected: Llama 3.1 8B (Q4_K_M).',
    'Pydantic v2 validation schema active for deterministic output.',
  ]);

  useEffect(() => {
    // Headline scroll animation
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    // Container fade and scale animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const agents = [
    {
      id: 'langgraph',
      name: '7-Agent Swarm Orchestrator',
      desc: 'Hierarchical supervisor routing prompts across 7 specialized nodes.',
      badge: 'Multi-Agent Graph',
    },
    {
      id: 'airflow',
      name: '5-Min Airflow Cron Daemon',
      desc: 'Atomic MySQL extract-transform DAG executing every 300s.',
      badge: 'Data Pipeline',
    },
    {
      id: 'vision',
      name: 'Edge YOLO Detection Relay',
      desc: 'Real-time 30FPS helmet validation and barrier gate trigger.',
      badge: 'Edge Computer Vision',
    },
  ];

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSimulating) return;

    soundFx.playClick();
    setIsSimulating(true);
    const userPrompt = query;
    setQuery('');

    setLogs((prev) => [
      ...prev,
      `> [QUERY RECEIVED]: "${userPrompt}"`,
      `[ROUTER]: Dispatching to ${selectedAgent.toUpperCase()} node...`,
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[STATE GRAPH]: State transition confirmed. Pydantic schema validated (Score: 0.982).`,
        `[EXECUTION]: Success. Zero cloud API roundtrip - 100% local inference completed in 320ms.`,
      ]);
      setIsSimulating(false);
      soundFx.playSuccess();
    }, 1200);
  };

  return (
    <section id="ai-lab" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
        {/* Title Block */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F13024]/10 border border-[#F13024]/30 text-[#F13024] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            INTERACTIVE AI RUNTIME
          </div>
          <h2 ref={headlineRef} className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            AI Lab &amp; Swarm <span className="text-[#F13024]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8F94A6] leading-relaxed font-sans">
            Test and simulate Gowtham's LangGraph agentic workflows, deterministic state validation schemas, and automated ETL pipelines live in this interactive terminal sandbox.
          </p>
        </div>

        {/* 2-Column Terminal & Agent Selector Layout */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Agent Selector Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedAgent(agent.id);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedAgent === agent.id
                      ? 'bg-[#181829] border-[#F13024] shadow-glow-red shadow-md'
                      : 'bg-[#181829]/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#F13024] font-bold">
                      {agent.badge}
                    </span>
                    {selectedAgent === agent.id && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F13024] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F13024]"></span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">{agent.name}</h3>
                  <p className="text-xs text-[#8F94A6] mt-1">{agent.desc}</p>
                </div>
              ))}
            </div>

            {/* Micro specs banner */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono text-white/60">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#F13024]" /> Ollama Llama 3.1
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pydantic v2 Type-Guard
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Sandbox (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F0E1A] border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative min-h-[420px]">
            {/* Terminal Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F13024]/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs font-mono text-white/60">
                    sandbox@{selectedAgent}-runtime
                  </span>
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setLogs(['System reset. LangGraph supervisor ready for simulation.']);
                  }}
                  className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> Clear
                </button>
              </div>

              {/* Console Output Log */}
              <div className="font-mono text-xs text-white/80 space-y-2 py-4 max-h-60 overflow-y-auto">
                {logs.map((log, i) => (
                  <p
                    key={i}
                    className={
                      log.startsWith('>')
                        ? 'text-[#F13024] font-bold'
                        : log.includes('Success')
                        ? 'text-emerald-400 font-semibold'
                        : 'text-white/70'
                    }
                  >
                    {log}
                  </p>
                ))}
                {isSimulating && (
                  <p className="text-amber-400 animate-pulse flex items-center gap-2">
                    <span>⚡ Executing deterministic graph node routing...</span>
                  </p>
                )}
              </div>
            </div>

            {/* Interactive Query Input */}
            <form onSubmit={handleSimulate} className="pt-4 border-t border-white/10 flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter prompt to execute node test (e.g., Match candidate for NLP engineer)..."
                  className="w-full px-4 py-3 rounded-xl bg-[#181829] border border-white/10 text-white placeholder:text-white/30 text-xs font-mono focus:outline-none focus:border-[#F13024]"
                />
              </div>
              <button
                type="submit"
                disabled={isSimulating}
                className="px-5 py-3 rounded-xl bg-[#F13024] hover:bg-[#F13024]/90 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-glow-red disabled:opacity-50"
              >
                {isSimulating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>RUN</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
