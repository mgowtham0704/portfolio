import React, { useState } from 'react';
import {
  X,
  Cpu,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Shield,
  Sparkles
} from 'lucide-react';
import { ProjectData } from '../../data/resumeData';
import { soundFx } from '../../lib/soundFx';

interface Props {
  project: ProjectData;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<Props> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'story' | 'code'>('architecture');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    soundFx.playSuccess();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#0C0E1B] border border-white/15 rounded-3xl shadow-2xl shadow-primary/20 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#121528] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-primary uppercase font-bold tracking-wider">
                {project.categoryLabel}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 bg-[#090A14] border-b border-white/10 flex items-center gap-2">
          <button
            onClick={() => { soundFx.playClick(); setActiveTab('architecture'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'architecture'
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground-muted hover:text-white hover:bg-white/5'
            }`}
          >
            System Architecture
          </button>
          <button
            onClick={() => { soundFx.playClick(); setActiveTab('story'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              activeTab === 'story'
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground-muted hover:text-white hover:bg-white/5'
            }`}
          >
            Engineering Case Study
          </button>
          <button
            onClick={() => { soundFx.playClick(); setActiveTab('code'); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Core Implementation</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#121526] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-foreground-subtle">{m.label}</span>
                <p className="text-xl font-black text-white font-mono mt-0.5">{m.value}</p>
                <p className="text-[11px] text-foreground-muted mt-0.5">{m.detail}</p>
              </div>
            ))}
          </div>

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Architecture Dataflow */}
              <div className="p-4 rounded-2xl bg-[#07080F] border border-white/10 space-y-2">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Data Flow Pipeline
                </span>
                <p className="font-mono text-xs text-foreground-muted bg-black/40 p-3 rounded-xl border border-white/5 overflow-x-auto">
                  {project.architecture.dataFlow}
                </p>
              </div>

              {/* Node Sequence Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Autonomous Execution Nodes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.architecture.nodes.map((node, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs font-medium text-foreground-muted">{node}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights & Engineering Accomplishments */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Key Technical Achievements
                </h4>
                <ul className="space-y-2">
                  {project.architecture.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="space-y-4">
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-foreground-muted leading-relaxed whitespace-pre-line bg-[#07080F] p-5 rounded-2xl border border-white/10">
                {project.fullStory}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-foreground-subtle font-bold">
                  Key System Capabilities:
                </h4>
                <div className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
                <span>Production Python Implementation</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied to Clipboard' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-[#05060D] border border-white/15 text-primary text-xs font-mono overflow-x-auto leading-relaxed max-h-96">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/30 text-xs font-mono text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#121528] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-foreground-subtle">
            Architected & Built by Gowtham M
          </span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-glow-sm transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
