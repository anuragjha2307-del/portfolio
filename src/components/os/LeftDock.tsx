'use client';

import React from 'react';
import { User, Box, Brain, Smartphone, Fingerprint, Sparkles, Activity } from 'lucide-react';
import { AppId } from '@/types/os';
import { sound } from '@/lib/sound';

interface LeftDockProps {
  onOpenApp: (id: AppId) => void;
  activeAppId: AppId | null;
}

interface LeftAppItem {
  id: AppId;
  label: string;
  icon: React.ReactNode;
}

export const LeftDock: React.FC<LeftDockProps> = ({ onOpenApp, activeAppId }) => {
  const items: LeftAppItem[] = [
    {
      id: 'about',
      label: 'About',
      icon: <User className="w-5 h-5 text-cyan-300" />,
    },
    {
      id: 'projects',
      label: 'Projects Hub',
      icon: <Box className="w-5 h-5 text-cyan-300" />,
    },
    {
      id: 'ai-assistant',
      label: 'AI Research',
      icon: <Brain className="w-5 h-5 text-cyan-300" />,
    },
    {
      id: 'spark-mobile',
      label: 'Spark Mobile',
      icon: <Smartphone className="w-5 h-5 text-cyan-300" />,
    },
    {
      id: 'smart-presence',
      label: 'Smart Presence',
      icon: <Fingerprint className="w-5 h-5 text-cyan-300" />,
    },
    {
      id: 'score-predictor',
      label: 'IPL Predictor',
      icon: <Activity className="w-5 h-5 text-cyan-300" />,
    },
    {
      id: 'copilot',
      label: 'Portfolio Copilot',
      icon: <Sparkles className="w-5 h-5 text-cyan-300" />,
    },
  ];

  return (
    <aside className="relative z-30 flex flex-col items-center">
      <div className="w-20 rounded-2xl bg-slate-950/70 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_25px_rgba(6,182,212,0.18)] py-3 px-1 flex flex-col items-center gap-3">
        {items.map((item) => {
          const isActive = activeAppId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onOpenApp(item.id);
              }}
              className={`group flex flex-col items-center justify-center w-full py-1.5 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'hover:bg-white/10'
              }`}
            >
              {/* Circular icon container */}
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_12px_rgba(6,182,212,0.6)] scale-105'
                    : 'border-cyan-500/40 bg-slate-900/80 group-hover:border-cyan-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                }`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span className="text-[10px] font-medium text-slate-300 group-hover:text-white mt-1 text-center leading-tight tracking-tight max-w-[68px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
