import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  FileText,
  Menu,
  X,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';

export const Navbar: React.FC = () => {
  const {
    soundEnabled,
    toggleSound,
    openResumeModal,
    openCommandPalette
  } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialHandles = [
    { label: 'GH', href: 'https://github.com/mgowtham0704', title: 'GitHub Profile' },
    { label: 'LN', href: 'https://www.linkedin.com/in/gowtham-m-096382355?utm_source=share_via&utm_content=profile&utm_medium=member_android', title: 'LinkedIn Profile' },
    { label: 'EM', href: 'mailto:mgowtham0704@gmail.com', title: 'Email Me' },
  ];

  const navLinks = [
    { name: '01 Multi-Agent', href: '#multi-agent-system' },
    { name: '02 Data Engineering', href: '#data-engineering' },
    { name: '03 Core Tech', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Terminal / Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#0D0E15]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Branding typography: "gowtham m." with crimson dot */}
        <a
          href="#hero"
          onClick={() => soundFx.playClick()}
          className="group flex items-center gap-2 focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono lowercase">
            gowtham m<span className="text-[#EF4444] font-mono text-3xl inline-block group-hover:scale-125 transition-transform duration-300">.</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
            AI/ML Engineer
          </span>
        </a>

        {/* Center / Desktop Navigation shortcuts */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#13141F]/80 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#8F94A6] hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Micro-sized social anchor handles ("GH", "LN", "EM") + Tools Deck */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Micro Social Handles */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-[#13141F] border border-white/10 font-mono text-xs">
            {socialHandles.map((handle) => (
              <a
                key={handle.label}
                href={handle.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                title={handle.title}
                className="px-2 py-1 rounded-lg text-[#8F94A6] hover:text-white hover:bg-[#EF4444]/20 hover:text-[#EF4444] font-bold text-[11px] transition-all flex items-center gap-0.5"
              >
                <span>{handle.label}</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
              </a>
            ))}
          </div>

          {/* Command Palette Launcher (⌘K) */}
          <button
            onClick={openCommandPalette}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#13141F] hover:bg-white/10 border border-white/10 text-xs text-[#8F94A6] hover:text-white transition-all"
            title="Open Command Palette (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-[#EF4444]" />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>

          {/* Audio Feedback Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundFx.playHover()}
            title={soundEnabled ? 'Audio Feedback: ON (Click to Mute)' : 'Audio Feedback: MUTED (Click to Enable)'}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444] shadow-glow-sm'
                : 'bg-[#13141F] border-white/10 text-[#8F94A6] hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Resume Modal CTA */}
          <button
            onClick={openResumeModal}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white font-bold text-xs shadow-glow-crimson transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-xl bg-[#13141F] border border-white/10 text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-3 pb-6 bg-[#13141F] border-b border-white/10 backdrop-blur-2xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#8F94A6] hover:text-white hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResumeModal();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white text-xs font-bold shadow-glow-crimson"
              >
                <FileText className="w-4 h-4" />
                View &amp; Download CV
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
