"use client";

import { Upload, Cpu, Layers, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Unggah Dokumen",
    description:
      "Upload file PDF, PPT, atau DOCX dari materi kuliah atau belajar Anda. Sistem kami mendukung hingga 50MB per file.",
    color: "#a78bfa",
    highlight: "Drag & Drop",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Memproses",
    description:
      "Model AI kami menganalisis, memahami, dan mengekstrak inti dari dokumen Anda secara otomatis dalam hitungan detik.",
    color: "#60a5fa",
    highlight: "< 30 Detik",
  },
  {
    number: "03",
    icon: Layers,
    title: "Pilih Format",
    description:
      "Pilih output yang Anda inginkan: ringkasan, kuis interaktif, flashcard, atau mode chat untuk tanya jawab langsung.",
    color: "#34d399",
    highlight: "4 Format",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Belajar & Capai Target",
    description:
      "Gunakan materi yang sudah dioptimalkan AI untuk belajar lebih efisien. Pantau progress dan raih target nilai Anda.",
    color: "#f472b6",
    highlight: "10× Lebih Cepat",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-28 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-5">
            ✦ Cara Kerja
          </div>
          <h2
            className="font-extrabold tracking-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            <span className="gradient-text-2">Dari dokumen ke pemahaman</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              dalam 4 langkah mudah
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tidak perlu keahlian teknis. Cukup upload, pilih format, dan mulai belajar.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="step-card group">
                {/* Step number */}
                <span className="step-number">{step.number}</span>

                {/* Icon + badge */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <div>
                    <div
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                      style={{
                        background: `${step.color}15`,
                        color: step.color,
                        border: `1px solid ${step.color}25`,
                      }}
                    >
                      {step.highlight}
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed">{step.description}</p>

                {/* Connector (only for first 3) */}
                {idx < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: step.color, boxShadow: `0 0 12px ${step.color}60` }}
                    >
                      <span className="text-white text-xs font-bold">→</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <button id="cta-cara-kerja" className="btn-primary text-base py-3.5 px-8 mx-auto">
            <Rocket className="w-4 h-4" />
            Coba Sekarang — Gratis
          </button>
          <p className="text-slate-600 text-sm mt-3">Tidak perlu kartu kredit · Langsung aktif</p>
        </div>
      </div>
    </section>
  );
}
