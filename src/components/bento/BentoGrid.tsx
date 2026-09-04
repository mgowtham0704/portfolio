import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Sparkles,
  Database,
  Radio,
  Eye,
  CheckCircle2,
  RotateCw,
  ArrowRight,
  Shield,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';

export const BentoGrid: React.FC = () => {
  const { openProjectModal } = useTheme();

  // 1. LangGraph 7-Agent Active Node State
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const langGraphAgents = [
    { name: "1. Ingestion Agent", role: "Document Parsing", desc: "Extracts unstructured PDF/Docx streams and strips layout noise." },
    { name: "2. Extractor Agent", role: "Pydantic Schema", desc: "Enforces typed candidate skill models and years of experience." },
    { name: "3. ATS Scorer", role: "Keyword Density", desc: "Evaluates resume formatting, semantic sectioning, and keyword relevance." },
    { name: "4. Semantic Matcher", role: "Vector Cosine Fit", desc: "Embeds role vectors and computes similarity against job requirements." },
    { name: "5. Gap Analyzer", role: "Missing Skill Tree", desc: "Pinpoints high-value missing competencies for specific job tiers." },
    { name: "6. Summary Synth", role: "Executive Overview", desc: "Generates a structured, concise recruiter brief." },
    { name: "7. Recommendation", role: "Action Plan", desc: "Dispatches interview strategy and resume tailoring recommendations." },
  ];

  // 2. Airflow DAG Simulator State
  const [dagRunning, setDagRunning] = useState(true);
  const [dagStep, setDagStep] = useState(0);
  const [dagRunsCount, setDagRunsCount] = useState(1420);
  const dagTasks = [
    { id: 'extract', name: 'extract_mysql_delta', status: 'success', time: '0.34s' },
    { id: 'validate', name: 'validate_data_schema', status: 'success', time: '0.12s' },
    { id: 'transform', name: 'vectorized_python_transform', status: 'running', time: '0.45s' },
    { id: 'load', name: 'export_clean_csv_target', status: 'queued', time: '0.22s' },
  ];

  useEffect(() => {
    if (!dagRunning) return;
    const interval = setInterval(() => {
      setDagStep((prev) => (prev + 1) % dagTasks.length);
      if (dagStep === dagTasks.length - 1) {
        setDagRunsCount((c) => c + 1);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [dagRunning, dagStep, dagTasks.length]);

  // 3. Helmet Detection Simulator State
  const [isHelmetDetected, setIsHelmetDetected] = useState(true);
  const [signalState, setSignalState] = useState<'GREEN' | 'RED'>('GREEN');
  const [detectionConfidence, setDetectionConfidence] = useState(98.4);

  const toggleHelmetCompliance = () => {
    soundFx.playClick();
    const next = !isHelmetDetected;
    setIsHelmetDetected(next);
    if (next) {
      setSignalState('GREEN');
      setDetectionConfidence(98.4);
    } else {
      setSignalState('RED');
      setDetectionConfidence(96.1);
    }
  };

  // 4. Smart Parking Grid State
  const [parkingSlots, setParkingSlots] = useState([
    { id: 'A1', occupied: true },
    { id: 'A2', occupied: false, recommended: true },
    { id: 'A3', occupied: true },
    { id: 'B1', occupied: true },
    { id: 'B2', occupied: false },
    { id: 'B3', occupied: true },
  ]);

  const toggleSlot = (id: string) => {
    soundFx.playClick();
    setParkingSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, occupied: !s.occupied } : s))
    );
  };

  return (
    <section id="architecture" className="py-24 relative bg-[#07080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Bento Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Core Production Systems
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Explore interactive live simulations of autonomous multi-agent cognitive graphs, real-time data engineering DAGs, and hardware IoT vision controllers.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          {/* Card 1: 7-Agent LangGraph (Spans 8 cols on LG) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0D0F1E] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-primary/40 transition-all">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
                      Generative AI Architecture
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      7-Agent LangGraph & Ollama System
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => openProjectModal('multi-agent-resume-matcher')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium transition-all"
                >
                  <span>Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </button>
              </div>

              <p className="text-sm text-foreground-muted mt-4 leading-relaxed">
                Autonomous multi-agent pipeline replacing monolithic prompts with 7 specialized micro-agents orchestrated via LangGraph StateGraph. Features strict Pydantic typed contracts and zero API cost via local Ollama inference.
              </p>

              {/* Interactive Node Selector Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {langGraphAgents.map((agent, index) => {
                  const isSelected = selectedAgentIndex === index;
                  return (
                    <button
                      key={agent.name}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedAgentIndex(index);
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[85px] ${
                        isSelected
                          ? 'bg-primary/20 border-primary text-white shadow-glow-sm scale-102'
                          : 'bg-white/5 border-white/10 text-foreground-muted hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-primary font-bold">
                        Node #{index + 1}
                      </span>
                      <span className="text-xs font-semibold leading-snug line-clamp-2">
                        {agent.name.split('. ')[1]}
                      </span>
                      <span className="text-[9px] text-foreground-subtle font-mono truncate">
                        {agent.role}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Agent Inspector Panel */}
              <div className="mt-4 p-4 rounded-2xl bg-[#080912] border border-white/10 font-mono text-xs">
                <div className="flex items-center justify-between text-foreground-muted pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-white font-bold">{langGraphAgents[selectedAgentIndex].name}</span>
                  </div>
                  <span className="text-primary text-[11px] font-sans">Role: {langGraphAgents[selectedAgentIndex].role}</span>
                </div>
                <p className="text-foreground-muted mt-2 text-xs font-sans">
                  {langGraphAgents[selectedAgentIndex].desc}
                </p>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-foreground-subtle">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Pydantic Type Safe (0 Drift)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Local Ollama Engine
              </span>
              <span className="text-white font-semibold">100% Free Inference</span>
            </div>
          </div>

          {/* Card 2: Apache Airflow 5-Min ETL DAG (Spans 4 cols on LG) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0D0F1E] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl group hover:border-cyan-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      Data Engineering
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Airflow 5-Min DAG
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => openProjectModal('airflow-etl-pipeline')}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-foreground-muted">
                <span>Cron: */5 * * * *</span>
                <span className="text-emerald-400 font-semibold">Runs: {dagRunsCount}</span>
              </div>

              {/* Animated DAG Task Flow */}
              <div className="mt-4 space-y-2 font-mono text-xs">
                {dagTasks.map((task, idx) => {
                  const isActive = dagStep === idx;
                  const isDone = dagStep > idx;

                  return (
                    <div
                      key={task.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold scale-102 shadow-glow-sm'
                          : isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-foreground-subtle'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {isActive ? (
                          <RotateCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block" />
                        )}
                        <span className="truncate">{task.name}</span>
                      </div>
                      <span className="text-[10px] text-foreground-subtle font-mono">{task.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-foreground-subtle">MySQL → Vectorized Py → CSV</span>
              <button
                onClick={() => setDagRunning(!dagRunning)}
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                {dagRunning ? "Pause Sim" : "Resume Sim"}
              </button>
            </div>
          </div>

          {/* Card 3: Real-Time Helmet Vision & Traffic IoT (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0D0F1E] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl group hover:border-emerald-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      Deep Learning & Edge IoT
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      AI Helmet Vision & Signal Gating
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => openProjectModal('ai-smart-traffic-helmet-iot')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-foreground-muted mt-4 leading-relaxed">
                Real-time deep learning computer vision model coupled directly to microcontrollers. Traffic signals remain locked at RED until automated helmet safety compliance is verified.
              </p>

              {/* Simulated Camera Feed & Signal Display */}
              <div className="mt-5 p-4 rounded-2xl bg-[#07080F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Visualizer Frame */}
                <div className="relative w-full sm:w-60 h-36 rounded-xl bg-black/60 border border-white/15 overflow-hidden flex flex-col items-center justify-center p-3">
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-[9px] font-mono text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE CAM 01
                  </div>

                  {/* Simulated Bounding Box */}
                  <div className={`w-32 h-20 rounded border-2 ${isHelmetDetected ? 'border-emerald-400 bg-emerald-500/10' : 'border-red-500 bg-red-500/10'} flex flex-col items-center justify-center p-1 transition-all`}>
                    <span className="text-[10px] font-mono font-bold text-white">
                      {isHelmetDetected ? "HELMET_CONFIRMED" : "NO_HELMET_FLAGGED"}
                    </span>
                    <span className="text-[9px] font-mono text-foreground-muted">
                      Conf: {detectionConfidence}%
                    </span>
                  </div>

                  <span className="absolute bottom-2 right-2 text-[9px] font-mono text-foreground-subtle">
                    Latency: 28ms
                  </span>
                </div>

                {/* IoT Traffic Light Hardware Controller */}
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111322] border border-white/10 min-w-[130px]">
                  <span className="text-[10px] font-mono text-foreground-subtle">IOT SIGNAL:</span>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-black/80 border border-white/15">
                    <div className={`w-6 h-6 rounded-full transition-all ${signalState === 'RED' ? 'bg-red-500 shadow-glow-sm shadow-red-500 scale-110' : 'bg-red-950/40 opacity-40'}`} />
                    <div className="w-6 h-6 rounded-full bg-amber-950/40 opacity-40" />
                    <div className={`w-6 h-6 rounded-full transition-all ${signalState === 'GREEN' ? 'bg-emerald-400 shadow-glow-sm shadow-emerald-500 scale-110' : 'bg-emerald-950/40 opacity-40'}`} />
                  </div>
                  <span className={`text-[11px] font-mono font-bold ${signalState === 'GREEN' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {signalState === 'GREEN' ? 'SIGNAL: PASS' : 'SIGNAL: HOLD'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={toggleHelmetCompliance}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white font-medium transition-all"
              >
                Simulate: {isHelmetDetected ? 'Remove Helmet' : 'Wear Helmet'}
              </button>
              <span className="text-xs font-mono text-emerald-400">Model: PyTorch + OpenCV</span>
            </div>
          </div>

          {/* Card 4: IoT Smart Parking Grid (Spans 6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0D0F1E] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl group hover:border-amber-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                      IoT Sensor Matrix
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Smart Car Parking Grid
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => openProjectModal('iot-smart-car-parking')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-foreground-muted mt-4 leading-relaxed">
                Sensor array + Nearest-Neighbor ML routing allocating nearest open parking bays in real-time, decreasing search time by 68% and maximizing space turnover.
              </p>

              {/* Interactive Parking Slot Grid */}
              <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {parkingSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => toggleSlot(slot.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      slot.occupied
                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                        : slot.recommended
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/40 animate-pulse'
                        : 'bg-white/5 border-white/10 text-foreground-muted hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{slot.id}</span>
                    <span className="text-[10px] uppercase font-mono mt-1">
                      {slot.occupied ? 'Occupied' : 'Vacant'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-foreground-subtle">
              <span>Click slot to toggle state</span>
              <span className="text-amber-400 font-semibold">-68% Search Latency</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
