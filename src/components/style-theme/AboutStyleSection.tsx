import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundFx } from '../../lib/soundFx';

gsap.registerPlugin(ScrollTrigger);

export const AboutStyleSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'awards' | 'experience' | 'credentials'>('skills');
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Headline scroll animation
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    // Bio scroll animation
    if (bioRef.current) {
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );
    }

    // Stats stagger animation
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('div');
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const stats = [
    { value: '7.45', label: 'B.TECH CGPA' },
    { value: '100%', label: 'LOCAL INFERENCE (OLLAMA)' },
    { value: '6+', label: 'PRODUCTION PROJECTS' },
    { value: '8+', label: 'AWARDS & CERTS' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Bio & 4 Big Metric Counters (6 cols on LG) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Headline matching img1.png */}
            <h2 ref={headlineRef} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
              Captivating <span className="text-[#F13024]">stories</span> <br />
              birth magnificent <br />
              designs.
            </h2>

            {/* Subtitle Bio */}
            <p ref={bioRef} className="text-sm sm:text-base text-[#8F94A6] leading-relaxed font-sans max-w-lg">
              Pursuing a Bachelor of Technology in Artificial Intelligence &amp; Data Science at Mahendra Engineering College. Dedicated to designing deterministic, production-grade Multi-Agent LLM swarms, automated data infrastructure DAGs, and edge computer vision IoT devices.
            </p>

            {/* 4 Metric Counters (Exact Grid Layout matching img1.png) */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#F13024] font-sans">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-white/80 font-bold leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tab Selector Hub (Skills, Awards, Experience, Credentials) (6 cols on LG) */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            {/* Tab Navigation Strip (matching img1.png) */}
            <div className="flex items-center gap-6 sm:gap-8 pb-3 border-b border-white/10 text-sm sm:text-base font-medium">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('skills');
                }}
                className={`pb-2 transition-all relative ${
                  activeTab === 'skills'
                    ? 'text-[#F13024] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F13024]'
                    : 'text-[#8F94A6] hover:text-white'
                }`}
              >
                Skills
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('awards');
                }}
                className={`pb-2 transition-all relative ${
                  activeTab === 'awards'
                    ? 'text-[#F13024] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F13024]'
                    : 'text-[#8F94A6] hover:text-white'
                }`}
              >
                Awards
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('experience');
                }}
                className={`pb-2 transition-all relative ${
                  activeTab === 'experience'
                    ? 'text-[#F13024] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F13024]'
                    : 'text-[#8F94A6] hover:text-white'
                }`}
              >
                Experience
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('credentials');
                }}
                className={`pb-2 transition-all relative ${
                  activeTab === 'credentials'
                    ? 'text-[#F13024] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F13024]'
                    : 'text-[#8F94A6] hover:text-white'
                }`}
              >
                Credentials
              </button>
            </div>

            {/* Tab Content Display Area */}
            <div className="pt-4 space-y-6">
              {activeTab === 'skills' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Category 1 */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono uppercase text-[#8F94A6] font-bold tracking-wider">
                      Web &amp; AI Development –
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'PyTorch', 'LangGraph', 'LangChain', 'Ollama', 'FastAPI', 'SQL'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-xl bg-[#181829] border border-white/10 hover:border-[#F13024] text-xs font-medium text-white transition-all hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono uppercase text-[#8F94A6] font-bold tracking-wider">
                      Data Engineering &amp; Edge –
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Apache Airflow', 'Docker', 'MySQL', 'OpenCV (YOLO)', 'Git & Linux', 'IoT Sensors'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-xl bg-[#181829] border border-white/10 hover:border-[#F13024] text-xs font-medium text-white transition-all hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'awards' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-[#181829] border border-white/10">
                    <h4 className="text-sm font-bold text-white">Multi-Agent Systems Innovator</h4>
                    <p className="text-xs text-[#8F94A6] mt-1">
                      Finalist in autonomous agentic cognitive graphs &amp; Pydantic type-guarded workflows.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#181829] border border-white/10">
                    <h4 className="text-sm font-bold text-white">Academic Excellence Award</h4>
                    <p className="text-xs text-[#8F94A6] mt-1">
                      Distinction in Artificial Intelligence &amp; Data Science at Mahendra Engineering College.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-[#181829] border border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[#F13024]">LangGraph &amp; Airflow Engineer</span>
                      <span className="text-[#8F94A6]">2024 – Present</span>
                    </div>
                    <p className="text-xs text-[#8F94A6] mt-2 leading-relaxed">
                      Engineered 7-agent LLM systems with local Ollama inference and automated 5-minute MySQL ETL pipelines in Apache Airflow.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'credentials' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-[#181829] border border-white/10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">B.Tech Artificial Intelligence &amp; Data Science</h4>
                      <span className="text-xs font-mono text-[#F13024] font-bold">7.45 CGPA</span>
                    </div>
                    <p className="text-xs text-[#8F94A6] mt-1">
                      Mahendra Engineering College (Autonomous) | 2022 – 2026
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#181829] border border-white/10">
                    <h4 className="text-sm font-bold text-white">Higher Secondary (HSC: 76.5%) &amp; SSLC (81.6%)</h4>
                    <p className="text-xs text-[#8F94A6] mt-1">
                      Mathematics, Physics, Chemistry, and Computer Logic Specialization
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
