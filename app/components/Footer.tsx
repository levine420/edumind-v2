"use client";

import { BookOpen, GitBranch, Mail, ArrowRight, Globe, Send, Rss } from "lucide-react";

const footerLinks = {
  Produk: [
    { label: "Fitur", href: "#keunggulan" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Harga", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Karir", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Kontak", href: "#" },
  ],
  Dukungan: [
    { label: "Bantuan", href: "#" },
    { label: "Tutorial", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Status", href: "#" },
    { label: "Komunitas", href: "#" },
  ],
  Legal: [
    { label: "Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Keamanan", href: "#" },
  ],
};

const socials = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
  { icon: GitBranch, label: "GitHub", href: "#" },
  { icon: Rss, label: "Blog", href: "#" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Top border gradient */}
      <div className="divider mb-16" />

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div
          className="gradient-border rounded-3xl p-12 text-center relative overflow-hidden"
          style={{ background: "rgba(13, 17, 30, 0.8)" }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="badge mx-auto mb-5">
              🎓 Mulai Gratis Sekarang
            </div>
            <h2
              className="font-extrabold mb-4 gradient-text-2"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              Siap belajar lebih{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                cerdas?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
              Bergabung dengan 50.000+ pelajar yang sudah merasakan manfaat EduMind.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button id="footer-cta-mulai" className="btn-primary text-base py-3.5 px-8">
                <ArrowRight className="w-4 h-4" />
                Mulai Sekarang — Gratis
              </button>
              <div className="flex items-center gap-2 text-slate-500 text-sm py-3.5 px-4">
                <Mail className="w-4 h-4" />
                halo@edumind.ai
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Edu<span className="gradient-text">Mind</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Platform belajar berbasis AI untuk pelajar Indonesia. Lebih cerdas, lebih cepat.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white border border-white/5 hover:border-white/15 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © 2025 EduMind. Dibuat dengan ❤️ di Indonesia.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-600 text-sm">Semua sistem beroperasi normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
