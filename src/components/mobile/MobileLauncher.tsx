'use client';

import React, { useState } from 'react';
import { 
  User, 
  FolderGit2, 
  Sparkles, 
  Smartphone, 
  QrCode, 
  Terminal, 
  Cpu, 
  FileText, 
  Activity, 
  CalendarCheck,
  Bot,
  MessageSquare,
  ArrowLeft,
  X,
  Share2,
  ExternalLink,
  SunMoon,
  Volume2,
  VolumeX,
  Monitor,
  CheckCircle2,
  Download,
  Flame,
  Pin
} from 'lucide-react';
import { AppId, ThemeMode } from '@/types/os';
import { sound } from '@/lib/sound';
import { PERSONAL_INFO } from '@/data/portfolioData';

// Applications to render in mobile full-screen mode
import { AboutApp } from '@/components/apps/AboutApp';
import { ProjectsHubApp } from '@/components/apps/ProjectsHubApp';
import { AIAssistantApp } from '@/components/apps/AIAssistantApp';
import { SparkMobileApp } from '@/components/apps/SparkMobileApp';
import { SmartPresenceApp } from '@/components/apps/SmartPresenceApp';
import { PortfolioCopilot } from '@/components/apps/PortfolioCopilot';
import { TerminalApp } from '@/components/apps/TerminalApp';
import { TechRadarApp } from '@/components/apps/TechRadarApp';
import { ResumeStudioApp } from '@/components/apps/ResumeStudioApp';
import { SystemHealthApp } from '@/components/apps/SystemHealthApp';
import { ContactApp } from '@/components/apps/ContactApp';

interface MobileLauncherProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onSwitchToDesktop: () => void;
}

interface MobileAppItem {
  id: AppId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  featured?: boolean;
}

