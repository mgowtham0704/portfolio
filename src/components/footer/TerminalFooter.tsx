import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  FileText,
  ArrowUp,
  Clock,
  CornerDownLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: React.ReactNode;
}

export const TerminalFooter: React.FC = () => {
  const { openResumeModal } = useTheme();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'output',
      content: (
        <div className="space-y-1">
          <p className="text-[#EF4444] font-bold">
            Gowtham M // Interactive Portfolio Shell v3.0.0 [Cinematic Cyber-Glow]
          </p>
          <p className="text-[#8F94A6]">
            Type <span className="text-[#F59E0B] font-bold">&apos;help&apos;</span> or click the shortcuts below to execute system diagnostics.
          </p>
        </div>
      ),
    },
  ]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTerminalBottom = () => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playClick();
    const lineId = Date.now().toString();

    // Push the entered command
    const newHistory: TerminalLine[] = [
      ...history,
      {
        id: `cmd-${lineId}`,
        type: 'input',
        content: `gowtham@cyber-core:~$ ${inputVal}`,
      },
    ];

    switch (cmd) {
      case 'help':
        newHistory.push({
          id: `out-${lineId}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-xs font-mono">
              <p className="text-white font-bold">SYSTEM TELEMETRY COMMANDS:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-[#8F94A6] pt-1">
                <div><span className="text-[#EF4444] font-bold">projects</span> - 6 Production systems</div>
                <div><span className="text-[#F59E0B] font-bold">agents</span> - 7-Node LangGraph flow</div>
                <div><span className="text-[#8B5CF6] font-bold">skills</span> - Core engines &amp; stacks</div>
                <div><span className="text-[#EF4444] font-bold">contact</span> - Email, phone &amp; socials</div>
                <div><span className="text-[#F59E0B] font-bold">cv</span> - Open printable ATS resume</div>
                <div><span className="text-[#8B5CF6] font-bold">education</span> - B.Tech (7.45 CGPA)</div>
                <div><span className="text-[#EF4444] font-bold">whoami</span> - Engineering philosophy</div>
                <div><span className="text-[#8F94A6] font-bold">clear</span> - Flush terminal buffer</div>
              </div>
            </div>
          ),
        });
        break;

      case 'projects':
        newHistory.push({
          id: `out-${lineId}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-xs font-mono text-[#8F94A6]">
              <p className="text-[#EF4444] font-bold">PRODUCTION ARCHITECTURES:</p>
              <p>1. <span className="text-white font-bold">Multi-Agent Resume &amp; Job Matcher</span> (7 LangGraph agents, Ollama local)</p>
              <p>2. <span className="text-white font-bold">Apache Airflow ETL Pipeline</span> (MySQL to CSV 5-min cron automated DAG)</p>
              <p>3. <span className="text-white font-bold">AI Helmet Detection &amp; Traffic Gating</span> (PyTorch YOLO + IoT hardware relay)</p>
              <p>4. <span className="text-white font-bold">IoT Smart Car Parking System</span> (Ultrasonic sensor grid + KNN)</p>
              <p>5. <span className="text-white font-bold">Housing ETL Pipeline</span> (Python + SQL data cleaning)</p>
              <p>6. <span className="text-white font-bold">Window Info Collector App</span> (Real-time OS telemetry)</p>
            </div>
          ),
        });
        break;

      case 'agents':
        newHistory.push({
          id: `out-${lineId}`,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-[#8F94A6] space-y-1">
              <p className="text-[#EF4444] font-bold">7-AGENT LANGGRAPH STATEGRAPH TOPOLOGY:</p>
              <p>• resume_parser -&gt; ats_scorer -&gt; constraint_checker -&gt; job_matcher</p>
              <p>• gap_analyzer -&gt; recommendation_engine -&gt; executive_summary</p>
              <p className="text-[#10B981] font-bold">✓ 100% Local Inference on Ollama (Llama 3 8B &amp; Mistral 7B) | Zero Cloud Cost</p>
            </div>
          ),
        });
        break;

      case 'skills':
        newHistory.push({
          id: `out-${lineId}`,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-[#8F94A6] space-y-1">
              <p><span className="text-[#EF4444] font-bold">LANGUAGES &amp; FRAMEWORKS:</span> Python, SQL, PyTorch, FastAPI, OpenCV</p>
              <p><span className="text-[#F59E0B] font-bold">GENERATIVE AI TOOLS:</span> LangGraph, LangChain, Ollama, Deep Learning, Object Detection</p>
              <p><span className="text-[#8B5CF6] font-bold">DATA ENG &amp; EDGE:</span> Apache Airflow, Docker, Linux &amp; Bash, IoT Microcontroller Sensors</p>
            </div>
          ),
        });
        break;

      case 'contact':
        newHistory.push({
          id: `out-${lineId}`,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-[#8F94A6] space-y-1">
              <p className="text-[#EF4444] font-bold">DIRECT COMMUNICATIONS CHANNEL:</p>
              <p>• Email: <span className="text-white">mgowtham0704@gmail.com</span></p>
              <p>• Phone: <span className="text-white">+91 8610820898</span> / <span className="text-white">+91 6381014881</span></p>
              <p>• Location: <span className="text-white">Salem, Tamil Nadu, India</span></p>
              <p>• LinkedIn: <a href="https://www.linkedin.com/in/gowtham-m-096382355?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="text-[#EF4444] underline">linkedin.com/in/gowtham-m-096382355</a></p>
              <p>• GitHub: <a href="https://github.com/mgowtham0704" target="_blank" rel="noreferrer" className="text-[#EF4444] underline">github.com/mgowtham0704</a></p>
            </div>
          ),
        });
        break;

      case 'cv':
      case 'resume':
        openResumeModal();
        newHistory.push({
          id: `out-${lineId}`,
          type: 'success',
          content: (
            <p className="text-xs font-mono text-[#10B981]">
              ✓ Opened ATS Verified Resume Modal.
            </p>
          ),
        });
        break;

      case 'education':
        newHistory.push({
          id: `out-${lineId}`,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-[#8F94A6] space-y-1">
              <p className="text-[#EF4444] font-bold">ACADEMIC BACKGROUND:</p>
              <p>• <span className="text-white font-bold">B.Tech Artificial Intelligence &amp; Data Science</span></p>
              <p>  Mahendra Engineering College (Autonomous) | 2022 – 2026</p>
              <p>  Cumulative CGPA: <span className="text-[#F59E0B] font-bold">7.45 / 10.0</span></p>
              <p>• Higher Secondary (HSC): 76.5% | Secondary (SSLC): 81.6%</p>
            </div>
          ),
        });
        break;

      case 'whoami':
        newHistory.push({
          id: `out-${lineId}`,
          type: 'output',
          content: (
            <p className="text-xs font-mono text-[#8F94A6] leading-relaxed">
              Gowtham M — AI &amp; Data Science Engineer dedicated to designing deterministic, production-grade Multi-Agent LLM swarms, automated data infrastructure DAGs, and edge computer vision IoT devices.
            </p>
          ),
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          id: `err-${lineId}`,
          type: 'error',
          content: (
            <p className="text-xs font-mono text-red-400">
              command not found: &apos;{cmd}&apos;. Type <span className="text-[#EF4444]">&apos;help&apos;</span> for a list of valid commands.
            </p>
          ),
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
    setTimeout(scrollToTerminalBottom, 50);
  };

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(RESUME_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#0D0E15] border-t border-white/10 pt-20 pb-12 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#EF4444]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#F59E0B]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Interactive Mini Terminal Console Container */}
        <div className="rounded-3xl bg-[#13141F] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Terminal Window Chrome */}
          <div className="px-5 py-3.5 bg-[#0D0E15] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-white font-semibold ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#EF4444]" />
                gowtham@cyber-core: ~ (interactive shell)
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#8F94A6]">
              <span className="hidden sm:inline">Type &apos;help&apos; or click shortcuts</span>
              <button
                onClick={() => setHistory([])}
                className="hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Quick command pills */}
          <div className="px-5 py-2.5 bg-[#181A28] border-b border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#8F94A6]">Quick Exec:</span>
            {['help', 'projects', 'agents', 'skills', 'contact', 'cv', 'education', 'clear'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setInputVal(c);
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="px-2.5 py-0.5 rounded-lg bg-[#0D0E15] hover:bg-[#EF4444]/20 border border-white/10 hover:border-[#EF4444] text-[#8F94A6] hover:text-[#EF4444] transition-all"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Terminal Output Log Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-5 font-mono text-xs max-h-72 min-h-[160px] overflow-y-auto space-y-3 cursor-text bg-[#0D0E15]/95"
          >
            {history.map((line) => (
              <div key={line.id} className="leading-relaxed">
                {line.type === 'input' ? (
                  <p className="text-[#EF4444] font-bold">{line.content}</p>
                ) : (
                  line.content
                )}
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Interactive Prompt Input Bar */}
          <form
            onSubmit={handleCommand}
            className="p-3.5 bg-[#0D0E15] border-t border-white/10 flex items-center gap-2"
          >
            <span className="text-[#EF4444] font-mono font-bold text-sm pl-2">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. 'help', 'projects', 'contact', 'cv')..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-[#8F94A6]/60"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white font-mono text-xs font-bold transition-all shadow-glow-crimson flex items-center gap-1.5"
            >
              <span>Execute</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Minimal Clean Footer Links & Direct Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Identity & Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white font-black font-mono flex items-center justify-center text-sm shadow-glow-crimson">
                GM
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">Gowtham M</h3>
                <p className="text-xs font-mono text-[#EF4444]">AI &amp; Data Science Engineer</p>
              </div>
            </div>

            <p className="text-xs text-[#8F94A6] leading-relaxed">
              B.Tech in Artificial Intelligence &amp; Data Science at Mahendra Engineering College (2022–2026).
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8F94A6] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
              <span>Salem, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[#8F94A6] font-bold">
              Direct Contact
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <a
                  href="mailto:mgowtham0704@gmail.com"
                  className="text-white hover:text-[#EF4444] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>mgowtham0704@gmail.com</span>
                </a>
                <button
                  onClick={copyEmail}
                  title="Copy email"
                  className="p-1 rounded hover:bg-white/10 text-[#8F94A6] hover:text-white"
                >
                  {copiedEmail ? (
                    <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:8610820898"
                  className="text-white hover:text-[#EF4444] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>+91 8610820898</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-[#8F94A6]">
                <Clock className="w-3.5 h-3.5 text-[#EF4444]" />
                <span>IST: {istTime || 'Loading...'}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Social & Code Repos */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[#8F94A6] font-bold">
              Profiles &amp; Repos
            </p>
            <div className="space-y-2 text-xs font-mono">
              <a
                href="https://github.com/mgowtham0704"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#8F94A6] hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                <span>github.com/mgowtham0704</span>
                <ExternalLink className="w-3 h-3 ml-auto text-[#8F94A6]" />
              </a>

              <a
                href="https://www.linkedin.com/in/gowtham-m-096382355?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#8F94A6] hover:text-[#EF4444] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#EF4444]" />
                <span>linkedin.com/in/gowtham-m-096382355</span>
                <ExternalLink className="w-3 h-3 ml-auto text-[#8F94A6]" />
              </a>

              <button
                onClick={openResumeModal}
                className="flex items-center gap-2 text-[#EF4444] hover:underline"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full CV &amp; Resume</span>
              </button>
            </div>
          </div>

          {/* Col 4: Status & Top Jump */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#8F94A6] font-bold">
                Availability
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono text-[#10B981] mt-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>Open for 2026 AI Roles</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="px-4 py-2.5 rounded-xl bg-[#13141F] hover:bg-[#181A28] border border-white/10 hover:border-[#EF4444] text-xs font-mono text-white transition-all flex items-center justify-between group shadow-glow-sm"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#EF4444] group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8F94A6]">
          <p>© 2026 Gowtham M. Built with Cinematic Cyber-Glow Architecture.</p>
          <p className="text-[#EF4444] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            React 18 • Tailwind CSS • Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};
