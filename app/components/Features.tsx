"use client";

import {
  FileText,
  Brain,
  CreditCard,
  MessageSquare,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Ringkasan AI",
    description:
      "Ubah dokumen panjang menjadi ringkasan padat dan mudah dipahami dalam hitungan detik. Tidak perlu lagi membaca ratusan halaman.",
    color: "#a78bfa",
    bg: "rgba(124, 58, 237, 0.1)",
    border: "rgba(124, 58, 237, 0.2)",
    tag: "Paling Populer",
  },
  {
    icon: Brain,
    title: "Generator Kuis",
    description:
      "AI secara otomatis membuat soal kuis dari materi Anda — pilihan ganda, benar/salah, atau isian singkat untuk menguji pemahaman.",
    color: "#60a5fa",
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.2)",
  },
  {
    icon: CreditCard,
    title: "Flashcard Otomatis",
    description:
      "Buat flashcard interaktif dari konsep-konsep kunci dalam materi Anda. Cocok untuk belajar cepat sebelum ujian.",
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.1)",
    border: "rgba(52, 211, 153, 0.2)",
  },
  {
    icon: MessageSquare,
    title: "Chat dengan Materi",
    description:
      "Tanyakan apa saja tentang dokumen yang diunggah. AI akan menjawab berdasarkan isi materi secara akurat dan kontekstual.",
    color: "#f472b6",
    bg: "rgba(244, 114, 182, 0.1)",
    border: "rgba(244, 114, 182, 0.2)",
  },
  {
    icon: TrendingUp,
    title: "Progress Belajar",
    description:
      "Pantau kemajuan belajar Anda dengan analitik detail. Ketahui topik mana yang perlu diperkuat dan mana yang sudah dikuasai.",
    color: "#fb923c",
    bg: "rgba(251, 146, 60, 0.1)",
    border: "rgba(251, 146, 60, 0.2)",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Modern",
    description:
      "Semua materi, kuis, dan flashcard tersusun rapi dalam satu dashboard yang intuitif. Akses kapan saja dari perangkat apa pun.",
    color: "#818cf8",
    bg: "rgba(129, 140, 248, 0.1)",
    border: "rgba(129, 140, 248, 0.2)",
  },
];

export default function Features() {
  return (
    <section id="keunggulan" className="py-28 relative">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="badge" style={{ display: "inline-flex", marginBottom: "20px" }}>
            ✦ Fitur Unggulan
          </div>
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: "20px",
            }}
          >
            <span className="gradient-text-2">Semua yang kamu butuhkan</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ada di satu tempat
            </span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.125rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            EduMind menggabungkan kekuatan AI dengan desain yang intuitif untuk pengalaman belajar yang tak tertandingi.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="feature-card group">
                {/* Tag badge */}
                {feature.tag && (
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{
                      background: "rgba(124,58,237,0.15)",
                      color: "#a78bfa",
                      border: "1px solid rgba(124,58,237,0.25)",
                    }}
                  >
                    ⚡ {feature.tag}
                  </div>
                )}

                {/* Icon */}
                <div
                  className="icon-box"
                  style={{
                    background: feature.bg,
                    border: `1px solid ${feature.border}`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>

                {/* Bottom indicator */}
                <div
                  className="mt-5 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-700"
                  style={{
                    background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
