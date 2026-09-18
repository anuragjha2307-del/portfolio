'use client';

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Volume2, 
  VolumeX, 
  SunMoon, 
  Activity, 
  Wifi, 
  BatteryCharging,
  Sparkles,
  Layers,
  Smartphone
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { ThemeMode, AppId } from '@/types/os';
import { sound } from '@/lib/sound';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface MenuBarProps {
  activeAppTitle?: string;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenApp: (id: AppId) => void;
  onOpenCommandPalette: () => void;
  onSwitchToMobile?: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppTitle = 'Desktop',
  currentTheme,
  onThemeChange,
  onOpenApp,
  onOpenCommandPalette,
  onSwitchToMobile,
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(!sound.isEnabled());
  const [showOsMenu, setShowOsMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(!sound.isEnabled());
    const unsub = sound.subscribe((enabled) => {
      setIsMuted(!enabled);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setDate(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    sound.toggle();
  };

  const handleThemeCycle = () => {
    sound.playClick();
    const themes: ThemeMode[] = ['cyberpunk', 'oled', 'corporate'];
    const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    onThemeChange(next);
  };

  return (
    <header className="relative z-50 h-8 w-full select-none border-b border-white/10 bg-black/70 backdrop-blur-md px-3 flex items-center justify-between text-xs text-slate-300 font-mono tracking-wide">
      {/* Left section: OS branding + Active app */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => {
              sound.playClick();
              setShowOsMenu(!showOsMenu);
            }}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 text-cyan-400 font-bold transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="tracking-tight">AnuragOS</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">v2.4</span>
          </button>

          {/* OS Dropdown Menu */}
          {showOsMenu && (
            <div 
              className="absolute left-0 top-8 w-60 rounded-lg border border-cyan-500/30 bg-slate-950/95 backdrop-blur-xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 text-slate-200"
              onMouseLeave={() => setShowOsMenu(false)}
            >
              <div className="px-2 py-1.5 border-b border-white/10 mb-1">
                <div className="font-semibold text-white text-sm">{PERSONAL_INFO.name}</div>
                <div className="text-[11px] text-cyan-400">{PERSONAL_INFO.title}</div>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenApp('about');
                  setShowOsMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 cursor-pointer"
              >
                <span>About Anurag Jha & Academics</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenApp('terminal');
                  setShowOsMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch CLI Console</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenApp('system-health');
                  setShowOsMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>System Health & Telemetry</span>
              </button>
              <div className="border-t border-white/10 my-1"></div>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-slate-300"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-slate-300"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          )}
        </div>

        <div className="h-3 w-px bg-white/20 hidden sm:block" />

        {/* Current Active App Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-sans">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-white font-medium">{activeAppTitle}</span>
        </div>
      </div>

      {/* Center: Spotlight launcher button */}
      <button
        onClick={() => {
          sound.playClick();
          onOpenCommandPalette();
        }}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
        title="Search AnuragOS (Ctrl + K)"
      >
        <Search className="w-3 h-3 text-cyan-400" />
        <span className="hidden md:inline">Command Spotlight</span>
        <kbd className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-400 font-mono border border-white/10">
          ⌘K
        </kbd>
      </button>

      {/* Right section: System Status, SFX, Theme, Clock */}
      <div className="flex items-center gap-3">
        {/* Live Service Ping Indicator */}
        <div 
          onClick={() => {
            sound.playClick();
            onOpenApp('system-health');
          }}
          className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-pointer hover:bg-emerald-500/20 transition"
          title="All Microservices Online (Click to inspect)"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-semibold">ONLINE</span>
        </div>

        {/* Sound toggle button */}
        <button
          onClick={handleSoundToggle}
          className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          title={isMuted ? 'Sound Muted (Click to enable)' : 'Sound Enabled (Click to mute)'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
        </button>

        {/* Theme switcher */}
        <button
          onClick={handleThemeCycle}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          title={`Current Theme: ${currentTheme.toUpperCase()} (Click to switch)`}
        >
          <SunMoon className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline uppercase text-[10px] text-slate-400">{currentTheme}</span>
        </button>

        {/* Mobile Mode Switcher */}
        {onSwitchToMobile && (
          <button
            onClick={() => {
              sound.playClick();
              onSwitchToMobile();
            }}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
            title="Switch to Mobile Launcher View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[10px] text-cyan-300">Mobile</span>
          </button>
        )}

        {/* Battery & Wifi */}
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <Wifi className="w-3.5 h-3.5 text-slate-300" />
          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Clock & Date */}
        <div className="flex items-center gap-2 font-mono text-slate-300">
          <span className="hidden sm:inline text-slate-400">{date}</span>
          <span className="font-semibold text-white">{time || '00:00:00'}</span>
        </div>
      </div>
    </header>
  );
};
