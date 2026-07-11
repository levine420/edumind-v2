"use client";

import { ArrowRight, Play, Sparkles, Zap, Shield } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  { value: "50K+", label: "Pelajar Aktif" },
  { value: "2M+", label: "Dokumen Diproses" },
  { value: "98%", label: "Kepuasan Pengguna" },
  { value: "10×", label: "Lebih Cepat Belajar" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="hero-glow-ring"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />
        <div
          className="hero-glow-ring hero-glow-ring-2"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Central radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="reveal opacity-0 flex justify-center mb-8" style={{ animationDelay: "0.1s" }}>
          <div className="badge">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by AI Generatif · Belajar Lebih Efisien
          </div>
        </div>

        {/* Headline */}
        <h1
          className="reveal opacity-0 font-extrabold tracking-tight mb-6"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            animationDelay: "0.2s",
          }}
        >
          <span className="gradient-text-2">Belajar Lebih</span>
          <br />
          <span className="shimmer">Cerdas</span>{" "}
          <span className="gradient-text-2">Bersama</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            EduMind
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="reveal opacity-0 text-slate-400 mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            maxWidth: "640px",
            animationDelay: "0.35s",
          }}
        >
          Unggah file <span className="text-slate-300 font-medium">PDF atau PPT</span>, lalu biarkan AI membuat{" "}
          <span className="text-slate-300 font-medium">ringkasan, kuis, flashcard</span>, dan menjawab pertanyaan dari materi belajar Anda.
        </p>

        {/* CTA Buttons */}
        <div
          className="reveal opacity-0 flex flex-wrap justify-center gap-4 mb-16"
          style={{ animationDelay: "0.5s" }}
        >
          <a href="/dashboard" id="cta-mulai-sekarang" className="btn-primary text-base py-3.5 px-7" style={{ textDecoration: "none" }}>
            <Zap className="w-4 h-4" />
            Mulai Sekarang
          </a>
          <button id="cta-lihat-demo" className="btn-secondary text-base py-3.5 px-7">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            Lihat Demo
          </button>
        </div>

        {/* Hero Visual — Floating UI Card */}
        <div
          className="reveal opacity-0 relative mx-auto"
          style={{ maxWidth: "820px", animationDelay: "0.65s" }}
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.2) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Main card */}
          <div
            className="gradient-border rounded-2xl overflow-hidden"
            style={{
              background: "rgba(13, 17, 30, 0.8)",
              backdropFilter: "blur(40px)",
            }}
          >
            {/* Topbar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="ml-4 flex-1 h-6 rounded-md bg-white/5 flex items-center px-3">
                <span className="text-xs text-slate-500">edumind.ai/dashboard</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">Aman</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Upload area */}
              <div className="sm:col-span-2 space-y-3">
                <div
                  className="rounded-xl p-5 border border-dashed text-center"
                  style={{
                    borderColor: "rgba(124,58,237,0.3)",
                    background: "rgba(124,58,237,0.05)",
                  }}
                >
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-sm text-slate-400">
                    <span className="text-violet-400 font-medium">Klik untuk upload</span> atau seret file ke sini
                  </p>
                  <p className="text-xs text-slate-600 mt-1">PDF, PPT, DOCX · Maks. 50MB</p>
                </div>

                {/* Processing status */}
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Memproses: Materi Kimia Organik.pdf</span>
                    <span className="text-xs text-violet-400 font-medium">87%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "87%",
                        background: "linear-gradient(90deg, #7c3aed, #60a5fa)",
                        boxShadow: "0 0 8px rgba(124,58,237,0.6)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="space-y-3">
                {[
                  { icon: "📝", label: "Ringkasan", value: "Siap", color: "#a78bfa" },
                  { icon: "🧠", label: "Kuis", value: "24 soal", color: "#60a5fa" },
                  { icon: "🃏", label: "Flashcard", value: "36 kartu", color: "#34d399" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-3.5 flex items-center gap-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm font-semibold" style={{ color: item.color }}>{item.value}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="reveal opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          style={{ animationDelay: "0.8s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-extrabold text-3xl md:text-4xl"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
