'use client';

import React, { useEffect, useRef, useState } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // Code snippets from Anurag's real projects
  const codeLines = [
    `import torch`,
    `from transformers import AutoModelForSeq2SeqLM, AutoTokenizer`,
    `import cv2`,
    `import numpy as np`,
    `from haversine import haversine, Unit`,
    `from flask import Flask, request, jsonify`,
    `import pyotp`,
    `import { useSharedValue, withSpring } from 'react-native-reanimated'`,
    `def compute_face_embeddings(frame):`,
    `    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300))`,
    `    net.setInput(blob)`,
    `    detections = net.forward()`,
    `    return extract_128d_vector(detections)`,
    `def verify_geofence(user_coords, target=(28.4744, 77.5040)):`,
    `    dist_m = haversine(user_coords, target, unit=Unit.METERS)`,
    `    return dist_m <= 250.0`,
    `class AIResearchPipeline:`,
    `    def __init__(self, model_id='mistral-7b'):`,
    `        self.pipeline = torch.cuda.amp.autocast()`,
    `    async def stream_latex_summary(self, doc_tokens):`,
    `        yield generate_ieee_latex(doc_tokens)`,
    `export const useCardGesture = () => {`,
    `    const translateX = useSharedValue(0);`,
    `    const onSwipeRight = () => triggerMatchCelebration();`,
    `    return { translateX, onSwipeRight };`,
    `};`,
    `@app.route('/api/v1/attendance/verify', methods=['POST'])`,
    `def mark_attendance():`,
    `    totp = pyotp.TOTP(SECRET_KEY, interval=30)`,
    `    if not totp.verify(request.json['token']):`,
    `        return jsonify({'status': 'TAMPERED'}), 401`,
    `    return jsonify({'status': 'VERIFIED', 'biometric': 0.994})`,
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas particle constellation simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ',
    }));

    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates
      currentMouseX += (mousePos.x - currentMouseX) * 0.1;
      currentMouseY += (mousePos.y - currentMouseY) * 0.1;

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Interaction with mouse
        const dxMouse = currentMouseX - p1.x;
        const dyMouse = currentMouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(currentMouseX, currentMouseY);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Inter-particle links
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}0.6)`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Dynamic Cursor Ambient Glow Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.07), rgba(168, 85, 247, 0.04) 45%, transparent 75%)`,
        }}
      />

      {/* 2. Interactive Particle Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />

      {/* 3. Subtle Code Watermark (Actual React / PyTorch / OpenCV imports at 0.035 opacity) */}
      <div className="absolute inset-0 overflow-hidden flex justify-between px-10 opacity-[0.038] pointer-events-none font-mono text-[11px] leading-loose text-cyan-200">
        {/* Left Column */}
        <div className="w-1/3 hidden lg:block space-y-2 -translate-y-8 transform -rotate-1">
          {codeLines.slice(0, 16).map((line, i) => (
            <div key={i} className="truncate">{line}</div>
          ))}
          {codeLines.slice(0, 10).map((line, i) => (
            <div key={`rep1-${i}`} className="truncate">{line}</div>
          ))}
        </div>

        {/* Center / Right Column */}
        <div className="w-1/3 hidden md:block space-y-2 translate-y-16 transform rotate-1">
          {codeLines.slice(16).map((line, i) => (
            <div key={i} className="truncate">{line}</div>
          ))}
          {codeLines.slice(10, 22).map((line, i) => (
            <div key={`rep2-${i}`} className="truncate">{line}</div>
          ))}
        </div>

        {/* Far Right Column */}
        <div className="w-1/3 hidden xl:block space-y-2 -translate-y-4 transform -rotate-2">
          {codeLines.map((line, i) => (
            <div key={`far-${i}`} className="truncate">{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
