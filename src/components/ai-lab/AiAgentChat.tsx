import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  RotateCcw,
  FileText
} from 'lucide-react';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  metadata?: string;
}

export const AiAgentChat: React.FC = () => {
  const { openResumeModal } = useTheme();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am Gowtham-AI Agent v2.4, an autonomous conversational assistant trained directly on Gowtham M's verified resume and engineering project portfolio.

Feel free to ask me anything about his 7-agent LangGraph system, Apache Airflow ETL pipelines, Computer Vision models, or academic track record!`,
      timestamp: 'Just now',
      metadata: 'Model: Gowtham-LLaMA-3-Engine (Local Ollama)'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    "Why did you use Ollama for the 7-Agent LangGraph system?",
    "How does the Airflow 5-minute ETL pipeline handle retries?",
    "What is your Helmet Detection inference speed & accuracy?",
    "Tell me about your B.Tech education at Mahendra Eng College."
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    soundFx.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      soundFx.playTerminalTick();
      let reply = "";
      const lower = query.toLowerCase();

      if (lower.includes('langgraph') || lower.includes('agent') || lower.includes('ollama') || lower.includes('resume matcher')) {
        reply = `Gowtham engineered a 7-agent LangGraph cognitive architecture that replaces monolithic LLM prompts with specialized micro-agents:
1. Document Parser & Entity Normalizer
2. Pydantic Structured Data Extractor (100% schema guarantee)
3. ATS Heuristic & Density Scorer
4. Semantic Vector Matcher
5. Skill Gap Analyzer
6. Executive Summary Synthesizer
7. Recommendation & Action Engine.

Key Innovation: By serving the models locally via Ollama (e.g. LLaMA 3), the entire multi-agent loop operates at ZERO per-call API cost and ensures candidate privacy!`;
      } else if (lower.includes('airflow') || lower.includes('etl') || lower.includes('pipeline') || lower.includes('mysql')) {
        reply = `Gowtham's ETL Pipeline is managed by Apache Airflow scheduled on a 5-minute recurring cron:
- Extract: Queries incremental delta changes from MySQL database with connection pooling and automated healthchecks.
- Validate: Enforces strict data types and schema sanity guards to prevent corrupt records downstream.
- Transform: Utilizes vectorized Python (Pandas/NumPy) for sub-1.2 second transformation latencies.
- Load: Exports atomic clean CSV files and stages tables with built-in 3-retry policies.`;
      } else if (lower.includes('helmet') || lower.includes('traffic') || lower.includes('vision') || lower.includes('iot') || lower.includes('camera')) {
        reply = `The Smart Traffic Signal project bridges Deep Learning computer vision with IoT microcontrollers:
- Uses a lightweight PyTorch / YOLO model detecting motorcyclists and helmet compliance in real-time (~28ms latency, 98.4% accuracy).
- Integrates via Serial/GPIO to IoT traffic relays.
- Traffic signals are held on RED until every rider in the junction frame complies with helmet regulations, significantly improving municipal road safety!`;
      } else if (lower.includes('education') || lower.includes('college') || lower.includes('cgpa') || lower.includes('b.tech') || lower.includes('school')) {
        reply = `Gowtham M is pursuing a Bachelor of Technology in Artificial Intelligence and Data Science at Mahendra Engineering College with a CGPA of 7.45.
He completed his Higher Secondary Certificate (HSC) with 75% and Secondary School Leaving Certificate (SSLC) with 77% at Golden Spark Matriculation Higher Secondary School, with a strong foundation in computational mathematics and programming!`;
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('location')) {
        reply = `You can contact Gowtham directly:
- Email: mgowtham0704@gmail.com
- Phone / WhatsApp: +91 8610820898
- Location: Salem, Tamil Nadu 636011, India
He is available for immediate hire and actively interviewing for AI/ML and Data Engineering roles!`;
      } else {
        reply = `Gowtham M is a high-impact AI/ML Systems & Data Intelligence Engineer proficient in Python, SQL, LangGraph, LangChain, Apache Airflow, PyTorch, Ollama, and IoT Integration.

His major works include:
1. 7-Agent LangGraph Resume Matching System
2. Apache Airflow 5-min ETL Data Pipeline
3. Deep Learning Helmet Detection & IoT Traffic Signal Control
4. Smart IoT Parking System
5. Housing Market ETL & Window Telemetry Monitor.

Would you like me to dive deeper into any of these specific systems or share his resume?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metadata: 'Generated by Gowtham Agent'
        }
      ]);
      setIsTyping(false);
      soundFx.playSuccess();
    }, 600);
  };

  const handleResetChat = () => {
    soundFx.playClick();
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: "Chat memory reset. What would you like to ask about Gowtham's engineering projects or background?",
        timestamp: 'Just now',
        metadata: 'Model: Gowtham-LLaMA-3-Engine'
      }
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section id="agent-lab" className="py-24 relative bg-[#07080D]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
            <Bot className="w-3.5 h-3.5" />
            <span>Interactive Virtual Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Gowtham-AI Agent Lab
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Have a technical screening question or want to audit Gowtham&apos;s system design decisions? Prompt the live resume AI agent below.
          </p>
        </div>

        {/* Chat Console Window */}
        <div className="rounded-3xl bg-[#0D0F1E] border border-white/15 shadow-2xl shadow-primary/20 overflow-hidden flex flex-col h-[560px]">
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-[#121528] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#121528]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Gowtham-AI Agent</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                    v2.4 Online
                  </span>
                </h3>
                <p className="text-[11px] font-mono text-foreground-muted">
                  Trained on Gowtham M&apos;s Complete Resume & Architecture Data
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openResumeModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-foreground-muted hover:text-white transition-all font-mono"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Resume PDF</span>
              </button>
              <button
                onClick={handleResetChat}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-white transition-all"
                title="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#07080F]">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${
                      isAi
                        ? 'bg-primary/20 border border-primary/40 text-primary'
                        : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
                    }`}
                  >
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`space-y-1 ${isAi ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-lg ${
                        isAi
                          ? 'bg-[#121526] border border-white/10 text-foreground text-left'
                          : 'bg-primary text-white font-medium text-left'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-foreground-subtle px-1">
                      <span>{msg.timestamp}</span>
                      {msg.metadata && (
                        <>
                          <span>•</span>
                          <span className="text-primary">{msg.metadata}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 mr-auto">
                <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary flex-shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#121526] border border-white/10 text-xs font-mono text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-foreground-muted">Gowtham Agent generating response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-4 py-2 bg-[#0D0F1E] border-t border-white/5 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono uppercase text-foreground-subtle whitespace-nowrap">
              Suggestions:
            </span>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-foreground-muted hover:text-white whitespace-nowrap transition-all truncate max-w-xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3.5 bg-[#121528] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gowtham Agent about his multi-agent systems, Airflow, PyTorch..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white placeholder-foreground-subtle focus:outline-none focus:border-primary font-sans transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-glow-sm transition-all"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
