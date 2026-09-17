'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Sparkles, 
  ExternalLink, 
  Code2, 
  CheckCircle2,
  ArrowRight,
  Filter
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { TECH_RADAR, PROJECTS } from '@/data/portfolioData';
import { AppId } from '@/types/os';

interface TechRadarAppProps {
  onOpenApp?: (id: AppId) => void;
}

export const TechRadarApp: React.FC<TechRadarAppProps> = ({ onOpenApp }) => {
  const [selectedSkill, setSelectedSkill] = useState<string>('Python');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allSkills = TECH_RADAR.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.category }))
  );

  const categories = ['All', ...TECH_RADAR.map((c) => c.category)];

  const activeSkillObj = allSkills.find((s) => s.name.toLowerCase() === selectedSkill.toLowerCase()) || allSkills[0];

  // Find projects using the selected skill
  const matchingProjects = PROJECTS.filter((p) =>
    p.techStack.some((t) =>
      t.toLowerCase().includes(selectedSkill.toLowerCase()) ||
      selectedSkill.toLowerCase().includes(t.toLowerCase())
    )
  );

  const handleSelectSkill = (name: string) => {
    sound.playClick();
    setSelectedSkill(name);
  };

  return (
    <div className="h-full flex flex-col xl:flex-row text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm">
      {/* Left Column: Interactive Skill Node Clusters */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-400 font-mono font-bold tracking-wider">
              <Cpu className="w-5 h-5" />
              <span>INTERACTIVE ARCHITECTURE RADAR</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Click any node to filter associated project implementations
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            System architectural nodes across AI/ML pipelines, backend distributed APIs, and mobile systems.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Node Matrix Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {allSkills
            .filter((s) => selectedCategory === 'All' || s.category === selectedCategory)
            .map((skill) => {
              const isSelected = selectedSkill.toLowerCase() === skill.name.toLowerCase();
              return (
                <div
                  key={skill.name}
                  onClick={() => handleSelectSkill(skill.name)}
                  className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-102'
                      : 'bg-slate-900/50 border-white/10 hover:border-purple-500/40 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-white truncate">{skill.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        skill.level === 'Expert'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : skill.level === 'Advanced'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">{skill.description}</p>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-purple-300">
                    <span>{skill.category}</span>
                    {isSelected && <span className="text-cyan-400">● Active</span>}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Right Column: Selected Skill Details & Filtered Project Highlights */}
      <div className="w-full xl:w-96 bg-slate-950/80 border-t xl:border-t-0 xl:border-l border-white/10 p-5 flex flex-col gap-4 shrink-0">
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">Selected Technology</span>
            <span className="text-xs font-bold text-emerald-400">{activeSkillObj.level} Proficiency</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1">{activeSkillObj.name}</h3>
          <p className="text-xs text-slate-300 mt-1">{activeSkillObj.description}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Connected Projects ({matchingProjects.length})
            </span>
          </div>

          {matchingProjects.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-slate-400">
              Technology utilized across cross-cutting libraries and academic research pipelines.
            </div>
          ) : (
            <div className="space-y-3">
              {matchingProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col gap-2 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{p.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{p.subtitle}</p>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          t.toLowerCase().includes(selectedSkill.toLowerCase())
                            ? 'bg-purple-500 text-white font-bold'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {onOpenApp && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onOpenApp(p.appWindowId as AppId);
                      }}
                      className="mt-2 w-full py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Launch Interactive Sandbox</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
