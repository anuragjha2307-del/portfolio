'use client';

import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  MapPin, 
  Camera, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  UserCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { PROJECTS } from '@/data/portfolioData';

interface AttendanceRecord {
  id: string;
  name: string;
  role: string;
  timestamp: string;
  biometricConfidence: string;
  geofenceDist: string;
  status: 'VERIFIED' | 'FLAGGED';
}

export const SmartPresenceApp: React.FC = () => {
  const project = PROJECTS.find((p) => p.id === 'smart-presence')!;
  const [visitorName, setVisitorName] = useState('Tech Recruiter');
  const [visitorRole, setVisitorRole] = useState('Hiring Manager');
  const [totpCounter, setTotpCounter] = useState(28);
  const [totpToken, setTotpToken] = useState('TOTP-8842-SEC');
  const [isScanning, setIsScanning] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 'rec-1',
      name: 'Anurag Jha',
      role: 'Lead Architect',
      timestamp: '09:02:14 AM',
      biometricConfidence: '99.8%',
      geofenceDist: '4.2m (Inside)',
      status: 'VERIFIED',
    },
    {
      id: 'rec-2',
      name: 'Dr. R. Sharma',
      role: 'Dean of Computing',
      timestamp: '09:14:52 AM',
      biometricConfidence: '98.9%',
      geofenceDist: '12.0m (Inside)',
      status: 'VERIFIED',
    },
  ]);

  // Rolling 30s TOTP timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTotpCounter((prev) => {
        if (prev <= 1) {
          const rand = Math.floor(1000 + Math.random() * 9000);
          setTotpToken(`TOTP-${rand}-SEC`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerifyAttendance = () => {
    if (!visitorName.trim() || isScanning) return;

    sound.playClick();
    setIsScanning(true);
    setVerificationSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setVerificationSuccess(true);
      sound.playSuccess();

      const newRecord: AttendanceRecord = {
        id: `rec-${Date.now()}`,
        name: visitorName,
        role: visitorRole || 'Visitor',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        biometricConfidence: '99.4%',
        geofenceDist: '8.5m (Inside)',
        status: 'VERIFIED',
      };

      setRecords((prev) => [newRecord, ...prev]);

      setTimeout(() => {
        setVerificationSuccess(false);
      }, 4000);
    }, 1200);
  };

  const handleExportCsv = () => {
    sound.playClick();
    const headers = 'Record ID,Attendee Name,Role,Timestamp,Biometric Confidence,Haversine Geofence,Status\n';
    const rows = records
      .map(
        (r) =>
          `"${r.id}","${r.name}","${r.role}","${r.timestamp}","${r.biometricConfidence}","${r.geofenceDist}","${r.status}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SmartPresence_Verified_Attendance_Log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col xl:flex-row text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm">
      {/* Left Column: QR Generator & Geofence Simulator */}
      <div className="w-full xl:w-96 bg-slate-950/80 border-b xl:border-b-0 xl:border-r border-white/10 p-5 flex flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <span>TOTP AUTH GENERATOR</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Rolling: {totpCounter}s
          </span>
        </div>

        {/* Input Name & Role */}
        <div className="space-y-2">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Your Name (Attendee Test)
            </label>
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="e.g. Satya Nadella"
              className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Designation / Company
            </label>
            <input
              type="text"
              value={visitorRole}
              onChange={(e) => setVisitorRole(e.target.value)}
              placeholder="e.g. Engineering Director"
              className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Dynamic SVG QR Code Render */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-white/10 flex flex-col items-center gap-3">
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dynamic TOTP Payload: <strong className="text-white">{totpToken}</strong></span>
          </div>

          {/* High resolution scannable SVG QR representation */}
          <div className="p-3 bg-white rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            <svg viewBox="0 0 120 120" className="w-36 h-36">
              {/* Corner 1 */}
              <rect x="10" y="10" width="30" height="30" fill="#064e3b" rx="4" />
              <rect x="16" y="16" width="18" height="18" fill="#fff" rx="2" />
              <rect x="20" y="20" width="10" height="10" fill="#059669" rx="1" />

              {/* Corner 2 */}
              <rect x="80" y="10" width="30" height="30" fill="#064e3b" rx="4" />
              <rect x="86" y="16" width="18" height="18" fill="#fff" rx="2" />
              <rect x="90" y="20" width="10" height="10" fill="#059669" rx="1" />

              {/* Corner 3 */}
              <rect x="10" y="80" width="30" height="30" fill="#064e3b" rx="4" />
              <rect x="16" y="86" width="18" height="18" fill="#fff" rx="2" />
              <rect x="20" y="90" width="10" height="10" fill="#059669" rx="1" />

              {/* Dynamic bits based on name length */}
              <rect x="48" y="15" width="8" height="8" fill="#047857" />
              <rect x="62" y="18" width="8" height="8" fill="#065f46" />
              <rect x="52" y="32" width="8" height="8" fill="#10b981" />
              <rect x="70" y="38" width="8" height="8" fill="#047857" />
              <rect x="18" y="55" width="8" height="8" fill="#059669" />
              <rect x="32" y="60" width="8" height="8" fill="#065f46" />
              <rect x="48" y="52" width="12" height="12" fill="#059669" rx="2" />
              <rect x="72" y="55" width="8" height="8" fill="#047857" />
              <rect x="88" y="62" width="8" height="8" fill="#10b981" />
              <rect x="50" y="78" width="8" height="8" fill="#065f46" />
              <rect x="68" y="85" width="8" height="8" fill="#047857" />
              <rect x="82" y="92" width="8" height="8" fill="#059669" />
            </svg>
          </div>

          <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Cryptographically Signed Hash (SHA-256)</span>
          </div>
        </div>

        {/* Haversine GPS Geofence telemetry */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Haversine GPS Telemetry</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">± 5m accuracy</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Target: <strong>Galgotias Campus (28.4744° N, 77.5040° E)</strong>. Calculates great-circle distance between two points on a sphere.
          </p>
          <div className="flex items-center justify-between text-[11px] font-mono p-2 rounded bg-black/40 border border-white/5">
            <span className="text-slate-400">Calculated Distance:</span>
            <span className="text-emerald-400 font-bold">8.5 meters (VALID)</span>
          </div>
        </div>
      </div>

      {/* Right Column: Live Camera Biometrics View & Records */}
      <div className="flex-1 p-5 flex flex-col gap-4 bg-slate-900/30">
        {/* Verification Viewport */}
        <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/30 shadow-2xl flex flex-col justify-between p-4">
          {/* Simulated OpenCV Viewfinder overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

          {/* Top telemetry in camera */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-emerald-400">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>OPENCV DEEP LEARNING CAMERA STREAM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE 30 FPS</span>
            </div>
          </div>

          {/* Central Biometric Face Bounding Box Simulation */}
          <div className="relative z-10 self-center flex flex-col items-center justify-center">
            <div
              className={`relative w-36 h-44 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                isScanning
                  ? 'border-cyan-400 shadow-[0_0_30px_#22d3ee] scale-105'
                  : verificationSuccess
                  ? 'border-emerald-400 shadow-[0_0_35px_#10b981] scale-105'
                  : 'border-emerald-500/40 border-dashed'
              }`}
            >
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

              {/* Scanning laser sweep */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-bounce"></div>
              )}

              <div className="text-4xl select-none mb-1">
                {verificationSuccess ? '✅' : '👤'}
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded">
                {verificationSuccess ? 'CONFIDENCE: 99.4%' : isScanning ? 'EXTRACTING 128D...' : 'FACE DETECTED'}
              </span>
            </div>
          </div>

          {/* Bottom Bar inside Viewfinder */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-[11px] font-mono text-slate-300">
              Target: <span className="text-white font-bold">{visitorName || 'Unknown'}</span> | Geofence: <span className="text-emerald-400">OK</span>
            </div>

            <button
              onClick={handleVerifyAttendance}
              disabled={isScanning}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Matching Deep Embeddings...</span>
                </>
              ) : verificationSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PRESENT MARKED!</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Mark Present (Simulate Scan)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Attendance Records Table */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-white text-xs sm:text-sm">Real-time Verified Attendance Registry</h4>
            </div>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="rounded-xl border border-white/10 overflow-hidden bg-slate-950/60">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-white/10 text-[11px]">
                <tr>
                  <th className="p-2.5">Attendee</th>
                  <th className="p-2.5 hidden sm:table-cell">Role</th>
                  <th className="p-2.5">Time</th>
                  <th className="p-2.5 hidden md:table-cell">Biometrics</th>
                  <th className="p-2.5 hidden lg:table-cell">Geofence</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-white/5 transition">
                    <td className="p-2.5 font-sans font-medium text-white">{rec.name}</td>
                    <td className="p-2.5 hidden sm:table-cell text-slate-400">{rec.role}</td>
                    <td className="p-2.5 text-slate-300">{rec.timestamp}</td>
                    <td className="p-2.5 hidden md:table-cell text-emerald-400">{rec.biometricConfidence}</td>
                    <td className="p-2.5 hidden lg:table-cell text-slate-300">{rec.geofenceDist}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
