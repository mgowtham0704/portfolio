import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import { soundFx } from '../../lib/soundFx';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedRaw, setCopiedRaw] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleCopyRawMarkdown = () => {
    const rawMarkdown = `# GOWTHAM M
Salem, Tamil Nadu 636011 | 8610820898 | mgowtham0704@gmail.com

## PROFESSIONAL SUMMARY
Results-oriented AI/ML student pursuing a Bachelor of Technology in Artificial Intelligence and Data Science, with strong proficiency in Python and machine learning fundamentals. Experienced in building IoT-integrated machine learning applications, multi-agent LLM systems, and ETL data pipelines, including object detection projects. Seeking to apply strong analytical skills and a collaborative mindset to deliver efficient, production-ready software solutions.

## SKILLS
- **Technical Skills:** Python, SQL, Git/GitHub, Machine Learning, Deep Learning, IoT Integration, Data Analysis, LangChain, LangGraph, Generative AI / LLM Application Development
- **Tools & Concepts:** PyTorch, Apache Airflow, Cloud Deployment (familiarity), Data Pipelines, Object Detection, Recommendation Systems, Ollama (local LLM deployment), Prompt Engineering, Multi-Agent System Design
- **Soft Skills:** Teamwork, Communication, Problem Solving, Time Management

## EDUCATION
- **Bachelor of Technology - Artificial Intelligence and Data Science**
  Mahendra Engineering College | CGPA: 7.45
- **Golden Spark Matriculation Higher Secondary School**
  HSC: 75% | SSLC: 77%

## ACADEMIC PROJECTS
1. **Multi-Agent Resume / Job-Matching System** — LangGraph, LangChain, Python
   - Built a 7-agent LangGraph pipeline covering resume parsing, ATS scoring, and job-fit recommendations.
   - Used LangChain with Pydantic for typed, structured data exchange between agents.
   - Deployed the system fully locally with Ollama, avoiding paid API dependency.

2. **ETL Pipeline with Apache Airflow** — Python, MySQL, SQL
   - Automated a MySQL to Python to CSV pipeline using Apache Airflow.
   - Scheduled the pipeline to run every 5 minutes with built-in error handling.
   - Validated extracted data and managed database connections for reliability.

3. **AI-Based Smart Traffic Signal Control Using Helmet Detection and IoT**
   - Built a deep learning model to detect helmet usage in real time.
   - Linked detection results to IoT-based traffic signal control logic.
   - Cleared signals only for rule-compliant riders, improving road safety.

4. **IoT-Based Smart Car Parking System** — Machine Learning, IoT
   - Built a machine learning model to detect available parking spaces.
   - Used IoT sensors to guide vehicles to open spots.
   - Reduced search time and improved space utilization.

5. **Housing ETL Project** — Python, SQL
   - Built a pipeline to extract, clean, and transform housing market data.
   - Loaded processed data into a structured format for analysis.
   - Automated data cleaning and validation using SQL and Python.

6. **Window Info Collector App** — Python
   - Built an application to capture and log active window information.
   - Tracked application activity for system usage monitoring.
   - Organized logged data for easy retrieval and review.
`;

    navigator.clipboard.writeText(rawMarkdown);
    setCopiedRaw(true);
    soundFx.playSuccess();
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#0F111E] border border-white/15 rounded-3xl shadow-2xl shadow-primary/20 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar Header */}
        <div className="px-6 py-4 bg-[#14182E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Gowtham M — Verified Resume Document</h3>
              <p className="text-[11px] font-mono text-emerald-400">ATS Optimized • Clean Heuristic Score: 98/100</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-all font-mono"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyRawMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-all font-mono"
              title="Copy Raw Text"
            >
              {copiedRaw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedRaw ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body (Clean, ATS-style layout on white/light-grey card) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#090A12]">
          <div className="max-w-3xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl font-sans text-[13px] leading-relaxed select-text print:p-0 print:shadow-none">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-5 text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wider font-display">
                GOWTHAM M
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Salem, Tamil Nadu 636011 &nbsp;|&nbsp; 8610820898 &nbsp;|&nbsp; mgowtham0704@gmail.com
              </p>
            </div>

            {/* Professional Summary */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-slate-700 text-xs leading-relaxed text-justify">
                Results-oriented AI/ML student pursuing a Bachelor of Technology in Artificial Intelligence and Data Science, with strong proficiency in Python and machine learning fundamentals. Experienced in building IoT-integrated machine learning applications, multi-agent LLM systems, and ETL data pipelines, including object detection projects. Seeking to apply strong analytical skills and a collaborative mindset to deliver efficient, production-ready software solutions.
              </p>
            </div>

            {/* Skills */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                SKILLS
              </h2>
              <div className="space-y-1.5 text-xs text-slate-800">
                <p>
                  <span className="font-bold text-slate-900">Technical Skills:</span> Python, SQL, Git/GitHub, Machine Learning, Deep Learning, IoT Integration, Data Analysis, LangChain, LangGraph, Generative AI / LLM Application Development
                </p>
                <p>
                  <span className="font-bold text-slate-900">Tools &amp; Concepts:</span> PyTorch, Apache Airflow, Cloud Deployment (familiarity), Data Pipelines, Object Detection, Recommendation Systems, Ollama (local LLM deployment), Prompt Engineering, Multi-Agent System Design
                </p>
                <p>
                  <span className="font-bold text-slate-900">Soft Skills:</span> Teamwork, Communication, Problem Solving, Time Management
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                EDUCATION
              </h2>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-sm">Bachelor of Technology - Artificial Intelligence and Data Science</span>
                    <span className="font-bold text-slate-900">CGPA: 7.45</span>
                  </div>
                  <p className="text-slate-600 italic">Mahendra Engineering College</p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Golden Spark Matriculation Higher Secondary School</span>
                    <span className="text-slate-700 font-semibold">HSC: 75% &nbsp;|&nbsp; SSLC: 77%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                ACADEMIC PROJECTS
              </h2>
              <div className="space-y-3.5 text-xs">
                {/* Project 1 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Multi-Agent Resume / Job-Matching System</span>
                    <span className="text-slate-600 italic text-[11px]">LangGraph, LangChain, Python</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                    <li>Built a 7-agent LangGraph pipeline covering resume parsing, ATS scoring, and job-fit recommendations.</li>
                    <li>Used LangChain with Pydantic for typed, structured data exchange between agents.</li>
                    <li>Deployed the system fully locally with Ollama, avoiding paid API dependency.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">ETL Pipeline with Apache Airflow</span>
                    <span className="text-slate-600 italic text-[11px]">Python, MySQL, SQL</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                    <li>Automated a MySQL to Python to CSV pipeline using Apache Airflow.</li>
                    <li>Scheduled the pipeline to run every 5 minutes with built-in error handling.</li>
                    <li>Validated extracted data and managed database connections for reliability.</li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">AI-Based Smart Traffic Signal Control Using Helmet Detection and IoT</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                    <li>Built a deep learning model to detect helmet usage in real time.</li>
                    <li>Linked detection results to IoT-based traffic signal control logic.</li>
                    <li>Cleared signals only for rule-compliant riders, improving road safety.</li>
                  </ul>
                </div>

                {/* Project 4 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">IoT-Based Smart Car Parking System</span>
                    <span className="text-slate-600 italic text-[11px]">Machine Learning, IoT</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                    <li>Built a machine learning model to detect available parking spaces.</li>
                    <li>Used IoT sensors to guide vehicles to open spots.</li>
                    <li>Reduced search time and improved space utilization.</li>
                  </ul>
                </div>

                {/* Project 5 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Housing ETL Project</span>
                    <span className="text-slate-600 italic text-[11px]">Python, SQL</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                    <li>Built a pipeline to extract, clean, and transform housing market data.</li>
                    <li>Loaded processed data into a structured format for analysis.</li>
                    <li>Automated data cleaning and validation using SQL and Python.</li>
                  </ul>
                </div>

                {/* Project 6 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Window Info Collector App</span>
                    <span className="text-slate-600 italic text-[11px]">Python</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                    <li>Built an application to capture and log active window information.</li>
                    <li>Tracked application activity for system usage monitoring.</li>
                    <li>Organized logged data for easy retrieval and review.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#14182E] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-foreground-muted">
            Direct Contact: +91 8610820898 &nbsp;|&nbsp; mgowtham0704@gmail.com
          </span>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-glow-sm transition-all"
          >
            Download / Print PDF
          </button>
        </div>
      </div>

      {/* Backdrop click closer */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
