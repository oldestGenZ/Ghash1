import React from 'react';

const MissionStatement: React.FC = () => {
  return (
    <section className="p-6 md:p-8 bg-brand-secondary/30 rounded-xl border border-green-900/50 text-center animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-text mb-3">
        Our Mission
      </h2>
      <p className="text-lg text-brand-text-secondary max-w-3xl mx-auto leading-relaxed">
        To empower communities — starting with Africa’s youth — to create, curate, and trade in Web3 while driving measurable climate-positive action through our Proof of Care consensus.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-text mt-8 mb-3">
        Our Vision
      </h2>
      <p className="text-lg text-brand-text-secondary max-w-3xl mx-auto leading-relaxed">
        A decentralized digital economy where every transaction strengthens both the ecosystem and the planet, making “doing good” the most valuable currency.
      </p>

      <blockquote className="my-8 max-w-2xl mx-auto text-lg italic bg-brand-secondary/50 p-4 border-l-4 border-brand-accent text-brand-text-secondary">
        GreenHash introduces Proof of Care (POC), a novel consensus mechanism where builders, curators, eco-actors, and traders validate the protocol through meaningful contributions.
      </blockquote>

      <a
        href="https://t.me/DIP_ATH_bot?start=startquest"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-8 py-3 bg-brand-accent text-brand-primary font-bold rounded-lg transition-all duration-300 hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-secondary transform hover:scale-105"
      >
        🎮 Play Eco Quest on Telegram
      </a>
    </section>
  );
};

export default MissionStatement;
