"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Format file apa saja yang didukung EduMind?",
    a: "EduMind mendukung format PDF, PPT, PPTX, DOC, dan DOCX. Ukuran maksimum per file adalah 50MB. Kami terus menambahkan dukungan format baru secara berkala.",
  },
  {
    q: "Apakah EduMind aman untuk digunakan? Apakah dokumen saya disimpan?",
    a: "Keamanan data adalah prioritas utama kami. Semua dokumen dienkripsi menggunakan AES-256 dan tidak dibagikan ke pihak ketiga. Anda bisa menghapus dokumen kapan saja dari dashboard.",
  },
  {
    q: "Berapa lama proses AI menganalisis dokumen?",
    a: "Rata-rata proses memakan waktu 15–45 detik tergantung ukuran dan kompleksitas dokumen. Untuk file di bawah 10MB, biasanya selesai dalam 15 detik.",
  },
  {
    q: "Apakah EduMind bisa digunakan untuk bahasa Indonesia?",
    a: "Ya! EduMind mendukung penuh Bahasa Indonesia. AI kami dilatih khusus untuk memahami konten akademik berbahasa Indonesia, termasuk istilah-istilah teknis dan keilmuan.",
  },
  {
    q: "Apakah ada batasan penggunaan untuk akun gratis?",
    a: "Akun gratis mendapatkan 5 dokumen per bulan, hingga 10MB per dokumen, dan akses ke fitur ringkasan serta kuis dasar. Upgrade ke Pro untuk penggunaan tanpa batas dan fitur premium.",
  },
  {
    q: "Bisakah saya menggunakan EduMind di perangkat mobile?",
    a: "Tentu! EduMind sepenuhnya responsif dan dapat diakses melalui browser di smartphone maupun tablet. Aplikasi mobile native sedang dalam pengembangan.",
  },
  {
    q: "Bagaimana akurasi ringkasan dan kuis yang dihasilkan AI?",
    a: "AI kami memiliki akurasi rata-rata 94% dalam merangkum poin-poin utama. Semua output bisa Anda edit dan sesuaikan sebelum digunakan untuk belajar.",
  },
  {
    q: "Apakah ada fitur kolaborasi untuk belajar kelompok?",
    a: "Fitur belajar bersama sedang dalam pengembangan dan akan hadir dalam waktu dekat. Saat ini Anda bisa mengekspor kuis dan flashcard untuk dibagikan ke teman.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mx-auto mb-5">
            ✦ FAQ
          </div>
          <h2
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            <span className="gradient-text-2">Pertanyaan yang</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              sering ditanyakan
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Tidak menemukan jawaban? Hubungi kami di{" "}
            <span className="text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">
              halo@edumind.ai
            </span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <button
                id={`faq-${idx}`}
                className="faq-question w-full text-left"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="pr-4 text-slate-200">{faq.q}</span>
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: openIndex === idx ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)",
                    border: openIndex === idx ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <ChevronDown
                    className="w-4 h-4 transition-transform duration-300"
                    style={{
                      color: openIndex === idx ? "#a78bfa" : "#64748b",
                      transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{
                  maxHeight: openIndex === idx ? "200px" : "0px",
                  opacity: openIndex === idx ? 1 : 0,
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                }}
              >
                <div className="faq-answer">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
