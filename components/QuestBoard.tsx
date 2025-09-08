import React from 'react';
import type { Quest } from '../data/Quests';
import type { Proof } from '../App';


interface QuestBoardProps {
  quests: Quest[];
  onSelectQuest: (quest: Quest) => void;
  onOpenProofModal: (quest: Quest) => void;
  completedQuestIds: Set<string>;
  proofs: Proof[];
}

const QuestBoard: React.FC<QuestBoardProps> = ({ quests, onSelectQuest, onOpenProofModal, completedQuestIds, proofs }) => {
  const getTagColor = (type: string) => {
    switch (type) {
      case 'onboarding': return 'bg-sky-800 text-sky-200';
      case 'socialfi': return 'bg-amber-800 text-amber-200';
      case 'ecorep': return 'bg-teal-800 text-teal-200';
      case 'degen': return 'bg-rose-800 text-rose-200';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold font-serif text-brand-text mb-4">Missions &amp; Quests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quests.map((quest) => {
            const isCompleted = completedQuestIds.has(quest.id);
            const pendingProof = proofs.find(p => p.questId === quest.id && p.status === 'pending');

            let button;
            if (isCompleted) {
                button = <button disabled className="w-full text-center bg-brand-success text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed">Completed</button>;
            } else if (pendingProof) {
                button = <button disabled className="w-full text-center bg-yellow-700 text-yellow-100 font-semibold py-2 px-4 rounded-lg cursor-not-allowed">Pending Review</button>;
            } else if (quest.requiresProof) {
                button = <button onClick={() => onOpenProofModal(quest)} className="w-full text-center bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Submit Proof</button>;
            } else {
                 button = <button onClick={() => onSelectQuest(quest)} className="w-full text-center bg-brand-accent hover:bg-brand-accent-hover text-brand-primary font-semibold py-2 px-4 rounded-lg transition-colors">Start Report</button>;
            }

            return (
              <div
                key={quest.id}
                className={`bg-brand-secondary p-4 rounded-lg border border-green-900/50 flex flex-col justify-between transition-opacity ${isCompleted ? 'opacity-60' : ''}`}
              >
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-brand-text pr-2">{quest.title}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${getTagColor(quest.type)}`}>
                            {quest.type}
                        </span>
                    </div>
                    <div className="text-sm text-brand-text-secondary mb-4">
                        <span>XP: {quest.rewards.xp}</span>
                        <span className="mx-2">|</span>
                        <span>$GHASH: {quest.rewards.hash}</span>
                        {quest.rewards.badge && (
                            <>
                            <span className="mx-2">|</span>
                            <span className="font-semibold">{quest.rewards.badge}</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-auto">
                    {button}
                </div>
              </div>
            )
        })}
      </div>
    </div>
  );
};

export default QuestBoard;
