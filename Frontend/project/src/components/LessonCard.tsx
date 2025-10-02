import React from 'react';
import { CheckCircle, Lock, Play, Book, MessageCircle, FileText } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
  isLocked?: boolean;
}

export function LessonCard({ lesson, onClick, isLocked = false }: LessonCardProps) {
  const getCategoryIcon = () => {
    switch (lesson.category) {
      case 'vocabulary': return <Book className="w-5 h-5" />;
      case 'grammar': return <FileText className="w-5 h-5" />;
      case 'conversation': return <MessageCircle className="w-5 h-5" />;
      default: return <Play className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = () => {
    switch (lesson.difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-md border-2 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${
        isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'
      }`}
      onClick={isLocked ? undefined : onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
              {isLocked ? <Lock className="w-5 h-5" /> : getCategoryIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{lesson.title}</h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
                {lesson.difficulty}
              </span>
            </div>
          </div>
          {lesson.completed && (
            <CheckCircle className="w-6 h-6 text-green-500" />
          )}
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{lesson.description}</p>
        
        {lesson.score !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Best Score:</span>
            <span className="font-semibold text-green-600">{lesson.score}%</span>
          </div>
        )}
        
        {!isLocked && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-blue-600 font-medium">
              <Play className="w-4 h-4" />
              <span>{lesson.completed ? 'Practice Again' : 'Start Lesson'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}