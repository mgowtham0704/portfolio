import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Bot, Database, Eye, Cpu } from 'lucide-react';
import { soundFx } from '../../lib/soundFx';
import { useTheme } from '../../lib/themeContext';

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  icon: React.FC<{ className?: string }>;
  tags: string[];
}

export const WorkStyleSection: React.FC = () => {
  const { openProjectModal } = useTheme();
  const [activeDot, setActiveDot] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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

    // Work items stagger animation
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll('[data-work-item]');
      gsap.fromTo(
        items,
        { opacity: 0, x: -40, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
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

  const workItems: WorkItem[] = [
    {
      id: 'multi-agent-resume-matcher',
      title: '7-Agent LangGraph Swarm Hub',
      category: 'Generative AI & Agents',
      gradient: 'from-[#8B5CF6]/40 via-[#F13024]/40 to-[#0C0B14]',
      icon: Bot,
      tags: ['LangGraph', 'Ollama', 'Pydantic', 'Local LLM'],
    },
    {
      id: 'airflow-etl-pipeline',
      title: 'Apache Airflow MySQL ETL Pipeline',
      category: 'Data Engineering',
      gradient: 'from-[#F59E0B]/40 via-[#F13024]/40 to-[#0C0B14]',
      icon: Database,
      tags: ['Airflow', '5-Min Cron', 'MySQL', 'Python'],
    },
    {
      id: 'ai-smart-traffic-helmet-iot',
      title: 'AI Smart Traffic Signal Helmet Vision',
      category: 'Computer Vision & IoT',
      gradient: 'from-[#F13024]/40 via-[#8B5CF6]/40 to-[#0C0B14]',
      icon: Eye,
      tags: ['YOLO PyTorch', 'OpenCV', 'Hardware Relay'],
    },
    {
      id: 'iot-smart-car-parking',
      title: 'IoT Smart Car Parking Navigator',
      category: 'Smart Cities & IoT',
      gradient: 'from-[#3B82F6]/40 via-[#F13024]/40 to-[#0C0B14]',
      icon: Cpu,
      tags: ['Ultrasonic Grid', 'KNN Dispatcher', 'Python'],
    },
  ];

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Title & Description (4 cols on LG) */}
          <div className="lg:col-span-4 space-y-5">
            <h2 ref={headlineRef} className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
              My work <span className="text-[#F13024]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8F94A6] leading-relaxed font-sans max-w-sm">
              Explore interactive production systems covering generative multi-agent graphs, scheduled data pipelines, and deep learning computer vision.
            </p>
          </div>

          {/* Right Column: 2x2 Grid with LIVE PROJECT Hover Effect (8 cols on LG) */}
          <div ref={itemsRef} className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {workItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    data-work-item
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      soundFx.playClick();
                      openProjectModal(item.id);
                    }}
                    className="relative group rounded-3xl overflow-hidden bg-[#181829] border border-white/10 hover:border-[#F13024]/60 aspect-[16/11] cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between p-6"
                  >
                    {/* Background Preview Gradient & Graphic Layout */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                    />

                    {/* Top Tag & Category */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#F13024]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-[#8F94A6]">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Title & Tags */}
                    <div className="relative z-10 space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#F13024] transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-white/70 bg-black/40 px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Overlay: LIVE PROJECT ↗ (matching img3.png exact purple/crimson center badge) */}
                    <div className="absolute inset-0 bg-[#181829]/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                      <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F13024] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow-red shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>LIVE PROJECT</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Dots (matching img3.png) */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveDot(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeDot === i ? 'bg-[#F13024] w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
