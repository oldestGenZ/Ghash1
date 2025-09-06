
import React from 'react';
import QuestCard from './QuestCard';
import type { Quest } from '../constants';
import type { QuestId } from '../constants';

interface QuestSectionProps {
  path: {
    title: string;
    description: string;
  };
  quests: Quest[];
  onCompleteQuest: (id: QuestId) => void;
}

const QuestSection: React.FC<QuestSectionProps> = ({ path, quests, onCompleteQuest }) => {
  return (
    <section>
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">{path.title}</h2>
        <p className="mt-2 text-brand-text-secondary">{path.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onComplete={onCompleteQuest}
          />
        ))}
      </div>
    </section>
  );
};

export default QuestSection;
