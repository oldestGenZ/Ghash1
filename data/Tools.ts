export interface Tool {
  id: string;
  name: string;
  logo: string; // For simplicity, can be an emoji or initial for placeholder
  description: string;
  category: 'DeFi' | 'GameFi' | 'SocialFi' | 'Eco-Vetted';
  ecoImpactScore: 'Good' | 'Moderate' | 'Needs Improvement';
  link: string;
}

export const tools: Tool[] = [
  {
    id: 'tool_1',
    name: 'Celo',
    logo: 'C',
    description: 'A mobile-first blockchain platform focused on making financial dApps and crypto payments accessible to anyone.',
    category: 'DeFi',
    ecoImpactScore: 'Good',
    link: 'https://celo.org/',
  },
  {
    id: 'tool_2',
    name: 'Regen Network',
    logo: 'R',
    description: 'A platform for a global marketplace for Earth\'s ecosystem assets, services, and data.',
    category: 'Eco-Vetted',
    ecoImpactScore: 'Good',
    link: 'https://www.regen.network/',
  },
  {
    id: 'tool_3',
    name: 'Axie Infinity',
    logo: 'A',
    description: 'A popular NFT-based online video game. Uses the Ronin sidechain to reduce its environmental impact.',
    category: 'GameFi',
    ecoImpactScore: 'Moderate',
    link: 'https://axieinfinity.com/',
  },
  {
    id: 'tool_4',
    name: 'Lens Protocol',
    logo: 'L',
    description: 'A composable and decentralized social graph, ready for you to build on so you can focus on your community.',
    category: 'SocialFi',
    ecoImpactScore: 'Good',
    link: 'https://www.lens.xyz/',
  },
  {
    id: 'tool_5',
    name: 'Giveth',
    logo: 'G',
    description: 'A community-focused platform building a culture of giving through decentralized applications.',
    category: 'Eco-Vetted',
    ecoImpactScore: 'Good',
    link: 'https://giveth.io/',
  },
  {
    id: 'tool_6',
    name: 'Taraxa',
    logo: 'T',
    description: 'A fast and scalable public ledger designed for audit logging, utilizing an efficient Proof-of-Stake consensus to minimize its ecological footprint.',
    category: 'Eco-Vetted',
    ecoImpactScore: 'Good',
    link: 'https://www.taraxa.io/',
  },
];
