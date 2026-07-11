import { Document, QuizQuestion, Flashcard, ChatMessage, StudyActivity, StudyStats } from "./types";

export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "Materi Kimia Organik.pdf",
    size: "4.2 MB",
    uploadDate: "2024-12-15",
    type: "pdf",
    progress: 87,
    summaryReady: true,
    quizReady: true,
    flashcardReady: true,
  },
  {
    id: "doc-2",
    name: "Presentasi Fisika Kuantum.ppt",
    size: "12.8 MB",
    uploadDate: "2024-12-14",
    type: "ppt",
    progress: 45,
    summaryReady: true,
    quizReady: true,
    flashcardReady: false,
  },
  {
    id: "doc-3",
    name: "Biologi Molekuler Lanjut.pdf",
    size: "8.1 MB",
    uploadDate: "2024-12-13",
    type: "pdf",
    progress: 20,
    summaryReady: true,
    quizReady: false,
    flashcardReady: false,
  },
];

export const mockSummary = [
  {
    chapter: "Bab 1: Pengantar Kimia Organik",
    points: [
      "Kimia organik adalah cabang ilmu kimia yang mempelajari senyawa karbon dan turunannya.",
      "Atom karbon memiliki 4 elektron valensi sehingga dapat membentuk 4 ikatan kovalen.",
      "Senyawa organik ditemukan di semua makhluk hidup dan merupakan dasar kehidupan.",
      "Hidrokarbon adalah senyawa organik paling sederhana yang hanya terdiri dari C dan H.",
    ],
  },
  {
    chapter: "Bab 2: Ikatan Kimia dalam Senyawa Organik",
    points: [
      "Ikatan sigma (σ) terbentuk dari tumpang tindih orbital secara aksial.",
      "Ikatan pi (π) terbentuk dari tumpang tindih orbital secara lateral.",
      "Hibridisasi sp³ menghasilkan geometri tetrahedral dengan sudut 109.5°.",
      "Hibridisasi sp² menghasilkan geometri trigonal planar dengan sudut 120°.",
      "Hibridisasi sp menghasilkan geometri linear dengan sudut 180°.",
    ],
  },
  {
    chapter: "Bab 3: Alkana, Alkena, dan Alkuna",
    points: [
      "Alkana (CₙH₂ₙ₊₂) hanya memiliki ikatan tunggal dan bersifat jenuh.",
      "Alkena (CₙH₂ₙ) memiliki satu ikatan rangkap dua C=C.",
      "Alkuna (CₙH₂ₙ₋₂) memiliki satu ikatan rangkap tiga C≡C.",
      "Reaksi substitusi khas alkana, sedangkan adisi khas alkena dan alkuna.",
    ],
  },
  {
    chapter: "Bab 4: Gugus Fungsi",
    points: [
      "Gugus fungsi menentukan sifat kimia dan reaktivitas senyawa organik.",
      "Gugus hidroksil (–OH) membentuk alkohol dan bersifat polar.",
      "Gugus karbonil (C=O) ditemukan pada aldehida dan keton.",
      "Gugus karboksil (–COOH) membentuk asam karboksilat yang bersifat asam lemah.",
      "Gugus amino (–NH₂) membentuk amina yang bersifat basa.",
    ],
  },
];

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Berapa elektron valensi yang dimiliki atom karbon?",
    options: ["2 elektron", "4 elektron", "6 elektron", "8 elektron"],
    correctAnswer: 1,
    explanation: "Karbon memiliki nomor atom 6 dengan konfigurasi elektron 2-4, sehingga memiliki 4 elektron valensi yang memungkinkan pembentukan 4 ikatan kovalen.",
  },
  {
    id: "q2",
    question: "Hibridisasi sp³ menghasilkan geometri molekul apa?",
    options: ["Linear", "Trigonal planar", "Tetrahedral", "Oktahedral"],
    correctAnswer: 2,
    explanation: "Hibridisasi sp³ menggabungkan 1 orbital s dan 3 orbital p menghasilkan 4 orbital hibrid yang mengarah ke sudut-sudut tetrahedral (109.5°).",
  },
  {
    id: "q3",
    question: "Rumus umum alkena adalah...",
    options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙHₙ"],
    correctAnswer: 1,
    explanation: "Alkena memiliki satu ikatan rangkap dua C=C dengan rumus umum CₙH₂ₙ. Setiap ikatan rangkap mengurangi 2 atom hidrogen dari alkana.",
  },
  {
    id: "q4",
    question: "Gugus fungsi –COOH disebut...",
    options: ["Gugus hidroksil", "Gugus karbonil", "Gugus karboksil", "Gugus amino"],
    correctAnswer: 2,
    explanation: "Gugus karboksil (–COOH) merupakan kombinasi gugus karbonil dan hidroksil, yang membentuk asam karboksilat bersifat asam lemah.",
  },
  {
    id: "q5",
    question: "Jenis reaksi yang khas untuk alkana adalah...",
    options: ["Adisi", "Substitusi", "Eliminasi", "Polimerisasi"],
    correctAnswer: 1,
    explanation: "Alkana bersifat jenuh (hanya ikatan tunggal) sehingga reaksi khasnya adalah substitusi, dimana satu atom H diganti oleh atom/gugus lain.",
  },
  {
    id: "q6",
    question: "Ikatan pi (π) terbentuk dari tumpang tindih orbital secara...",
    options: ["Aksial", "Lateral", "Diagonal", "Radial"],
    correctAnswer: 1,
    explanation: "Ikatan pi terbentuk dari tumpang tindih orbital p secara lateral (sejajar), berbeda dengan ikatan sigma yang terbentuk secara aksial.",
  },
  {
    id: "q7",
    question: "Senyawa organik paling sederhana yang hanya terdiri dari C dan H disebut...",
    options: ["Karbohidrat", "Hidrokarbon", "Protein", "Lipid"],
    correctAnswer: 1,
    explanation: "Hidrokarbon adalah senyawa organik paling sederhana yang hanya mengandung atom karbon (C) dan hidrogen (H), contohnya metana (CH₄).",
  },
  {
    id: "q8",
    question: "Sudut ikatan pada hibridisasi sp² adalah...",
    options: ["90°", "109.5°", "120°", "180°"],
    correctAnswer: 2,
    explanation: "Hibridisasi sp² menghasilkan geometri trigonal planar dengan sudut ikatan 120° di antara ketiga orbital hibrid.",
  },
];

