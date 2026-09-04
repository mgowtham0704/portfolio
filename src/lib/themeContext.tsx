import React, { createContext, useContext, useEffect, useState } from 'react';
import { soundFx } from './soundFx';

export type ThemeVariant = 'violet' | 'cyan' | 'emerald' | 'amber';

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  openResumeModal: () => void;
  closeResumeModal: () => void;
  isResumeModalOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  isCommandPaletteOpen: boolean;
  activeProjectModalId: string | null;
  openProjectModal: (id: string) => void;
  closeProjectModal: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeVariant>('violet');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [activeProjectModalId, setActiveProjectModalId] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('gowtham_theme') as ThemeVariant;
    if (savedTheme && ['violet', 'cyan', 'emerald', 'amber'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
    setSoundEnabled(soundFx.isEnabled());
  }, []);

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    localStorage.setItem('gowtham_theme', newTheme);
    soundFx.playClick();
  };

  const toggleSound = () => {
    const updated = soundFx.toggle();
    setSoundEnabled(updated);
  };

  const openResumeModal = () => {
    soundFx.playClick();
    setIsResumeModalOpen(true);
  };
  const closeResumeModal = () => setIsResumeModalOpen(false);

  const openCommandPalette = () => {
    soundFx.playClick();
    setIsCommandPaletteOpen(true);
  };
  const closeCommandPalette = () => setIsCommandPaletteOpen(false);

  const openProjectModal = (id: string) => {
    soundFx.playClick();
    setActiveProjectModalId(id);
  };
  const closeProjectModal = () => setActiveProjectModalId(null);

  useEffect(() => {
    document.documentElement.classList.remove('theme-violet', 'theme-cyan', 'theme-emerald', 'theme-amber');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for command palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsResumeModalOpen(false);
        setActiveProjectModalId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        soundEnabled,
        toggleSound,
        openResumeModal,
        closeResumeModal,
        isResumeModalOpen,
        openCommandPalette,
        closeCommandPalette,
        isCommandPaletteOpen,
        activeProjectModalId,
        openProjectModal,
        closeProjectModal,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
