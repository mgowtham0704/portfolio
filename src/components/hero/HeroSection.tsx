import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  FileText,
  Cpu,
  Bot,
  Database,
  Eye,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';
import { MagneticButton } from '../common/MagneticButton';
import gowthamPhoto from '../../assets/gowtham.jpeg';

export const HeroSection: React.FC = () => {
  const { openResumeModal } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-[#0D0E15]"
    >
      {/* Cinematic Ambient Nebulae & Radial Crimson Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EF4444]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#F59E0B]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Cyber Grid background overlay */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Headline, Bio & Spinning Circular CTA (7 cols on LG) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Status Telemetry Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#13141F]/90 border border-[#EF4444]/30 shadow-glow-crimson backdrop-blur-xl"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
              </span>
              <span className="text-xs font-mono font-semibold tracking-wider text-[#EF4444] uppercase">
                LangGraph Multi-Agent &amp; Airflow Pipelines
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            </motion.div>

            {/* Bold Headline: Transforming Data Into Intelligent Reality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] font-display">
                Transforming Data <br />
                <span className="text-gradient-crimson drop-shadow-2xl">
                  Into Intelligent Reality
                </span>
              </h1>
            </motion.div>

            {/* Concise Professional Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base sm:text-lg text-[#8F94A6] max-w-xl leading-relaxed font-sans font-normal"
            >
              Results-oriented AI/ML developer specializing in building IoT-integrated machine learning applications, multi-agent LLM systems (LangGraph), and automated ETL data pipelines.
            </motion.p>

            {/* Actions & Spinning Circular Text CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              {/* Primary Action Button */}
              <MagneticButton href="#multi-agent-system" strength={25}>
                <button
                  onClick={() => soundFx.playClick()}
                  className="group relative px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white font-bold text-sm tracking-wide shadow-glow-crimson transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 overflow-hidden"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>
              </MagneticButton>

              {/* Secondary Action: View Full CV */}
              <MagneticButton strength={20}>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    openResumeModal();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#13141F] hover:bg-[#181A28] border border-white/10 hover:border-[#EF4444]/60 text-white font-semibold text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#EF4444]" />
                  <span>View Full CV</span>
                </button>
              </MagneticButton>

              {/* Floating Spinning Circular Text CTA ("• VIEW PROJECTS • VIEW PROJECTS") */}
              <a
                href="#multi-agent-system"
                onClick={() => soundFx.playClick()}
                className="group relative w-24 h-24 flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                title="Scroll down to projects"
              >
                {/* SVG Circular Text spinning continuously */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] font-mono font-bold fill-[#8F94A6] tracking-[2.5px] uppercase group-hover:fill-[#EF4444] transition-colors">
                      <textPath href="#circlePath" startOffset="0%">
                        • VIEW PROJECTS • VIEW PROJECTS
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Center directional Arrow icon */}
                <div className="w-10 h-10 rounded-full bg-[#13141F] border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444] shadow-glow-sm group-hover:bg-[#EF4444] group-hover:text-white transition-all">
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </a>
            </motion.div>

            {/* Quick Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full"
            >
              <div className="p-3.5 rounded-2xl bg-[#13141F]/80 border border-white/10 hover:border-[#EF4444]/40 transition-all text-left">
                <div className="flex items-center gap-1.5 text-[#EF4444]">
                  <Bot className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase font-bold">Agents</span>
                </div>
                <p className="text-xl font-black text-white font-mono mt-0.5">7 Nodes</p>
                <p className="text-[10px] text-[#8F94A6]">LangGraph + Ollama</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#13141F]/80 border border-white/10 hover:border-[#EF4444]/40 transition-all text-left">
                <div className="flex items-center gap-1.5 text-[#F59E0B]">
                  <Database className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase font-bold">Airflow</span>
                </div>
                <p className="text-xl font-black text-white font-mono mt-0.5">5-Min DAG</p>
                <p className="text-[10px] text-[#8F94A6]">MySQL to CSV ETL</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#13141F]/80 border border-white/10 hover:border-[#8B5CF6]/40 transition-all text-left">
                <div className="flex items-center gap-1.5 text-[#8B5CF6]">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase font-bold">Vision IoT</span>
                </div>
                <p className="text-xl font-black text-white font-mono mt-0.5">98.4% Acc</p>
                <p className="text-[10px] text-[#8F94A6]">YOLO Helmet Gating</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#13141F]/80 border border-white/10 hover:border-[#EF4444]/40 transition-all text-left">
                <div className="flex items-center gap-1.5 text-[#EF4444]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase font-bold">B.Tech</span>
                </div>
                <p className="text-xl font-black text-white font-mono mt-0.5">7.45 CGPA</p>
                <p className="text-[10px] text-[#8F94A6]">AI &amp; Data Science</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 4:5 Portrait Frame with Spinning Cyber Vector Target Circle (5 cols on LG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            {/* Pulsing, Spinning Cyber Vector Target Circles behind headshot */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Outer Rotating HUD ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-[#EF4444]/25 opacity-70"
              />

              {/* Middle Counter-Rotating Target Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border border-dotted border-[#F59E0B]/30 opacity-80"
              />

              {/* Inner Pulsing Radar Glow */}
              <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#EF4444]/20 via-[#F59E0B]/10 to-transparent blur-2xl animate-pulse" />
            </div>

            {/* Rounded 4:5 Portrait Frame Wrapper */}
            <div className="relative z-10 w-64 sm:w-80 aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-[#EF4444]/60 via-[#F59E0B]/30 to-white/10 shadow-2xl shadow-[#EF4444]/20 group">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#13141F] relative">
                <img
                  src={gowthamPhoto}
                  alt="Gowtham M - AI/ML Engineer"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Cyber Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E15] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Futuristic HUD Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#13141F]/85 border border-white/10 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#EF4444] uppercase font-bold tracking-wider">
                      SYSTEM ID: GM-0704
                    </span>
                    <p className="text-xs font-bold text-white">Gowtham M</p>
                  </div>
                  <div className="px-2 py-1 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/30 text-[10px] font-mono text-[#EF4444] font-bold">
                    ONLINE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
