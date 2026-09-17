'use client';

import React from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  Smartphone, 
  QrCode, 
  ArrowRight, 
  ExternalLink, 
  Activity, 
  CheckCircle2
} from 'lucide-react';
import { GithubIcon } from '@/components/common/BrandIcons';
import { sound } from '@/lib/sound';
import { PROJECTS, Project } from '@/data/portfolioData';
import { AppId } from '@/types/os';

interface ProjectsHubAppProps {
  onOpenApp: (id: AppId) => void;
}

export const ProjectsHubApp: React.FC<ProjectsHubAppProps> = ({ onOpenApp }) => {
  return (
    <div className="h-full p-5 sm:p-7 bg-slate-950/80 text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm space-y-5">
      <div>
        <div className="flex items-center gap-2 text-amber-400 font-mono font-bold tracking-wider">
          <FolderGit2 className="w-5 h-5" />
          <span>PRODUCTION SYSTEMS & LIVE SANDBOXES</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Interactive sandboxes integrated directly into AnuragOS. Click any project to open its live interactive workbench.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between gap-4 shadow-xl group hover:-translate-y-1"
          >
            <div>
              {/* Top row: Status pulse & Category */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                  {proj.category}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{proj.uptime} UPTIME</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base font-bold text-white mt-3 group-hover:text-cyan-400 transition">
                {proj.title}
              </h3>
              <p className="text-xs text-cyan-300/90 font-mono mt-0.5">{proj.subtitle}</p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">{proj.tagline}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-1.5 my-3 pt-3 border-t border-white/5 font-mono text-center">
                {proj.metrics.map((m, idx) => (
                  <div key={idx} className="p-1.5 rounded bg-white/5 border border-white/5">
                    <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                    <div className="text-[11px] font-bold text-emerald-400">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1 mt-2">
                {proj.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenApp(proj.appWindowId as AppId);
                }}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Launch Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition"
                  title="View GitHub Source"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
