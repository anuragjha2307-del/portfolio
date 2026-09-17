'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Calendar, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { sound } from '@/lib/sound';
import { PERSONAL_INFO } from '@/data/portfolioData';

export const ContactApp: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('11:00 AM IST');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const days = ['Today (Urgent)', 'Tomorrow', 'Monday', 'Tuesday'];
  const slots = ['10:00 AM IST', '11:00 AM IST', '02:30 PM IST', '04:00 PM IST', '06:00 PM IST'];

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterName.trim() || !recruiterEmail.trim()) return;

    sound.playSuccess();
    setBookingConfirmed(true);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm">
      {/* Left Column: Direct WhatsApp & Instant Channels */}
      <div className="w-full lg:w-96 bg-slate-950/80 border-b lg:border-b-0 lg:border-l-0 lg:border-r border-white/10 p-5 flex flex-col gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold tracking-wider">
            <MessageSquare className="w-5 h-5" />
            <span>DIRECT CONNECT FLOW</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Skip bureaucratic recruitment loops. Reach Anurag Jha directly on WhatsApp or mobile.
          </p>
        </div>

        {/* 1-Click WhatsApp Direct Chat */}
        <a
          href={PERSONAL_INFO.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-black/20 text-white">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-extrabold">Quick Chat on WhatsApp</div>
              <div className="text-[11px] text-emerald-100 font-normal">Pre-filled greeting • Instant response</div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition" />
        </a>

        {/* Quick Contact Cards */}
        <div className="space-y-2">
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            onClick={() => sound.playClick()}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <div className="flex-1">
              <div className="text-[10px] text-slate-400">Mobile Phone</div>
              <div className="font-mono text-white text-xs">{PERSONAL_INFO.phone}</div>
            </div>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => sound.playClick()}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition"
          >
            <Mail className="w-4 h-4 text-rose-400" />
            <div className="flex-1">
              <div className="text-[10px] text-slate-400">Direct Email</div>
              <div className="font-mono text-white text-xs">{PERSONAL_INFO.email}</div>
            </div>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-400" />
            <div className="flex-1">
              <div className="text-[10px] text-slate-400">LinkedIn Profile</div>
              <div className="text-white text-xs">linkedin.com/in/anurag-jha-379520257</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition"
          >
            <GithubIcon className="w-4 h-4 text-purple-400" />
            <div className="flex-1">
              <div className="text-[10px] text-slate-400">GitHub Code Repositories</div>
              <div className="text-white text-xs">github.com/anuragjha2307-del</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Right Column: 15-Minute Discovery Interview Scheduler */}
      <div className="flex-1 p-5 sm:p-6 bg-slate-900/40 flex flex-col justify-between">
        {bookingConfirmed ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-950/80 rounded-2xl border border-emerald-500/40 shadow-2xl">
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-white">Interview Confirmed!</h3>
            <p className="text-xs text-slate-300 max-w-md mt-2 leading-relaxed">
              Thanks <strong>{recruiterName}</strong>! A 15-minute discovery call has been penciled in for{' '}
              <strong className="text-emerald-400">{selectedDay} at {selectedTime}</strong>.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
              Calendar invite sent to: <span className="text-cyan-400">{recruiterEmail}</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setBookingConfirmed(false);
              }}
              className="mt-6 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition"
            >
              Schedule Another Slot
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookMeeting} className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>SCHEDULE 15-MIN INTERVIEW / DISCOVERY CALL</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pick a slot for a technical alignment call or exploratory discussion.
              </p>
            </div>

            {/* Select Day */}
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                1. Select Preferred Day
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {days.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => {
                      sound.playClick();
                      setSelectedDay(d);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                      selectedDay === d
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                2. Select Time Window
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => {
                      sound.playClick();
                      setSelectedTime(t);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-mono transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedTime === t
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recruiter Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  placeholder="e.g. Sundar Pichai (Google)"
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Your Work Email
                </label>
                <input
                  type="email"
                  required
                  value={recruiterEmail}
                  onChange={(e) => setRecruiterEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Confirm 15-Minute Interview Slot ({selectedDay} • {selectedTime})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
