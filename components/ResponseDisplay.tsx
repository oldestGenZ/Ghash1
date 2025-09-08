
import React from 'react';
import type { EcoSageResponse } from '../App';
import { LeafIcon, PathIcon, SparkleIcon, BadgeIcon, ReceiptIcon } from './icons';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  response?: EcoSageResponse;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end group">
        <div className="bg-brand-accent text-brand-primary rounded-xl rounded-br-none shadow-md p-3 max-w-lg transition-transform duration-200 group-hover:scale-[1.02]">
          <p className="text-base whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  // Handle initial placeholder for model's response
  if (message.role === 'model' && message.content === '...' && !message.response) {
      return (
        <div className="flex justify-start group">
            <div className="bg-brand-secondary rounded-xl rounded-bl-none shadow-md p-4 max-w-lg animate-fade-in">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse-fast" style={{animationDelay: '0s'}}></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse-fast" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse-fast" style={{animationDelay: '300ms'}}></div>
                </div>
            </div>
        </div>
      );
  }

  const { response, content } = message;

  if (!response) {
      return (
        <div className="flex justify-start group">
            <div className="bg-brand-secondary rounded-xl rounded-bl-none shadow-md p-4 max-w-lg animate-fade-in transition-transform duration-200 group-hover:scale-[1.02]">
                 <p className="text-brand-text-secondary whitespace-pre-wrap">{content || '...'}</p>
            </div>
        </div>
      )
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-300 border-green-400';
    if (score >= 50) return 'text-yellow-300 border-yellow-400';
    return 'text-red-300 border-red-400';
  };

  return (
    <div className="flex justify-start group">
      <div className="bg-brand-secondary rounded-xl rounded-bl-none shadow-lg border border-green-900/50 p-6 md:p-8 animate-fade-in max-w-lg transition-transform duration-200 group-hover:scale-[1.02]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <div className={`
              w-32 h-32 rounded-full border-4 flex items-center justify-center
              bg-brand-primary/50 ${getScoreColor(response.score)}
            `}>
              <div className="text-center">
                <span className="text-4xl font-bold font-serif">{response.score}</span>
                <p className="text-sm tracking-widest uppercase">Score</p>
              </div>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
               <LeafIcon className="w-6 h-6 text-brand-accent mr-3" />
               <h2 className="text-xl font-semibold font-serif text-brand-text">EcoSage's Prophecy</h2>
            </div>
            <p className="text-lg italic text-brand-text-secondary mb-6">"{response.prophecy}"</p>
            
            <div className="flex items-center justify-center md:justify-start mb-2">
               <PathIcon className="w-6 h-6 text-brand-accent mr-3" />
               <h2 className="text-xl font-semibold font-serif text-brand-text">Your Path Forward</h2>
            </div>
            <p className="text-brand-text-secondary whitespace-pre-line">{response.guidance}</p>
            
            {response.quip && (
               <div className="mt-6 border-t border-green-800/50 pt-4 flex items-center gap-3 justify-center md:justify-start">
                 <SparkleIcon className="w-5 h-5 text-yellow-300/80" />
                 <p className="text-sm italic text-brand-text-secondary">{response.quip}</p>
               </div>
            )}
          </div>
        </div>

        {response.missingProofTitle && (
          <div className="mt-6 border-t-2 border-dashed border-amber-600/30 pt-6 animate-fade-in-slow">
              <div className="flex items-center justify-center mb-2">
                  <ReceiptIcon className="w-6 h-6 text-amber-400 mr-3" />
                  <h3 className="text-xl font-semibold font-serif text-amber-300">{response.missingProofTitle}</h3>
              </div>
              <p className="text-center text-amber-200">
                  To strengthen your proof, the Sage asks for a clearer sign. See "Your Path Forward" for details.
              </p>
          </div>
        )}

        {response.unlockTitle && (
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-yellow-300/10 to-transparent border-2 border-dashed border-yellow-300/30 animate-fade-in-slow">
              <div className="flex items-center justify-center mb-3">
                  <BadgeIcon className="w-8 h-8 text-yellow-300 mr-3" />
                  <h3 className="text-2xl font-bold font-serif text-yellow-200">{response.unlockTitle}</h3>
              </div>
              <p className="text-center text-lg text-yellow-100 mb-3">
                  "{response.unlockMessage}"
              </p>
              <div className="text-center bg-yellow-900/50 inline-block px-4 py-2 rounded-lg">
                  <p className="font-semibold text-yellow-200">Reward: {response.reward}</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;