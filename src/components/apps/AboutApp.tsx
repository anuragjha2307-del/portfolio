'use client';

import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen, 
  ExternalLink, 
  Code, 
  Sparkles,
  MapPin,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { PERSONAL_INFO, EDUCATION, WORK_EXPERIENCES } from '@/data/portfolioData';
import { AppId } from '@/types/os';

export const AboutApp: React.FC<{ onOpenApp?: (id: AppId) => void }> = ({ onOpenApp }) => {
  return (
    <div className="h-full p-5 sm:p-7 bg-slate-950/80 text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm space-y-6">
      {/* Hero Bio Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-black text-black shadow-lg shadow-cyan-500/20 shrink-0">
            AJ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">{PERSONAL_INFO.name}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                MCA Distinction
              </span>
            </div>
            <p className="text-cyan-300 text-xs sm:text-sm font-medium mt-0.5">{PERSONAL_INFO.title}</p>
            <div className="flex items-center gap-3 text-slate-400 text-xs mt-2 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {PERSONAL_INFO.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                {PERSONAL_INFO.email}
              </span>
            </div>
          </div>
        </div>

        {onOpenApp && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('resume-studio');
            }}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>Open ATS Resume Studio</span>
          </button>
        )}
      </div>

      {/* Grid: Education & Work Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Education Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 shadow-lg">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold tracking-wider">
            <GraduationCap className="w-5 h-5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="space-y-4">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                  <span className="text-[11px] font-mono text-cyan-400">{edu.period}</span>
                </div>
                <div className="text-slate-300 text-xs font-medium">{edu.institution} — {edu.location}</div>
                <div className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">
                  {edu.standing}
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong>Coursework:</strong> {edu.coursework.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold tracking-wider">
            <Briefcase className="w-5 h-5" />
            <span>WORK & INTERNSHIP EXPERIENCE</span>
          </div>

          {WORK_EXPERIENCES.map((exp, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-bold text-white text-sm">{exp.role}</h4>
                <span className="text-[11px] font-mono text-emerald-400">{exp.period}</span>
              </div>
              <div className="text-slate-300 text-xs">{exp.company} • {exp.location}</div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {exp.bullets.map((b, idx) => (
                  <li key={idx} className="leading-relaxed">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Philosophy Card */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Full-Spectrum Versatility</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Anurag bridges the gap between deep algorithmic machine learning (PyTorch, OpenCV face embeddings, NLP document summarization) and production user-facing applications (Flask REST APIs, PostgreSQL, React Native Expo mobile architecture). He delivers end-to-end solutions that are technically rigorous, secure, and delightful to experience.
        </p>
      </div>
    </div>
  );
};
