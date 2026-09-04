import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Database,
  Eye,
  Cpu,
  Search
} from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useTheme } from '../../lib/themeContext';
import { soundFx } from '../../lib/soundFx';

export const ProjectsSection: React.FC = () => {
  const { activeProjectModalId, openProjectModal, closeProjectModal } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Projects (6)', icon: Layers },
    { id: 'agentic-ai', label: 'Generative AI & Agents', icon: Sparkles },
    { id: 'data-eng', label: 'ETL & Data Pipelines', icon: Database },
    { id: 'computer-vision', label: 'Computer Vision & IoT', icon: Eye },
    { id: 'system-util', label: 'System Telemetry', icon: Cpu },
  ];

  const filteredProjects = RESUME_DATA.projects.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const activeProject = RESUME_DATA.projects.find((p) => p.id === activeProjectModalId);

  return (
    <section id="all-projects" className="py-24 relative bg-[#0D0E15] border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#EF4444]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141F] border border-[#EF4444]/30 text-xs font-mono text-[#EF4444]">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Engineering Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Academic &amp; Applied Projects
            </h2>
            <p className="text-sm sm:text-base text-[#8F94A6]">
              Production-tested implementations from Gowtham&apos;s portfolio across Multi-Agent systems, high-throughput Apache Airflow pipelines, and IoT deep learning devices.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8F94A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, LangGraph, Airflow..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#13141F] border border-white/10 text-xs text-white placeholder:text-[#8F94A6] focus:outline-none focus:border-[#EF4444] font-mono transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white shadow-glow-crimson scale-102 font-bold'
                    : 'bg-[#13141F] border border-white/10 text-[#8F94A6] hover:text-white hover:border-white/20'
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={() => openProjectModal(project.id)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#13141F] rounded-3xl border border-white/10">
            <p className="text-sm text-[#8F94A6]">No projects found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-[#EF4444] font-mono hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={closeProjectModal}
        />
      )}
    </section>
  );
};
