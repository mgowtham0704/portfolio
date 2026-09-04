import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUp,
  FileText
} from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';

export const Footer: React.FC = () => {
  const { openResumeModal } = useTheme();
  const [istTime, setIstTime] = useState('');

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

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05060A] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Bio column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center font-mono font-bold text-lg text-primary shadow-glow-sm">
                GM
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">Gowtham M</h3>
                <p className="text-xs font-mono text-primary">AI & Data Science Specialist</p>
              </div>
            </div>

            <p className="text-sm text-foreground-muted leading-relaxed max-w-sm">
              Pursuing B.Tech in Artificial Intelligence & Data Science at Mahendra Engineering College.
              Specialized in production-grade Multi-Agent LLM pipelines with LangGraph, Apache Airflow ETL systems, and Computer Vision edge IoT.
            </p>

            {/* Live Telemetry & IST Clock */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121526] border border-white/10 text-xs font-mono text-foreground-muted">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>IST (UTC+5:30):</span>
                <span className="text-white font-semibold">{istTime || 'Loading...'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open for Hire
              </div>
            </div>
          </div>

          {/* Core Systems Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
              Systems Architecture
            </p>
            <ul className="space-y-2 text-xs text-foreground-muted">
              <li>
                <a href="#architecture" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  7-Agent LangGraph System
                </a>
              </li>
              <li>
                <a href="#architecture" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  Airflow 5-Min ETL DAG
                </a>
              </li>
              <li>
                <a href="#architecture" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  Helmet Vision & Traffic IoT
                </a>
              </li>
              <li>
                <a href="#architecture" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  IoT Smart Parking Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-foreground-muted">
              <li>
                <a href="#projects" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors">
                  All 6 Featured Projects
                </a>
              </li>
              <li>
                <a href="#skills" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors">
                  Skills Matrix & Radar
                </a>
              </li>
              <li>
                <a href="#agent-lab" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors">
                  Interactive AI Agent Lab
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={() => soundFx.playClick()} className="hover:text-primary transition-colors">
                  Education & Milestones
                </a>
              </li>
              <li>
                <button onClick={openResumeModal} className="text-primary hover:underline flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  Verified Resume PDF
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
              Direct Contact
            </p>
            <div className="space-y-2.5 text-xs text-foreground-muted">
              <a
                href={`mailto:${RESUME_DATA.personal.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{RESUME_DATA.personal.email}</span>
              </a>

              <a
                href={`tel:${RESUME_DATA.personal.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <div className="w-6 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{RESUME_DATA.personal.phone}</span>
              </a>

              <div className="flex items-center gap-2 text-foreground-subtle">
                <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-foreground-muted">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Salem, Tamil Nadu 636011</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-subtle font-mono">
          <div className="flex items-center gap-2">
            <span>© 2026 Gowtham M. Built with UI/UX Pro Max + 21st.dev standards.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:-translate-y-0.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
