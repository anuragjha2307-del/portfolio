'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sliders, 
  Sparkles, 
  Copy, 
  Briefcase, 
  GraduationCap, 
  FolderGit2
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { PERSONAL_INFO, ATS_PROFILES, EDUCATION, WORK_EXPERIENCES, PROJECTS } from '@/data/portfolioData';

export const ResumeStudioApp: React.FC = () => {
  const [selectedRoleKey, setSelectedRoleKey] = useState<'ai_engineer' | 'full_stack' | 'mobile_dev'>('ai_engineer');
  const [copied, setCopied] = useState(false);

  const activeProfile = ATS_PROFILES[selectedRoleKey];

  const handleRoleChange = (key: 'ai_engineer' | 'full_stack' | 'mobile_dev') => {
    sound.playClick();
    setSelectedRoleKey(key);
  };

  const handlePrint = () => {
    sound.playSuccess();
    window.print();
  };

  const handleCopyText = () => {
    const text = `
ANURAG JHA
Greater Noida, UP, India • +91 8595648167 • ajha5678910@gmail.com
LinkedIn: linkedin.com/in/anurag-jha-379520257 • GitHub: github.com/anuragjha2307-del

OBJECTIVE / TARGET ROLE: ${activeProfile.label}
${activeProfile.summary}

CORE TECHNICAL SKILLS (${activeProfile.label} Profile)
${activeProfile.topSkills.join(' • ')}

EDUCATION
- Galgotias University — Master of Computer Applications (MCA) | 2025 – 2027
  Academic Standing: First Class with Distinction (Zero active backlogs)
  Relevant Coursework: Advanced DSA, Machine Learning, Deep Learning, DBMS, OOP
- DPGITM — Bachelor of Computer Applications (BCA) | 2022 – 2025
  Academic Standing: First Class with Distinction (>60% aggregate)

WORK EXPERIENCE
EduSkills Academy — Machine Learning & Data Science Intern (June 2026 – August 2026)
- Architected automated data pipelines using Python and SQL for preprocessing, reducing data processing time by 40%.
- Engineered and deployed predictive machine learning models via Flask REST APIs, sustaining 90% satisfaction.
- Conducted hyperparameter tuning on NLP/sentiment datasets, enhancing classification reliability by 25%.
- Built interactive dashboards in Power BI and Python translating analytical findings into business insights.

KEY PROJECTS
1. Smart Presence — AI Biometric & Geofenced Verification Platform (Python, OpenCV, Flask, Haversine)
- Biometric verification pipeline with OpenCV Deep Learning face embeddings eliminating proxy attendance.
- Dual-verification combining dynamic TOTP generation with Haversine GPS geofencing.
- REST APIs for sub-second real-time inference and automated scheduled CSV report generation.

2. AI Research Assistant Suite — NLP Document Intelligence System (Python, PyTorch, PyPDF, Streamlit, CI/CD)
- NLP document intelligence supporting literature exploration, summarization, and contextual Q&A.
- Parsing pipeline via PyPDF processing papers into structured IEEE-format LaTeX outputs.
- Production deployment on Streamlit Cloud with GitHub Actions CI/CD.

3. Spark Dating App — High-Performance Mobile Platform (React Native, Expo, Redux Toolkit, Reanimated)
- 60 FPS gesture-driven card matchmaking with real-time push architecture and instant APK builds.
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col xl:flex-row text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm">
      {/* Left Role Switcher Controls Sidebar */}
      <div className="w-full xl:w-84 bg-slate-950/80 border-b xl:border-b-0 xl:border-r border-white/10 p-5 flex flex-col gap-4 shrink-0 no-print">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>ATS ROLE TAILOR</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Choose your hiring focus to dynamically re-order resume bullet points and ATS keywords.
          </p>
        </div>

        {/* Role Selector Buttons */}
        <div className="space-y-2">
          {(Object.keys(ATS_PROFILES) as Array<keyof typeof ATS_PROFILES>).map((key) => {
            const prof = ATS_PROFILES[key];
            const isSelected = selectedRoleKey === key;
            return (
              <button
                key={key}
                onClick={() => handleRoleChange(key)}
                className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm">{prof.label}</span>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">
                      ACTIVE ATS
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{prof.headline}</p>
              </button>
            );
          })}
        </div>

        {/* ATS Match Score Simulation */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">ATS Keyword Match</span>
            <span className="text-xs font-mono font-bold text-emerald-400">98.5% Match</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 w-[98%]"></div>
          </div>
          <div className="text-[10px] text-slate-400">
            Optimized for Enterprise ATS scanners (Workday, Greenhouse, Lever).
          </div>
        </div>

        {/* Actions: Print and Copy */}
        <div className="mt-auto pt-3 border-t border-white/10 space-y-2">
          <button
            onClick={handlePrint}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
          <button
            onClick={handleCopyText}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs transition cursor-pointer flex items-center justify-center gap-2"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Plaintext ATS!' : 'Copy Plaintext Resume'}</span>
          </button>
        </div>
      </div>

      {/* Right Formatted ATS Resume Document Preview */}
      <div className="flex-1 p-4 sm:p-8 bg-slate-900/40 flex justify-center overflow-y-auto">
        <div className="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 font-sans leading-relaxed border border-slate-200">
          {/* Resume Header */}
          <div className="text-center border-b border-slate-300 pb-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <div className="text-xs sm:text-sm text-slate-700 mt-1 flex flex-wrap justify-center gap-x-2 gap-y-1">
              <span>{PERSONAL_INFO.location}</span>
              <span>•</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="text-blue-700 hover:underline">{PERSONAL_INFO.phone}</a>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-700 hover:underline">{PERSONAL_INFO.email}</a>
            </div>
            <div className="text-xs text-blue-700 mt-1 flex justify-center gap-3">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                linkedin.com/in/anurag-jha-379520257
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline">
                github.com/anuragjha2307-del
              </a>
            </div>
          </div>

          {/* Role Summary Banner */}
          <div className="mb-4 bg-slate-50 border-l-4 border-amber-500 p-3 rounded-r">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-0.5">
              TARGET ROLE: {activeProfile.headline}
            </div>
            <p className="text-xs text-slate-700 leading-normal">{activeProfile.summary}</p>
          </div>

          {/* Technical Skills */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 text-slate-900">
              TECHNICAL SKILLS ({activeProfile.label} Priority)
            </h2>
            <div className="text-xs space-y-1 text-slate-800">
              <div>
                <strong>Tailored Core Stack:</strong> {activeProfile.topSkills.join(', ')}
              </div>
              <div>
                <strong>Languages:</strong> Python, Java, JavaScript, TypeScript, C, SQL (PostgreSQL, MySQL)
              </div>
              <div>
                <strong>Backend & Databases:</strong> REST APIs, Flask, MongoDB, DBMS Architecture, CI/CD Fundamentals
              </div>
              <div>
                <strong>AI, ML & Data:</strong> PyTorch, TensorFlow, Scikit-learn, OpenCV, Pandas, NumPy, Power BI
              </div>
              <div>
                <strong>Web & Developer Tools:</strong> HTML5, CSS3, Git, GitHub, Streamlit Cloud, Linux/Bash, React Native
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 text-slate-900 flex items-center justify-between">
              <span>EDUCATION</span>
            </h2>
            <div className="space-y-2 text-xs">
              {EDUCATION.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{edu.institution} — {edu.degree}</span>
                    <span>{edu.location} | {edu.period}</span>
                  </div>
                  <div className="text-slate-700 italic">{edu.standing}</div>
                  <div className="text-slate-600 text-[11px]">
                    <strong>Relevant Coursework:</strong> {edu.coursework.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 text-slate-900">
              WORK EXPERIENCE
            </h2>
            {WORK_EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.company} — {exp.role}</span>
                  <span>{exp.location} | {exp.period}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-xs">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 text-slate-900">
              PROJECTS
            </h2>
            <div className="space-y-3 text-xs">
              {PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title} — {proj.subtitle}</span>
                    <span className="font-mono text-[11px] text-slate-600">{proj.techStack.slice(0, 4).join(', ')}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 mt-1">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
