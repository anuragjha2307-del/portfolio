'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  Sparkles, 
  Smartphone, 
  QrCode, 
  FileText, 
  Activity, 
  Cpu, 
  User, 
  FolderGit2, 
  CalendarCheck,
  Bot,
  ExternalLink,
  SunMoon,
  Volume2
} from 'lucide-react';
import { AppId, ThemeMode } from '@/types/os';
import { sound } from '@/lib/sound';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onThemeChange: (theme: ThemeMode) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Applications' | 'Projects' | 'Shortcuts' | 'Actions';
  icon: React.ReactNode;
  action: () => void;
  keywords: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onThemeChange,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'recruiter-tour',
      title: '⚡ Start 60-Second Recruiter Tour (One-Click Onboarding)',
      category: 'Actions',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.dispatchEvent(new CustomEvent('start-anuragos-tour'));
      },
      keywords: 'tour recruiter onboard walkthrough quick 60 seconds projects demo review start',
    },
    {
      id: 'ai-assistant',
      title: 'AI Research Assistant Suite (Live NLP Stream)',
      category: 'Projects',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => onOpenApp('ai-assistant'),
      keywords: 'nlp pytorch streamlit llm document summarization paper ai',
    },
    {
      id: 'spark-mobile',
      title: 'Spark Dating App (Mobile Simulator & Fast APK)',
      category: 'Projects',
      icon: <Smartphone className="w-4 h-4 text-rose-400" />,
      action: () => onOpenApp('spark-mobile'),
      keywords: 'react native expo mobile phone apk download swipe android ios',
    },
    {
      id: 'smart-presence',
      title: 'Smart Presence (AI Biometrics & QR Attendance)',
      category: 'Projects',
      icon: <QrCode className="w-4 h-4 text-emerald-400" />,
      action: () => onOpenApp('smart-presence'),
      keywords: 'opencv face biometric totp haversine gps geofence attendance flask',
    },
    {
      id: 'copilot',
      title: 'Portfolio AI Copilot (Trained on Anurag)',
      category: 'Applications',
      icon: <Bot className="w-4 h-4 text-violet-400" />,
      action: () => onOpenApp('copilot'),
      keywords: 'ai bot chat ask recruiter question skills assistant',
    },
    {
      id: 'terminal',
      title: 'Launch CLI Developer Terminal (bash)',
      category: 'Applications',
      icon: <Terminal className="w-4 h-4 text-green-400" />,
      action: () => onOpenApp('terminal'),
      keywords: 'cli bash command line neofetch skills shell console',
    },
    {
      id: 'resume-studio',
      title: 'ATS Resume Studio (Dynamic Role Tailor)',
      category: 'Applications',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => onOpenApp('resume-studio'),
      keywords: 'resume cv ats export pdf print full stack ai engineer mobile',
    },
    {
      id: 'tech-radar',
      title: 'Architecture & Tech Stack Radar',
      category: 'Applications',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      action: () => onOpenApp('tech-radar'),
      keywords: 'skills python pytorch opencv flask react native sql graph',
    },
    {
      id: 'system-health',
      title: 'DevOps & Live System Health Monitor',
      category: 'Applications',
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      action: () => onOpenApp('system-health'),
      keywords: 'uptime latency devops render streamlit expo ping status',
    },
    {
      id: 'about',
      title: 'About Anurag Jha & Academics (Galgotias MCA, DPGITM BCA)',
      category: 'Applications',
      icon: <User className="w-4 h-4 text-blue-400" />,
      action: () => onOpenApp('about'),
      keywords: 'about bio education galgotias dpgitm mca bca eduskills intern',
    },
    {
      id: 'projects-hub',
      title: 'Browse All Projects Directory',
      category: 'Applications',
      icon: <FolderGit2 className="w-4 h-4 text-orange-400" />,
      action: () => onOpenApp('projects'),
      keywords: 'projects portfolio list all smart presence spark ai suite',
    },
    {
      id: 'whatsapp',
      title: 'Quick Chat on WhatsApp (+91 8595648167)',
      category: 'Actions',
      icon: <CalendarCheck className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.open(PERSONAL_INFO.whatsapp, '_blank');
      },
      keywords: 'whatsapp chat message hire call reach out contact',
    },
    {
      id: 'theme-cyber',
      title: 'Switch Theme: Cyberpunk Neon',
      category: 'Shortcuts',
      icon: <SunMoon className="w-4 h-4 text-cyan-400" />,
      action: () => onThemeChange('cyberpunk'),
      keywords: 'theme cyberpunk dark neon cyan',
    },
    {
      id: 'theme-oled',
      title: 'Switch Theme: OLED Pitch Dark',
      category: 'Shortcuts',
      icon: <SunMoon className="w-4 h-4 text-emerald-400" />,
      action: () => onThemeChange('oled'),
      keywords: 'theme oled black dark minimalist',
    },
    {
      id: 'theme-corp',
      title: 'Switch Theme: Corporate Minimalist',
      category: 'Shortcuts',
      icon: <SunMoon className="w-4 h-4 text-slate-300" />,
      action: () => onThemeChange('corporate'),
      keywords: 'theme corporate clean minimal light dark slate',
    },
    {
      id: 'sound-toggle',
      title: 'Toggle Audio SFX (Mechanical Synth)',
      category: 'Shortcuts',
      icon: <Volume2 className="w-4 h-4 text-indigo-400" />,
      action: () => sound.toggle(),
      keywords: 'sound audio mute effects click chime',
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (@anuragjha2307-del)',
      category: 'Shortcuts',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      action: () => window.open(PERSONAL_INFO.github, '_blank'),
      keywords: 'github code repo git source',
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.keywords.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      sound.playKey();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      sound.playKey();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        sound.playClick();
        filteredCommands[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-950/95 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project name, or skill (e.g., 'spark', 'pytorch', 'resume')..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 font-mono border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-84 overflow-y-auto custom-scrollbar p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No matching commands or projects found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    sound.playClick();
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition cursor-pointer ${
                    isSelected ? 'bg-cyan-500/20 text-white border border-cyan-500/30' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/30' : 'bg-white/5'}`}>
                      {cmd.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-xs sm:text-sm">{cmd.title}</span>
                      <span className="text-[10px] text-slate-400">{cmd.category}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                      <span>Jump</span> ↵
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with ↑ ↓ • Select with ↵</span>
          <span className="text-cyan-400">AnuragOS Spotlight</span>
        </div>
      </div>
    </div>
  );
};
