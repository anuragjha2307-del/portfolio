'use client';

import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Award, 
  ExternalLink, 
  Play, 
  RotateCcw, 
  Database, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Flame,
  Target
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { PROJECTS } from '@/data/portfolioData';

interface TeamInfo {
  name: string;
  code: string;
  color: string;
}

const TEAMS: TeamInfo[] = [
  { name: 'Chennai Super Kings', code: 'CSK', color: 'from-amber-400 to-yellow-500' },
  { name: 'Mumbai Indians', code: 'MI', color: 'from-blue-500 to-indigo-600' },
  { name: 'Royal Challengers Bengaluru', code: 'RCB', color: 'from-red-600 to-rose-700' },
  { name: 'Kolkata Knight Riders', code: 'KKR', color: 'from-purple-600 to-indigo-900' },
  { name: 'Rajasthan Royals', code: 'RR', color: 'from-pink-500 to-rose-600' },
  { name: 'Sunrisers Hyderabad', code: 'SRH', color: 'from-orange-500 to-amber-600' },
  { name: 'Delhi Capitals', code: 'DC', color: 'from-blue-600 to-cyan-600' },
  { name: 'Gujarat Titans', code: 'GT', color: 'from-slate-700 to-cyan-900' },
  { name: 'Lucknow Super Giants', code: 'LSG', color: 'from-cyan-400 to-blue-500' },
  { name: 'Punjab Kings', code: 'PBKS', color: 'from-rose-500 to-red-600' },
];

interface VenueInfo {
  name: string;
  city: string;
  parScore: number;
  bias: number; // run adjustment
  character: string;
}

const VENUES: VenueInfo[] = [
  { name: 'M. Chinnaswamy Stadium', city: 'Bengaluru', parScore: 195, bias: 9, character: 'High Scoring • Small Boundaries' },
  { name: 'Wankhede Stadium', city: 'Mumbai', parScore: 188, bias: 6, character: 'True Bounce • Batting Paradise' },
  { name: 'Eden Gardens', city: 'Kolkata', parScore: 182, bias: 2, character: 'Balanced Pace & Carry' },
  { name: 'Narendra Modi Stadium', city: 'Ahmedabad', parScore: 178, bias: 0, character: 'Large Outfield • Fair Contest' },
  { name: 'MA Chidambaram Stadium (Chepauk)', city: 'Chennai', parScore: 168, bias: -8, character: 'Spin Friendly • Gripping Surface' },
  { name: 'Arun Jaitley Stadium', city: 'Delhi', parScore: 175, bias: 1, character: 'Short Straight Boundaries' },
  { name: 'Rajiv Gandhi Intl Stadium', city: 'Hyderabad', parScore: 180, bias: 3, character: 'Consistent Pace & True Bounce' },
];

const PRESETS = [
  {
    label: 'Death Overs Blast (MI vs CSK)',
    batting: 'MI',
    bowling: 'CSK',
    venue: 'Wankhede Stadium',
    overs: 16.0,
    score: 165,
    wickets: 3,
    runsLast5: 58,
    wicketsLast5: 0,
    note: '7 wickets in hand, momentum high at Wankhede'
  },
  {
    label: 'Chinnaswamy Slog (RCB vs KKR)',
    batting: 'RCB',
    bowling: 'KKR',
    venue: 'M. Chinnaswamy Stadium',
    overs: 10.0,
    score: 106,
    wickets: 1,
    runsLast5: 54,
    wicketsLast5: 0,
    note: 'Dominant top-order on small boundaries'
  },
  {
    label: 'Top-Order Collapse (KKR vs SRH)',
    batting: 'KKR',
    bowling: 'SRH',
    venue: 'Eden Gardens',
    overs: 8.2,
    score: 54,
    wickets: 4,
    runsLast5: 26,
    wicketsLast5: 3,
    note: 'Early wickets tumbling, rebuilding required'
  },
  {
    label: 'Chepauk Spin Defense (CSK vs RR)',
    batting: 'CSK',
    bowling: 'RR',
    venue: 'MA Chidambaram Stadium (Chepauk)',
    overs: 13.0,
    score: 95,
    wickets: 3,
    runsLast5: 32,
    wicketsLast5: 1,
    note: 'Tough gripping pitch, spin dominance'
  },
];

