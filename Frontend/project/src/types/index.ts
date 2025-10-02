export interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'vocabulary' | 'grammar' | 'conversation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  completed: boolean;
  score?: number;
}

export interface LessonSession {
  lessonId: string;
  messages: Message[];
  currentQuestionIndex: number;
  score: number;
  isComplete: boolean;
}