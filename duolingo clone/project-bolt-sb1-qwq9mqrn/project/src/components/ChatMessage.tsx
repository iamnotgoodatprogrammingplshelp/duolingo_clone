import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export function ChatMessage({ message, isTyping = false }: ChatMessageProps) {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex items-start space-x-3 mb-4 animate-fadeIn ${isAI ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAI ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
      }`}>
        {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
        isAI 
          ? 'bg-gray-100 text-gray-800 rounded-bl-none' 
          : 'bg-blue-500 text-white rounded-br-none'
      }`}>
        <p className="text-sm leading-relaxed">
          {isTyping ? (
            <span className="flex items-center space-x-1">
              <span>Thinking</span>
              <span className="flex space-x-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
            </span>
          ) : (
            message.content
          )}
        </p>
        <span className="text-xs opacity-70 mt-2 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}