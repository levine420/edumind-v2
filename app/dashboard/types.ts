export interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  type: "pdf" | "ppt";
  progress: number; // 0 to 100
  summaryReady: boolean;
  quizReady: boolean;
  flashcardReady: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of options (0-3)
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  status: "baru" | "belum" | "paham";
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface StudyActivity {
  id: string;
  type: "upload" | "quiz" | "flashcard" | "chat";
  detail: string;
  date: string;
}

export interface StudyStats {
  streak: number;
  targetSolved: number;
  targetTotal: number;
  scoreAverage: number;
  totalTime: number; // in minutes
}
