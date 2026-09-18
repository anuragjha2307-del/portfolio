'use client';

import React, { useState } from 'react';
import { 
  Pin, 
  X, 
  Minus, 
  Plus, 
  Sparkles, 
  RotateCw,
  ExternalLink,
  MessageSquare,
  Terminal,
  FileText
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { AppId } from '@/types/os';

interface StickyNoteData {
  id: string;
  title: string;
  content: string;
  tag: string;
  colorScheme: 'yellow' | 'cyan' | 'rose' | 'emerald';
  rotation: string; // e.g. '-rotate-2'
  position: { top: number; right: number };
  isCollapsed?: boolean;
  actionApp?: AppId;
  actionLabel?: string;
}

const INITIAL_NOTES: StickyNoteData[] = [
  {
    id: 'note-1',
    title: '📌 Quick Note for Recruiters',
    content: 'Click any dock icon below or press Ctrl+K (⌘K) to trigger Command Spotlight. Live project demos run inside native sandboxes!',
    tag: 'EXPLORE TIP',
    colorScheme: 'yellow',
    rotation: '-rotate-1',
    position: { top: 48, right: 24 },
    actionApp: 'projects',
    actionLabel: 'Browse All Sandboxes →',
  },
  {
    id: 'note-2',
    title: '⚡ Engineering Core',
    content: 'OpenCV 128D face embeddings for biometric security, 60fps Reanimated physics for mobile dating, and PyTorch for NLP literature parsing.',
    tag: 'TECH PHILOSOPHY',
    colorScheme: 'cyan',
    rotation: 'rotate-1',
    position: { top: 220, right: 24 },
    actionApp: 'tech-radar',
    actionLabel: 'View Tech Radar →',
  },
  {
    id: 'note-3',
    title: '☕ Discovery Call & WhatsApp',
    content: 'Looking for an AI / Full-Stack / Mobile Engineer? 1-click direct WhatsApp chat or 15-min discovery call booking available.',
    tag: 'HIRING READY',
    colorScheme: 'rose',
    rotation: '-rotate-2',
    position: { top: 395, right: 24 },
    actionApp: 'contact',
    actionLabel: 'Book 15m Slot →',
  },
  {
    id: 'note-4',
    title: '💻 Terminal Easter Egg',
    content: 'Launch the CLI Dev Console and type "sudo hire-anurag", "neofetch", or "run spark-apk" for real interactive bash output!',
    tag: 'CLI CONSOLE',
    colorScheme: 'emerald',
    rotation: 'rotate-2',
    position: { top: 570, right: 24 },
    actionApp: 'terminal',
    actionLabel: 'Launch Terminal →',
  },
];

interface StickyNotesProps {
  onOpenApp?: (id: AppId) => void;
}

export const StickyNotes: React.FC<StickyNotesProps> = ({ onOpenApp }) => {
  const [notes, setNotes] = useState<StickyNoteData[]>(INITIAL_NOTES);
  const [visible, setVisible] = useState(true);

  const colorStyles = {
    yellow: {
      bg: 'bg-amber-100/90 dark:bg-amber-400/15',
      border: 'border-amber-400/40',
      text: 'text-amber-100',
      heading: 'text-amber-300 font-bold',
      accent: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      tape: 'bg-amber-300/40',
      glow: 'shadow-[0_8px_25px_rgba(251,191,36,0.15)]',
    },
    cyan: {
      bg: 'bg-cyan-100/90 dark:bg-cyan-400/15',
      border: 'border-cyan-400/40',
      text: 'text-cyan-100',
      heading: 'text-cyan-300 font-bold',
      accent: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30',
      tape: 'bg-cyan-300/40',
      glow: 'shadow-[0_8px_25px_rgba(34,211,238,0.15)]',
    },
    rose: {
      bg: 'bg-rose-100/90 dark:bg-rose-400/15',
      border: 'border-rose-400/40',
      text: 'text-rose-100',
      heading: 'text-rose-300 font-bold',
      accent: 'bg-rose-400/20 text-rose-300 border-rose-400/30',
      tape: 'bg-rose-300/40',
      glow: 'shadow-[0_8px_25px_rgba(244,63,94,0.15)]',
    },
    emerald: {
      bg: 'bg-emerald-100/90 dark:bg-emerald-400/15',
      border: 'border-emerald-400/40',
      text: 'text-emerald-100',
      heading: 'text-emerald-300 font-bold',
      accent: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
      tape: 'bg-emerald-300/40',
      glow: 'shadow-[0_8px_25px_rgba(16,185,129,0.15)]',
    },
  };

  const handleToggleCollapse = (id: string) => {
    sound.playClick();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isCollapsed: !n.isCollapsed } : n))
    );
  };

  const handleDismiss = (id: string) => {
    sound.playClose();
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleResetNotes = () => {
    sound.playSuccess();
    setNotes(INITIAL_NOTES);
    setVisible(true);
  };

  if (!visible || notes.length === 0) {
    return (
      <button
        onClick={handleResetNotes}
        className="fixed top-12 right-4 z-20 px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-md cursor-pointer transition"
        title="Restore Sticky Notes on Desktop"
      >
        <Pin className="w-3.5 h-3.5" />
        <span>Show Desktop Sticky Notes ({INITIAL_NOTES.length})</span>
      </button>
    );
  }

  return (
    <aside aria-label="Desktop Sticky Notes" className="fixed top-12 right-3 sm:right-6 z-20 flex flex-col gap-3 max-w-[260px] sm:max-w-[280px] pointer-events-auto">
      {notes.map((note) => {
        const style = colorStyles[note.colorScheme];
        return (
          <div
            key={note.id}
            className={`relative rounded-xl border p-3 backdrop-blur-xl transition-all duration-300 select-text ${
              style.bg
            } ${style.border} ${style.glow} ${note.rotation} hover:rotate-0 hover:scale-102 hover:z-30`}
          >
            {/* Top scotch-tape effect */}
            <div
              className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 rounded-sm ${style.tape} backdrop-blur-sm border border-white/20 shadow-xs pointer-events-none`}
            ></div>

            {/* Note Header */}
            <div className="flex items-center justify-between gap-1 border-b border-white/10 pb-1.5 mb-1.5">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white">
                  {note.title}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleToggleCollapse(note.id)}
                  className="p-0.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
                  title={note.isCollapsed ? 'Expand' : 'Collapse'}
                >
                  {note.isCollapsed ? (
                    <Plus className="w-3 h-3" />
                  ) : (
                    <Minus className="w-3 h-3" />
                  )}
                </button>
                <button
                  onClick={() => handleDismiss(note.id)}
                  className="p-0.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
                  title="Dismiss note"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Note Body */}
            {!note.isCollapsed && (
              <div className="space-y-2 text-xs">
                <p className="leading-relaxed text-slate-200 font-sans text-[11px] sm:text-xs">
                  {note.content}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] font-mono">
                  <span className={`px-1.5 py-0.2 rounded border ${style.accent}`}>
                    {note.tag}
                  </span>

                  {note.actionApp && onOpenApp && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onOpenApp(note.actionApp!);
                      }}
                      className="text-cyan-300 hover:text-white underline underline-offset-2 transition cursor-pointer"
                    >
                      {note.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};
