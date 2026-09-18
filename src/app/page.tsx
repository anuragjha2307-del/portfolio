'use client';

import React, { useState, useEffect } from 'react';
import { MenuBar } from '@/components/os/MenuBar';
import { Dock } from '@/components/os/Dock';
import { Desktop } from '@/components/os/Desktop';
import { WindowContainer } from '@/components/os/WindowContainer';
import { CommandPalette } from '@/components/os/CommandPalette';

// Applications
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
import { MobileLauncher } from '@/components/mobile/MobileLauncher';

import { AppId, ThemeMode, WindowState } from '@/types/os';
import { sound } from '@/lib/sound';

const DEFAULT_WINDOWS: Record<
  AppId,
  {
    title: string;
    initialSize: { width: number; height: number };
    initialPosition: { x: number; y: number };
  }
> = {
  about: {
    title: 'About Anurag Jha & Academics',
    initialSize: { width: 940, height: 600 },
    initialPosition: { x: 100, y: 55 },
  },
  projects: {
    title: 'Projects Directory & Live Sandboxes',
    initialSize: { width: 980, height: 640 },
    initialPosition: { x: 120, y: 65 },
  },
  'ai-assistant': {
    title: 'AI Research Assistant Suite — Streamlit NLP Sandbox',
    initialSize: { width: 960, height: 620 },
    initialPosition: { x: 140, y: 50 },
  },
  'spark-mobile': {
    title: 'Spark Dating App — Mobile Device Simulator (60 FPS)',
    initialSize: { width: 920, height: 650 },
    initialPosition: { x: 160, y: 45 },
  },
  'smart-presence': {
    title: 'Smart Presence — AI Biometrics & Geofenced Attendance',
    initialSize: { width: 980, height: 630 },
    initialPosition: { x: 130, y: 55 },
  },
  copilot: {
    title: 'Portfolio AI Copilot (Trained on Anurag)',
    initialSize: { width: 720, height: 560 },
    initialPosition: { x: 220, y: 70 },
  },
  terminal: {
    title: 'DevOS Interactive Terminal (bash)',
    initialSize: { width: 840, height: 500 },
    initialPosition: { x: 180, y: 80 },
  },
  'tech-radar': {
    title: 'Interactive Architecture & Tech Stack Radar',
    initialSize: { width: 960, height: 600 },
    initialPosition: { x: 150, y: 60 },
  },
  'resume-studio': {
    title: 'ATS Resume Studio & Dynamic Role Exporter',
    initialSize: { width: 980, height: 660 },
    initialPosition: { x: 110, y: 45 },
  },
  'system-health': {
    title: 'DevOps & Live Cloud Services Telemetry',
    initialSize: { width: 880, height: 560 },
    initialPosition: { x: 190, y: 75 },
  },
  contact: {
    title: '1-Click WhatsApp & 15-Min Interview Scheduler',
    initialSize: { width: 890, height: 580 },
    initialPosition: { x: 170, y: 65 },
  },
};

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>('cyberpunk');
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};
    (Object.keys(DEFAULT_WINDOWS) as AppId[]).forEach((id) => {
      const def = DEFAULT_WINDOWS[id];
      initial[id] = {
        id,
        title: def.title,
        isOpen: id === 'projects', // Start with Projects Hub open
        isMinimized: false,
        isMaximized: false,
        zIndex: id === 'projects' ? 10 : 1,
        position: def.initialPosition,
        size: def.initialSize,
      };
    });
    return initial as Record<AppId, WindowState>;
  });

  const [activeAppId, setActiveAppId] = useState<AppId | null>('projects');
  const [topZIndex, setTopZIndex] = useState(15);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false);

  // Auto-detect mobile screen width < 768px
  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobileMode(window.innerWidth < 768);
    };
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);
    return () => window.removeEventListener('resize', handleCheckMobile);
  }, []);

  // Sync theme attribute to <html> tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenApp = (id: AppId) => {
    sound.playOpen();
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveAppId(id);

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const handleCloseWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMaximized: false,
      },
    }));
    if (activeAppId === id) {
      // Pick next open window if available
      const openRemaining = (Object.keys(windows) as AppId[]).filter(
        (k) => k !== id && windows[k].isOpen && !windows[k].isMinimized
      );
      setActiveAppId(openRemaining.length > 0 ? openRemaining[openRemaining.length - 1] : null);
    }
  };

  const handleMinimizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    if (activeAppId === id) {
      setActiveAppId(null);
    }
  };

  const handleMaximizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  const handleFocusWindow = (id: AppId) => {
    if (activeAppId === id) return;
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveAppId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: nextZ,
      },
    }));
  };

  const openAppIds = (Object.keys(windows) as AppId[]).filter(
    (id) => windows[id].isOpen && !windows[id].isMinimized
  );

  const activeWindowTitle = activeAppId ? windows[activeAppId]?.title : 'AnuragOS Desktop';

  // Responsive Mobile Mode (iOS / Android Springboard Bento Launcher)
  if (isMobileMode) {
    return (
      <MobileLauncher
        currentTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        onSwitchToDesktop={() => setIsMobileMode(false)}
      />
    );
  }

  return (
    <main className="relative h-full w-full overflow-hidden bg-slate-950 font-sans select-none">
      {/* OS Top Menu Bar */}
      <MenuBar
        activeAppTitle={activeWindowTitle}
        currentTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        onOpenApp={handleOpenApp}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onSwitchToMobile={() => setIsMobileMode(true)}
      />

      {/* Interactive Desktop Canvas */}
      <Desktop onOpenApp={handleOpenApp} onThemeChange={(newTheme) => setTheme(newTheme)} />

      {/* Window Manager Canvas */}
      {(Object.keys(windows) as AppId[]).map((id) => {
        const win = windows[id];
        if (!win.isOpen) return null;

        let content: React.ReactNode = null;
        switch (id) {
          case 'about':
            content = <AboutApp onOpenApp={handleOpenApp} />;
            break;
          case 'projects':
            content = <ProjectsHubApp onOpenApp={handleOpenApp} />;
            break;
          case 'ai-assistant':
            content = <AIAssistantApp />;
            break;
          case 'spark-mobile':
            content = <SparkMobileApp />;
            break;
          case 'smart-presence':
            content = <SmartPresenceApp />;
            break;
          case 'copilot':
            content = <PortfolioCopilot onOpenApp={handleOpenApp} />;
            break;
          case 'terminal':
            content = <TerminalApp onOpenApp={handleOpenApp} />;
            break;
          case 'tech-radar':
            content = <TechRadarApp onOpenApp={handleOpenApp} />;
            break;
          case 'resume-studio':
            content = <ResumeStudioApp />;
            break;
          case 'system-health':
            content = <SystemHealthApp />;
            break;
          case 'contact':
            content = <ContactApp />;
            break;
          default:
            content = null;
        }

        return (
          <WindowContainer
            key={id}
            id={id}
            title={win.title}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            zIndex={win.zIndex}
            initialPosition={win.position}
            initialSize={win.size}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onFocus={handleFocusWindow}
          >
            {content}
          </WindowContainer>
        );
      })}

      {/* Bottom Floating Application Dock */}
      <Dock openApps={openAppIds} activeAppId={activeAppId} onOpenApp={handleOpenApp} />

      {/* Spotlight Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenApp={handleOpenApp}
        onThemeChange={(newTheme) => setTheme(newTheme)}
      />
    </main>
  );
}