export const mockFlashcards: Flashcard[] = [
  { id: "f1", front: "Apa itu kimia organik?", back: "Cabang ilmu kimia yang mempelajari senyawa karbon dan turunannya, termasuk struktur, sifat, komposisi, reaksi, dan sintesisnya.", status: "baru" },
  { id: "f2", front: "Berapa ikatan kovalen yang dapat dibentuk karbon?", back: "4 ikatan kovalen, karena karbon memiliki 4 elektron valensi.", status: "baru" },
  { id: "f3", front: "Apa perbedaan ikatan sigma dan pi?", back: "Ikatan sigma: tumpang tindih aksial, lebih kuat. Ikatan pi: tumpang tindih lateral, lebih lemah dan terbentuk pada ikatan rangkap.", status: "baru" },
  { id: "f4", front: "Jelaskan hibridisasi sp³!", back: "Penggabungan 1 orbital s + 3 orbital p → 4 orbital hibrid sp³ dengan geometri tetrahedral dan sudut 109.5°.", status: "baru" },
  { id: "f5", front: "Rumus umum alkana?", back: "CₙH₂ₙ₊₂ — senyawa hidrokarbon jenuh dengan ikatan tunggal saja.", status: "baru" },
  { id: "f6", front: "Apa itu gugus karboksil?", back: "Gugus fungsi –COOH yang membentuk asam karboksilat. Bersifat asam lemah karena dapat melepaskan ion H⁺.", status: "baru" },
  { id: "f7", front: "Reaksi khas alkena?", back: "Reaksi adisi — menambahkan atom/gugus pada ikatan rangkap C=C sehingga menjadi ikatan tunggal.", status: "baru" },
  { id: "f8", front: "Apa fungsi gugus amino (–NH₂)?", back: "Membentuk senyawa amina yang bersifat basa. Merupakan komponen utama asam amino penyusun protein.", status: "baru" },
];

