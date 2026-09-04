import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Eye,
  Radio,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  Cpu,
  Table,
  Activity,
  ArrowRightLeft,
  FileSpreadsheet
} from 'lucide-react';
import { soundFx } from '../../lib/soundFx';
import { useTheme } from '../../lib/themeContext';

export const ProjectsBentoGrid: React.FC = () => {
  const { openProjectModal } = useTheme();

  // 1. ETL Pipeline DAG Simulator State
  const [dagStep, setDagStep] = useState(0);
  const [dagRunning, setDagRunning] = useState(true);
  const [processedRows, setProcessedRows] = useState(148500);

  const dagTasks = [
    { id: 'extract', name: 'extract_mysql_delta', status: 'success', time: '0.34s' },
    { id: 'validate', name: 'validate_data_schema', status: 'success', time: '0.12s' },
    { id: 'transform', name: 'vectorized_python_transform', status: 'running', time: '0.45s' },
    { id: 'load', name: 'export_clean_csv_target', status: 'queued', time: '0.22s' },
  ];

  useEffect(() => {
    if (!dagRunning) return;
    const interval = setInterval(() => {
      setDagStep((prev) => {
        const next = (prev + 1) % dagTasks.length;
        if (next === 0) {
          setProcessedRows((r) => r + 250);
        }
        return next;
      });
    }, 1300);
    return () => clearInterval(interval);
  }, [dagRunning, dagTasks.length]);

  // 2. AI Smart Traffic Signal Helmet Detection State
  const [hasHelmet, setHasHelmet] = useState(true);
  const [signalColor, setSignalColor] = useState<'GREEN' | 'RED'>('GREEN');
  const [confidence, setConfidence] = useState(98.4);

  const handleToggleHelmet = () => {
    soundFx.playClick();
    const next = !hasHelmet;
    setHasHelmet(next);
    if (next) {
      setSignalColor('GREEN');
      setConfidence(98.4);
    } else {
      setSignalColor('RED');
      setConfidence(96.2);
    }
  };

  // 3. Smart Parking Grid State
  const [slots, setSlots] = useState([
    { id: 'BAY-01', occupied: true },
    { id: 'BAY-02', occupied: false, recommended: true },
    { id: 'BAY-03', occupied: true },
    { id: 'BAY-04', occupied: true },
    { id: 'BAY-05', occupied: false },
    { id: 'BAY-06', occupied: true },
  ]);

  const toggleSlot = (id: string) => {
    soundFx.playClick();
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, occupied: !s.occupied } : s))
    );
  };

  return (
    <section
      id="data-engineering"
      className="py-24 relative bg-[#0D0E15] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#EF4444]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141F] border border-[#EF4444]/30 text-xs font-mono text-[#EF4444]">
              <Cpu className="w-3.5 h-3.5" />
              <span>02 // Data Engineering &amp; Smart Systems</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Component Data Pipelines &amp; IoT Relays
            </h2>
            <p className="text-sm sm:text-base text-[#8F94A6] leading-relaxed font-sans">
              Asymmetrical showcase of production-ready Apache Airflow automation, real-time Computer Vision linked to physical traffic hardware, and ultrasonic IoT sensor grids.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13141F] border border-white/10 text-xs font-mono text-[#8F94A6]">
            <Activity className="w-4 h-4 text-[#EF4444] animate-pulse" />
            <span>Hardware &amp; Cron Triggers Active</span>
          </div>
        </div>

        {/* Asymmetrical Masonry Bento-Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Apache Airflow 5-Min ETL Pipeline (Spans 7 cols on LG) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7 rounded-3xl bg-[#13141F] border border-white/10 hover:border-[#EF4444]/50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF4444]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444]">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#EF4444] uppercase font-bold tracking-wider">
                      ETL Pipeline // Apache Airflow
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      MySQL-to-CSV Database Sync Engine
                    </h3>
                  </div>
                </div>

                {/* Neon Green Flashing Badge: "CRON: Every 5 Mins" specified in prompt */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/50 text-xs font-mono font-bold text-[#10B981] shadow-lg shadow-[#10B981]/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>CRON: Every 5 Mins</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#8F94A6] mt-4 leading-relaxed font-sans">
                Automated continuous data pipeline built with Apache Airflow, MySQL, and vectorized Python. Extracts delta records, enforces strict schema assertions, transforms data in-memory, and exports sanitized flat CSV files.
              </p>

              {/* Animated visual loop: MySQL transferring streams to CSV */}
              <div className="mt-5 p-4 rounded-2xl bg-[#0D0E15] border border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-white">
                  <Database className="w-4 h-4 text-[#EF4444]" />
                  <span>MySQL DB (Source)</span>
                </div>

                <div className="flex items-center gap-1 text-[#F59E0B]">
                  <ArrowRightLeft className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] hidden sm:inline">Stream Delta</span>
                </div>

                <div className="flex items-center gap-2 text-[#10B981]">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Clean CSV (Target)</span>
                </div>
              </div>

              {/* Live DAG Task Execution Flow Loop */}
              <div className="mt-4 space-y-2 font-mono text-xs">
                {dagTasks.map((task, idx) => {
                  const isActive = dagStep === idx;
                  const isDone = dagStep > idx;

                  return (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-[#181A28] border-[#EF4444] text-white font-bold shadow-glow-crimson'
                          : isDone
                          ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                          : 'bg-[#0D0E15] border-white/5 text-[#6B7280]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isActive ? (
                          <RotateCw className="w-4 h-4 text-[#EF4444] animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-white/20 inline-block" />
                        )}
                        <span className="truncate">{task.name}</span>
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-mono">{task.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Live Ingestion Stats */}
              <div className="mt-4 p-3 rounded-xl bg-[#0D0E15] border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8F94A6]">Processed Delta Records:</span>
                <span className="text-[#EF4444] font-bold">{processedRows.toLocaleString()} rows</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setDagRunning(!dagRunning)}
                className="text-xs font-mono text-[#EF4444] hover:underline"
              >
                {dagRunning ? "Pause Simulation" : "Resume Simulation"}
              </button>

              <button
                onClick={() => openProjectModal('airflow-etl-pipeline')}
                className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#EF4444] transition-colors"
              >
                <span>Inspect Pipeline DAG</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: AI Smart Traffic Signal Control & Helmet Vision (Spans 5 cols on LG) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5 rounded-3xl bg-[#13141F] border border-white/10 hover:border-[#F59E0B]/50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#F59E0B] uppercase font-bold tracking-wider">
                      Computer Vision // Edge IoT
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      AI Smart Traffic Signal Control
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#8F94A6] mt-4 leading-relaxed font-sans">
                Abstract UI container visualizing real-time object detection tracking. Signal stays locked on RED until safety compliance is confirmed by YOLO model.
              </p>

              {/* Minimalist Video-Feed UI Container */}
              <div className="mt-5 p-3.5 rounded-2xl bg-[#0D0E15] border border-white/10 flex flex-col gap-3">
                <div className="relative w-full h-36 rounded-xl bg-black/80 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-2">
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-[9px] font-mono text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    CAM_01 // 30 FPS
                  </div>

                  {/* Bounding Box Visualizer */}
                  <div
                    className={`w-36 h-20 rounded-lg border-2 ${
                      hasHelmet
                        ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
                        : 'border-red-500 bg-red-500/15 text-red-400'
                    } flex flex-col items-center justify-center transition-all`}
                  >
                    <span className="text-[10px] font-mono font-bold">
                      {hasHelmet ? 'HELMET_CONFIRMED' : 'NO_HELMET_FLAG'}
                    </span>
                    <span className="text-[9px] font-mono opacity-80">
                      Conf: {confidence}% | 28ms
                    </span>
                  </div>

                  <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#8F94A6]">
                    PyTorch YOLO Model
                  </span>
                </div>

                {/* IoT Traffic Light Hardware Controller */}
                <div className="p-3 rounded-xl bg-[#181A28] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10">
                      <span
                        className={`w-4 h-4 rounded-full transition-all ${
                          signalColor === 'RED'
                            ? 'bg-red-500 shadow-glow-sm shadow-red-500'
                            : 'bg-red-950/40 opacity-40'
                        }`}
                      />
                      <span
                        className={`w-4 h-4 rounded-full transition-all ${
                          signalColor === 'GREEN'
                            ? 'bg-[#10B981] shadow-glow-sm shadow-[#10B981]'
                            : 'bg-emerald-950/40 opacity-40'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold ${
                        signalColor === 'GREEN' ? 'text-[#10B981]' : 'text-red-400'
                      }`}
                    >
                      {signalColor === 'GREEN' ? 'PASS // RELAY_OPEN' : 'HOLD // RELAY_LOCK'}
                    </span>
                  </div>

                  <button
                    onClick={handleToggleHelmet}
                    className="px-3 py-1.5 rounded-lg bg-[#0D0E15] hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-all"
                  >
                    {hasHelmet ? 'Remove Helmet' : 'Wear Helmet'}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#8F94A6]">98.4% Precision Model</span>
              <button
                onClick={() => openProjectModal('ai-smart-traffic-helmet-iot')}
                className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#F59E0B] transition-colors"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: IoT Smart Parking System (Spans 6 cols on LG) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-6 rounded-3xl bg-[#13141F] border border-white/10 hover:border-[#8B5CF6]/50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#8B5CF6] uppercase font-bold tracking-wider">
                      IoT Sensor Matrix
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      IoT-Based Smart Car Parking System
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#8F94A6] mt-3 leading-relaxed font-sans">
                Stylized matrix of grid cells showing real-time parking spot occupancy tracking utilizing ultrasonic sensor states and nearest-neighbor machine learning.
              </p>

              {/* Stylized Matrix of Grid Cells */}
              <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => toggleSlot(slot.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      slot.occupied
                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                        : slot.recommended
                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] ring-2 ring-[#10B981]/40 animate-pulse'
                        : 'bg-[#181A28] border-white/10 text-[#8F94A6] hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{slot.id}</span>
                    <span className="text-[9px] uppercase font-mono mt-1">
                      {slot.occupied ? 'Occupied' : 'Vacant'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8F94A6]">
              <span>Click slot to toggle sensor</span>
              <button
                onClick={() => openProjectModal('iot-smart-car-parking')}
                className="text-white hover:text-[#8B5CF6] flex items-center gap-1 font-bold"
              >
                <span>Full System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 4: Housing ETL & System Telemetry (Spans 6 cols on LG) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-6 rounded-3xl bg-[#13141F] border border-white/10 hover:border-[#EF4444]/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <Table className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#8F94A6] uppercase font-bold tracking-wider">
                      Applied Data Engineering
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Housing Market ETL &amp; OS Telemetry
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div
                  onClick={() => openProjectModal('housing-market-etl')}
                  className="p-3.5 rounded-2xl bg-[#0D0E15] border border-white/10 hover:border-[#EF4444]/40 cursor-pointer transition-all"
                >
                  <span className="text-[10px] font-mono text-[#EF4444] uppercase font-bold">Housing ETL</span>
                  <p className="text-xs text-white font-bold mt-1">Python + SQL Data Cleansing</p>
                  <p className="text-[11px] text-[#8F94A6] mt-1 leading-relaxed">
                    Automated transformation pipeline loading structured real estate datasets.
                  </p>
                </div>

                <div
                  onClick={() => openProjectModal('window-info-collector')}
                  className="p-3.5 rounded-2xl bg-[#0D0E15] border border-white/10 hover:border-[#F59E0B]/40 cursor-pointer transition-all"
                >
                  <span className="text-[10px] font-mono text-[#F59E0B] uppercase font-bold">OS Telemetry</span>
                  <p className="text-xs text-white font-bold mt-1">Window Info Collector</p>
                  <p className="text-[11px] text-[#8F94A6] mt-1 leading-relaxed">
                    Active application tracking and window logging utility in Python.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8F94A6]">
              <span>6 Academic Projects Implemented</span>
              <a href="#projects" className="text-[#EF4444] hover:underline flex items-center gap-1 font-bold">
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
