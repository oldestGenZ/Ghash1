import React, { useState } from 'react';
import { tools } from '../data/Tools';
import type { Tool } from '../data/Tools';
import ToolCard from './ToolCard';

const CATEGORIES = ['All', 'DeFi', 'GameFi', 'SocialFi', 'Eco-Vetted'];

const ToolHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = activeCategory === 'All'
    ? tools
    : tools.filter(tool => tool.category === activeCategory);
    
  const handleSuggestTool = () => {
    alert("Feature coming soon! Suggest tools on our Telegram channel.");
  };

  return (
    <div className="my-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-serif text-brand-text mb-4 md:mb-0">
            Green Web3 Hub
          </h2>
          <button 
             onClick={handleSuggestTool} 
             className="bg-brand-primary hover:bg-green-900/60 text-brand-text font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
           >
             + Suggest a Tool
           </button>
      </div>
      <p className="text-brand-text-secondary mb-6 text-center md:text-left max-w-2xl">
        A curated list of vetted Web3 tools, assessed for their climate accountability and potential for positive impact.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
              activeCategory === category
                ? 'bg-brand-accent text-brand-primary'
                : 'bg-brand-secondary hover:bg-green-900/60 text-brand-text-secondary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
        {filteredTools.length === 0 && (
            <div className="col-span-full text-center p-8 bg-brand-secondary/50 rounded-lg">
                <p className="text-brand-text-secondary">No tools found in this category yet.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ToolHub;
