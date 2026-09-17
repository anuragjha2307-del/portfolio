'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Send, 
  Code2, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Cpu,
  RefreshCw,
  Zap
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { PROJECTS } from '@/data/portfolioData';

const SAMPLE_PAPERS = [
  {
    id: 'paper1',
    title: 'Transformer Attention Mechanisms in Long-Context Document Intelligence',
    author: 'Jha, A. et al. (2026)',
    abstract: 'Investigating high-throughput PyPDF parsing pipelines coupled with contextual token retrieval for automated literature synthesis and IEEE LaTeX structuring.',
  },
  {
    id: 'paper2',
    title: 'Deep Face Embeddings & Haversine Geofencing for Zero-Trust Biometrics',
    author: 'Jha, A. & Research Team (2025)',
    abstract: 'Evaluating sub-second OpenCV face embedding inference against dynamic TOTP token validation under variable mobile network latencies.',
  },
];

export const AIAssistantApp: React.FC = () => {
  const project = PROJECTS.find((p) => p.id === 'ai-assistant')!;
  const [selectedPaper, setSelectedPaper] = useState(SAMPLE_PAPERS[0].id);
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'latex' | 'architecture'>('chat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [copied, setCopied] = useState(false);

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: "👋 Welcome to Anurag's **AI Research Assistant Suite**! I parse complex research papers into structured literature reviews, extract mathematical insights, and generate IEEE LaTeX outputs. Select a paper or type a research question below to test my NLP pipeline.",
      time: 'Just now',
    },
  ]);

  const handleSendPrompt = (textToSend?: string) => {
    const input = (textToSend || prompt).trim();
    if (!input || isGenerating) return;

    sound.playClick();
    const userMsg = {
      role: 'user' as const,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsGenerating(true);

    // Simulate realistic token streaming
    setTimeout(() => {
      let responseText = '';
      if (input.toLowerCase().includes('summar') || input.toLowerCase().includes('overview')) {
        responseText = `### 📄 Executive Literature Summary\n\n**Key Findings**:\n1. **High-Throughput Pipeline**: The PyPDF parsing module achieves a **4.2x reduction in ingestion latency** through parallel chunk tokenization.\n2. **Contextual Retrieval**: Contextual cross-attention maps extract accurate citation references without hallucinating citations.\n3. **Structured Outputs**: Direct mapping to IEEE LaTeX tabular and bibliographic formats accelerates academic publishing workflows.\n\n*Inference benchmark: 34ms per token via Streamlit Cloud engine.*`;
      } else if (input.toLowerCase().includes('biometric') || input.toLowerCase().includes('face') || input.toLowerCase().includes('presence')) {
        responseText = `### 🛡️ Smart Presence Cross-Integration\n\nThe AI Assistant Suite connects directly with Anurag's **Smart Presence platform**, leveraging deep OpenCV facial embeddings and 5-meter Haversine GPS bounds to guarantee tamper-proof physical validation alongside cryptographic TOTP tokens.`;
      } else if (input.toLowerCase().includes('latex') || input.toLowerCase().includes('equation')) {
        responseText = `### 📐 Mathematical Formulation\n\nThe attention mechanism is modeled using scaled dot-product attention:\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$\n\nCombined with Haversine distance for spatial geofencing:\n$$d = 2r \\arcsin\\left(\\sqrt{\\sin^2\\left(\\frac{\\Delta \\phi}{2}\\right) + \\cos(\\phi_1)\\cos(\\phi_2)\\sin^2\\left(\\frac{\\Delta \\lambda}{2}\\right)}\\right)$$`;
      } else {
        responseText = `### 💡 Analysis for: "${input}"\n\nBased on the active parsed document (*${
          SAMPLE_PAPERS.find((p) => p.id === selectedPaper)?.title
        }*), our PyTorch NLP pipeline has indexed 1,420 token embeddings with 98.4% contextual relevance.\n\n- **Token Context**: Literature synthesis active\n- **Backend**: Flask REST API + PyTorch inference\n- **Deployment**: Streamlit Cloud with automated GitHub Actions CI/CD.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsGenerating(false);
      sound.playSuccess();
    }, 700);
  };

  const sampleLatex = `\\documentclass[conference]{IEEEtran}
\\IEEEoverridecommandlockouts
\\usepackage{cite}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{graphicx}

\\title{Automated Literature Intelligence Suite via NLP Token Ingestion and Biometric Cross-Validation}
\\author{\\IEEEauthorblockN{Anurag Jha}
\\IEEEauthorblockA{\\textit{Department of Computer Applications} \\\\
\\textit{Galgotias University}, Greater Noida, India \\\\
ajha5678910@gmail.com}}

\\begin{document}
\\maketitle

\\begin{abstract}
We introduce a high-throughput parsing pipeline designed using PyPDF, PyTorch, and Streamlit Cloud that accelerates scientific literature exploration by 4.2x while guaranteeing contextual accuracy.
\\end{abstract}

\\section{Introduction}
Modern scientific papers require rapid summarization without loss of mathematical precision...
\\end{document}`;

  const copyLatex = () => {
    navigator.clipboard.writeText(sampleLatex);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row text-xs sm:text-sm">
      {/* Left Streamlit-style Sidebar */}
      <div className="w-full md:w-72 bg-slate-950/80 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>STREAMLIT ENGINE</span>
        </div>

        {/* Live Status Badge */}
        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-300 font-mono text-[11px]">Streamlit Cloud</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">34ms latency</span>
        </div>

        {/* Paper Selector */}
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
            Active Document Ingestion
          </label>
          <div className="space-y-2">
            {SAMPLE_PAPERS.map((paper) => (
              <button
                key={paper.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPaper(paper.id);
                }}
                className={`w-full text-left p-2 rounded-lg border transition cursor-pointer ${
                  selectedPaper === paper.id
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-1.5 font-medium text-xs truncate">
                  <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{paper.title}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{paper.author}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Hyperparameter slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Inference Temperature</span>
            <span className="text-cyan-400">{temperature}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <label className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
            Quick Prompts
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              'Summarize key literature findings',
              'Explain attention math formulation',
              'Check OpenCV biometric integration',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendPrompt(chip)}
                className="text-left px-2 py-1.5 rounded-md bg-white/5 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 text-[11px] transition cursor-pointer"
              >
                💡 {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-auto pt-3 border-t border-white/10">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
            Production Tech Stack
          </div>
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Main Interface */}
      <div className="flex-1 flex flex-col bg-slate-900/40">
        {/* Top App Tabs */}
        <div className="h-11 border-b border-white/10 px-4 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('chat');
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💬 Interactive Q&A
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('latex');
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition cursor-pointer ${
                activeTab === 'latex'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📐 IEEE LaTeX Generator
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('architecture');
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚙️ Pipeline Architecture
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>GitHub CI/CD Deployed</span>
          </div>
        </div>

        {/* Tab 1: Interactive Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-mono">
                    <span>{msg.role === 'user' ? 'Recruiter / Visitor' : 'Anurag AI Suite'}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>
                  <div
                    className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed text-xs sm:text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-900/90 border border-white/10 text-slate-200 shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">{msg.text}</div>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono py-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>PyTorch NLP pipeline parsing context chunks...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-white/10 bg-black/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendPrompt();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask any research or technical question (e.g. 'Summarize paper findings')..."
                  className="flex-1 bg-slate-950/80 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
                <button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Analyze</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: IEEE LaTeX Generator */}
        {activeTab === 'latex' && (
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">IEEE LaTeX Format Auto-Generated</h4>
                <p className="text-xs text-slate-400">
                  Direct output from Anurag&apos;s PyPDF parsing engine ready for Overleaf or arXiv submission.
                </p>
              </div>
              <button
                onClick={copyLatex}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs transition cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy LaTeX'}</span>
              </button>
            </div>
            <pre className="flex-1 p-4 rounded-xl bg-slate-950/90 border border-white/10 font-mono text-[11px] text-cyan-300/90 overflow-x-auto selection:bg-cyan-500 selection:text-black">
              {sampleLatex}
            </pre>
          </div>
        )}

        {/* Tab 3: Architecture Breakdown */}
        {activeTab === 'architecture' && (
          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Engineering Architecture & Pipelines
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Detailed system topology designed and implemented by Anurag Jha.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10">
                <div className="text-cyan-400 font-mono text-xs font-semibold mb-1">01. Ingestion Layer</div>
                <p className="text-xs text-slate-300">
                  Parallel chunk extraction using PyPDF with regex extraction for equations, citations, and IEEE bibliographies.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10">
                <div className="text-cyan-400 font-mono text-xs font-semibold mb-1">02. Inference Layer</div>
                <p className="text-xs text-slate-300">
                  PyTorch NLP embeddings stored in memory for zero-lag cosine similarity contextual Q&A and multi-turn summaries.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10">
                <div className="text-cyan-400 font-mono text-xs font-semibold mb-1">03. Delivery & CI/CD</div>
                <p className="text-xs text-slate-300">
                  Containerized and automated through GitHub Actions directly to Streamlit Cloud with environment secret protection.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <h4 className="text-xs font-mono font-bold text-cyan-300 mb-2">PROJECT HIGHLIGHTS FROM RESUME</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
