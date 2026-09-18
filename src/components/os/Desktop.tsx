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
  SunMoon,
  Volume2
} from 'lucide-react';
import { AppId, ThemeMode } from '@/types/os';
import { sound } from '@/lib/sound';
import { StickyNotes } from '@/components/os/StickyNotes';
import { BackgroundCanvas } from '@/components/os/BackgroundCanvas';

interface DesktopProps {
  onOpenApp: (id: AppId) => void;
  onThemeChange: (theme: ThemeMode) => void;
}

interface DesktopIcon {
  id: AppId;
  label: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

export const Desktop: React.FC<DesktopProps> = ({ onOpenApp, onThemeChange }) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const desktopIcons: DesktopIcon[] = [
    {
      id: 'about',
      label: 'About Anurag',
      icon: <User className="w-6 h-6 text-white" />,
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'projects',
      label: 'Projects Hub',
      icon: <FolderGit2 className="w-6 h-6 text-white" />,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'ai-assistant',
      label: 'AI Research Suite',
      icon: <Sparkles className="w-6 h-6 text-white" />,
      color: 'from-cyan-500 to-blue-600',
      badge: 'LIVE NLP',
    },
    {
      id: 'spark-mobile',
      label: 'Spark Mobile App',
      icon: <Smartphone className="w-6 h-6 text-white" />,
      color: 'from-rose-500 to-pink-600',
      badge: 'APK DEMO',
    },
    {
      id: 'smart-presence',
      label: 'Smart Presence QR',
      icon: <QrCode className="w-6 h-6 text-white" />,
      color: 'from-emerald-500 to-teal-600',
      badge: 'BIOMETRIC',
    },
    {
      id: 'copilot',
      label: 'Portfolio Copilot',
      icon: <Bot className="w-6 h-6 text-white" />,
      color: 'from-violet-500 to-purple-700',
      badge: 'AI BOT',
    },
    {
      id: 'terminal',
      label: 'Dev Terminal (bash)',
      icon: <Terminal className="w-6 h-6 text-white" />,
      color: 'from-zinc-800 to-black',
    },
    {
      id: 'tech-radar',
      label: 'Tech Radar Map',
      icon: <Cpu className="w-6 h-6 text-white" />,
      color: 'from-purple-600 to-pink-500',
    },
    {
      id: 'resume-studio',
      label: 'ATS Resume Studio',
      icon: <FileText className="w-6 h-6 text-white" />,
      color: 'from-emerald-600 to-teal-700',
      badge: 'ATS TAILOR',
    },
    {
      id: 'system-health',
      label: 'DevOps Telemetry',
      icon: <Activity className="w-6 h-6 text-white" />,
      color: 'from-green-600 to-emerald-800',
    },
    {
      id: 'contact',
      label: 'Book 15m / WhatsApp',
      icon: <CalendarCheck className="w-6 h-6 text-white" />,
      color: 'from-sky-500 to-blue-700',
    },
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    if (contextMenu) setContextMenu(null);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
      className="relative h-[calc(100vh-2rem)] pt-6 pb-20 px-4 sm:px-6 overflow-hidden flex flex-col justify-between cyber-grid select-none"
    >
      {/* Visual Depth: Ambient Cursor Follower, Interactive Particle Mesh, and Code Watermarks */}
      <BackgroundCanvas />

      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Desktop Icons Grid */}
      <div className="relative z-10 grid grid-flow-col grid-rows-6 gap-3 w-fit">
        {desktopIcons.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sound.playOpen();
              onOpenApp(item.id);
            }}
            className="group flex flex-col items-center justify-center w-24 p-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-md transition-all duration-150 cursor-pointer text-center relative"
          >
            {item.badge && (
              <span className="absolute top-1 right-1 text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-500/30 text-cyan-300 border border-cyan-500/40">
                {item.badge}
              </span>
            )}

            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-200 border border-white/20`}
            >
              {item.icon}
            </div>

            <span className="text-[11px] font-medium text-slate-200 group-hover:text-white mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-[85px] truncate">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Casual & Relatable Developer Sticky Notes */}
      <StickyNotes onOpenApp={onOpenApp} />

      {/* Desktop Watermark / Quick Specs in Bottom Right */}
      <div className="relative z-10 self-end text-right hidden sm:block pointer-events-none select-none">
        <div className="text-xl font-black tracking-tight text-white/20 uppercase font-mono">
          ANURAG JHA
        </div>
        <div className="text-[11px] font-mono text-cyan-400/40">
          AI & SYSTEMS WORKSPACE • DEVOS 2.4
        </div>
      </div>

      {/* Right Click Context Menu */}
      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed z-50 w-52 rounded-xl bg-slate-950/95 border border-white/15 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 text-xs text-slate-200 font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('terminal');
              closeContextMenu();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-green-400" />
            <span>Launch CLI Terminal</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('copilot');
              closeContextMenu();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span>Ask Portfolio Copilot</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('resume-studio');
              closeContextMenu();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>ATS Resume Studio</span>
          </button>
          <div className="border-t border-white/10 my-1"></div>
          <button
            onClick={() => {
              sound.playClick();
              onThemeChange('cyberpunk');
              closeContextMenu();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            <SunMoon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Theme: Cyberpunk</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onThemeChange('oled');
              closeContextMenu();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            <SunMoon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Theme: OLED Minimal</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              sound.toggle();
              closeContextMenu();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Toggle Mechanical SFX</span>
          </button>
        </div>
      )}
    </div>
  );
};
