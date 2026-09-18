'use client';

import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  QrCode, 
  Cpu, 
  FileText, 
  Activity, 
  CalendarCheck,
  ArrowDown,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { AppId } from '@/types/os';
import { PERSONAL_INFO } from '@/data/portfolioData';

// Applications to embed directly in page flow
import { AIAssistantApp } from '@/components/apps/AIAssistantApp';
import { SparkMobileApp } from '@/components/apps/SparkMobileApp';
import { SmartPresenceApp } from '@/components/apps/SmartPresenceApp';
import { TechRadarApp } from '@/components/apps/TechRadarApp';
import { ResumeStudioApp } from '@/components/apps/ResumeStudioApp';
import { SystemHealthApp } from '@/components/apps/SystemHealthApp';
import { ContactApp } from '@/components/apps/ContactApp';

interface PortfolioShowcaseProps {
  onOpenApp?: (id: AppId) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onOpenApp }) => {
  return (
    <div className="relative z-10 w-full bg-slate-950 text-slate-100 flex flex-col gap-16 px-4 sm:px-8 py-12 border-t border-white/10 select-text">
      {/* Scroll Indicator Divider */}
      <div className="flex flex-col items-center justify-center text-center gap-2 mb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs animate-bounce">
          <ChevronDown className="w-3.5 h-3.5" />
          <span>SCROLLABLE PORTFOLIO SHOWCASE & LIVE SANDBOXES</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Explore Anurag Jha&apos;s Engineering Work
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          Interact with the live sandboxes directly below or use the desktop windows above.
        </p>
      </div>

      {/* 1. AI Research Assistant Suite Showcase */}
      <section id="ai-assistant-section" className="rounded-3xl border border-cyan-500/30 bg-slate-900/60 shadow-2xl overflow-hidden">
        <div className="h-600 sm:h-[640px]">
          <AIAssistantApp />
        </div>
      </section>

      {/* 2. Spark Dating App Mobile Simulator Showcase */}
      <section id="spark-mobile-section" className="rounded-3xl border border-rose-500/30 bg-slate-900/60 shadow-2xl overflow-hidden">
        <div className="h-640 sm:h-[680px]">
          <SparkMobileApp />
        </div>
      </section>

      {/* 3. Smart Presence QR & Biometrics Showcase */}
      <section id="smart-presence-section" className="rounded-3xl border border-emerald-500/30 bg-slate-900/60 shadow-2xl overflow-hidden">
        <div className="h-640 sm:h-[680px]">
          <SmartPresenceApp />
        </div>
      </section>

      {/* 4. Interactive Architecture & Tech Radar */}
      <section id="tech-radar-section" className="rounded-3xl border border-purple-500/30 bg-slate-900/60 shadow-2xl overflow-hidden">
        <div className="h-560 sm:h-[620px]">
          <TechRadarApp onOpenApp={onOpenApp} />
        </div>
      </section>

      {/* 5. Dynamic ATS Resume Studio */}
      <section id="resume-studio-section" className="rounded-3xl border border-amber-500/30 bg-slate-900/60 shadow-2xl overflow-hidden">
        <div className="h-640 sm:h-[700px]">
          <ResumeStudioApp />
        </div>
      </section>

      {/* 6. DevOps System Health & Telemetry */}
      <section id="system-health-section" className="rounded-3xl border border-green-500/30 bg-slate-900/60 shadow-2xl overflow-hidden">
        <div className="h-500 sm:h-[540px]">
          <SystemHealthApp />
        </div>
      </section>

      {/* 7. Direct WhatsApp & 15-Minute Discovery Call */}
      <section id="contact-section" className="rounded-3xl border border-sky-500/30 bg-slate-900/60 shadow-2xl overflow-hidden">
        <div className="h-540 sm:h-[580px]">
          <ContactApp />
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
        <div>
          <span className="text-white font-bold">{PERSONAL_INFO.name}</span> • {PERSONAL_INFO.title}
        </div>
        <div className="flex items-center gap-4">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
            GitHub
          </a>
          <span>•</span>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
            LinkedIn
          </a>
          <span>•</span>
          <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
            WhatsApp Direct
          </a>
        </div>
      </footer>
    </div>
  );
};
