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
  Bot
} from 'lucide-react';
import { AppId } from '@/types/os';
import { sound } from '@/lib/sound';

interface DockProps {
  openApps: AppId[];
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
}

interface DockItem {
  id: AppId;
  label: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

export const Dock: React.FC<DockProps> = ({ openApps, activeAppId, onOpenApp }) => {
  const [hoveredApp, setHoveredApp] = useState<AppId | null>(null);

  const dockItems: DockItem[] = [
    {
      id: 'about',
      label: 'About & Credentials',
      icon: <User className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'projects',
      label: 'Projects Hub',
      icon: <FolderGit2 className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'ai-assistant',
      label: 'AI Research Suite',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-cyan-400 to-blue-600',
      badge: 'NLP Live',
    },
    {
      id: 'spark-mobile',
      label: 'Spark Mobile Simulator',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'from-rose-500 to-pink-600',
      badge: 'APK Demo',
    },
    {
      id: 'smart-presence',
      label: 'Smart Presence Biometrics',
      icon: <QrCode className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600',
      badge: 'QR Scanner',
    },
    {
      id: 'copilot',
      label: 'Portfolio AI Copilot',
      icon: <Bot className="w-5 h-5" />,
      color: 'from-violet-500 to-purple-700',
      badge: 'AI',
    },
    {
      id: 'terminal',
      label: 'Dev Console / CLI',
      icon: <Terminal className="w-5 h-5" />,
      color: 'from-zinc-800 to-zinc-950',
    },
    {
      id: 'tech-radar',
      label: 'Architecture & Tech Radar',
      icon: <Cpu className="w-5 h-5" />,
      color: 'from-purple-600 to-pink-500',
    },
    {
      id: 'resume-studio',
      label: 'ATS Resume Studio',
      icon: <FileText className="w-5 h-5" />,
      color: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'system-health',
      label: 'DevOps & Uptime Telemetry',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-green-600 to-emerald-800',
    },
    {
      id: 'contact',
      label: 'Direct Calendar & WhatsApp',
      icon: <CalendarCheck className="w-5 h-5" />,
      color: 'from-sky-500 to-blue-700',
    },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-full px-2">
      <nav 
        aria-label="Application Dock"
        className="glass-dock flex items-end gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl border border-white/15 bg-slate-900/80 shadow-2xl backdrop-blur-2xl transition-all"
      >
        {dockItems.map((item) => {
          const isOpen = openApps.includes(item.id);
          const isActive = activeAppId === item.id;
          const isHovered = hoveredApp === item.id;

          return (
            <div
              key={item.id}
              className="relative group flex flex-col items-center"
              onMouseEnter={() => {
                setHoveredApp(item.id);
              }}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/20 text-white text-[11px] font-sans font-medium shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 z-50 flex items-center gap-1.5">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/40">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Dock Icon Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenApp(item.id);
                }}
                className={`relative p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-all duration-200 ease-out cursor-pointer hover:scale-115 hover:-translate-y-2 active:scale-95 ${
                  isActive ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-105 -translate-y-1' : ''
                }`}
                title={item.label}
              >
                {item.icon}

                {/* Optional mini badge on the icon */}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 border border-black"></span>
                  </span>
                )}
              </button>

              {/* Running indicator dot */}
              <div className="h-1.5 w-full flex items-center justify-center mt-1">
                {isOpen && (
                  <span
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isActive ? 'w-3 bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'w-1 bg-white/60'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
