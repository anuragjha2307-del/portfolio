'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Play, 
  User, 
  FolderGit2, 
  Smartphone, 
  FileText,
  Clock,
  Compass
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { AppId } from '@/types/os';

interface RecruiterTourProps {
  onOpenApp: (id: AppId) => void;
}

interface TourStep {
  id: number;
  title: string;
  appId: AppId;
  badge: string;
  description: string;
  icon: React.ReactNode;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 1,
    title: 'Projects Directory & Hero Sandboxes',
    appId: 'projects',
    badge: 'STEP 1 OF 5',
    description: 'Explore Anurag\'s 3 flagship systems: AI NLP Research Assistant, Smart Presence Biometric Security, and Spark Dating App with interactive live sandboxes.',
    icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 2,
    title: 'Academics & ML Internship Credentials',
    appId: 'about',
    badge: 'STEP 2 OF 5',
    description: 'Galgotias University MCA (First Class Distinction, Zero Backlogs) + ML Intern at EduSkills Academy (optimized data pipelines, reducing processing latency by 40%).',
    icon: <User className="w-4 h-4 text-purple-400" />,
  },
  {
    id: 3,
    title: 'AI Research Assistant Suite (Streamlit)',
    appId: 'ai-assistant',
    badge: 'STEP 3 OF 5',
    description: 'Live NLP sandbox: Test automated literature review summaries, PyTorch vector embeddings, and 1-click IEEE LaTeX citation export.',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 4,
    title: 'Spark Dating App (React Native & Expo)',
    appId: 'spark-mobile',
    badge: 'STEP 4 OF 5',
    description: 'Interactive 3D smartphone simulator with 60fps gesture physics, match celebration confetti, and direct standalone Android APK download.',
    icon: <Smartphone className="w-4 h-4 text-rose-400" />,
  },
  {
    id: 5,
    title: 'ATS Resume Studio & Instant Booking',
    appId: 'resume-studio',
    badge: 'STEP 5 OF 5',
    description: 'Dynamically tailor Anurag\'s resume bullets for AI Engineer or Full-Stack roles, download ATS-optimized PDF, or start a 1-click WhatsApp chat.',
    icon: <FileText className="w-4 h-4 text-emerald-400" />,
  },
];

export const RecruiterTour: React.FC<RecruiterTourProps> = ({ onOpenApp }) => {
  const [showToast, setShowToast] = useState(false);
  const [inTour, setInTour] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Trigger tour start sequence: Projects window opens first, then About Me window opens smoothly!
  const triggerTourSequence = () => {
    sound.playSuccess();
    setShowToast(false);
    sessionStorage.setItem('anuragos_tour_prompted', 'true');
    setInTour(true);
    setCurrentStepIndex(0);

    // Smooth sequence: first open Projects Window
    onOpenApp('projects');

    // Smoothly sequence opening About Me window right after 450ms
    setTimeout(() => {
      onOpenApp('about');
    }, 450);
  };

  useEffect(() => {
    // Show welcome toast after 1.2s if not already seen in session
    const dismissed = sessionStorage.getItem('anuragos_tour_prompted');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to global tour trigger event from MenuBar, Sticky Notes, or Spotlight
  useEffect(() => {
    const handleGlobalStart = () => {
      triggerTourSequence();
    };
    window.addEventListener('start-anuragos-tour', handleGlobalStart);
    return () => window.removeEventListener('start-anuragos-tour', handleGlobalStart);
  }, []);

  const handleDismissToast = () => {
    sound.playClick();
    setShowToast(false);
    sessionStorage.setItem('anuragos_tour_prompted', 'true');
  };

  const handleNextStep = () => {
    sound.playClick();
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onOpenApp(TOUR_STEPS[nextIdx].appId);
    } else {
      // Completed tour -> Open Contact directly
      sound.playSuccess();
      setInTour(false);
      onOpenApp('contact');
    }
  };

  const handlePrevStep = () => {
    sound.playClick();
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onOpenApp(TOUR_STEPS[prevIdx].appId);
    }
  };

  const handleExitTour = () => {
    sound.playClose();
    setInTour(false);
  };

  const currentStep = TOUR_STEPS[currentStepIndex];

  return (
    <>
      {/* 1. First-Time Visitor Toast Prompt (Top subtle floating notification) */}
      {showToast && !inTour && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-auto max-w-2xl animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-950/95 p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(0,240,255,0.25)] backdrop-blur-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-100">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-black shrink-0 mt-0.5 shadow-md shadow-cyan-500/20">
                <Compass className="w-5 h-5 text-slate-950 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs sm:text-sm tracking-wide">Welcome to AnuragOS v2.4!</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> 60s Tour
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                  Click any icon or press <strong className="text-cyan-300 font-semibold">[Start Tour]</strong> to review my full-stack projects in 60 seconds.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-1 sm:pt-0">
              <button
                onClick={triggerTourSequence}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Start Tour</span>
              </button>
              <button
                onClick={handleDismissToast}
                className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Active Tour Guide Floating Control Bar */}
      {inTour && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[500px] animate-in zoom-in-95 duration-200 pointer-events-auto">
          <div className="rounded-2xl border border-cyan-400/50 bg-slate-950/95 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.25)] backdrop-blur-2xl text-slate-100 flex flex-col gap-3">
            {/* Step Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                {currentStep.icon}
                <span className="font-bold text-white text-xs sm:text-sm">{currentStep.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {currentStep.badge}
                </span>
              </div>
              <button
                onClick={handleExitTour}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                title="Exit Tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>

            {/* Progress Dots & Navigation Buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((s, idx) => (
                  <span
                    key={s.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStepIndex
                        ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                        : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {currentStepIndex > 0 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back</span>
                  </button>
                )}

                <button
                  onClick={handleNextStep}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish & Connect 🎉' : 'Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

