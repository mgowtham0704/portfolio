import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
}

export const StyleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for constellation effect
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.35 + 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const alpha = p.baseAlpha + Math.sin(tick * 0.02 + p.pulsePhase) * 0.12;
        ctx.fillStyle = `rgba(241, 48, 36, ${Math.max(0.08, alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(241, 48, 36, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Base Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* 2. Top-Left Red Grunge Splatter Brush Effect (from style images) */}
      <div className="absolute -top-12 -left-12 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] pointer-events-none opacity-45">
        <svg viewBox="0 0 300 300" className="w-full h-full fill-[#F13024]">
          <path d="M0,0 L180,0 C160,30 190,60 140,80 C90,100 130,150 70,170 C20,185 40,240 0,260 Z" />
          <circle cx="210" cy="40" r="14" />
          <circle cx="170" cy="110" r="8" />
          <circle cx="95" cy="190" r="12" />
          <circle cx="130" cy="160" r="5" />
          <circle cx="45" cy="240" r="9" />
          <circle cx="240" cy="70" r="6" />
          <circle cx="190" cy="140" r="4" />
          <circle cx="80" cy="220" r="7" />
        </svg>
      </div>

      {/* 3. Ambient Crimson Red Radial Nebulae */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#F13024]/12 rounded-full blur-[180px]" />
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-[#F59E0B]/8 rounded-full blur-[170px]" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#F13024]/10 rounded-full blur-[160px]" />

      {/* 4. Bottom-Left Glowing 3D Brain/Bulb Aesthetic Graphic (seen in img2, img3, img4) */}
      <div className="absolute -bottom-10 -left-10 w-72 sm:w-96 h-72 sm:h-96 opacity-30 sm:opacity-40 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer Glass Bulb Contour */}
          <path
            d="M 60,100 C 60,55 140,55 140,100 C 140,125 125,140 120,160 L 80,160 C 75,140 60,125 60,100 Z"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />
          {/* Inner Glowing Red Brain Cortex */}
          <circle cx="100" cy="95" r="32" fill="url(#redBrainGlow)" opacity="0.8" />
          <path
            d="M 85,85 Q 100,70 115,85 Q 125,100 115,115 Q 100,125 85,115 Q 75,100 85,85 Z"
            fill="none"
            stroke="#F13024"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            className="animate-pulse"
          />
          <defs>
            <radialGradient id="redBrainGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F13024" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F13024" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* 5. Bottom-Right Swirling Red Plasma Vortex Graphic (seen in img1, img2, img3) */}
      <div className="absolute -bottom-16 -right-16 w-80 sm:w-[420px] h-80 sm:h-[420px] opacity-35 sm:opacity-50 pointer-events-none">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <ellipse
            cx="220"
            cy="220"
            rx="120"
            ry="60"
            fill="none"
            stroke="url(#plasmaRed)"
            strokeWidth="3"
            transform="rotate(-25 220 220)"
          />
          <ellipse
            cx="220"
            cy="220"
            rx="90"
            ry="40"
            fill="none"
            stroke="rgba(241,48,36,0.6)"
            strokeWidth="2"
            transform="rotate(-15 220 220)"
          />
          <ellipse
            cx="220"
            cy="220"
            rx="60"
            ry="25"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            transform="rotate(-5 220 220)"
          />
          <defs>
            <linearGradient id="plasmaRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F13024" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
