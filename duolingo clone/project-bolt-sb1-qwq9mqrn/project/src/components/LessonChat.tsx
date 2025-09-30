import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Trophy } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ProgressBar } from './ProgressBar';
import { Message, Lesson, LessonSession } from '../types';
import { lessonPrompts } from '../data/aiPrompts';

interface LessonChatProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export function LessonChat({ lesson, onBack, onComplete }: LessonChatProps) {
  const [session, setSession] = useState<LessonSession>({
    lessonId: lesson.id,
    messages: [],
    currentQuestionIndex: 0,
    score: 0,
    isComplete: false,
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages, isAITyping]);

  useEffect(() => {
    // Initialize lesson with AI introduction
    const prompts = lessonPrompts[lesson.id];
    if (prompts && session.messages.length === 0) {
      setTimeout(() => {
        const introMessage: Message = {
          id: 'intro',
          type: 'ai',
          content: prompts.introduction,
          timestamp: new Date(),
        };
        setSession(prev => ({
          ...prev,
          messages: [introMessage]
        }));
        
        // Ask first question after introduction
        setTimeout(() => askNextQuestion(), 2000);
      }, 1000);
    }
  }, [lesson.id]);

  const askNextQuestion = () => {
    const prompts = lessonPrompts[lesson.id];
    if (!prompts) return;

    setIsAITyping(true);
    
    setTimeout(() => {
      if (session.currentQuestionIndex < prompts.questions.length) {
        const questionMessage: Message = {
          id: `question-${session.currentQuestionIndex}`,
          type: 'ai',
          content: prompts.questions[session.currentQuestionIndex],
          timestamp: new Date(),
        };
        
        setSession(prev => ({
          ...prev,
          messages: [...prev.messages, questionMessage]
        }));
        setIsAITyping(false);
      } else {
        // Lesson complete
        const completionMessage: Message = {
          id: 'completion',
          type: 'ai',
          content: `Congratulations! You've completed the ${lesson.title} lesson. You did great! Your final score is ${session.score}%.`,
          timestamp: new Date(),
        };
        
        setSession(prev => ({
          ...prev,
          messages: [...prev.messages, completionMessage],
          isComplete: true
        }));
        setIsAITyping(false);
        onComplete(session.score);
      }
    }, 1000 + Math.random() * 1000); // Random delay for more natural feel
  };

  const generateFollowUp = () => {
    const prompts = lessonPrompts[lesson.id];
    if (!prompts) return;

    setIsAITyping(true);
    
    setTimeout(() => {
      const followUp = prompts.followUps[Math.floor(Math.random() * prompts.followUps.length)];
      const followUpMessage: Message = {
        id: `followup-${Date.now()}`,
        type: 'ai',
        content: followUp,
        timestamp: new Date(),
      };
      
      setSession(prev => ({
        ...prev,
        messages: [...prev.messages, followUpMessage]
      }));
      setIsAITyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || session.isComplete) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setSession(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      score: prev.score + 15, // Award points for each response
      currentQuestionIndex: Math.random() > 0.3 ? prev.currentQuestionIndex + 1 : prev.currentQuestionIndex // Sometimes ask follow-up
    }));

    setInputValue('');

    // Decide whether to ask follow-up or next question
    setTimeout(() => {
      if (Math.random() > 0.4) {
        generateFollowUp();
        setTimeout(() => askNextQuestion(), 3000);
      } else {
        setSession(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }));
        askNextQuestion();
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const progress = session.currentQuestionIndex / (lessonPrompts[lesson.id]?.questions.length || 1) * 100;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-800">{lesson.title}</h1>
              <p className="text-sm text-gray-600 capitalize">{lesson.category} • {lesson.difficulty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-gray-800">{session.score}pts</span>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar progress={progress} />
          <p className="text-xs text-gray-500 mt-1 text-center">
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {session.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isAITyping && (
          <ChatMessage 
            message={{
              id: 'typing',
              type: 'ai',
              content: '',
              timestamp: new Date()
            }}
            isTyping={true}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!session.isComplete && (
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex items-center space-x-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response..."
              className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 max-h-32"
              rows={1}
              style={{
                minHeight: '50px',
                height: 'auto',
                overflowY: inputValue.length > 100 ? 'auto' : 'hidden'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="flex-shrink-0 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      )}

      {session.isComplete && (
        <div className="bg-green-50 border-t border-green-200 px-4 py-6">
          <div className="text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Lesson Complete!</h3>
            <p className="text-gray-600 mb-4">You earned {session.score} points!</p>
            <button
              onClick={onBack}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      )}
    </div>
  );
}