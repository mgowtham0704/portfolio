import React from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';
import { useTheme } from '../../lib/themeContext';

export const ExperienceEducation: React.FC = () => {
  const { openResumeModal } = useTheme();

  return (
    <section id="timeline" className="py-24 relative bg-[#07080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor & Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & Technical Milestones
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Formal grounding in Artificial Intelligence & Data Science, coupled with continuous production architecture milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Formal Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Academic Degrees & Foundation</span>
            </h3>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-white/10">
              {RESUME_DATA.education.map((edu) => (
                <div
                  key={edu.degree}
                  className="relative pl-10 group"
                >
                  {/* Timeline Node */}
                  <div
                    className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full -translate-x-1/2 border-2 ${
                      edu.current
                        ? 'bg-primary border-white ring-4 ring-primary/20 animate-pulse'
                        : 'bg-[#0D0F1E] border-primary/60'
                    }`}
                  />

                  {/* Card Body */}
                  <div className="p-6 rounded-3xl bg-[#0D0F1E] border border-white/10 hover:border-primary/40 transition-all shadow-xl space-y-3 group-hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono text-primary uppercase font-bold tracking-wider">
                          {edu.period}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                          {edu.degree}
                        </h4>
                        <p className="text-xs sm:text-sm text-foreground-muted font-medium">
                          {edu.institution}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 border border-primary/30 text-primary">
                        {edu.grade}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-foreground-subtle font-mono">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{edu.location}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      {edu.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Technical Milestones & Applied Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Applied System Milestones</span>
            </h3>

            <div className="p-6 rounded-3xl bg-[#0D0F1E] border border-white/10 shadow-2xl space-y-5">
              <p className="text-xs text-foreground-muted leading-relaxed">
                Applied milestone projects demonstrating continuous end-to-end engineering excellence from autonomous AI systems to low-level hardware controllers.
              </p>

              <div className="space-y-3.5">
                {RESUME_DATA.certificationsAndAchievements.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all flex items-start gap-3.5 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] text-foreground-muted mt-0.5">
                        {cert.issuer}
                      </p>
                      <span className="inline-block text-[10px] font-mono text-primary font-bold mt-1">
                        Timeline: {cert.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Complete Resume Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 text-center space-y-2">
                <p className="text-xs font-bold text-white">Need verified credentials for HR / ATS?</p>
                <p className="text-[11px] text-foreground-muted">Download Gowtham&apos;s full PDF resume directly.</p>
                <button
                  onClick={openResumeModal}
                  className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs shadow-glow-sm transition-all"
                >
                  Inspect Full Resume PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
