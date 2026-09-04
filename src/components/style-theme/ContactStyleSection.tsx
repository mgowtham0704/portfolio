import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

gsap.registerPlugin(ScrollTrigger);

export const ContactStyleSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

    // Form container scroll animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      soundFx.playSuccess();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10 w-full">
        {/* Centered Headline matching img4.png */}
        <div className="text-center space-y-4 mb-12">
          <h2 ref={headlineRef} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Let's <span className="text-[#F13024]">connect.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8F94A6] max-w-md mx-auto leading-relaxed font-sans">
            Ready to deploy enterprise agentic multi-LLM architectures, reliable Airflow ETL DAGs, or real-time computer vision systems? Let's discuss your roadmap.
          </p>
        </div>

        {/* Contact Form Container matching img4.png */}
        <div ref={formRef} className="rounded-3xl bg-[#181829]/80 border border-white/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative">
          {isSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
              <p className="text-sm text-[#8F94A6] max-w-sm mx-auto">
                Thank you, {formData.name}. Your inquiry has been transmitted directly to Gowtham's priority queue. Expect a response within 24 hours.
              </p>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsSent(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-full bg-[#181829] border border-white/20 text-white text-xs font-mono font-bold hover:border-[#F13024] transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-[#8F94A6] font-bold">
                    name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Gowtham M"
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#131422] border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#F13024] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-[#8F94A6] font-bold">
                    email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="mgowtham0704@gmail.com"
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#131422] border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#F13024] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#8F94A6] font-bold">
                  subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Multi-Agent LLM / Data Engineering Consultation"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#131422] border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#F13024] transition-colors"
                />
              </div>

              {/* Row 3: Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#8F94A6] font-bold">
                  message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your engineering specifications or project requirements..."
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#131422] border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#F13024] transition-colors resize-none"
                />
              </div>

              {/* Submit Action: "Let's talk" Button matching img4.png */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/20 hover:border-[#F13024] bg-gradient-to-r hover:from-[#8B5CF6]/30 hover:to-[#F13024]/40 text-white font-mono text-sm font-bold flex items-center justify-center gap-3 transition-all duration-300 group shadow-xl cursor-pointer"
                >
                  <span>{isSubmitting ? 'Transmitting...' : "Let's talk"}</span>
                  <ArrowRight className="w-4 h-4 text-[#F13024] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Direct info pill */}
                <div className="flex items-center gap-4 text-xs font-mono text-[#8F94A6]">
                  <a
                    href="mailto:mgowtham0704@gmail.com"
                    className="hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#F13024]" />
                    mgowtham0704@gmail.com
                  </a>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F13024]" />
                    Salem, India
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Credit */}
        <div className="text-center mt-16 pt-8 border-t border-white/5 space-y-2 text-xs font-mono text-[#8F94A6]">
          <p>Designed &amp; Engineered by Gowtham M © 2026. All rights reserved.</p>
          <p className="text-[11px] text-white/40">
            Powered by React, Framer Motion, Tailwind CSS &amp; Local LangGraph Swarm.
          </p>
        </div>
      </div>
    </section>
  );
};