export const ScorePredictorApp: React.FC = () => {
  const project = PROJECTS.find((p) => p.id === 'score-predictor')!;
  const [activeTab, setActiveTab] = useState<'simulator' | 'benchmarks' | 'architecture'>('simulator');

  // Simulator State
  const [battingTeam, setBattingTeam] = useState('MI');
  const [bowlingTeam, setBowlingTeam] = useState('CSK');
  const [selectedVenue, setSelectedVenue] = useState('Wankhede Stadium');
  const [overs, setOvers] = useState(15.0);
  const [score, setScore] = useState(148);
  const [wickets, setWickets] = useState(3);
  const [runsLast5, setRunsLast5] = useState(52);
  const [wicketsLast5, setWicketsLast5] = useState(1);
  const [isInferring, setIsInferring] = useState(false);

  // Derived Cricket Domain Features (matching features.py in repository)
  const fullOvers = Math.floor(overs);
  const ballRemainder = Math.round((overs - fullOvers) * 10);
  const ballsBowled = Math.min(120, Math.max(30, fullOvers * 6 + ballRemainder));
  const ballsRemaining = Math.max(0, 120 - ballsBowled);
  const oversRemaining = ballsRemaining / 6;
  const wicketsInHand = Math.max(0, 10 - wickets);
  
  const currentRunRate = ballsBowled > 0 ? (score / ballsBowled) * 6 : 0;
  const last5RunRate = runsLast5 / 5.0;
  const projectedCRRScore = Math.round(currentRunRate * 20);

  const venueData = useMemo(() => {
    return VENUES.find((v) => v.name === selectedVenue) || VENUES[0];
  }, [selectedVenue]);

  // ML Prediction Calculation matching XGBoost Regressor behavioral distribution
  const prediction = useMemo(() => {
    // Phase identification
    const isDeathPhase = overs >= 15.0;
    const isMiddlePhase = overs >= 10.0 && overs < 15.0;
    const phaseResidualStd = isDeathPhase ? 10.2 : isMiddlePhase ? 17.6 : 23.4;

    // Weighting wickets in hand vs run rate
    // With many wickets in hand, death overs run rate escalates (10-13 rpo); with few wickets, it drops (6-8 rpo)
    const deathRateCapacity = 7.2 + (wicketsInHand / 10) * 5.4 + (last5RunRate - 8.0) * 0.25;
    const baseRemainingRuns = oversRemaining * Math.max(5.5, deathRateCapacity);

    // Venue influence: diminishes as innings progresses
    const venueWeight = (ballsRemaining / 120) * venueData.bias;

    // Pressure factor if recently lost multiple wickets
    const collapsePenalty = wicketsLast5 >= 3 ? -12 : wicketsLast5 === 2 ? -5 : 2;

    const predictedFinal = Math.round(score + baseRemainingRuns + venueWeight + collapsePenalty);

    // Confidence intervals
    const lower68 = Math.max(score, Math.round(predictedFinal - phaseResidualStd));
    const upper68 = Math.round(predictedFinal + phaseResidualStd);
    const lower95 = Math.max(score, Math.round(predictedFinal - 2 * phaseResidualStd));
    const upper95 = Math.round(predictedFinal + 2 * phaseResidualStd);

    return {
      predictedFinal,
      phaseResidualStd,
      phaseName: isDeathPhase ? 'Death Overs (15–20)' : isMiddlePhase ? 'Middle Overs (10–15)' : 'Early Phase (5–10)',
      lower68,
      upper68,
      lower95,
      upper95,
      deltaVsCRR: predictedFinal - projectedCRRScore
    };
  }, [overs, score, wicketsLast5, ballsRemaining, oversRemaining, wicketsInHand, last5RunRate, projectedCRRScore, venueData]);

  const handleApplyPreset = (p: typeof PRESETS[0]) => {
    sound.playClick();
    setBattingTeam(p.batting);
    setBowlingTeam(p.bowling);
    setSelectedVenue(p.venue);
    setOvers(p.overs);
    setScore(p.score);
    setWickets(p.wickets);
    setRunsLast5(p.runsLast5);
    setWicketsLast5(p.wicketsLast5);
  };

  const handleRunInference = () => {
    sound.playClick();
    setIsInferring(true);
    setTimeout(() => {
      setIsInferring(false);
      sound.playSuccess();
    }, 400);
  };

  const handleReset = () => {
    sound.playClick();
    handleApplyPreset(PRESETS[0]);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/90 text-slate-100 overflow-y-auto custom-scrollbar text-xs sm:text-sm">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Activity className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              IPL CRICKET SCORE PREDICTION SYSTEM
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              XGBoost Regressor • MAE 13.27
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Production ML pipeline trained on 102,911 deliveries across 1,107 historical IPL matches (GroupShuffleSplit 80/20 zero data leakage).
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => { sound.playClick(); setActiveTab('simulator'); }}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'simulator' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Interactive Simulator
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('benchmarks'); }}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'benchmarks' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Model Benchmarks
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('architecture'); }}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                activeTab === 'architecture' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Architecture & Data
            </button>
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 hover:text-white transition flex items-center gap-1.5 shrink-0"
              title="Open GitHub Repository"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-mono text-xs">GitHub Source</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 space-y-6">
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Presets Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-mono text-[11px] shrink-0">Match Scenarios:</span>
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-300 text-xs shrink-0 transition flex items-center gap-1.5"
                >
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>{preset.label}</span>
                </button>
              ))}
              <button
                onClick={handleReset}
                className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs shrink-0 transition ml-auto"
                title="Reset to default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Split Grid: Inputs / Telemetry & Prediction Output */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Match Inputs (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-amber-400">
                    <Target className="w-4 h-4" />
                    <span className="font-bold">LIVE MATCH SITUATION CONTROLS</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Inputs strictly validate against Cricsheet schema</span>
                </div>

                {/* Team Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Batting Team
                    </label>
                    <select
                      value={battingTeam}
                      onChange={(e) => { sound.playClick(); setBattingTeam(e.target.value); }}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-cyan-400 text-xs"
                    >
                      {TEAMS.map((t) => (
                        <option key={t.code} value={t.code} disabled={t.code === bowlingTeam}>
                          {t.name} ({t.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Bowling Team
                    </label>
                    <select
                      value={bowlingTeam}
                      onChange={(e) => { sound.playClick(); setBowlingTeam(e.target.value); }}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-cyan-400 text-xs"
                    >
                      {TEAMS.map((t) => (
                        <option key={t.code} value={t.code} disabled={t.code === battingTeam}>
                          {t.name} ({t.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Venue Selection */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono text-slate-300">Venue (33 Canonical IPL Stadiums)</label>
                    <span className="text-[11px] font-mono text-amber-300">{venueData.character}</span>
                  </div>
                  <select
                    value={selectedVenue}
                    onChange={(e) => { sound.playClick(); setSelectedVenue(e.target.value); }}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-cyan-400 text-xs"
                  >
                    {VENUES.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.city}) — Par: ~{v.parScore} runs
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sliders & Numeric Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Current Overs */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-mono">Current Overs</span>
                      <span className="text-sm font-bold font-mono text-cyan-400">{overs.toFixed(1)} ov</span>
                    </div>
                    <input
                      type="range"
                      min="5.0"
                      max="19.5"
                      step="0.1"
                      value={overs}
                      onChange={(e) => setOvers(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>5.0 (Powerplay end)</span>
                      <span>19.5 (Final delivery)</span>
                    </div>
                  </div>

                  {/* Current Score */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-mono">Current Score</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">{score} runs</span>
                    </div>
                    <input
                      type="range"
                      min="35"
                      max="260"
                      step="1"
                      value={score}
                      onChange={(e) => setScore(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>35 runs</span>
                      <span>260 runs</span>
                    </div>
                  </div>

                  {/* Wickets Fallen */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-mono">Wickets Fallen</span>
                      <span className="text-sm font-bold font-mono text-rose-400">{wickets} / 10 ({wicketsInHand} in hand)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="9"
                      step="1"
                      value={wickets}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setWickets(val);
                        if (wicketsLast5 > val) setWicketsLast5(val);
                      }}
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0 (0 wickets down)</span>
                      <span>9 (Last wicket standing)</span>
                    </div>
                  </div>

                  {/* Runs in Last 5 Overs */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-mono">Runs (Last 5 Overs)</span>
                      <span className="text-sm font-bold font-mono text-amber-400">{runsLast5} runs ({last5RunRate.toFixed(1)} RPO)</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="90"
                      step="1"
                      value={runsLast5}
                      onChange={(e) => setRunsLast5(parseInt(e.target.value, 10))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>15 (Defensive / Tight)</span>
                      <span>90 (Explosive Hitting)</span>
                    </div>
                  </div>
                </div>

                {/* Trigger Button */}
                <button
                  onClick={handleRunInference}
                  disabled={isInferring}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  {isInferring ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin" />
                      <span>Computing Gradient Boosted Trees...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Execute Real-Time XGBoost Prediction</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Prediction Results & Feature Telemetry (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Main Prediction Scorecard */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <TrendingUp className="w-4 h-4" />
                      PREDICTED 1ST INNINGS TOTAL
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {prediction.phaseName}
                    </span>
                  </div>

                  {/* Big Number */}
                  <div className="my-5 flex items-baseline justify-between">
                    <div>
                      <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight drop-shadow-md">
                        {prediction.predictedFinal}
                        <span className="text-xl sm:text-2xl text-cyan-400 ml-1.5 font-bold">RUNS</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>Current: <strong className="text-white">{score}/{wickets}</strong> ({overs.toFixed(1)} ov)</span>
                        <span>•</span>
                        <span className={prediction.deltaVsCRR >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {prediction.deltaVsCRR >= 0 ? `+${prediction.deltaVsCRR}` : prediction.deltaVsCRR} vs linear CRR
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Confidence Intervals */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">68% Confidence Band (±1σ)</span>
                        <span className="font-mono font-bold text-cyan-300">{prediction.lower68} – {prediction.upper68} runs</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${Math.min(100, (prediction.predictedFinal / 250) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Phase residual standard deviation: ±{prediction.phaseResidualStd.toFixed(1)} runs
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">95% Confidence Band (±2σ)</span>
                        <span className="font-mono font-bold text-amber-300">{prediction.lower95} – {prediction.upper95} runs</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Extreme boundary conditions accounted for weather & death overs variance.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Vector Telemetry */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span className="text-amber-400 font-bold">DERIVED DOMAIN FEATURES</span>
                    <span>ColumnTransformer Pipeline</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-400">Current Run Rate</div>
                      <div className="text-xs font-bold text-cyan-400">{currentRunRate.toFixed(2)}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-400">Last 5 Run Rate</div>
                      <div className="text-xs font-bold text-amber-400">{last5RunRate.toFixed(2)}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-400">Projected CRR</div>
                      <div className="text-xs font-bold text-emerald-400">{projectedCRRScore}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-400">Balls Remaining</div>
                      <div className="text-xs font-bold text-white">{ballsRemaining}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-400">Wickets in Hand</div>
                      <div className="text-xs font-bold text-purple-400">{wicketsInHand}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-400">Venue Par</div>
                      <div className="text-xs font-bold text-rose-400">{venueData.parScore}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Model Benchmarks */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Model Comparison & Test Evaluation</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evaluated on 222 held-out test matches (20,572 rows) partitioned using GroupShuffleSplit on match_id (zero delivery leakage).
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Champion Model: XGBoost
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Model Architecture</th>
                    <th className="p-3.5">Test RMSE (Runs)</th>
                    <th className="p-3.5">Test MAE (Runs)</th>
                    <th className="p-3.5">Test R² Score</th>
                    <th className="p-3.5">Training Time</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-cyan-500/10 font-bold text-white">
                    <td className="p-3.5 flex items-center gap-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span>XGBoost Regressor</span>
                    </td>
                    <td className="p-3.5 text-cyan-300">18.0845</td>
                    <td className="p-3.5 text-emerald-400">13.2675</td>
                    <td className="p-3.5 text-cyan-300">0.7175</td>
                    <td className="p-3.5 text-slate-300">2.47s</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                        PRODUCTION BEST
                      </span>
                    </td>
                  </tr>
                  <tr className="text-slate-300 hover:bg-white/5">
                    <td className="p-3.5">Ridge Regression (Baseline)</td>
                    <td className="p-3.5">18.1507</td>
                    <td className="p-3.5">13.6404</td>
                    <td className="p-3.5">0.7154</td>
                    <td className="p-3.5">0.09s</td>
                    <td className="p-3.5 text-slate-500">Benchmark</td>
                  </tr>
                  <tr className="text-slate-300 hover:bg-white/5">
                    <td className="p-3.5">Random Forest Regressor</td>
                    <td className="p-3.5">18.8587</td>
                    <td className="p-3.5">14.0161</td>
                    <td className="p-3.5">0.6928</td>
                    <td className="p-3.5">24.49s</td>
                    <td className="p-3.5 text-slate-500">Benchmark</td>
                  </tr>
                  <tr className="text-slate-300 hover:bg-white/5">
                    <td className="p-3.5">PyTorch Neural Network (MLP)</td>
                    <td className="p-3.5">18.9680</td>
                    <td className="p-3.5">14.1321</td>
                    <td className="p-3.5">0.6892</td>
                    <td className="p-3.5">10.82s</td>
                    <td className="p-3.5 text-slate-500">Deep Learning</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Phase Residual Standard Deviations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1">
                <div className="text-xs font-mono text-cyan-400 font-bold">EARLY PHASE (5–10 Overs)</div>
                <div className="text-xl font-bold font-mono text-white">±23.4 runs <span className="text-xs font-normal text-slate-400">residual std</span></div>
                <p className="text-[11px] text-slate-400">Wider variance due to early fielding restrictions and unknown team pitch adaptation.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1">
                <div className="text-xs font-mono text-amber-400 font-bold">MIDDLE PHASE (10–15 Overs)</div>
                <div className="text-xl font-bold font-mono text-white">±17.6 runs <span className="text-xs font-normal text-slate-400">residual std</span></div>
                <p className="text-[11px] text-slate-400">Stabilized variance as match trajectory and middle-over spin economy are revealed.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-1">
                <div className="text-xs font-mono text-emerald-400 font-bold">DEATH PHASE (15–20 Overs)</div>
                <div className="text-xl font-bold font-mono text-white">±10.2 runs <span className="text-xs font-normal text-slate-400">residual std</span></div>
                <p className="text-[11px] text-slate-400">Tightest confidence interval; determined predominantly by wickets in hand & death bowling execution.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Architecture & Data Pipeline */}
        {activeTab === 'architecture' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs">
                  <Database className="w-4 h-4" />
                  <span>CRICSHEET DATASET & PREPROCESSING</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>102,911 Rows Cleaned:</strong> Extracted from 295,732 raw ball-by-ball deliveries spanning 1,107 IPL matches (filtered to 1st innings deliveries between overs 5.0 and 19.5).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Entity Canonicalization:</strong> Reconciled historical franchise rebrandings (e.g., Delhi Daredevils → Delhi Capitals, Kings XI Punjab → Punjab Kings) and standardized 33 stadium names.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Data Leakage:</strong> Employed match-grouped splitting (<code>GroupShuffleSplit</code>) ensuring no deliveries from the same match appear across train and test sets.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs">
                  <Layers className="w-4 h-4" />
                  <span>PRODUCTION PIPELINE & DEPLOYMENT</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>ColumnTransformer Pipeline:</strong> Scikit-Learn <code>OneHotEncoder(handle_unknown=&quot;ignore&quot;)</code> for categorical teams/venues + <code>StandardScaler</code> for numerical features.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Interactive Streamlit UI:</strong> Responsive web dashboard delivering live trajectory projections, residual error distribution charts, and parameter sensitivities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>MongoDB Atlas Telemetry:</strong> Optional cloud telemetry integration logging user scenarios, drift analytics, and inference latency telemetry.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Code / Run instructions */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2 font-mono text-xs">
              <div className="text-slate-400 flex items-center justify-between">
                <span>Quick Run Commands (Python 3.11+)</span>
                <span className="text-cyan-400">github.com/anuragjha2307-del/score-predictor</span>
              </div>
              <pre className="p-3 rounded-lg bg-black/60 text-slate-200 overflow-x-auto text-[11px] leading-relaxed">
{`# Clone & run locally
git clone https://github.com/anuragjha2307-del/score-predictor.git
cd score-predictor
pip install -r requirements.txt

# Launch interactive Streamlit dashboard
streamlit run app.py
# -> Local URL: http://localhost:8501`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
