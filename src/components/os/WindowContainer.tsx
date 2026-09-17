'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import { AppId } from '@/types/os';
import { sound } from '@/lib/sound';

interface WindowContainerProps {
  id: AppId;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  children: React.ReactNode;
}

export const WindowContainer: React.FC<WindowContainerProps> = ({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  initialPosition = { x: 80, y: 50 },
  initialSize = { width: 920, height: 600 },
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);

  // Responsive default adjustment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth < 768) {
        // Mobile layout: almost full screen
        setPosition({ x: 8, y: 40 });
        setSize({ width: screenWidth - 16, height: screenHeight - 110 });
      } else {
        // Desktop: adjust to not exceed screen
        const targetWidth = Math.min(initialSize.width, screenWidth - 60);
        const targetHeight = Math.min(initialSize.height, screenHeight - 140);
        const posX = Math.max(20, Math.min(initialPosition.x, screenWidth - targetWidth - 20));
        const posY = Math.max(40, Math.min(initialPosition.y, screenHeight - targetHeight - 80));
        setPosition({ x: posX, y: posY });
        setSize({ width: targetWidth, height: targetHeight });
      }
    }
  }, [initialPosition.x, initialPosition.y, initialSize.height, initialSize.width]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus(id);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: position.x,
      startY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;

      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.startX + deltaX));
      const newY = Math.max(34, Math.min(window.innerHeight - 80, dragStartRef.current.startY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus(id)}
      style={{
        zIndex,
        ...(isMaximized
          ? {
              top: '32px',
              left: '0px',
              width: '100vw',
              height: 'calc(100vh - 32px)',
            }
          : {
              top: `${position.y}px`,
              left: `${position.x}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
            }),
      }}
      className={`fixed flex flex-col rounded-xl overflow-hidden glass-panel shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15 backdrop-blur-2xl transition-all duration-150 select-text ${
        isDragging ? 'opacity-90 select-none' : 'opacity-100'
      }`}
    >
      {/* Window Header */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          sound.playClick();
          onMaximize(id);
        }}
        className="h-10 bg-slate-950/80 border-b border-white/10 px-3 flex items-center justify-between select-none cursor-grab active:cursor-grabbing shrink-0"
      >
        {/* Left: Traffic light control buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClose();
              onClose(id);
            }}
            className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-black/80 hover:text-black transition cursor-pointer group"
            title="Close"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onMinimize(id);
            }}
            className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-black/80 hover:text-black transition cursor-pointer group"
            title="Minimize"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onMaximize(id);
            }}
            className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-black/80 hover:text-black transition cursor-pointer group"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <Copy className="w-2 h-2 opacity-0 group-hover:opacity-100" />
            ) : (
              <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Center: Title + Icon */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 tracking-wide">
          {icon}
          <span className="truncate max-w-[200px] sm:max-w-[320px]">{title}</span>
        </div>

        {/* Right placeholder spacer */}
        <div className="w-14 flex items-center justify-end">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-slate-950/60 text-slate-100">
        {children}
      </div>
    </div>
  );
};
