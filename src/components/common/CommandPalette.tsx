import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  FileText,
  Mail,
  Phone,
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  GraduationCap,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../lib/themeContext';
import { RESUME_DATA } from '../../data/resumeData';
import { soundFx } from '../../lib/soundFx';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    closeCommandPalette,
    setTheme,
    openResumeModal,
    openProjectModal
  } = useTheme();

  const [query, setQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    soundFx.playSuccess();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const commands = [
    {
      category: 'Quick Actions',
      items: [
        {
          id: 'cv',
          title: 'View & Download Resume',
          subtitle: 'Open full ATS-friendly CV modal with PDF export',
          icon: FileText,
          action: () => {
            closeCommandPalette();
            openResumeModal();
          }
        },
        {
          id: 'copy-email',
          title: `Copy Email: ${RESUME_DATA.personal.email}`,
          subtitle: 'Direct recruiter & engineering inbox',
          icon: copiedKey === 'email' ? Check : Mail,
          action: () => handleCopy(RESUME_DATA.personal.email, 'email')
        },
        {
          id: 'copy-phone',
          title: `Copy Phone: ${RESUME_DATA.personal.phone}`,
          subtitle: 'Direct mobile contact for immediate screening',
          icon: copiedKey === 'phone' ? Check : Phone,
          action: () => handleCopy(RESUME_DATA.personal.phone, 'phone')
        }
      ]
    },
    {
      category: 'Featured Projects & Systems',
      items: RESUME_DATA.projects.map(p => ({
        id: `proj-${p.id}`,
        title: p.title,
        subtitle: `${p.categoryLabel} • ${p.tags.slice(0, 3).join(', ')}`,
        icon: Layers,
        action: () => {
          closeCommandPalette();
          openProjectModal(p.id);
        }
      }))
    },
    {
      category: 'Navigate Sections',
      items: [
        { id: 'nav-hero', title: 'Go to Hero & Overview', subtitle: 'Headline, stats & quick bio', icon: Sparkles, action: () => { window.location.hash = '#home'; closeCommandPalette(); } },
        { id: 'nav-about', title: 'Go to About & Background', subtitle: 'Engineering philosophy & education', icon: Cpu, action: () => { window.location.hash = '#about'; closeCommandPalette(); } },
        { id: 'nav-services', title: 'Go to Services & Expertise', subtitle: 'Core competencies & specializations', icon: Zap, action: () => { window.location.hash = '#services'; closeCommandPalette(); } },
        { id: 'nav-work', title: 'Go to Work & Projects', subtitle: 'Deep dive into technical solutions', icon: Layers, action: () => { window.location.hash = '#work'; closeCommandPalette(); } },
        { id: 'nav-ai-lab', title: 'Go to AI Agent Lab', subtitle: 'Interactive conversational assistant', icon: Terminal, action: () => { window.location.hash = '#ai-lab'; closeCommandPalette(); } },
        { id: 'nav-contact', title: 'Go to Contact & Connect', subtitle: 'Direct communication channels', icon: GraduationCap, action: () => { window.location.hash = '#contact'; closeCommandPalette(); } },
      ]
    },
    {
      category: 'Change Theme Accent',
      items: [
        { id: 'th-violet', title: 'Switch to Cyber Violet Theme', subtitle: 'AI Purple + Violet Glow (Default)', icon: Sparkles, action: () => setTheme('violet') },
        { id: 'th-cyan', title: 'Switch to Quantum Cyan Theme', subtitle: 'High-tech Cyan + Neon Blue', icon: Sparkles, action: () => setTheme('cyan') },
        { id: 'th-emerald', title: 'Switch to Emerald Matrix Theme', subtitle: 'Cyber Matrix Green + Emerald', icon: Sparkles, action: () => setTheme('emerald') },
        { id: 'th-amber', title: 'Switch to Solar Amber Theme', subtitle: 'Futuristic Gold & Amber Glow', icon: Sparkles, action: () => setTheme('amber') },
      ]
    }
  ];

  const filtered = commands.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0D0F1C] border border-white/15 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#121526]">
          <Search className="w-5 h-5 text-primary animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project name, skill, or action..."
            className="flex-1 bg-transparent text-sm text-white placeholder-foreground-subtle focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-foreground-muted border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-foreground-muted">
              No matching commands or projects found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((group) => (
              <div key={group.category} className="space-y-1">
                <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                  {group.category}
                </div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundFx.playClick();
                      item.action();
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-foreground-muted truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-foreground-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#090A12] border-t border-white/5 flex items-center justify-between text-[11px] text-foreground-subtle font-mono">
          <span>Navigate with mouse or click</span>
          <div className="flex items-center gap-2">
            <span>Powered by Gowtham AI Engine</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>

      {/* Backdrop click closer */}
      <div className="fixed inset-0 -z-10" onClick={closeCommandPalette} />
    </div>
  );
};
