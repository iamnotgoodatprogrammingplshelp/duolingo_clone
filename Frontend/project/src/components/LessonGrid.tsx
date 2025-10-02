import React from 'react';
import { LessonCard } from './LessonCard';
import { Lesson } from '../types';

interface LessonGridProps {
  lessons: Lesson[];
  onLessonSelect: (lesson: Lesson) => void;
}

export function LessonGrid({ lessons, onLessonSelect }: LessonGridProps) {
  const categories = ['conversation', 'vocabulary', 'grammar'] as const;
  
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'conversation': return 'Conversation Practice';
      case 'vocabulary': return 'Vocabulary Building';
      case 'grammar': return 'Grammar Rules';
      default: return category;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {categories.map((category) => {
        const categoryLessons = lessons.filter(lesson => lesson.category === category);
        
        if (categoryLessons.length === 0) return null;
        
        return (
          <div key={category} className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{getCategoryTitle(category)}</h2>
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-sm text-gray-500">{categoryLessons.length} lessons</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryLessons.map((lesson, index) => {
                // Simple progression logic - need previous lesson completed
                const previousLesson = categoryLessons[index - 1];
                const isLocked = index > 0 && previousLesson && !previousLesson.completed;
                
                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onClick={() => onLessonSelect(lesson)}
                    isLocked={isLocked}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}