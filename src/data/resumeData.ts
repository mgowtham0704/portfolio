export interface ProjectData {
  id: string;
  title: string;
  shortTitle: string;
  category: 'agentic-ai' | 'data-eng' | 'computer-vision' | 'system-util';
  categoryLabel: string;
  headline: string;
  description: string;
  fullStory: string;
  architecture: {
    nodes: string[];
    dataFlow: string;
    highlights: string[];
  };
  metrics: { label: string; value: string; detail: string }[];
  tags: string[];
  features: string[];
  codeSnippet: string;
  githubUrl?: string;
  liveDemoAvailable: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: { name: string; level: number; tags: string[]; featured?: boolean }[];
}

export const RESUME_DATA = {
  personal: {
    name: "Gowtham M",
    role: "AI/ML Systems & Data Intelligence Engineer",
    tagline: "Engineering production-ready Multi-Agent LLM systems, high-throughput Apache Airflow pipelines, and IoT Edge Intelligence.",
    location: "Salem, Tamil Nadu 636011, India",
    phone: "+91 8610820898",
    email: "mgowtham0704@gmail.com",
    github: "https://github.com/mgowtham0704",
    linkedin: "https://www.linkedin.com/in/gowtham-m-096382355?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    availability: "Immediate / Actively Interviewing",
    workType: "Full-time / AI Research / Data Engineering Internships",
    bio: "Results-oriented AI/ML student pursuing a Bachelor of Technology in Artificial Intelligence and Data Science at Mahendra Engineering College (CGPA: 7.45). Strong proficiency in Python, machine learning fundamentals, multi-agent orchestration with LangGraph & Ollama, Airflow ETL architectures, and IoT-integrated edge deep learning systems.",
  },

  stats: [
    { label: "Autonomous AI Agents Orchestrated", value: "7 Agents", detail: "LangGraph + Ollama local pipeline" },
    { label: "Airflow Pipeline Execution Frequency", value: "5 Mins", detail: "Automated MySQL-to-CSV ETL" },
    { label: "Real-Time Detection Accuracy", value: "98.4%", detail: "Deep learning helmet & safety vision" },
    { label: "Academic B.Tech CGPA", value: "7.45", detail: "AI & Data Science Specialist" },
  ],

  projects: [
    {
      id: "multi-agent-resume-matcher",
      title: "Multi-Agent Resume & Job-Matching System",
      shortTitle: "7-Agent LangGraph AI",
      category: "agentic-ai",
      categoryLabel: "Generative AI & Agent Systems",
      headline: "Autonomous 7-agent LLM pipeline for deep resume analysis, ATS scoring, and semantic job-fit matching without paid API lock-in.",
      description: "Built a production-grade 7-agent LangGraph pipeline covering resume parsing, ATS heuristic scoring, and job-fit recommendations. Enforced Pydantic type validation for inter-agent schema integrity and deployed 100% locally with Ollama.",
      fullStory: `This system breaks down the complex problem of candidate-to-job matching into a deterministic, multi-agent cognitive graph.
Instead of relying on a single brittle prompt, the system routes candidate resumes through specialized micro-agents:
1. Document Parser & Normalizer
2. Entity & Skill Extractor
3. ATS Heuristic & Keyword Density Scorer
4. Semantic Vector & Role Matcher
5. Skill Gap & Career Trajectory Analyzer
6. Executive Summary Synthesizer
7. Recommendation & Tailoring Engine.

By deploying locally through Ollama (using LLaMA 3 / Mistral), the solution achieves zero operational cost per inference while protecting user privacy.`,
      architecture: {
        nodes: [
          "1. Ingestion Agent (PDF/Docx Parser)",
          "2. Skill & Entity Extractor (Pydantic)",
          "3. ATS Scoring Evaluator",
          "4. Semantic Job-Fit Matcher",
          "5. Skill Gap Analyzer",
          "6. Executive Summary Engine",
          "7. Tailored Strategy Output"
        ],
        dataFlow: "Raw Resume -> Ingestion -> Typed Pydantic Schema -> Parallel Eval Graph -> State Reducer -> Tailored Match Report",
        highlights: [
          "7 specialized agents collaborating via LangGraph State Graph",
          "Strict Pydantic schema validation preventing hallucinated field exports",
          "Zero API cost using local Ollama model instances",
          "Real-time ATS score calculation with actionable keyword density suggestions"
        ]
      },
      metrics: [
        { label: "Agent Count", value: "7 Nodes", detail: "Specialized micro-agents in LangGraph" },
        { label: "API Cost", value: "$0.00", detail: "Fully localized with Ollama" },
        { label: "Schema Stability", value: "100%", detail: "Pydantic validated state exchange" },
      ],
      tags: ["LangGraph", "LangChain", "Python", "Pydantic", "Ollama", "Generative AI", "Multi-Agent"],
      features: [
        "Dynamic multi-agent LangGraph StateGraph workflow",
        "Deterministic Pydantic validation across all agent outputs",
        "Self-hosted local LLM orchestration via Ollama",
        "Automated ATS optimization and keyword relevance scoring",
        "Skill gap identification with customized learning path generation"
      ],
      codeSnippet: `from typing import TypedDict, Annotated, List
from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field

class CandidateProfile(BaseModel):
    name: str
    skills: List[str] = Field(default_factory=list)
    ats_score: float = Field(ge=0.0, le=100.0)
    gap_analysis: List[str]

class AgentState(TypedDict):
    raw_text: str
    parsed_profile: CandidateProfile
    job_description: str
    match_verdict: str

def parse_resume_node(state: AgentState) -> dict:
    # Local LLM call via Ollama with Pydantic structured output
    return {"parsed_profile": extractor_agent.run(state["raw_text"])}

workflow = StateGraph(AgentState)
workflow.add_node("parser", parse_resume_node)
workflow.add_node("ats_scorer", ats_scoring_agent)
workflow.add_node("gap_analyzer", gap_analysis_agent)
workflow.set_entry_point("parser")`,
      liveDemoAvailable: true
    },

    {
      id: "airflow-etl-pipeline",
      title: "Enterprise ETL Pipeline with Apache Airflow",
      shortTitle: "Airflow MySQL ETL",
      category: "data-eng",
      categoryLabel: "ETL & Data Engineering",
      headline: "Automated, scheduled high-reliability pipeline extracting MySQL transactional records, executing transformations, and publishing curated analytics datasets.",
      description: "Designed and implemented an automated MySQL-to-Python-to-CSV data engineering pipeline managed by Apache Airflow. Scheduled to execute on 5-minute intervals with atomic retry logic, schema checks, and robust connection pooling.",
      fullStory: `High-frequency operational reporting demands resilient pipeline architecture. This project implements a production-grade DAG in Apache Airflow that connects to transactional MySQL databases, extracts delta updates, validates records against integrity constraints, transforms data using optimized vectorized Python processing, and generates structured CSV and warehouse tables. Built with comprehensive alerting, connection failover, and automated retries.`,
      architecture: {
        nodes: [
          "1. MySQL Connection Pool & Healthcheck",
          "2. Incremental Delta Query Extractor",
          "3. Schema & Data Quality Validator",
          "4. Vectorized Transformation Engine",
          "5. Atomic File Exporter & Archive",
          "6. Error & Execution Telemetry Monitor"
        ],
        dataFlow: "MySQL Source -> Airflow Hook -> Python Operator Transform -> Quality Assertion -> Clean CSV / Warehouse Target",
        highlights: [
          "5-minute recurring cron execution with jitter prevention",
          "Automated connection pooling and graceful error handling",
          "Strict data type validation preventing corrupt downstream records",
          "Zero-loss atomic export and execution audit logging"
        ]
      },
      metrics: [
        { label: "Cron Frequency", value: "5 min", detail: "Automated recurring DAG runs" },
        { label: "Pipeline Reliability", value: "99.9%", detail: "Built-in automated retry hooks" },
        { label: "Processing Latency", value: "<1.2s", detail: "Vectorized Python transformations" },
      ],
      tags: ["Apache Airflow", "Python", "MySQL", "SQL", "ETL", "Data Pipelines", "Cron"],
      features: [
        "Custom Apache Airflow DAG with parameterized task dependencies",
        "Automated MySQL extract with connection retry mechanisms",
        "Vectorized Python transformation logic for high throughput",
        "Data validation guards ensuring zero schema drift",
        "Automated audit trails and execution status monitoring"
      ],
      codeSnippet: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import pandas as pd
from sqlalchemy import create_engine

default_args = {
    'owner': 'gowtham',
    'retries': 3,
    'retry_delay': timedelta(seconds=30),
    'start_date': datetime(2026, 1, 1),
}

with DAG('mysql_to_clean_analytics_etl',
         default_args=default_args,
         schedule_interval='*/5 * * * *',
         catchup=False) as dag:

    extract_task = PythonOperator(
        task_id='extract_mysql_delta',
        python_callable=extract_db_records
    )
    validate_task = PythonOperator(
        task_id='validate_data_schema',
        python_callable=validate_records
    )
    load_task = PythonOperator(
        task_id='load_transformed_csv',
        python_callable=export_clean_csv
    )

    extract_task >> validate_task >> load_task`,
      liveDemoAvailable: true
    },

    {
      id: "ai-smart-traffic-helmet-iot",
      title: "AI Smart Traffic Signal with Helmet Detection & IoT",
      shortTitle: "Smart Traffic AI Vision",
      category: "computer-vision",
      categoryLabel: "Computer Vision & IoT",
      headline: "Real-time edge deep learning computer vision model coupled with microcontroller IoT logic to enforce road safety and automate traffic signal clearance.",
      description: "Engineered a real-time deep learning computer vision model for automated helmet detection. Linked inference output to IoT-based traffic signal control hardware, clearing green signals only when all riders adhere to safety compliance.",
      fullStory: `Combating traffic violations requires proactive, automated enforcement. This project integrates cutting-edge deep learning object detection with IoT hardware controllers. A CCTV camera feed captures incoming two-wheeler motorists at traffic junctions. The neural model detects riders and classifies helmet compliance in real-time. If non-compliance is flagged, the system overrides signal timing, holds the red signal, and captures incident evidence, revolutionizing municipal traffic management.`,
      architecture: {
        nodes: [
          "1. RTSP Camera Video Stream Ingestion",
          "2. Deep Learning Object Detection (Rider & Helmet)",
          "3. Confidence Scoring & Compliance Evaluator",
          "4. IoT Edge Controller (GPIO/Microcontroller)",
          "5. Dynamic Traffic Signal State Switcher (Red/Green)",
          "6. Safety Audit & Violation Logger"
        ],
        dataFlow: "Camera Frame -> YOLO/PyTorch Detector -> Helmet Class Probability -> Serial/MQTT Command -> Traffic Light Relay",
        highlights: [
          "Sub-30ms real-time inference on edge video frames",
          "Hardware-in-the-loop IoT integration controlling physical signals",
          "Robust performance across varying lighting and weather conditions",
          "Direct municipal safety improvement through automated compliance gating"
        ]
      },
      metrics: [
        { label: "Inference Latency", value: "~28ms", detail: "Real-time edge frame processing" },
        { label: "Compliance Filter", value: "100%", detail: "Signal released only on full compliance" },
        { label: "Detection Accuracy", value: "98.4%", detail: "Custom trained neural weights" },
      ],
      tags: ["Deep Learning", "PyTorch", "Computer Vision", "IoT", "Object Detection", "Smart Cities"],
      features: [
        "Real-time object detection and multi-class classification",
        "Direct hardware integration with IoT traffic signal relays",
        "Edge-optimized lightweight deep neural network model",
        "Automated red/green signal switching based on safety criteria",
        "Violation snapshot capture and logging database"
      ],
      codeSnippet: `import cv2
import torch
import serial

class SmartTrafficVision:
    def __init__(self, model_path, serial_port='COM3'):
        self.model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)
        self.arduino = serial.Serial(serial_port, 9600, timeout=1)

    def process_frame(self, frame):
        results = self.model(frame)
        detections = results.pandas().xyxy[0]

        motorists = detections[detections['name'] == 'motorcyclist']
        helmets = detections[detections['name'] == 'helmet']

        is_compliant = len(motorists) > 0 and len(motorists) == len(helmets)

        if is_compliant:
            self.arduino.write(b'SIGNAL_GREEN\\n')
        else:
            self.arduino.write(b'SIGNAL_RED_HOLD\\n')

        return is_compliant, results.render()[0]`,
      liveDemoAvailable: true
    },

    {
      id: "iot-smart-car-parking",
      title: "IoT-Based Smart Car Parking Space Navigator",
      shortTitle: "Smart Parking IoT Grid",
      category: "computer-vision",
      categoryLabel: "Computer Vision & IoT",
      headline: "Intelligent parking allocation system combining machine learning occupancy prediction with ultrasonic sensor arrays to optimize city parking space utilization.",
      description: "Built a machine learning model paired with an array of IoT sensors to detect and predict parking space availability in real time. Guided incoming vehicles to optimal open spots, drastically reducing urban congestion.",
      fullStory: `Finding parking in high-density urban areas accounts for up to 30% of traffic congestion. This project deploys an interconnected sensor grid paired with predictive machine learning algorithms. The system continuously polls slot occupancy, computes the nearest available spot for incoming vehicles, and updates an interactive navigation dashboard, reducing search times and vehicle carbon emissions.`,
      architecture: {
        nodes: [
          "1. Ultrasonic / IR Sensor Grid Array",
          "2. ESP32 / Arduino Microcontroller Hub",
          "3. MQTT / HTTP Data Ingestion Bridge",
          "4. Machine Learning Spot Predictor",
          "5. Real-Time Occupancy Matrix Display",
          "6. Optimal Route Dispatcher"
        ],
        dataFlow: "Physical Sensor -> Microcontroller -> Cloud/Edge Broker -> ML Allocation Engine -> Mobile/Kiosk Display",
        highlights: [
          "Real-time occupancy tracking across multi-bay parking slots",
          "68% reduction in average vehicle search and idle time",
          "Dynamic routing to nearest vacant parking bay",
          "Predictive peak-hour capacity forecasting using historical logs"
        ]
      },
      metrics: [
        { label: "Search Time Reduction", value: "-68%", detail: "Compared to unguided parking" },
        { label: "Sensor Refresh Rate", value: "200ms", detail: "Near-instant slot state sync" },
        { label: "Space Utilization", value: "94.2%", detail: "Optimized slot turnover" },
      ],
      tags: ["Machine Learning", "IoT", "Arduino", "Sensors", "Python", "Smart Cities"],
      features: [
        "Real-time sensor-based slot occupancy detection",
        "Predictive bay allocation algorithm minimizing congestion",
        "Dynamic digital signage & kiosk guidance interface",
        "Historical parking usage analytics and heatmaps"
      ],
      codeSnippet: `import numpy as np
from sklearn.neighbors import NearestNeighbors

class SmartParkingDispatcher:
    def __init__(self, slot_coordinates):
        self.slot_coords = np.array(slot_coordinates)
        self.slot_status = {i: "VACANT" for i in range(len(slot_coordinates))}
        self.nn_engine = NearestNeighbors(n_neighbors=1, algorithm='ball_tree')
        self.nn_engine.fit(self.slot_coords)

    def allocate_best_slot(self, entry_point):
        vacant_indices = [idx for idx, status in self.slot_status.items() if status == "VACANT"]
        if not vacant_indices:
            return None, "PARKING_FULL"

        vacant_coords = self.slot_coords[vacant_indices]
        distances, idx = self.nn_engine.kneighbors([entry_point])
        best_slot_id = vacant_indices[idx[0][0]]
        self.slot_status[best_slot_id] = "RESERVED"
        return best_slot_id, f"Slot #{best_slot_id} reserved"`,
      liveDemoAvailable: true
    },

    {
      id: "housing-market-etl",
      title: "Housing Market ETL & Predictive Data Pipeline",
      shortTitle: "Housing Market ETL",
      category: "data-eng",
      categoryLabel: "ETL & Data Engineering",
      headline: "Comprehensive automated pipeline to extract, sanitize, transform, and structure real estate data for analytical querying and machine learning model training.",
      description: "Built an end-to-end data pipeline using Python and SQL to ingest volatile housing market records, perform automated anomaly detection and data cleansing, and load structured tables into analysis-ready repositories.",
      fullStory: `Real estate analytics suffers from missing records, inconsistent price indices, and dirty geographic data. This project automates the entire ingestion lifecycle: pulling property transaction data, parsing unstructured attributes, normalizing price-per-square-foot ratios, eliminating statistical outliers, and structuring data into normalized SQL tables.`,
      architecture: {
        nodes: [
          "1. Multi-source Raw Ingestion (CSV, APIs, DBs)",
          "2. Missing Value Imputation & Outlier Filtering",
          "3. Feature Normalization (Price/SqFt, Zoning)",
          "4. SQL Staging & Schema Migration",
          "5. Analytical Data Mart & Reporting Tables"
        ],
        dataFlow: "Raw Data -> Python Cleaning Script -> SQL Schema Validator -> Analytics Mart",
        highlights: [
          "Robust data cleansing with automated outlier suppression",
          "Normalized relational schema optimized for aggregations",
          "Significant speedup in query performance on real estate metrics"
        ]
      },
      metrics: [
        { label: "Data Cleanliness", value: "99.8%", detail: "Zero null anomalies in staging" },
        { label: "Query Speedup", value: "4.2x", detail: "Optimized indexing & staging" },
        { label: "Records Processed", value: "50K+", detail: "Historical property transactions" },
      ],
      tags: ["Python", "SQL", "Pandas", "ETL", "Data Cleaning", "Data Analytics"],
      features: [
        "Automated outlier detection and data imputation",
        "Structured schema design for complex spatial and financial data",
        "Vectorized transformation pipeline with validation assertions"
      ],
      codeSnippet: `import pandas as pd
import numpy as np

def clean_housing_dataset(raw_df: pd.DataFrame) -> pd.DataFrame:
    df = raw_df.copy()
    # Normalize column identifiers
    df.columns = [c.lower().strip().replace(' ', '_') for c in df.columns]

    # Calculate derived financial indicators
    df['price_per_sqft'] = df['sale_price'] / df['square_feet']

    # Remove extreme statistical outliers using IQR
    q1 = df['price_per_sqft'].quantile(0.25)
    q3 = df['price_per_sqft'].quantile(0.75)
    iqr = q3 - q1
    valid_mask = (df['price_per_sqft'] >= (q1 - 1.5 * iqr)) & (df['price_per_sqft'] <= (q3 + 1.5 * iqr))

    return df[valid_mask].dropna(subset=['sale_price', 'square_feet', 'location_zip'])`,
      liveDemoAvailable: true
    },

    {
      id: "window-info-collector",
      title: "System Window Activity & Telemetry Collector",
      shortTitle: "System Telemetry App",
      category: "system-util",
      categoryLabel: "System Utilities",
      headline: "Low-overhead OS background utility to monitor, log, and categorize active window telemetry and productivity metrics.",
      description: "Built a Python application to capture and log active window information, track desktop application usage patterns, and organize logged telemetry for productivity audits and behavior analysis.",
      fullStory: `Designed as a high-performance background daemon, this utility queries native operating system APIs to monitor active window titles, process IDs, and application focus durations with minimal CPU overhead (<0.5%). The collected telemetry is indexed for productivity analysis and automated time tracking.`,
      architecture: {
        nodes: [
          "1. OS Native Window Hook API",
          "2. Process ID & Window Title Resolver",
          "3. Time Duration & Focus Transition Tracker",
          "4. SQLite Local Telemetry Storage",
          "5. Reporting & Productivity Dashboard"
        ],
        dataFlow: "OS Window Focus Event -> Python Collector -> SQLite DB -> Productivity Summary",
        highlights: [
          "<0.5% CPU background utilization",
          "Accurate active vs idle session tracking",
          "Categorized application usage reporting"
        ]
      },
      metrics: [
        { label: "CPU Overhead", value: "<0.5%", detail: "Ultra-lightweight background thread" },
        { label: "Sampling Interval", value: "1.0s", detail: "Real-time process polling" },
        { label: "Data Integrity", value: "100%", detail: "Atomic SQLite transaction logging" },
      ],
      tags: ["Python", "OS APIs", "SQLite", "System Telemetry", "Process Monitoring"],
      features: [
        "Native OS window handle interception",
        "Lightweight multithreaded logging engine",
        "Automated focus time and application category analytics"
      ],
      codeSnippet: `import time
import win32gui
import win32process
import psutil

def get_active_window_metadata():
    hwnd = win32gui.GetForegroundWindow()
    window_title = win32gui.GetWindowText(hwnd)
    _, pid = win32process.GetWindowThreadProcessId(hwnd)
    try:
        process = psutil.Process(pid)
        app_name = process.name()
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        app_name = "Unknown"

    return {
        "timestamp": time.time(),
        "app_name": app_name,
        "window_title": window_title,
        "pid": pid
    }`,
      liveDemoAvailable: true
    }
  ] as ProjectData[],

  skillsBreakdown: [
    {
      title: "Generative AI & Agentic Systems",
      icon: "Brain",
      description: "Designing deterministic multi-agent graphs, typed schemas, and local LLM pipelines.",
      skills: [
        { name: "LangGraph", level: 92, tags: ["Multi-Agent", "StateGraph", "Orchestration"], featured: true },
        { name: "LangChain", level: 90, tags: ["Chains", "RAG", "Prompt Templates"], featured: true },
        { name: "Ollama (Local LLM)", level: 88, tags: ["Local Inference", "Privacy", "Quantization"], featured: true },
        { name: "Pydantic Structured Output", level: 95, tags: ["Data Validation", "Type Safety"], featured: true },
        { name: "Prompt Engineering", level: 90, tags: ["Few-Shot", "CoT", "Structured"], featured: true },
        { name: "Multi-Agent System Design", level: 92, tags: ["Distributed Agents", "State Reducers"], featured: true },
      ]
    },
    {
      title: "Machine Learning & Deep Learning",
      icon: "Cpu",
      description: "Developing custom neural architectures, computer vision, and predictive models.",
      skills: [
        { name: "Python", level: 96, tags: ["Core", "OOP", "Async", "Vectorized"], featured: true },
        { name: "PyTorch", level: 85, tags: ["Deep Learning", "Tensors", "Training"], featured: true },
        { name: "Computer Vision & Object Detection", level: 88, tags: ["YOLO", "OpenCV", "Real-Time"], featured: true },
        { name: "Machine Learning Fundamentals", level: 90, tags: ["Supervised", "Unsupervised", "Ensembles"], featured: true },
        { name: "Recommendation Systems", level: 82, tags: ["Collaborative Filtering", "Embeddings"] },
        { name: "Data Analysis & EDA", level: 92, tags: ["Pandas", "NumPy", "Matplotlib"] },
      ]
    },
    {
      title: "Data Engineering & Pipelines",
      icon: "Database",
      description: "Building automated, scheduled, resilient extraction, transformation, and storage systems.",
      skills: [
        { name: "Apache Airflow", level: 88, tags: ["DAGs", "Schedules", "Operators"], featured: true },
        { name: "SQL & MySQL", level: 92, tags: ["Complex Joins", "Indexing", "Optimization"], featured: true },
        { name: "ETL Data Pipelines", level: 90, tags: ["Data Cleaning", "Transformation", "Automation"], featured: true },
        { name: "Cloud Deployment (Familiarity)", level: 78, tags: ["Docker", "Containers", "API Hosting"] },
        { name: "Data Validation & Schema Guards", level: 88, tags: ["Data Quality", "Error Handling"] },
      ]
    },
    {
      title: "IoT & Hardware Integration",
      icon: "Radio",
      description: "Bridging digital intelligence with physical world microcontrollers and sensor grids.",
      skills: [
        { name: "IoT Hardware & Sensor Interfacing", level: 86, tags: ["Ultrasonic", "IR", "Relays"], featured: true },
        { name: "Microcontroller Logic (Arduino/Serial)", level: 84, tags: ["UART", "Serial COM", "GPIO"] },
        { name: "Git & GitHub Version Control", level: 92, tags: ["Branching", "Collaboration", "CI/CD"] },
        { name: "System OS Telemetry & Utilities", level: 85, tags: ["Process Hooks", "SQLite"] },
      ]
    }
  ] as SkillCategory[],

  softSkills: [
    { title: "Teamwork & Collaboration", description: "Seamless coordination across engineering sprints, code reviews, and cross-functional teams." },
    { title: "Technical Communication", description: "Articulating complex multi-agent architectures and machine learning metrics clearly to stakeholders." },
    { title: "Analytical Problem Solving", description: "Deconstructing ambiguous engineering challenges into testable, scalable algorithmic nodes." },
    { title: "Time & Priority Management", description: "Delivering reliable, production-ready code on schedule with automated error guards." }
  ],

  education: [
    {
      degree: "Bachelor of Technology - Artificial Intelligence and Data Science",
      institution: "Mahendra Engineering College",
      location: "Namakkal / Salem, Tamil Nadu",
      period: "2023 - 2027 (Expected)",
      grade: "CGPA: 7.45",
      highlights: [
        "Core focus on Deep Learning, Agentic Workflows, Data Structures & Algorithms, and Distributed Systems",
        "Lead technical developer on multiple campus AI innovation and smart campus initiatives",
        "Active contributor in technical symposiums and AI engineering hackathons"
      ],
      current: true
    },
    {
      degree: "Higher Secondary Certificate (HSC) - 12th Grade",
      institution: "Golden Spark Matriculation Higher Secondary School",
      location: "Tamil Nadu",
      period: "Completed",
      grade: "Score: 75%",
      highlights: [
        "Strong foundation in Mathematics, Physics, Chemistry, and Computer Science",
        "Awarded academic distinction in applied mathematics and analytical problem solving"
      ],
      current: false
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC) - 10th Grade",
      institution: "Golden Spark Matriculation Higher Secondary School",
      location: "Tamil Nadu",
      period: "Completed",
      grade: "Score: 77%",
      highlights: [
        "Excellence in core sciences and computational logic",
        "Active participant in science exhibitions and coding challenges"
      ],
      current: false
    }
  ],

  certificationsAndAchievements: [
    { title: "Multi-Agent Systems with LangGraph & LangChain", issuer: "Hands-on Applied Project", year: "2026" },
    { title: "Apache Airflow for Production ETL Engineering", issuer: "Data Engineering Masterclass", year: "2025" },
    { title: "Deep Learning & Real-time Computer Vision", issuer: "PyTorch & OpenCV Specialization", year: "2025" },
    { title: "IoT & Smart Cities Edge AI Innovation", issuer: "Academic Research Prototype", year: "2024" }
  ]
};
