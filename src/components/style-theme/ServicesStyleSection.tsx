import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Crop,
  Edit3,
  Monitor,
  ArrowUpRight,
} from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  id: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  tech: string[];
}

export const ServicesStyleSection: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    // Service cards stagger animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('[data-service-card]');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, rotateY: -20 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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

  const services: ServiceCard[] = [
    {
      id: 'agentic-ai',
      icon: Crop,
      title: 'Multi-Agent LLMs',
      description: 'Deterministic LangGraph cognitive workflows, Pydantic type validation, and 100% local Ollama execution with zero cloud API lock-in.',
      tech: ['LangGraph', 'Ollama', 'Pydantic v2', 'StateGraph'],
    },
    {
      id: 'data-eng',
      icon: Edit3,
      title: 'ETL & Data Pipelines',
      description: 'Automated Apache Airflow DAG scheduling, recurring 5-minute MySQL to CSV extraction, schema validation, and atomic transaction logs.',
      tech: ['Apache Airflow', 'MySQL', 'Python', 'Cron'],
    },
    {
      id: 'vision-iot',
      icon: Monitor,
      title: 'Edge Vision & IoT',
      description: 'Real-time PyTorch YOLO helmet detection, traffic gating relays, and ultrasonic sensor grids integrated with hardware microcontrollers.',
      tech: ['PyTorch YOLO', 'OpenCV', 'Sensors', 'Relays'],
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Title & Description (4 cols on LG) */}
          <div className="lg:col-span-4 space-y-5">
            <h2 ref={headlineRef} className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
              My services <span className="text-[#F13024]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8F94A6] leading-relaxed font-sans max-w-sm">
              Delivering production-grade AI architectures, autonomous multi-agent pipelines, and reliable automated data infrastructure.
            </p>
          </div>

          {/* Right Column: 3 Services Cards Grid + Pagination Dots (8 cols on LG) */}
          <div ref={cardsRef} className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {services.map((service, idx) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.id}
                    data-service-card
                    onMouseEnter={() => {
                      soundFx.playHover();
                      setActiveDot(idx);
                    }}
                    className="p-6 sm:p-7 rounded-3xl bg-[#181829]/75 border border-white/10 hover:border-[#F13024]/60 transition-all duration-300 flex flex-col justify-between h-80 sm:h-96 shadow-xl group hover:scale-[1.02] cursor-pointer"
                  >
                    {/* Card Top: Outline Red Icon */}
                    <div className="space-y-5">
                      <div className="text-[#F13024]">
                        <Icon className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#F13024] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#8F94A6] leading-relaxed font-sans">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Bottom: Diagonal Arrow matching img2.png */}
                    <div className="pt-4 flex items-center justify-between border-t border-white/5">
                      <div className="flex gap-1.5">
                        {service.tech.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono text-[#8F94A6] bg-black/40 px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="text-white group-hover:text-[#F13024] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots (matching img2.png) */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveDot(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeDot === i ? 'bg-[#F13024] w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
