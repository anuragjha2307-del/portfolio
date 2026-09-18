'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  Play, 
  User, 
  FolderGit2, 
  Smartphone, 
  FileText,
  CalendarCheck
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
    title: 'Academics & ML Internship',
    appId: 'about',
    badge: 'STEP 1 OF 4',
    description: 'Anurag is an MCA candidate at Galgotias University (First Class Distinction, Zero backlogs). Reduced data processing time by 40% at EduSkills Academy.',
    icon: <User className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 2,
    title: 'AI Research Assistant Suite',
    appId: 'ai-assistant',
    badge: 'STEP 2 OF 4',
    description: 'Live Streamlit Cloud NLP sandbox. Experience automated literature summarization, PyTorch embeddings, and one-click IEEE LaTeX generation.',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 3,
    title: 'Spark Dating App Mobile Simulator',
    appId: 'spark-mobile',
    badge: 'STEP 3 OF 4',
    description: 'Interactive 3D smartphone simulator built with React Native & Expo. Test 60fps swipe physics, match confetti, and download the standalone APK.',
    icon: <Smartphone className="w-4 h-4 text-rose-400" />,
  },
  {
    id: 4,
    title: 'ATS Resume Studio & WhatsApp',
    appId: 'resume-studio',
    badge: 'STEP 4 OF 4',
    description: 'Tailor Anurag\'s resume for AI Engineer, Full-Stack, or Mobile roles with dynamic bullet re-ordering and 1-click tailored PDF export.',
    icon: <FileText className="w-4 h-4 text-emerald-400" />,
  },
];

export const RecruiterTour: React.FC<RecruiterTourProps> = ({ onOpenApp }) => {
  const [showToast, setShowToast] = useState(false);
  const [inTour, setInTour] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Show welcome toast after 1.5 seconds if not dismissed in session
    const dismissed = sessionStorage.getItem('anuragos_tour_prompted');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStartTour = () => {
    sound.playSuccess();
    setShowToast(false);
    sessionStorage.setItem('anuragos_tour_prompted', 'true');
    setInTour(true);
    setCurrentStepIndex(0);
    onOpenApp(TOUR_STEPS[0].appId);
  };

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
      // Completed tour!
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
      {/* 1. First-Time Visitor Welcome Toast Prompt */}
      {showToast && !inTour && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto max-w-lg animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto">
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-950/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)] backdrop-blur-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-100">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 text-black shrink-0 mt-0.5 sm:mt-0">
                <Sparkles className="w-5 h-5 fill-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs sm:text-sm">Welcome to AnuragOS v2.4!</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    60s Tour
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  Review Anurag&apos;s full-stack AI, mobile, and security systems in 60 seconds with guided onboarding.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-1 sm:pt-0">
              <button
                onClick={handleStartTour}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Start Tour</span>
              </button>
              <button
                onClick={handleDismissToast}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
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
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[480px] animate-in zoom-in-95 duration-200 pointer-events-auto">
          <div className="rounded-2xl border border-cyan-400/50 bg-slate-950/95 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.25)] backdrop-blur-2xl text-slate-100 flex flex-col gap-3">
            {/* Step Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                {currentStep.icon}
                <span className="font-bold text-white text-xs sm:text-sm">{currentStep.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {currentStep.badge}
                </span>
              </div>
              <button
                onClick={handleExitTour}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                title="Exit Tour"
              >
                <X className="w-3.5 h-3.5" />
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
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-cyan-500/20"
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
