import React from 'react';
import type { Tool } from '../data/Tools';
import { ExternalLinkIcon } from './icons';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'Good': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Moderate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Needs Improvement': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DeFi': return 'bg-blue-800 text-blue-200';
      case 'GameFi': return 'bg-purple-800 text-purple-200';
      case 'SocialFi': return 'bg-amber-800 text-amber-200';
      case 'Eco-Vetted': return 'bg-teal-800 text-teal-200';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="bg-brand-secondary p-4 rounded-lg border border-green-900/50 flex flex-col justify-between h-full animate-fade-in">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-primary rounded-md flex items-center justify-center font-bold text-brand-accent">
                {tool.logo}
             </div>
             <h3 className="font-semibold text-lg text-brand-text">{tool.name}</h3>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${getCategoryColor(tool.category)}`}>
            {tool.category}
          </span>
        </div>
        <p className="text-sm text-brand-text-secondary mb-4 min-h-[60px]">{tool.description}</p>
      </div>

      <div className="mt-auto">
        <div className={`text-sm font-semibold p-2 rounded-md border text-center mb-4 ${getScoreColor(tool.ecoImpactScore)}`}>
          Eco-Impact Score: {tool.ecoImpactScore}
        </div>
        <a 
          href={tool.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full text-center block bg-brand-primary hover:bg-green-900/60 text-brand-text font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Visit Tool <ExternalLinkIcon className="w-4 h-4 inline-block ml-1" />
        </a>
      </div>
    </div>
  );
};

export default ToolCard;