export const MobileLauncher: React.FC<MobileLauncherProps> = ({
  currentTheme,
  onThemeChange,
  onSwitchToDesktop,
}) => {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [isMuted, setIsMuted] = useState(!sound.isEnabled());
  const [showNotes, setShowNotes] = useState(false);

  React.useEffect(() => {
    setIsMuted(!sound.isEnabled());
    const unsub = sound.subscribe((enabled) => {
      setIsMuted(!enabled);
    });
    return () => unsub();
  }, []);

  const apps: MobileAppItem[] = [
    {
      id: 'ai-assistant',
      title: 'AI Research Suite',
      subtitle: 'Streamlit NLP & LaTeX',
      icon: <Sparkles className="w-6 h-6 text-white" />,
      color: 'from-cyan-500 to-blue-600',
      badge: 'LIVE NLP',
      featured: true,
    },
    {
      id: 'spark-mobile',
      title: 'Spark Dating App',
      subtitle: 'React Native & APK',
      icon: <Smartphone className="w-6 h-6 text-white" />,
      color: 'from-rose-500 to-pink-600',
      badge: 'APK DEMO',
      featured: true,
    },
    {
      id: 'smart-presence',
      title: 'Smart Presence',
      subtitle: 'OpenCV Face & GPS',
      icon: <QrCode className="w-6 h-6 text-white" />,
      color: 'from-emerald-500 to-teal-600',
      badge: 'BIOMETRIC',
      featured: true,
    },
    {
      id: 'copilot',
      title: 'Portfolio AI Copilot',
      subtitle: 'Trained on Anurag',
      icon: <Bot className="w-6 h-6 text-white" />,
      color: 'from-violet-500 to-purple-700',
      badge: 'ASK AI',
    },
    {
      id: 'resume-studio',
      title: 'ATS Resume Studio',
      subtitle: 'Dynamic Role Tailor',
      icon: <FileText className="w-6 h-6 text-white" />,
      color: 'from-amber-500 to-orange-600',
      badge: 'ATS TAILOR',
    },
    {
      id: 'terminal',
      title: 'Dev Terminal',
      subtitle: 'Interactive bash CLI',
      icon: <Terminal className="w-6 h-6 text-white" />,
      color: 'from-zinc-800 to-black',
    },
    {
      id: 'tech-radar',
      title: 'Tech Stack Radar',
      subtitle: 'Architecture Map',
      icon: <Cpu className="w-6 h-6 text-white" />,
      color: 'from-purple-600 to-pink-500',
    },
    {
      id: 'projects',
      title: 'Projects Directory',
      subtitle: 'All 3 Repositories',
      icon: <FolderGit2 className="w-6 h-6 text-white" />,
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'system-health',
      title: 'DevOps Telemetry',
      subtitle: 'Uptime & Ping',
      icon: <Activity className="w-6 h-6 text-white" />,
      color: 'from-green-600 to-emerald-800',
    },
    {
      id: 'about',
      title: 'About & Academics',
      subtitle: 'MCA Galgotias • BCA',
      icon: <User className="w-6 h-6 text-white" />,
      color: 'from-sky-500 to-blue-600',
    },
    {
      id: 'contact',
      title: 'Book 15m / WhatsApp',
      subtitle: 'Direct Hiring Chat',
      icon: <CalendarCheck className="w-6 h-6 text-white" />,
      color: 'from-emerald-600 to-teal-700',
    },
  ];

  const handleOpenApp = (id: AppId) => {
    sound.playOpen();
    setActiveApp(id);
  };

  const handleCloseApp = () => {
    sound.playClose();
    setActiveApp(null);
  };

  const handleToggleSound = () => {
    const next = sound.toggle();
    setIsMuted(!next);
  };

  const handleCycleTheme = () => {
    sound.playClick();
    const themes: ThemeMode[] = ['cyberpunk', 'oled', 'corporate'];
    const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    onThemeChange(next);
  };

  const renderActiveAppContent = () => {
    switch (activeApp) {
      case 'about':
        return <AboutApp onOpenApp={handleOpenApp} />;
      case 'projects':
        return <ProjectsHubApp onOpenApp={handleOpenApp} />;
      case 'ai-assistant':
        return <AIAssistantApp />;
      case 'spark-mobile':
        return <SparkMobileApp />;
      case 'smart-presence':
        return <SmartPresenceApp />;
      case 'copilot':
        return <PortfolioCopilot onOpenApp={handleOpenApp} />;
      case 'terminal':
        return <TerminalApp onOpenApp={handleOpenApp} />;
      case 'tech-radar':
        return <TechRadarApp onOpenApp={handleOpenApp} />;
      case 'resume-studio':
        return <ResumeStudioApp />;
      case 'system-health':
        return <SystemHealthApp />;
      case 'contact':
        return <ContactApp />;
      default:
        return null;
    }
  };

  const activeAppMeta = apps.find((a) => a.id === activeApp);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-28">
      {/* 1. Mobile Status & Control Bar */}
      <header className="sticky top-0 z-40 h-12 w-full bg-slate-950/90 backdrop-blur-xl border-b border-white/10 px-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-mono">
          <span className="font-bold text-cyan-400">AnuragOS</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Mobile Launcher
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Switch to Desktop Mode button */}
          <button
            onClick={() => {
              sound.playClick();
              onSwitchToDesktop();
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition cursor-pointer"
            title="Switch to Desktop OS"
          >
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xs:inline">Desktop View</span>
          </button>

          {/* Sound */}
          <button
            onClick={handleToggleSound}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>

          {/* Theme */}
          <button
            onClick={handleCycleTheme}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-400 transition"
          >
            <SunMoon className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Hero Profile Bento Card */}
      <section className="p-4">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono mb-2">
                ● OPEN TO ROLES
              </span>
              <h1 className="text-xl font-extrabold text-white tracking-tight">{PERSONAL_INFO.name}</h1>
              <p className="text-xs text-cyan-400 font-medium mt-0.5">{PERSONAL_INFO.title}</p>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                MCA Distinction @ Galgotias University • Ex-ML Intern EduSkills Academy
              </p>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-xl font-black text-black shadow-lg shrink-0">
              AJ
            </div>
          </div>

          {/* Key Metrics Chips */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center font-mono">
            <div className="p-1.5 rounded-xl bg-white/5">
              <div className="text-[9px] text-slate-400">Sandboxes</div>
              <div className="text-xs font-bold text-cyan-400">3 Live</div>
            </div>
            <div className="p-1.5 rounded-xl bg-white/5">
              <div className="text-[9px] text-slate-400">Pipeline</div>
              <div className="text-xs font-bold text-emerald-400">-40% Latency</div>
            </div>
            <div className="p-1.5 rounded-xl bg-white/5">
              <div className="text-[9px] text-slate-400">Academics</div>
              <div className="text-xs font-bold text-purple-400">0 Backlogs</div>
            </div>
          </div>

          {/* Direct CTA Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <a
              href={PERSONAL_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
            <button
              onClick={() => handleOpenApp('resume-studio')}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>ATS Resume</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Sticky Notes Mobile Preview Drawer Toggle */}
      <div className="px-4 mb-2">
        <button
          onClick={() => {
            sound.playClick();
            setShowNotes(!showNotes);
          }}
          className="w-full py-2 px-3.5 rounded-2xl bg-amber-400/10 hover:bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono flex items-center justify-between transition cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Pin className="w-3.5 h-3.5" />
            <span>Recruiter Quick Sticky Notes (4)</span>
          </span>
          <span className="text-[11px] underline">{showNotes ? 'Hide' : 'Read Notes'}</span>
        </button>

        {showNotes && (
          <div className="mt-2.5 space-y-2.5 animate-in fade-in zoom-in-95">
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-100 text-xs leading-relaxed">
              <strong className="text-amber-300 font-mono block mb-1">📌 TIP FOR RECRUITERS:</strong>
              Tap any app icon below to experience live interactive sandboxes (Streamlit Q&A, Spark Swipe physics, and Biometric QR scanner).
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-100 text-xs leading-relaxed">
              <strong className="text-cyan-300 font-mono block mb-1">⚡ TECH PHILOSOPHY:</strong>
              OpenCV 128D face embeddings for biometric security, 60fps Reanimated physics for mobile dating, and PyTorch for NLP literature parsing.
            </div>
          </div>
        )}
      </div>

      {/* 4. App Launcher Grid (iOS / Android Springboard Style) */}
      <section className="p-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Interactive Apps & Sandboxes
          </h2>
          <span className="text-[10px] font-mono text-cyan-400">Tap to Launch Full-Screen</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleOpenApp(app.id)}
              className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-left flex flex-col justify-between gap-3 shadow-lg active:scale-96 transition-all duration-150 cursor-pointer relative group"
            >
              {app.badge && (
                <span className="absolute top-2 right-2 text-[8px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {app.badge}
                </span>
              )}

              <div
                className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-md`}
              >
                {app.icon}
              </div>

              <div>
                <div className="font-bold text-white text-xs sm:text-sm group-hover:text-cyan-400 transition">
                  {app.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{app.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Mobile Full-Screen App Modal / Drawer */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-200">
          {/* Mobile App Header */}
          <div className="h-12 border-b border-white/10 bg-slate-900/90 backdrop-blur-xl px-3 flex items-center justify-between shrink-0">
            <button
              onClick={handleCloseApp}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/10 text-slate-200 hover:text-white text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Launcher</span>
            </button>

            <div className="text-xs font-bold text-white truncate max-w-[180px]">
              {activeAppMeta?.title}
            </div>

            <button
              onClick={handleCloseApp}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* App Body (Scrollable, full-bleed) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950">
            {renderActiveAppContent()}
          </div>
        </div>
      )}
    </div>
  );
};
