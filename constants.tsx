
import React from 'react';

// SVG Icon Components
const WalletIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
);
const BlockchainIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
);
const NftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const SlotMachineIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>
);
const TradeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
);
const ChatIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);
const StakeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const PostIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
);
const MintIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);


export enum QuestId {
    SETUP_WALLET = 'SETUP_WALLET',
    BLOCKCHAIN_QUIZ = 'BLOCKCHAIN_QUIZ',
    CLAIM_NFT = 'CLAIM_NFT',
    SPIN_SLOTS = 'SPIN_SLOTS',
    FIRST_TRADE = 'FIRST_TRADE',
    MEME_WAR = 'MEME_WAR',
    STAKE_X = 'STAKE_X',
    POST_KAITO = 'POST_KAITO',
    MINT_Z = 'MINT_Z',
}

export interface Quest {
    id: QuestId;
    title: string;
    description: string;
    actionText: string;
    icon: React.ComponentType<{className?: string}>;
    xp: number;
    badge?: string;
    completed: boolean;
}

export const questPaths = [
    {
        title: "Beginner Journey",
        description: "Start your Web3 adventure here. Learn the basics and earn your first rewards!",
        quests: [
            { id: QuestId.SETUP_WALLET, title: "Set up your wallet", description: "Let’s get you a wallet! Choose one to connect and start your journey.", actionText: "Connect Wallet", icon: WalletIcon, xp: 100, badge: "🥇 Crypto Hatchling", completed: false },
            { id: QuestId.BLOCKCHAIN_QUIZ, title: "What is blockchain?", description: "Blockchain is like a magic notebook everyone can see but no one can erase. Answer a quick quiz to earn XP.", actionText: "Take Quiz", icon: BlockchainIcon, xp: 50, completed: false },
            { id: QuestId.CLAIM_NFT, title: "Claim your first NFT", description: "Tap here to claim a free NFT from Zenkō or a partner project.", actionText: "Claim NFT", icon: NftIcon, xp: 150, badge: "🖼️ NFT Owner", completed: false },
        ]
    },
    {
        title: "Degen Mode",
        description: "Ready to dive deeper? Explore the wild side of Web3 with high-risk, high-reward quests.",
        quests: [
            { id: QuestId.SPIN_SLOTS, title: "Spin the Slut Machine", description: "Try your luck and win Shitcoins! Fortune favors the bold.", actionText: "Spin Now", icon: SlotMachineIcon, xp: 75, completed: false },
            { id: QuestId.FIRST_TRADE, title: "Make your first trade", description: "Choose a token and swap it using SwissBorg or Uniswap. Welcome to the world of DeFi.", actionText: "Trade Now", icon: TradeIcon, xp: 200, badge: "💱 Trader", completed: false },
            { id: QuestId.MEME_WAR, title: "Join a meme war", description: "Post your best crypto meme in the community chat and become a legend.", actionText: "Join Chat", icon: ChatIcon, xp: 100, badge: "😂 Meme Lord", completed: false },
        ]
    },
    {
        title: "Partner Quests",
        description: "Engage with our ecosystem partners, discover new projects, and earn exclusive rewards.",
        quests: [
            { id: QuestId.STAKE_X, title: "Stake on Project X", description: "Stake tokens on our partner's platform and earn passive rewards.", actionText: "Stake Now", icon: StakeIcon, xp: 250, badge: "💰 Staker", completed: false },
            { id: QuestId.POST_KAITO, title: "Post a take on Kaito", description: "Share your opinion on the Kaito platform and climb the Yapper Leaderboard.", actionText: "Post Take", icon: PostIcon, xp: 125, completed: false },
            { id: QuestId.MINT_Z, title: "Mint an NFT on Project Z", description: "Create your own unique NFT and share it with the world.", actionText: "Mint Now", icon: MintIcon, xp: 200, badge: "🎨 Creator", completed: false },
        ]
    }
];

// Flatten for easy lookup
export const allQuests: Quest[] = questPaths.flatMap(p => p.quests);
