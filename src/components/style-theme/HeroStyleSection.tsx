import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { soundFx } from '../../lib/soundFx';
import gowthamHero from '../../assets/gowtham_no_bg.png';

export const HeroStyleSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP timeline for staggered animations on load
    const tl = gsap.timeline();

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 30, skewY: 10 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power3.out' },
      0
    )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.2
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out' },
        0.4
      )
      .fromTo(
        avatarRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        0
      );

    // Hover effect on CTA button
    const ctaButton = ctaRef.current?.querySelector('a');
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
      });
      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Headline, Bio & Rotating Circular CTA (6 cols on LG) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            {/* Bold Headline matching img_main.png */}
            <motion.h1
              ref={headlineRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Transforming Ideas <br />
              Into <span className="text-[#F13024]">Digital Reality</span>
            </motion.h1>

            {/* Bio Paragraph */}
            <motion.p
              ref={bioRef}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-sm sm:text-base text-[#8F94A6] max-w-xl leading-relaxed font-sans"
            >
              Results-oriented AI/ML and Data Science Engineer specializing in stateful Multi-Agent LLM swarms (LangGraph), automated Apache Airflow ETL data pipelines, and IoT-integrated edge computer vision systems.
            </motion.p>

            {/* Rotating Circular Text Badge with Center Arrow ("• MY PROJECTS • MY PROJECTS •") */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex items-center gap-6"
            >
              <a
                href="#work"
                onClick={() => soundFx.playClick()}
                className="group relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
                title="Explore Projects"
              >
                {/* SVG Rotating Circular Text */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="heroCirclePath"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="none"
                    />
                    <text className="text-[9px] font-mono font-bold fill-[#8F94A6] tracking-[2.8px] uppercase group-hover:fill-[#F13024] transition-colors">
                      <textPath href="#heroCirclePath" startOffset="0%">
                        • MY PROJECTS • MY PROJECTS
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Center Directional Arrow Icon */}
                <div className="w-12 h-12 rounded-full border border-white/20 bg-[#181829]/90 flex items-center justify-center text-white shadow-xl group-hover:border-[#F13024] group-hover:text-[#F13024] transition-all">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              {/* Fast Stats Pill */}
              <div className="hidden sm:flex flex-col gap-1 text-xs font-mono text-white/70 border-l border-white/10 pl-6">
                <span className="text-[#F13024] font-bold">7-AGENT GRAPH</span>
                <span>100% LOCAL LLM</span>
                <span className="text-white/40">AIRFLOW CRON 5-MIN</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Gowtham 3D Character Avatar in Blue Coat with Radar Halo (6 cols on LG) */}
          <motion.div
            ref={avatarRef}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative min-h-[540px] sm:min-h-[620px] lg:min-h-[680px]"
          >
            {/* 1. Subtle Circular Tech Graphic Behind Head (Faint Radar / Abstract Cyber Halo) */}
            <div className="absolute top-[24%] sm:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[460px] lg:w-[500px] h-[380px] sm:h-[460px] lg:h-[500px] pointer-events-none flex items-center justify-center z-0">
              {/* Outer Faint Radar Compass Circle with Red & Purple Ticks */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-white/[0.08]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F13024] shadow-glow-red" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#F13024]/70" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/70" />
              </motion.div>

              {/* Sweeping Faint Radar Pulse Beam */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full opacity-30"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 65%, rgba(139, 92, 246, 0.2) 85%, rgba(241, 48, 36, 0.5) 100%)',
                }}
              />

              {/* Concentric Segmented Purple Cyber Arc Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-10 rounded-full border border-dashed border-[#8B5CF6]/40"
              />

              {/* Counter-Rotating Crimson Target HUD Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-20 rounded-full border border-dotted border-[#F13024]/45"
              />

              {/* Crosshair Target Reticles */}
              <div className="absolute inset-24 flex items-center justify-center opacity-20">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-[#F13024] to-transparent absolute" />
              </div>

              {/* Central Glowing Red/Purple Ambient Aura framing the head */}
              <div className="w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] rounded-full bg-gradient-to-tr from-[#F13024]/25 via-[#8B5CF6]/20 to-transparent blur-3xl animate-pulse" />
            </div>

            {/* 2. Gowtham 3D Character Avatar with Head AND Full Blue Coat */}
            <div className="relative z-10 w-[110%] sm:w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[580px] flex flex-col items-center justify-center filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] lg:translate-x-4">
              {/* Floating 3D Character with Head & Full Blue Coat */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="relative w-full aspect-[4/5] flex items-end justify-center -mb-8 sm:-mb-12 lg:-mb-16"
              >
                <img
                  src={gowthamHero}
                  alt="Gowtham M - 3D Character Avatar"
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                />

                {/* Ambient Ground Flare below blue coat fade */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[#F13024]/20 rounded-full blur-xl pointer-events-none" />
              </motion.div>

              {/* 3. Text directly below the 3D character */}
              <div className="w-full mt-2 text-center relative z-20">
                <p className="text-xl sm:text-2xl font-bold font-mono text-[#F13024] uppercase tracking-[0.2em] drop-shadow-md">
                  Student
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
