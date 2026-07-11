"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Raisa Andriani",
    role: "Mahasiswi Kedokteran, UI",
    avatar: "RA",
    avatarColor: "#a78bfa",
    stars: 5,
    quote:
      "EduMind benar-benar menyelamatkan saya saat ujian blok! Saya upload slide anatomi 200 halaman, dan dalam 30 detik sudah ada ringkasan dan kuis latihan. Nilai saya naik drastis semester ini.",
    highlight: "Nilai naik drastis",
  },
  {
    name: "Bagas Prasetyo",
    role: "Pelajar SMA, Surabaya",
    avatar: "BP",
    avatarColor: "#60a5fa",
    stars: 5,
    quote:
      "Fitur chat dengan materi-nya gila banget. Saya bisa tanya langsung ke dokumen, kayak punya tutor pribadi 24 jam. Nggak perlu lagi baca berulang-ulang sampai paham.",
    highlight: "Tutor pribadi 24 jam",
  },
  {
    name: "Dewi Kusuma",
    role: "Dosen, Universitas Gadjah Mada",
    avatar: "DK",
    avatarColor: "#34d399",
    stars: 5,
    quote:
      "Saya rekomendasikan EduMind ke semua mahasiswa saya. Platform ini membantu mereka memahami materi lebih cepat dan mendalam. Kualitas kuis yang dihasilkan AI-nya sangat baik.",
    highlight: "Direkomendasikan dosen",
  },
  {
    name: "Fikri Ramadhan",
    role: "Persiapan CPNS, Jakarta",
    avatar: "FR",
    avatarColor: "#f472b6",
    stars: 5,
    quote:
      "Sedang persiapan CPNS sambil kerja. EduMind bantu saya belajar efisien di waktu terbatas. Flashcard otomatis-nya sangat membantu untuk review cepat di sela-sela jam kerja.",
    highlight: "Belajar di waktu terbatas",
  },
  {
    name: "Sari Indah",
    role: "Mahasiswi Hukum, UNPAD",
    avatar: "SI",
    avatarColor: "#fb923c",
    stars: 5,
    quote:
      "Materi hukum itu kompleks banget. Dengan EduMind, saya bisa upload putusan pengadilan atau UU, terus langsung dapat rangkuman poin-poin penting. Belajar jadi jauh lebih fokus.",
    highlight: "Materi kompleks jadi mudah",
  },
  {
    name: "Kevin Wijaya",
    role: "Bootcamp Developer, Bandung",
    avatar: "KW",
    avatarColor: "#818cf8",
    stars: 5,
    quote:
      "Saya pakai EduMind untuk mempelajari dokumentasi teknis dan paper penelitian. AI-nya cukup akurat dalam merangkum konsep-konsep teknis yang biasanya susah dipahami.",
    highlight: "Akurat untuk topik teknis",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-5">
            ✦ Testimoni
          </div>
          <h2
            className="font-extrabold tracking-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            <span className="gradient-text-2">Dipercaya ribuan</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f472b6, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              pelajar Indonesia
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Dari pelajar SMA hingga mahasiswa S2, dari persiapan CPNS hingga bootcamp developer.
          </p>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9</span>
            <span className="text-slate-500 text-sm">dari 2.400+ ulasan</span>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="testimonial-card relative"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-5 right-5 w-8 h-8 opacity-10"
                style={{ color: t.avatarColor }}
              />

              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed my-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Highlight pill */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-4"
                style={{
                  background: `${t.avatarColor}12`,
                  color: t.avatarColor,
                  border: `1px solid ${t.avatarColor}25`,
                }}
              >
                ✓ {t.highlight}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.avatarColor}, ${t.avatarColor}90)`,
                    boxShadow: `0 0 16px ${t.avatarColor}40`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
