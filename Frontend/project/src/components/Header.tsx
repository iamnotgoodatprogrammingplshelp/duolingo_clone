import React from 'react';
import { Brain, Trophy, Target } from 'lucide-react';

interface HeaderProps {
  totalScore: number;
  completedLessons: number;
  totalLessons: number;
}

export function Header({ totalScore, completedLessons, totalLessons }: HeaderProps) {
  const completionRate = Math.round((completedLessons / totalLessons) * 100);

  return (
    <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">LinguaChat</h1>
              <p className="text-green-100">AI-Powered Language Learning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{totalScore} pts</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <Target className="w-5 h-5 text-green-300" />
              <span className="font-semibold">{completionRate}% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}