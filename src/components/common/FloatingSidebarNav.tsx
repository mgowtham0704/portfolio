import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../../lib/soundFx';

interface NavSection {
  id: string;
  label: string;
}

export const FloatingSidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections: NavSection[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // Mapping IDs
      const sectionElements = [
        { id: 'home', el: document.getElementById('hero') || document.getElementById('home') },
        { id: 'projects', el: document.getElementById('multi-agent-system') || document.getElementById('projects') },
        { id: 'skills', el: document.getElementById('skills') },
        { id: 'contact', el: document.getElementById('contact') },
      ];

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= windowHeight / 2) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundFx.playClick();
    let targetEl: HTMLElement | null = null;
    if (id === 'home') targetEl = document.getElementById('hero');
    else if (id === 'projects') targetEl = document.getElementById('multi-agent-system') || document.getElementById('projects');
    else if (id === 'skills') targetEl = document.getElementById('skills');
    else if (id === 'contact') targetEl = document.getElementById('contact');

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 py-4 px-2.5 rounded-full bg-[#13141F]/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => soundFx.playHover()}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Tooltip on hover (left side) */}
            <span className="absolute right-9 px-2.5 py-1 rounded-lg bg-[#181A28] border border-white/10 text-[11px] font-mono font-medium text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap">
              {section.label}
            </span>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="active-nav-dot"
                  className="absolute w-5 h-5 rounded-full bg-[#EF4444]/20 border border-[#EF4444]"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#EF4444] shadow-glow-crimson scale-125'
                    : 'bg-[#8F94A6]/40 group-hover:bg-[#EF4444]/80'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
