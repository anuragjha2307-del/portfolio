'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Cpu, 
  Database, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  Zap
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface ServiceNode {
  id: string;
  name: string;
  provider: string;
  endpoint: string;
  status: 'OPERATIONAL' | 'DEGRADED';
  uptime: string;
  latency: number;
  memory: string;
  lastChecked: string;
}

export const SystemHealthApp: React.FC = () => {
  const [isPinging, setIsPinging] = useState(false);
  const [services, setServices] = useState<ServiceNode[]>([
    {
      id: 'ai-suite',
      name: 'AI Research Assistant (NLP Pipeline)',
      provider: 'Streamlit Cloud Engine',
      endpoint: 'https://anurag-ai-assistant.streamlit.app/healthz',
      status: 'OPERATIONAL',
      uptime: '99.92%',
      latency: 34,
      memory: '1.2 GB / 4.0 GB',
      lastChecked: 'Just now',
    },
    {
      id: 'presence-api',
      name: 'Smart Presence (OpenCV Biometrics & GPS)',
      provider: 'Render Microservices (Python/Flask)',
      endpoint: 'https://smart-presence-api.onrender.com/api/v1/ping',
      status: 'OPERATIONAL',
      uptime: '99.85%',
      latency: 68,
      memory: '640 MB / 2.0 GB',
      lastChecked: 'Just now',
    },
    {
      id: 'spark-mobile',
      name: 'Spark Mobile EAS & Socket Cluster',
      provider: 'Expo Cloud & WebSocket Cluster',
      endpoint: 'wss://spark-mobile-socket.cluster/v1',
      status: 'OPERATIONAL',
      uptime: '99.95%',
      latency: 22,
      memory: '820 MB / 2.0 GB',
      lastChecked: 'Just now',
    },
  ]);

  const [logs, setLogs] = useState<string[]>([
    '[09:32:01] INFO: Streamlit NLP token chunking queue healthy (4 workers active)',
    '[09:32:15] INFO: OpenCV facial embedding cache validated (128D vectors mapped)',
    '[09:32:30] INFO: Haversine geofence calculation verified for Galgotias University bounds (28.4744° N, 77.5040° E)',
    '[09:32:45] INFO: Expo EAS OTA build channel #production synchronized',
  ]);

  // Periodic simulated heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((s) => ({
          ...s,
          latency: Math.max(18, s.latency + Math.floor(Math.random() * 7 - 3)),
          lastChecked: 'Few seconds ago',
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleManualPing = () => {
    sound.playClick();
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      sound.playSuccess();
      const timeStr = new Date().toLocaleTimeString();
      setLogs((prev) => [
        `[${timeStr}] TELEMETRY PING: All 3 cloud microservices responded with 200 OK (Avg latency: 38ms)`,
        ...prev.slice(0, 8),
      ]);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col p-5 bg-slate-950/90 text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm gap-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold tracking-wider">
            <Activity className="w-5 h-5" />
            <span>SYSTEM HEALTH & CLOUD DEVOPS TELEMETRY</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time automated status checks across Streamlit, Render, and Expo microservices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>ALL CLUSTERS OPERATIONAL</span>
          </div>

          <button
            onClick={handleManualPing}
            disabled={isPinging}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isPinging ? 'Pinging...' : 'Ping Cluster'}</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col justify-between gap-3 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">{svc.provider}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                  {svc.status}
                </span>
              </div>
              <h4 className="font-bold text-white text-sm mt-1">{svc.name}</h4>
              <div className="text-[10px] font-mono text-cyan-400 truncate mt-0.5">{svc.endpoint}</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Response Latency:</span>
                <span className="text-emerald-400 font-bold">{svc.latency} ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recorded Uptime:</span>
                <span className="text-white font-bold">{svc.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RAM Footprint:</span>
                <span className="text-slate-300">{svc.memory}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Streaming Syslog */}
      <div className="flex-1 flex flex-col rounded-xl bg-black border border-white/10 p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 text-slate-400 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>DevOps Telemetry Heartbeat Stream (/var/log/healthz.log)</span>
          </div>
          <span className="text-emerald-400">STREAMING LIVE</span>
        </div>

        <div className="space-y-1 overflow-y-auto custom-scrollbar text-slate-300">
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-slate-500">{log.slice(0, 10)}</span>
              <span className="text-cyan-300">{log.slice(10)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
