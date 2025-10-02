import React, { useState } from 'react';
import { Header } from './components/Header';
import { LessonGrid } from './components/LessonGrid';
import { LessonChat } from './components/LessonChat';
import { lessons as initialLessons } from './data/lessons';
import { Lesson } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [lessons, setLessons] = useLocalStorage<Lesson[]>('linguachat-lessons', initialLessons);
  const [totalScore, setTotalScore] = useLocalStorage<number>('linguachat-score', 0);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const completedLessons = lessons.filter(lesson => lesson.completed).length;

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const handleLessonComplete = (score: number) => {
    if (!currentLesson) return;

    const updatedLessons = lessons.map(lesson => 
      lesson.id === currentLesson.id 
        ? { ...lesson, completed: true, score: Math.max(lesson.score || 0, score) }
        : lesson
    );
    
    setLessons(updatedLessons);
    setTotalScore(prev => prev + score);
    
    setTimeout(() => {
      setCurrentLesson(null);
    }, 3000);
  };

  const handleBackToLessons = () => {
    setCurrentLesson(null);
  };

  if (currentLesson) {
    return (
      <LessonChat
        lesson={currentLesson}
        onBack={handleBackToLessons}
        onComplete={handleLessonComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        totalScore={totalScore}
        completedLessons={completedLessons}
        totalLessons={lessons.length}
      />
      
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Lesson</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Each lesson is an interactive conversation where I'll ask you questions and you respond naturally. 
              Practice your language skills in a dynamic, personalized way!
            </p>
          </div>
          
          <LessonGrid 
            lessons={lessons}
            onLessonSelect={handleLessonSelect}
          />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Made with ❤️ for language learners everywhere
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;