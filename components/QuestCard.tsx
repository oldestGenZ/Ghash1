
import React from 'react';
import type { Quest } from '../constants';
import type { QuestId } from '../constants';


interface QuestCardProps {
  quest: Quest;
  onComplete: (id: QuestId) => void;
}

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
);


const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete }) => {
  const IconComponent = quest.icon;

  return (
    <div className={`
      bg-brand-secondary rounded-xl shadow-lg p-6 flex flex-col justify-between
      border border-transparent transition-all duration-300
      hover:border-brand-accent hover:shadow-2xl hover:-translate-y-1
      ${quest.completed ? 'opacity-60' : ''}
    `}>
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-brand-accent p-3 rounded-lg mr-4">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{quest.title}</h3>
            {quest.badge && <p className="text-sm text-brand-text-secondary">{quest.badge}</p>}
          </div>
        </div>
        <p className="text-brand-text-secondary mb-4 min-h-[40px]">{quest.description}</p>
      </div>
      <div className="mt-auto">
        {quest.completed ? (
          <button
            disabled
            className="w-full flex items-center justify-center bg-brand-success text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Completed
          </button>
        ) : (
          <button
            onClick={() => onComplete(quest.id)}
            className="w-full bg-brand-accent text-white font-semibold py-2 px-4 rounded-lg
                       transition-colors duration-300 hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-secondary"
          >
            {quest.actionText} (+{quest.xp} XP)
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestCard;
