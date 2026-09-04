import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Volume2,
  VolumeX,
  Search,
  Globe
} from 'lucide-react';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';

export const TopNav: React.FC = () => {
  const { soundEnabled, toggleSound, openResumeModal, openCommandPalette } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-[#0C0B14]/85 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo: ethan smith. style -> gowtham m. */}
        <a
          href="#home"
          onClick={() => soundFx.playClick()}
          className="group flex items-center gap-1.5 focus:outline-none"
        >
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white lowercase">
            gowtham m<span className="text-[#F13024] font-black text-3xl sm:text-4xl inline-block group-hover:scale-125 transition-transform duration-300">.</span>
          </span>
        </a>

        {/* Social Icons Strip (Matching style header) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/gowtham-m-096382355?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-[#8F94A6] hover:text-white transition-colors p-1.5"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Mail Icon */}
          <a
            href="mailto:mgowtham0704@gmail.com"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-[#8F94A6] hover:text-[#F13024] transition-colors p-1.5"
            title="Email Me"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Globe / Web */}
          <a
            href="#work"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="text-[#8F94A6] hover:text-white transition-colors p-1.5"
            title="Projects Showcase"
          >
            <Globe className="w-4 h-4" />
          </a>

          {/* GitHub Icon inside Signature Red Circular Pill Badge (Exact Style from Images) */}
          <a
            href="https://github.com/mgowtham0704"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="w-8 h-8 rounded-full bg-[#F13024] hover:bg-[#d92217] flex items-center justify-center text-white transition-all shadow-glow-red-sm hover:scale-110 active:scale-95"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundFx.playHover()}
            className="p-1.5 rounded-lg text-[#8F94A6] hover:text-white transition-colors"
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F13024]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Command Palette Button */}
          <button
            onClick={openCommandPalette}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#8F94A6] hover:text-white transition-all"
            title="Open Command Palette (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-[#F13024]" />
            <span>⌘K</span>
          </button>

          {/* CV Button */}
          <button
            onClick={openResumeModal}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/20 hover:border-[#F13024] text-xs font-semibold text-white hover:text-[#F13024] transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
