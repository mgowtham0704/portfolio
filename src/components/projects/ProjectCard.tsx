import React from 'react';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  Database,
  Eye
} from 'lucide-react';
import { ProjectData } from '../../data/resumeData';
import { soundFx } from '../../lib/soundFx';

interface Props {
  project: ProjectData;
  onOpenModal: () => void;
}

export const ProjectCard: React.FC<Props> = ({ project, onOpenModal }) => {
  const getCategoryIcon = () => {
    switch (project.category) {
      case 'agentic-ai': return Sparkles;
      case 'data-eng': return Database;
      case 'computer-vision': return Eye;
      default: return Cpu;
    }
  };

  const IconComponent = getCategoryIcon();

  return (
    <div
      onClick={() => {
        soundFx.playClick();
        onOpenModal();
      }}
      onMouseEnter={() => soundFx.playHover()}
      className="group relative rounded-3xl bg-[#0D0F1E] border border-white/10 p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none" />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
              {project.categoryLabel}
            </span>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-foreground-muted group-hover:border-primary/40 group-hover:text-white transition-all">
            Inspect Architecture
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Short Headline / Summary */}
        <p className="text-xs sm:text-sm text-foreground-muted mt-2.5 line-clamp-3 leading-relaxed">
          {project.headline}
        </p>

        {/* Key Metrics Pill Grid */}
        <div className="mt-5 grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-[#07080F] border border-white/5">
          {project.metrics.map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-xs font-mono font-bold text-white truncate">{m.value}</p>
              <p className="text-[9px] font-mono text-foreground-subtle truncate uppercase mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer tags and action button */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 min-w-0">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-foreground-muted truncate"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-foreground-subtle">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-primary border border-white/10 group-hover:border-primary flex items-center justify-center text-foreground-muted group-hover:text-white transition-all flex-shrink-0">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
