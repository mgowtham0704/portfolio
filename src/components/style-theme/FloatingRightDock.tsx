import React, { useEffect, useState } from 'react';
import {
  Home,
  User,
  LayoutGrid,
  Columns,
  MessageSquare,
  Mail
} from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

interface DockItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

export const FloatingRightDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const dockItems: DockItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: LayoutGrid },
    { id: 'work', label: 'Work', icon: Columns },
    { id: 'ai-lab', label: 'AI Lab', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      const elements = dockItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = elements.length - 1; i >= 0; i--) {
        const item = elements[i];
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Floating Navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 sm:gap-5 py-5 sm:py-6 px-2.5 sm:px-3 rounded-full bg-[#181829]/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80"
    >
      {dockItems.map((item) => {
        const isActive = activeSection === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => soundFx.playHover()}
            className="group relative p-1.5 focus:outline-none transition-transform active:scale-90"
            aria-label={`Navigate to ${item.label}`}
          >
            {/* Tooltip on hover (left side) */}
            <span className="absolute right-10 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#131422] border border-white/10 text-[11px] font-mono font-medium text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap">
              {item.label}
            </span>

            {/* Icon */}
            <Icon
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                isActive
                  ? 'text-[#F13024] filter drop-shadow-[0_0_8px_rgba(241,48,36,0.8)] scale-110'
                  : 'text-[#8F94A6] hover:text-white'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};
