import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-green-200 to-brand-accent">
        EcoSage
      </h1>
      <p className="mt-3 text-lg md:text-xl text-brand-text-secondary">
        Consult the wisdom of the GreenHash ecosystem.
      </p>
    </header>
  );
};

export default Header;
