'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';
import { PERSONAL_INFO, PROJECTS } from '@/data/portfolioData';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC<{ onOpenApp?: (id: any) => void }> = ({ onOpenApp }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial welcome banner
    setHistory([
      {
        id: 'init-1',
        command: 'neofetch',
        output: renderNeofetch(),
      },
      {
        id: 'init-2',
        command: 'echo "Type \'help\' to see all available CLI commands."',
        output: <p className="text-cyan-400">Type &apos;help&apos; to explore interactive commands (e.g. &apos;cat skills.txt&apos;, &apos;run spark-apk&apos;, &apos;ping ai-assistant&apos;).</p>,
      },
    ]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function renderNeofetch() {
    return (
      <div className="font-mono text-xs sm:text-sm my-2 text-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="text-cyan-400 font-bold select-none leading-tight">
          {`
   __ _ _ __  _   _ _ __ __ _  __ _ 
  / _\` | '_ \\| | | | '__/ _\` |/ _\` |
 | (_| | | | | |_| | | | (_| | (_| |
  \\__,_|_| |_|\\__,_|_|  \\__,_|\\__, |
                              |___/ 
          `}
        </div>
        <div className="space-y-0.5 text-xs">
          <div className="text-cyan-300 font-bold">anurag@dev-os-command-center</div>
          <div className="text-slate-500">--------------------------------</div>
          <div><span className="text-cyan-400 font-semibold">OS:</span> AnuragOS v2.4 (Next.js 16 Turbopack)</div>
          <div><span className="text-cyan-400 font-semibold">Host:</span> Galgotias University (MCA Distinction)</div>
          <div><span className="text-cyan-400 font-semibold">Kernel:</span> TypeScript / React 19 / Tailwind v4</div>
          <div><span className="text-cyan-400 font-semibold">Uptime:</span> 99.98% High Availability</div>
          <div><span className="text-cyan-400 font-semibold">Shell:</span> bash 5.2-release</div>
          <div><span className="text-cyan-400 font-semibold">Domains:</span> AI/ML (Streamlit) • Biometrics (OpenCV) • Mobile (Expo)</div>
          <div><span className="text-cyan-400 font-semibold">Contact:</span> ajha5678910@gmail.com | +91 8595648167</div>
        </div>
      </div>
    );
  }

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    sound.playClick();
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const root = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let output: React.ReactNode = null;

    switch (root) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">AVAILABLE DEVOS CLI COMMANDS:</div>
            <div><span className="text-emerald-400 font-semibold">cat skills.txt</span> - Display technical skill stacks & proficiencies</div>
            <div><span className="text-emerald-400 font-semibold">run spark-apk</span> - Compile and execute Spark mobile application build</div>
            <div><span className="text-emerald-400 font-semibold">ping ai-assistant</span> - Transmit ICMP telemetry packets to Streamlit cluster</div>
            <div><span className="text-emerald-400 font-semibold">git log</span> - View verified development commit milestones</div>
            <div><span className="text-emerald-400 font-semibold">whoami</span> - Display Anurag Jha credentials & summary</div>
            <div><span className="text-emerald-400 font-semibold">projects</span> - View all 3 active enterprise-grade repositories</div>
            <div><span className="text-emerald-400 font-semibold">contact</span> - Show direct WhatsApp, Phone & Email details</div>
            <div><span className="text-emerald-400 font-semibold">sudo hire-anurag</span> - Execute immediate talent acquisition sequence</div>
            <div><span className="text-emerald-400 font-semibold">neofetch</span> - Display developer workstation specifications</div>
            <div><span className="text-emerald-400 font-semibold">clear</span> - Clear the terminal scrollback buffer</div>
          </div>
        );
        break;

      case 'cat':
        if (arg === 'skills.txt' || arg === 'skills') {
          output = (
            <div className="space-y-2 text-xs">
              <div className="text-cyan-400 font-bold">=== ANURAG JHA TECHNICAL PROFICIENCY MATRIX ===</div>
              <div><strong className="text-amber-300">Languages:</strong> Python, Java, JavaScript, TypeScript, C, SQL (PostgreSQL, MySQL)</div>
              <div><strong className="text-emerald-300">AI / ML & Data:</strong> PyTorch, TensorFlow, Scikit-learn, OpenCV, Pandas, NumPy, Power BI</div>
              <div><strong className="text-sky-300">Backend & Security:</strong> Flask REST APIs, TOTP Authentication, Haversine GPS, MongoDB, DBMS</div>
              <div><strong className="text-purple-300">Mobile & Web:</strong> React Native, Expo EAS, Reanimated 3, Redux Toolkit, HTML5, CSS3</div>
              <div><strong className="text-rose-300">DevOps & Cloud:</strong> Streamlit Cloud, Git/GitHub, GitHub Actions CI/CD, Linux/Bash</div>
            </div>
          );
        } else {
          output = <p className="text-rose-400">File &apos;{arg}&apos; not found. Try: &apos;cat skills.txt&apos;</p>;
        }
        break;

      case 'run':
        if (arg === 'spark-apk' || arg === 'spark') {
          output = (
            <div className="space-y-1 text-xs text-slate-200">
              <div className="text-rose-400 font-bold">[BUILD EXPO EAS] Compiling Spark Dating App target: android-arm64</div>
              <div>✔ Validating React Native Reanimated 3 gesture bindings...</div>
              <div>✔ Initializing Redux Toolkit real-time socket cluster...</div>
              <div>✔ Generating standalone production APK: Spark_v1.4.apk [32.4MB]</div>
              <div className="text-emerald-400 font-bold">✔ Build Succeeded in 1.4s! Launching Mobile Simulator window...</div>
            </div>
          );
          if (onOpenApp) setTimeout(() => onOpenApp('spark-mobile'), 800);
        } else {
          output = <p className="text-rose-400">Unknown target. Try: &apos;run spark-apk&apos;</p>;
        }
        break;

      case 'ping':
        output = (
          <div className="space-y-1 text-xs text-slate-200">
            <div>PING streamlit-cloud.anurag.dev (34.120.88.19) 56(84) bytes of data:</div>
            <div>64 bytes from 34.120.88.19: icmp_seq=1 ttl=58 time=34.2 ms [AI SUITE ONLINE]</div>
            <div>64 bytes from 34.120.88.19: icmp_seq=2 ttl=58 time=31.8 ms [PYTORCH READY]</div>
            <div>64 bytes from 34.120.88.19: icmp_seq=3 ttl=58 time=33.1 ms [TOKEN STREAMING OK]</div>
            <div>64 bytes from 34.120.88.19: icmp_seq=4 ttl=58 time=32.9 ms [CI/CD VERIFIED]</div>
            <div className="text-emerald-400">--- 4 packets transmitted, 4 received, 0% packet loss, avg = 33.0ms ---</div>
          </div>
        );
        break;

      case 'git':
        if (arg.includes('log')) {
          output = (
            <div className="space-y-1.5 text-xs font-mono">
              <div><span className="text-amber-400">commit 9f4a18c</span> (HEAD -&gt; main, origin/main)</div>
              <div className="text-slate-400">Author: Anurag Jha &lt;ajha5678910@gmail.com&gt;</div>
              <div className="text-white">feat: deploy high-throughput PyPDF parsing pipeline and IEEE LaTeX export</div>
              <div className="pt-1"><span className="text-amber-400">commit 7d21b90</span></div>
              <div className="text-slate-400">Author: Anurag Jha &lt;ajha5678910@gmail.com&gt;</div>
              <div className="text-white">feat: implement OpenCV deep learning face embeddings with Haversine GPS geofence</div>
              <div className="pt-1"><span className="text-amber-400">commit 4c0e62a</span></div>
              <div className="text-slate-400">Author: Anurag Jha &lt;ajha5678910@gmail.com&gt;</div>
              <div className="text-white">feat: build 60fps Spark mobile card swipe physics with Expo EAS pipeline</div>
            </div>
          );
        } else {
          output = <p className="text-slate-400">Try &apos;git log&apos;</p>;
        }
        break;

      case 'whoami':
        output = (
          <div className="text-xs space-y-1 text-slate-200">
            <div className="text-cyan-300 font-bold">{PERSONAL_INFO.name}</div>
            <div>{PERSONAL_INFO.title}</div>
            <div>{PERSONAL_INFO.shortBio}</div>
            <div className="text-slate-400">{PERSONAL_INFO.status}</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-bold">{p.title} ({p.category})</div>
                <div className="text-slate-300">{p.subtitle}</div>
                <div className="text-slate-500 text-[11px] font-mono">Stack: {p.techStack.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'sudo':
        if (arg.includes('hire')) {
          sound.playSuccess();
          output = (
            <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>EXCELLENT DECISION! OFFER ACCEPTED IN PRINCIPLE 🎉</span>
              </div>
              <p>Anurag Jha is enthusiastic to bring deep AI/ML, Full-Stack, and Mobile engineering expertise to your team.</p>
              <p>Contact immediately via WhatsApp: <strong className="text-white">{PERSONAL_INFO.phone}</strong> or Email: <strong className="text-white">{PERSONAL_INFO.email}</strong></p>
            </div>
          );
        } else {
          output = <p className="text-rose-400">Permission granted, but command requires &apos;sudo hire-anurag&apos;</p>;
        }
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-slate-200">
            <div><span className="text-cyan-400 font-semibold">WhatsApp:</span> +91 8595648167</div>
            <div><span className="text-cyan-400 font-semibold">Email:</span> ajha5678910@gmail.com</div>
            <div><span className="text-cyan-400 font-semibold">LinkedIn:</span> linkedin.com/in/anurag-jha-379520257</div>
            <div><span className="text-cyan-400 font-semibold">GitHub:</span> github.com/anuragjha2307-del</div>
            <div><span className="text-cyan-400 font-semibold">Location:</span> Greater Noida, UP, India</div>
          </div>
        );
        break;

      case 'neofetch':
        output = renderNeofetch();
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = (
          <p className="text-rose-400">
            bash: {root}: command not found. Type &apos;help&apos; for list of valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete
      const options = ['cat skills.txt', 'run spark-apk', 'ping ai-assistant', 'git log', 'whoami', 'projects', 'help', 'sudo hire-anurag'];
      const found = options.find((opt) => opt.startsWith(input.trim()));
      if (found) {
        setInput(found);
        sound.playKey();
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-black/90 font-mono text-slate-100 p-4 flex flex-col justify-between overflow-y-auto custom-scrollbar cursor-text"
    >
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold">anurag@dev-os</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyan-400 font-bold">~$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="pl-2 sm:pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Active Input Line */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/10 shrink-0 text-xs sm:text-sm">
        <span className="text-emerald-400 font-bold">anurag@dev-os</span>
        <span className="text-slate-500">:</span>
        <span className="text-cyan-400 font-bold">~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            sound.playKey();
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white caret-cyan-400"
          autoFocus
          spellCheck={false}
        />
        <span className="text-slate-600 text-[10px] hidden sm:inline">TAB to autocomplete</span>
      </div>
    </div>
  );
};
