'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Code, 
  Calendar, 
  Smartphone, 
  FileText,
  User,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { AppId } from '@/types/os';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface CopilotProps {
  onOpenApp: (id: AppId) => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
  actionButton?: {
    label: string;
    targetApp: AppId;
  };
}

export const PortfolioCopilot: React.FC<CopilotProps> = ({ onOpenApp }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "👋 Hi! I'm Anurag's Portfolio AI Copilot. I'm trained on his complete technical background, engineering projects, and work experience.\n\nAsk me anything like:\n• \"What tech stack does Anurag use for backend?\"\n• \"Show me his mobile development work (Spark)\"\n• \"Tell me about his ML internship at EduSkills\"\n• \"Schedule an interview with Anurag\"",
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    { label: 'Backend Tech Stack', query: 'What tech stack does Anurag use for backend?' },
    { label: 'Show Mobile Work (Spark)', query: 'Show me his mobile development work' },
    { label: 'Biometric Attendance Details', query: 'How does his biometric attendance system work?' },
    { label: 'Schedule an Interview', query: 'I want to schedule an interview with Anurag' },
    { label: 'EduSkills ML Internship', query: 'What did Anurag do at EduSkills Academy?' },
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    sound.playClick();
    const userMsg: Message = {
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = '';
      let actionBtn: { label: string; targetApp: AppId } | undefined = undefined;

      if (q.includes('backend') || q.includes('database') || q.includes('api')) {
        reply = `**Backend & Distributed Architecture:**\nAnurag specializes in high-throughput Python backends using **Flask REST APIs**, sub-second latency endpoints, and strict security validation. For data persistence, he works with **PostgreSQL**, **MySQL**, and **MongoDB** with solid schema design and indexing. He also implements dynamic **TOTP authentication** and automated **CI/CD pipelines** via GitHub Actions.`;
        actionBtn = { label: 'Explore Architecture Radar', targetApp: 'tech-radar' };
      } else if (q.includes('mobile') || q.includes('spark') || q.includes('react native') || q.includes('expo') || q.includes('apk')) {
        reply = `**Mobile Development Work (Spark Dating App):**\nAnurag built the **Spark Dating App** using **React Native**, **Expo EAS**, and **Reanimated 3**. It features buttery-smooth 60 FPS gesture-driven swipe cards, real-time WebSocket match events, and Redux Toolkit state caching. You can test the interactive phone simulator right now or download the standalone APK!`;
        actionBtn = { label: 'Launch Spark Mobile Simulator', targetApp: 'spark-mobile' };
      } else if (q.includes('biometric') || q.includes('presence') || q.includes('qr') || q.includes('attendance') || q.includes('opencv')) {
        reply = `**Smart Presence (Biometric & Geofenced Security):**\nAnurag engineered an enterprise attendance platform utilizing **OpenCV Deep Learning face embeddings** (128-dimensional biometric vectors) to eliminate proxy check-ins, combined with **Haversine spherical GPS geofencing** and rolling 30-second **TOTP dynamic QR codes**.`;
        actionBtn = { label: 'Open Smart Presence Scanner', targetApp: 'smart-presence' };
      } else if (q.includes('intern') || q.includes('eduskills') || q.includes('experience')) {
        reply = `**EduSkills Academy (ML & Data Science Intern, June–Aug 2026):**\n• Architected automated Python/SQL data pipelines, reducing processing latency by **40%**.\n• Deployed predictive ML models via Flask REST APIs sustaining a **90% customer satisfaction rate**.\n• Optimized NLP/sentiment classification models boosting accuracy by **25%**.\n• Built interactive Power BI and Python dashboards increasing executive engagement by **30%**.`;
        actionBtn = { label: 'View Academic & Career Profile', targetApp: 'about' };
      } else if (q.includes('interview') || q.includes('schedule') || q.includes('hire') || q.includes('contact') || q.includes('reach')) {
        reply = `**Ready to connect with Anurag!**\nHe is currently open to AI Engineer, Full-Stack, and Mobile Developer opportunities. You can chat instantly with him on WhatsApp or pick a 15-minute discovery slot on his interactive calendar:`;
        actionBtn = { label: 'Open WhatsApp & Calendar Booking', targetApp: 'contact' };
      } else if (q.includes('resume') || q.includes('cv') || q.includes('ats')) {
        reply = `**Dynamic ATS Resume Studio:**\nAnurag's portfolio features an ATS tailor module that dynamically reorganizes his experience and skills for specific roles (AI/ML Engineer, Full-Stack Developer, or Mobile App Developer) and enables 1-click tailored PDF export.`;
        actionBtn = { label: 'Open ATS Resume Studio', targetApp: 'resume-studio' };
      } else {
        reply = `Anurag Jha is an MCA student at Galgotias University (Distinction) with proven capabilities spanning **AI/NLP Document Intelligence**, **Computer Vision Biometrics (OpenCV)**, **Full-Stack REST APIs (Flask, SQL)**, and **Mobile Engineering (React Native/Expo)**.\n\nFeel free to explore any of his live interactive project sandboxes!`;
        actionBtn = { label: 'View All Projects', targetApp: 'projects' };
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionButton: actionBtn,
        },
      ]);
      setIsTyping(false);
      sound.playSuccess();
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/90 text-slate-100 text-xs sm:text-sm">
      {/* Top Header */}
      <div className="p-3.5 border-b border-white/10 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xs sm:text-sm">Portfolio AI Copilot</h3>
            <p className="text-[10px] text-slate-400">Trained on Anurag Jha&apos;s Engineering Profile</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ONLINE</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-mono">
              <span>{m.role === 'user' ? 'Recruiter' : 'AI Copilot'}</span>
              <span>•</span>
              <span>{m.time}</span>
            </div>
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed text-xs sm:text-sm ${
                m.role === 'user'
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 shadow-md'
              }`}
            >
              <div className="whitespace-pre-line font-sans">{m.text}</div>

              {/* Action Button trigger if returned */}
              {m.actionButton && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenApp(m.actionButton!.targetApp);
                  }}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{m.actionButton.label}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-violet-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-ping"></span>
            <span>Copilot analyzing technical credentials...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Carousel */}
      <div className="p-2 border-t border-white/10 bg-slate-900/40 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.query)}
            className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-slate-300 hover:text-violet-300 text-[11px] whitespace-nowrap transition cursor-pointer"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-white/10 bg-black/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Anurag's experience, stack, or projects..."
            className="flex-1 bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 transition"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
