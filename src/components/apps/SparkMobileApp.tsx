'use client';

import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  QrCode, 
  Flame, 
  Heart, 
  X, 
  Star, 
  MessageCircle, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Zap,
  ShieldAlert,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import { PROJECTS } from '@/data/portfolioData';

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  role: string;
  distance: string;
  bio: string;
  gradient: string;
  tags: string[];
  avatarEmoji: string;
}

const PROFILES: MatchProfile[] = [
  {
    id: 'p1',
    name: 'Aarohi',
    age: 23,
    role: 'Product Designer @ TechCorp',
    distance: '3 km away',
    bio: 'Figma enthusiast, coffee lover, and late-night UI polish addict. Looking for someone who appreciates clean aesthetics & good APIs.',
    gradient: 'from-rose-500 via-pink-600 to-amber-500',
    tags: ['UI/UX', 'Coffee', 'EDM', 'Travel'],
    avatarEmoji: '👩‍🎨',
  },
  {
    id: 'p2',
    name: 'Rohan',
    age: 24,
    role: 'Backend Architect @ FinTech',
    distance: '5 km away',
    bio: 'Distributed systems, low latency microservices, and weekend cycling. Let’s debug life together over spicy ramen.',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    tags: ['Go / Python', 'Distributed', 'Ramen', 'Cycling'],
    avatarEmoji: '🧑‍💻',
  },
  {
    id: 'p3',
    name: 'Sneha',
    age: 22,
    role: 'AI Researcher @ Galgotias',
    distance: '1 km away',
    bio: 'Fine-tuning transformer models by day, indie playlists by night. Looking for deep conversations and intelligent banter.',
    gradient: 'from-purple-600 via-violet-600 to-pink-500',
    tags: ['PyTorch', 'NLP', 'Indie Rock', 'Astrophysics'],
    avatarEmoji: '👩‍🔬',
  },
];