export const mockChatMessages: ChatMessage[] = [
  { id: "cm1", role: "ai", content: "Halo! 👋 Saya asisten belajar EduMind. Saya sudah membaca materi \"Kimia Organik\" Anda. Silakan tanya apa saja tentang materinya!", timestamp: "10:00" },
];

export const suggestedQuestions = [
  "Apa perbedaan alkana dan alkena?",
  "Jelaskan konsep hibridisasi sp³!",
  "Sebutkan contoh gugus fungsi!",
  "Bagaimana reaksi substitusi pada alkana?",
];

export const mockChatResponses: Record<string, string> = {
  "apa perbedaan alkana dan alkena": "**Perbedaan Alkana dan Alkena:**\n\n🔹 **Alkana** (CₙH₂ₙ₊₂): Hanya memiliki ikatan tunggal C–C, bersifat **jenuh**, reaksi khasnya adalah **substitusi**.\n\n🔹 **Alkena** (CₙH₂ₙ): Memiliki satu ikatan rangkap dua C=C, bersifat **tak jenuh**, reaksi khasnya adalah **adisi**.\n\nContoh: Etana (C₂H₆) vs Etena (C₂H₄)",
  "jelaskan konsep hibridisasi sp³": "**Hibridisasi sp³:**\n\nProses penggabungan **1 orbital s** dan **3 orbital p** menghasilkan **4 orbital hibrid sp³** yang setara.\n\n📐 **Geometri**: Tetrahedral\n📏 **Sudut ikatan**: 109.5°\n🧪 **Contoh**: Metana (CH₄)\n\nKeempat orbital hibrid mengarah ke sudut-sudut tetrahedral untuk meminimalkan tolakan elektron.",
  "sebutkan contoh gugus fungsi": "**Gugus Fungsi Penting dalam Kimia Organik:**\n\n1. ⚡ **Hidroksil (–OH)** → Alkohol (contoh: etanol)\n2. 🔥 **Karbonil (C=O)** → Aldehida & Keton\n3. 🧪 **Karboksil (–COOH)** → Asam karboksilat (contoh: asam asetat)\n4. 🧬 **Amino (–NH₂)** → Amina (contoh: metilamina)\n5. ⭕ **Ester (–COO–)** → Ester (contoh: etil asetat)",
  "bagaimana reaksi substitusi pada alkana": "**Reaksi Substitusi pada Alkana:**\n\nPada reaksi substitusi, satu atom **hidrogen (H)** pada alkana diganti oleh atom/gugus lain.\n\n**Contoh: Halogenasi Metana**\n```\nCH₄ + Cl₂ → CH₃Cl + HCl\n```\n\n**Mekanisme (radikal bebas):**\n1. **Inisiasi**: Cl₂ → 2Cl• (dengan cahaya UV)\n2. **Propagasi**: CH₄ + Cl• → CH₃• + HCl\n3. **Terminasi**: CH₃• + Cl• → CH₃Cl",
};

export const mockActivities: StudyActivity[] = [
  { id: "a1", type: "quiz", detail: "Menyelesaikan kuis Kimia Organik — Skor: 85%", date: "Hari ini, 09:30" },
  { id: "a2", type: "flashcard", detail: "Mengulang 12 flashcard Fisika Kuantum", date: "Hari ini, 08:15" },
  { id: "a3", type: "upload", detail: "Mengunggah Biologi Molekuler Lanjut.pdf", date: "Kemarin, 14:20" },
  { id: "a4", type: "chat", detail: "Diskusi tentang ikatan kimia — 8 pertanyaan", date: "Kemarin, 11:00" },
  { id: "a5", type: "quiz", detail: "Menyelesaikan kuis Fisika Kuantum — Skor: 72%", date: "2 hari lalu" },
];

export const mockStats: StudyStats = {
  streak: 7,
  targetSolved: 3,
  targetTotal: 5,
  scoreAverage: 82,
  totalTime: 245,
};
