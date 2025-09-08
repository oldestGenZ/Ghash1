import React from 'react';

interface StatsProps {
  xp: number;
  hash: number;
  badges: string[];
  completedQuests: number;
  totalQuests: number;
}

const Stats: React.FC<StatsProps> = ({ xp, hash, badges, completedQuests, totalQuests }) => {
  const progressPercentage = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

  const handleLeaderboardClick = () => {
    alert("Leaderboard coming soon!");
  };

  const handleInviteClick = () => {
    navigator.clipboard.writeText("https://ghash.example/invite?ref=123")
      .then(() => alert("Invite link copied to clipboard!"))
      .catch(() => alert("Could not copy invite link."));
  };

  return (
    <div className="p-6 bg-brand-secondary rounded-xl shadow-lg border border-green-900/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Progress Bar and Stats */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold font-serif text-brand-text">EcoRep Journey</h3>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-brand-accent">{xp.toLocaleString()} XP</span>
              <span className="text-sm font-semibold text-green-300 ml-4">{hash.toLocaleString()} $GHASH</span>
            </div>
          </div>
          <div className="w-full bg-brand-primary rounded-full h-2.5 mb-2">
            <div className="bg-gradient-to-r from-brand-accent to-green-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <p className="text-sm text-brand-text-secondary text-right">{completedQuests} / {totalQuests} Quests Completed</p>
          
          <div className="mt-4">
            <h4 className="text-md font-semibold text-brand-text mb-2">Badges Earned:</h4>
            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <span key={index} className="text-sm bg-brand-primary px-3 py-1 rounded-full">{badge}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-text-secondary">Complete quests to earn badges!</p>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="col-span-1 flex flex-col space-y-3">
          <button onClick={handleLeaderboardClick} className="w-full bg-brand-primary hover:bg-green-900/60 text-brand-text font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            🏆 View Leaderboard
          </button>
          <a href="https://t.me/DIP_ATH_bot" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="w-full bg-brand-primary hover:bg-green-900/60 text-brand-text font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
              🤖 Try on Telegram
            </button>
          </a>
          <button onClick={handleInviteClick} className="w-full bg-brand-primary hover:bg-green-900/60 text-brand-text font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            📬 Invite Friends
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