export const SparkMobileApp: React.FC = () => {
  const project = PROJECTS.find((p) => p.id === 'spark-mobile')!;
  const [profileIndex, setProfileIndex] = useState(0);
  const [lastAction, setLastAction] = useState<'liked' | 'passed' | 'super' | null>(null);
  const [matchPopup, setMatchPopup] = useState<MatchProfile | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activeScreen, setActiveScreen] = useState<'cards' | 'chat'>('cards');

  const currentProfile = PROFILES[profileIndex % PROFILES.length];

  const triggerMatchCelebration = (matched: MatchProfile) => {
    sound.playSuccess();
    setMatchPopup(matched);

    // Confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff2a6d', '#05d9e8', '#ffffff', '#ff9900'],
      });
    } catch {}
  };

  const handleSwipe = (action: 'liked' | 'passed' | 'super') => {
    sound.playClick();
    setLastAction(action);

    if (action === 'liked' || action === 'super') {
      triggerMatchCelebration(currentProfile);
    }

    setTimeout(() => {
      setProfileIndex((prev) => prev + 1);
      setLastAction(null);
    }, 300);
  };

  const handleDownloadApk = () => {
    if (downloading) return;
    sound.playClick();
    setDownloading(true);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          sound.playSuccess();
          // Create dummy APK download trigger
          const blob = new Blob(
            ['Anurag Jha - Spark Dating App (React Native Expo Production Build Release v1.4)'],
            { type: 'application/vnd.android.package-archive' }
          );
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Spark_Dating_v1.4_arm64.apk';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row text-slate-100 overflow-hidden text-xs sm:text-sm">
      {/* Center / Left Phone Simulator Canvas */}
      <div className="flex-1 p-4 sm:p-6 flex items-center justify-center bg-radial from-slate-900 to-black overflow-y-auto">
        {/* Realistic Smartphone Mockup */}
        <div className="relative w-[320px] h-[610px] rounded-[48px] bg-black p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(244,63,94,0.25)] border-4 border-slate-700/80 flex flex-col shrink-0">
          {/* Outer edge mute / volume buttons simulation */}
          <div className="absolute -left-5 top-20 w-1 h-8 bg-slate-700 rounded-l"></div>
          <div className="absolute -left-5 top-32 w-1 h-12 bg-slate-700 rounded-l"></div>
          <div className="absolute -right-5 top-24 w-1 h-14 bg-slate-700 rounded-r"></div>

          {/* Screen area with rounded corners */}
          <div className="relative flex-1 rounded-[38px] overflow-hidden bg-slate-950 flex flex-col border border-white/10">
            {/* Dynamic Island & Status Bar */}
            <div className="h-9 px-6 pt-2 flex items-center justify-between z-30 bg-transparent text-[10px] text-white font-mono select-none">
              <span>9:41</span>
              {/* Dynamic Island pill */}
              <div className="h-5 w-24 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-[9px] text-rose-300 font-sans">Spark 60fps</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[9px]">5G</span>
                <span className="text-[10px]">100%</span>
              </div>
            </div>

            {/* In-App Navigation Bar */}
            <div className="h-10 px-4 flex items-center justify-between border-b border-white/10 bg-slate-900/60 shrink-0">
              <div className="flex items-center gap-1.5 text-rose-400 font-black tracking-wider text-sm">
                <Flame className="w-5 h-5 fill-rose-500" />
                <span>SPARK</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveScreen('cards');
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                    activeScreen === 'cards' ? 'bg-rose-500 text-white' : 'text-slate-400'
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveScreen('chat');
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                    activeScreen === 'chat' ? 'bg-rose-500 text-white' : 'text-slate-400'
                  }`}
                >
                  Chat (2)
                </button>
              </div>
            </div>

            {/* Screen Content: Tinder-style Card Stack */}
            {activeScreen === 'cards' ? (
              <div className="flex-1 relative p-3 flex flex-col justify-between overflow-hidden">
                {/* Match Popup Overlay */}
                {matchPopup && (
                  <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95">
                    <Sparkles className="w-10 h-10 text-rose-400 mb-2 animate-bounce" />
                    <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                      IT&apos;S A SPARK!
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      You and {matchPopup.name} matched on the real-time websocket cluster.
                    </p>
                    <div className="my-4 p-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-3xl">
                      {matchPopup.avatarEmoji}
                    </div>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setMatchPopup(null);
                        setActiveScreen('chat');
                      }}
                      className="w-full py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs transition cursor-pointer shadow-lg shadow-rose-500/30"
                    >
                      Send Direct Message
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setMatchPopup(null);
                      }}
                      className="mt-2 text-xs text-slate-400 hover:text-white"
                    >
                      Keep Swiping
                    </button>
                  </div>
                )}

                {/* Profile Card */}
                <div
                  className={`relative flex-1 rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-br ${currentProfile.gradient} text-white shadow-xl transition-all duration-300 ${
                    lastAction === 'liked'
                      ? 'translate-x-12 rotate-6 opacity-40'
                      : lastAction === 'passed'
                      ? '-translate-x-12 -rotate-6 opacity-40'
                      : ''
                  }`}
                >
                  {/* Top card pill info */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-[10px] font-medium">
                      {currentProfile.distance}
                    </span>
                    <span className="text-3xl">{currentProfile.avatarEmoji}</span>
                  </div>

                  {/* Profile info */}
                  <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    <div className="flex items-baseline gap-1.5 font-bold text-base">
                      <span>{currentProfile.name}</span>
                      <span className="text-sm font-normal opacity-90">{currentProfile.age}</span>
                    </div>
                    <div className="text-[11px] text-rose-200 mt-0.5">{currentProfile.role}</div>
                    <p className="text-[10px] text-white/90 mt-1 leading-snug line-clamp-3">
                      {currentProfile.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {currentProfile.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Controls Bar */}
                <div className="h-16 pt-2 flex items-center justify-around shrink-0 select-none">
                  {/* Pass */}
                  <button
                    onClick={() => handleSwipe('passed')}
                    className="p-3 rounded-full bg-slate-900 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition shadow-lg cursor-pointer hover:scale-110 active:scale-95"
                    title="Pass"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Super Like */}
                  <button
                    onClick={() => handleSwipe('super')}
                    className="p-2.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition shadow-lg cursor-pointer hover:scale-110 active:scale-95"
                    title="Super Like"
                  >
                    <Star className="w-4 h-4" />
                  </button>

                  {/* Like */}
                  <button
                    onClick={() => handleSwipe('liked')}
                    className="p-3 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition shadow-lg cursor-pointer hover:scale-110 active:scale-95"
                    title="Like / Match"
                  >
                    <Heart className="w-5 h-5 fill-emerald-400/30 hover:fill-white" />
                  </button>
                </div>
              </div>
            ) : (
              /* Chat Screen */
              <div className="flex-1 flex flex-col p-3 justify-between bg-slate-950">
                <div className="space-y-2 overflow-y-auto custom-scrollbar">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-pink-600 flex items-center justify-center text-lg">
                      👩‍🎨
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span>Aarohi</span>
                        <span className="text-[9px] text-slate-500 font-normal">2m ago</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">
                        Loved Anurag&apos;s UI stack! Is that Tailwind v4 + Next.js?
                      </p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-lg">
                      🧑‍💻
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span>Rohan</span>
                        <span className="text-[9px] text-slate-500 font-normal">1h ago</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">
                        The 60 FPS gesture responsiveness in Spark is super slick!
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveScreen('cards');
                  }}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return to Discovery Cards</span>
                </button>
              </div>
            )}

            {/* Home indicator bar */}
            <div className="h-4 flex items-center justify-center pb-1">
              <div className="w-24 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Details & Fast Download Sidebar */}
      <div className="w-full lg:w-96 bg-slate-950/80 border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>React Native & Expo Project</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">{project.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{project.tagline}</p>
        </div>

        {/* Action 1: Fast Direct APK Download */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/40 to-slate-900/60 border border-rose-500/30 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white text-xs">Direct Fast APK Download</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              v1.4 • 32.4 MB
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            One-click standalone Android APK binary compiled via automated Expo Application Services (EAS) pipeline.
          </p>
          <button
            onClick={handleDownloadApk}
            disabled={downloading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? `Downloading APK (${downloadProgress}%)` : 'Download Standalone APK'}</span>
          </button>
          {downloading && (
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-400 transition-all duration-200"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Action 2: Scannable Expo Go QR Code */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10 flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>Scan with Expo Go (Physical Device)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Open camera on iPhone or Expo Go on Android to preview the live build instantly.
          </p>

          {/* Clean High-Tech SVG QR Mockup */}
          <div className="p-2.5 bg-white rounded-xl shadow-md my-1">
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              {/* Corner position markers */}
              <rect x="10" y="10" width="24" height="24" fill="#000" rx="3" />
              <rect x="14" y="14" width="16" height="16" fill="#fff" rx="2" />
              <rect x="18" y="18" width="8" height="8" fill="#000" rx="1" />

              <rect x="66" y="10" width="24" height="24" fill="#000" rx="3" />
              <rect x="70" y="14" width="16" height="16" fill="#fff" rx="2" />
              <rect x="74" y="18" width="8" height="8" fill="#000" rx="1" />

              <rect x="10" y="66" width="24" height="24" fill="#000" rx="3" />
              <rect x="14" y="70" width="16" height="16" fill="#fff" rx="2" />
              <rect x="18" y="74" width="8" height="8" fill="#000" rx="1" />

              {/* Data modules */}
              <rect x="42" y="15" width="6" height="6" fill="#000" />
              <rect x="52" y="18" width="6" height="6" fill="#000" />
              <rect x="45" y="30" width="6" height="6" fill="#000" />
              <rect x="55" y="38" width="6" height="6" fill="#000" />
              <rect x="15" y="45" width="6" height="6" fill="#000" />
              <rect x="25" y="52" width="6" height="6" fill="#000" />
              <rect x="42" y="48" width="8" height="8" fill="#f43f5e" rx="1" />
              <rect x="68" y="46" width="6" height="6" fill="#000" />
              <rect x="78" y="55" width="6" height="6" fill="#000" />
              <rect x="44" y="68" width="6" height="6" fill="#000" />
              <rect x="54" y="76" width="6" height="6" fill="#000" />
              <rect x="66" y="68" width="6" height="6" fill="#000" />
              <rect x="78" y="80" width="6" height="6" fill="#000" />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">exp://u.expo.dev/anuragjha/spark-app</span>
        </div>

        {/* Technical Architecture Specs */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Architecture Highlights
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-start gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span className="text-xs text-slate-300">
                <strong>60 FPS Gesture Engine</strong>: Powered by React Native Reanimated 3 with UI-thread gesture interception.
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-start gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
              <span className="text-xs text-slate-300">
                <strong>State & WebSockets</strong>: Redux Toolkit for offline caching and real-time match synchronization.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
