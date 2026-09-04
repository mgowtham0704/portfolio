import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

export const InteractiveAgentTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agent-sim' | 'query'>('agent-sim');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System ready. Local Ollama LLM runtime initialized on port 11434.",
    "LangGraph StateGraph initialized with 7 autonomous nodes.",
    "Pydantic strict schema compilation: 0 errors.",
    "Type or click an action below to simulate autonomous multi-agent execution."
  ]);
  const [queryInput, setQueryInput] = useState('');
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  const agentSteps = [
    { name: "Parser Agent", role: "Extract structured PDF/Docx entities", status: "Ingesting raw resume..." },
    { name: "Pydantic Validator", role: "Enforce strict schema types", status: "Validating candidate model..." },
    { name: "ATS Scorer Agent", role: "Keyword density & formatting check", status: "Calculating 94.8% ATS score..." },
    { name: "Semantic Matcher", role: "Vector cosine similarity vs Job Desc", status: "Computing role embedding fit..." },
    { name: "Gap Analyzer", role: "Identify missing proficiencies", status: "Analyzing tech trajectory..." },
    { name: "Executive Synthesizer", role: "Summarize strategic fit", status: "Drafting high-impact review..." },
    { name: "Recommendation Engine", role: "Generate tailored interview questions", status: "Dispatching final report!" }
  ];

  const presetQueries = [
    { label: "Run 7-Agent LangGraph Pipeline", cmd: "EXECUTE_LANGGRAPH_7_AGENT_SIMULATION" },
    { label: "Inspect Apache Airflow DAG", cmd: "INSPECT_AIRFLOW_5MIN_SCHEDULE" },
    { label: "Verify Real-Time Helmet Vision", cmd: "RUN_YOLO_COMPUTER_VISION_BENCHMARK" },
    { label: "Check Academic CGPA & Creds", cmd: "QUERY_ACADEMIC_STANDINGS" }
  ];

  const executeSimulatedRun = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setCurrentStep(0);
    soundFx.playClick();

    setTerminalLogs(prev => [
      ...prev,
      "--- [INITIATING MULTI-AGENT RESUME MATCHER WORKFLOW] ---",
      ">> Compiling LangGraph StateGraph nodes...",
      ">> Dispatching Agent #1: Ingestion & Document Normalizer..."
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      soundFx.playTerminalTick();

      if (step < agentSteps.length) {
        setTerminalLogs(prev => [
          ...prev,
          `[Agent ${step+1}/7] [${agentSteps[step].name}] -> ${agentSteps[step].status}`
        ]);
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        soundFx.playSuccess();
        setTerminalLogs(prev => [
          ...prev,
          "-------------------------------------------------------------",
          "✅ 7-AGENT WORKFLOW COMPLETED SUCCESSFULLY IN 840ms",
          ">> ATS Match Score: 96.5% | Schema Errors: 0 | Local LLM Tokens: 2,420 (Zero API Cost)",
          ">> Recommendation: 'Highly qualified AI/ML candidate with production pipeline capabilities.'"
        ]);
      }
    }, 450);
  };

  const handleCustomQuerySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!queryInput.trim() || isExecuting) return;

    soundFx.playClick();
    const query = queryInput.trim();
    setQueryInput('');
    setTerminalLogs(prev => [...prev, `user@gowtham-portfolio:~$ ${query}`]);

    setTimeout(() => {
      soundFx.playTerminalTick();
      if (query.toLowerCase().includes('langgraph') || query.toLowerCase().includes('agent')) {
        setTerminalLogs(prev => [
          ...prev,
          "🤖 GowthamAgent: 'My Multi-Agent Resume & Job-Matching System uses LangGraph StateGraph with 7 micro-agents. Each agent exchanges typed Pydantic payloads and runs 100% locally on Ollama without paid API dependencies.'"
        ]);
      } else if (query.toLowerCase().includes('airflow') || query.toLowerCase().includes('etl')) {
        setTerminalLogs(prev => [
          ...prev,
          "🤖 GowthamAgent: 'I built an automated Apache Airflow ETL pipeline scheduled every 5 minutes. It extracts incremental MySQL delta records, validates schemas, performs vectorized transformations, and produces clean analytics datasets with automated retry hooks.'"
        ]);
      } else if (query.toLowerCase().includes('cgpa') || query.toLowerCase().includes('college') || query.toLowerCase().includes('education')) {
        setTerminalLogs(prev => [
          ...prev,
          "🤖 GowthamAgent: 'I am pursuing B.Tech in Artificial Intelligence and Data Science at Mahendra Engineering College with a CGPA of 7.45. Completed HSC at Golden Spark Matriculation with 75% and SSLC with 77%.'"
        ]);
      } else if (query.toLowerCase().includes('vision') || query.toLowerCase().includes('helmet') || query.toLowerCase().includes('iot')) {
        setTerminalLogs(prev => [
          ...prev,
          "🤖 GowthamAgent: 'My Smart Traffic Signal project combines deep learning (PyTorch/YOLO) with IoT microcontrollers to detect motorcyclist helmet compliance in real-time, holding red signals until full compliance is confirmed.'"
        ]);
      } else {
        setTerminalLogs(prev => [
          ...prev,
          `🤖 GowthamAgent: 'Command recognized. Gowtham is specialized in Python, LangGraph, Airflow, PyTorch, and IoT. Contact him directly at mgowtham0704@gmail.com or +91 8610820898.'`
        ]);
      }
    }, 300);
  };

  const clearTerminal = () => {
    soundFx.playClick();
    setTerminalLogs([
      "Terminal cleared.",
      "Gowtham M - AI/ML Systems Engineer Terminal ready."
    ]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  return (
    <div className="w-full rounded-2xl bg-[#090A14] border border-white/15 shadow-2xl shadow-primary/20 overflow-hidden flex flex-col font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-[#111322] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 text-foreground-muted text-[11px] font-medium flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            gowtham@ai-runtime:~/multi-agent-system
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => { soundFx.playClick(); setActiveTab('agent-sim'); }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-all ${
              activeTab === 'agent-sim'
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground-muted hover:text-white'
            }`}
          >
            Live 7-Agent Sim
          </button>
          <button
            onClick={() => { soundFx.playClick(); setActiveTab('query'); }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-all ${
              activeTab === 'query'
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground-muted hover:text-white'
            }`}
          >
            Interactive Query
          </button>
        </div>
      </div>

      {/* 7-Agent Flow Status Bar (when on agent-sim) */}
      {activeTab === 'agent-sim' && (
        <div className="px-4 py-2.5 bg-[#0D0F1E] border-b border-white/5 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-foreground-subtle whitespace-nowrap">
            Pipeline Flow:
          </span>
          <div className="flex items-center gap-1.5 flex-1 min-w-max">
            {agentSteps.map((s, idx) => (
              <div
                key={s.name}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] transition-all ${
                  isExecuting && currentStep === idx
                    ? 'bg-primary text-white font-bold animate-pulse scale-105 ring-1 ring-primary'
                    : isExecuting && currentStep > idx
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-foreground-subtle'
                }`}
              >
                <span>{idx + 1}. {s.name.split(' ')[0]}</span>
                {isExecuting && currentStep > idx && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Output Area */}
      <div
        ref={logContainerRef}
        className="h-64 sm:h-72 p-4 overflow-y-auto bg-[#07080F] text-foreground-muted space-y-1.5 leading-relaxed font-mono"
      >
        {terminalLogs.map((log, index) => {
          const isUser = log.startsWith('user@');
          const isSuccess = log.includes('✅') || log.includes('SUCCESS');
          const isAgent = log.includes('🤖') || log.includes('[Agent');
          const isHeader = log.startsWith('---');

          return (
            <div
              key={index}
              className={`transition-opacity duration-200 ${
                isUser
                  ? 'text-cyan-400 font-semibold'
                  : isSuccess
                  ? 'text-emerald-400 font-bold bg-emerald-500/10 p-1.5 rounded'
                  : isAgent
                  ? 'text-primary font-medium'
                  : isHeader
                  ? 'text-amber-400 font-bold'
                  : 'text-foreground-muted'
              }`}
            >
              {log}
            </div>
          );
        })}
        {isExecuting && (
          <div className="flex items-center gap-2 text-primary animate-pulse pt-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Agent executing state graph node...</span>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-3 bg-[#0D0F1E] border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {activeTab === 'agent-sim' ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={executeSimulatedRun}
              disabled={isExecuting}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-sans text-xs font-semibold shadow-glow-sm transition-all disabled:opacity-50 hover:scale-102 active:scale-98"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isExecuting ? "Executing Graph..." : "Simulate 7-Agent Run"}</span>
            </button>
            <button
              onClick={clearTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-white font-sans text-xs transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomQuerySubmit} className="flex-1 flex gap-2">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask about LangGraph, Airflow, PyTorch, CGPA..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-foreground-subtle focus:outline-none focus:border-primary font-mono"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-primary text-white font-sans text-xs font-semibold shadow-glow-sm hover:bg-primary/90 transition-all"
            >
              Ask Agent
            </button>
          </form>
        )}

        {/* Preset Quick Queries */}
        <div className="flex flex-wrap gap-1.5">
          {presetQueries.slice(0, 2).map((q) => (
            <button
              key={q.label}
              onClick={() => {
                setQueryInput(q.label);
                soundFx.playClick();
                if (q.cmd === 'EXECUTE_LANGGRAPH_7_AGENT_SIMULATION') {
                  executeSimulatedRun();
                } else {
                  setTimeout(() => handleCustomQuerySubmit(), 100);
                }
              }}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-foreground-muted hover:text-white transition-all text-left truncate"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
