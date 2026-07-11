"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, BookOpen } from "lucide-react";

const navLinks = [
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/50 transition-shadow"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #4f46e5)",
                boxShadow: "0 10px 15px -3px rgba(124, 58, 237, 0.3)",
              }}
            >
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Edu<span className="gradient-text">Mind</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="nav-link-item"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2" style={{ textDecoration: "none" }}>
              Masuk
            </a>
            <a href="/dashboard" className="btn-primary text-sm py-2.5 px-5" style={{ textDecoration: "none" }}>
              <Sparkles className="w-4 h-4" />
              Mulai Gratis
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <a href="#" className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white">
              Edu<span className="gradient-text">Mind</span>
            </span>
          </a>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-2xl font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4 w-full px-8">
            <a href="/login" className="text-base font-medium text-slate-400 hover:text-white transition-colors py-3 text-center" style={{ textDecoration: "none" }}>
              Masuk
            </a>
            <a href="/dashboard" className="btn-primary justify-center text-base py-3.5" style={{ textDecoration: "none" }}>
              <Sparkles className="w-4 h-4" />
              Mulai Gratis
            </a>
          </div>
        </div>
      )}
    </>
  );
}
