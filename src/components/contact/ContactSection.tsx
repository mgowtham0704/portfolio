import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  Calendar,
  Sparkles,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '../../data/resumeData';
import { soundFx } from '../../lib/soundFx';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedInterviewDuration, setSelectedInterviewDuration] = useState('30m');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleOrCompany: '',
    message: ''
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    soundFx.playSuccess();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const interviewOptions = [
    { id: '15m', label: '15 Min', title: 'Introductory Screen', desc: 'Brief culture & role alignment' },
    { id: '30m', label: '30 Min', title: 'Technical Review', desc: 'Multi-Agent & Airflow deep dive' },
    { id: '45m', label: '45 Min', title: 'System Architecture', desc: 'Full engineering interview' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }

    // Compose direct mailto link as fallback
    const subject = encodeURIComponent(`Engineering Opportunity / Inquiry from ${formData.name} (${formData.roleOrCompany || 'Recruiter'})`);
    const body = encodeURIComponent(`Candidate Interview Request (${selectedInterviewDuration} screen)\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany/Role: ${formData.roleOrCompany}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:${RESUME_DATA.personal.email}?subject=${subject}&body=${body}`, '_blank');

    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#07080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fast-Track Recruiter Station</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Initiate Direct Connection
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Available immediately for full-time AI/ML Engineering, Generative AI Agent systems, and Data Engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Deck & Fast Interview Booking (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="p-6 rounded-3xl bg-[#0D0F1E] border border-white/10 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Verified Direct Channels</span>
              </h3>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase text-foreground-subtle">Direct Email</p>
                    <a
                      href={`mailto:${RESUME_DATA.personal.email}`}
                      className="text-xs font-bold text-white hover:text-primary transition-colors truncate block"
                    >
                      {RESUME_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(RESUME_DATA.personal.email, 'email')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-white transition-all flex-shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase text-foreground-subtle">Mobile / WhatsApp</p>
                    <a
                      href={`tel:${RESUME_DATA.personal.phone}`}
                      className="text-xs font-bold text-white hover:text-primary transition-colors truncate block"
                    >
                      {RESUME_DATA.personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(RESUME_DATA.personal.phone, 'phone')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-white transition-all flex-shrink-0"
                  title="Copy phone number to clipboard"
                >
                  {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-foreground-muted flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-foreground-subtle">Current Location</p>
                  <p className="text-xs font-bold text-white">{RESUME_DATA.personal.location}</p>
                </div>
              </div>
            </div>

            {/* 1-Click Interview Duration Selector */}
            <div className="p-6 rounded-3xl bg-[#0D0F1E] border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Select Technical Screen Format</span>
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {interviewOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedInterviewDuration(opt.id);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedInterviewDuration === opt.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-glow-sm'
                        : 'bg-white/5 border-white/10 text-foreground-muted hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-black font-mono">{opt.label}</p>
                    <p className="text-[10px] text-foreground-muted mt-1 truncate">{opt.title.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Dispatch Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0F1E] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Send Direct Engineering Message</span>
                </h3>
                <p className="text-xs text-foreground-muted mt-1">
                  Have an open role or research collaboration? Fill out the details below to dispatch directly to Gowtham&apos;s primary inbox.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4 bg-[#07080F] rounded-2xl border border-emerald-500/30 p-6 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Prepared & Dispatched!</h4>
                  <p className="text-xs text-foreground-muted max-w-md mx-auto leading-relaxed">
                    Your interview request and message have been routed to <span className="text-white font-semibold">{RESUME_DATA.personal.email}</span>. Gowtham typically responds within 4–12 hours.
                  </p>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', roleOrCompany: '', message: '' });
                    }}
                    className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 font-medium transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground-muted">Your Name / Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins (Tech Lead)"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-foreground-subtle focus:outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground-muted">Your Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. s.jenkins@company.ai"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-foreground-subtle focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-foreground-muted">Company or Project Name</label>
                    <input
                      type="text"
                      value={formData.roleOrCompany}
                      onChange={(e) => setFormData({ ...formData, roleOrCompany: e.target.value })}
                      placeholder="e.g. Anthropic / Stealth AI Startup / Open Source"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-foreground-subtle focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-foreground-muted">Role Context & Engineering Scope *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Gowtham, we were impressed by your 7-agent LangGraph system and Airflow ETL pipeline. We'd love to invite you for a technical screen..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-foreground-subtle focus:outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-md transition-all hover:scale-101 active:scale-99"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Message & Calendar Invitation</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
