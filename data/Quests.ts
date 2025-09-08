export interface Quest {
  id: string;
  title: string;
  type: 'onboarding' | 'socialfi' | 'ecorep' | 'degen';
  requiresProof?: boolean;
  location?: { lat: number, lng: number };
  rewards: {
    xp: number;
    hash: number;
    badge?: string;
  };
}

export const quests: Quest[] = [
    {
        "id": "q_wallet_connect",
        "title": "Connect your wallet",
        "type": "onboarding",
        "rewards": { "xp": 50, "hash": 5, "badge": "Crypto Hatchling" }
    },
    {
        "id": "q_claim_genesis_nft",
        "title": "Claim Genesis Care NFT",
        "type": "onboarding",
        "rewards": { "xp": 80, "hash": 5, "badge": "Seed Planter" }
    },
    {
        "id": "q_map_erosion",
        "title": "Map erosion (GPS + Taraxa log)",
        "type": "ecorep",
        "requiresProof": true,
        "location": { "lat": 34.0522, "lng": -118.2437 }, // Example: Los Angeles
        "rewards": { "xp": 120, "hash": 10, "badge": "Guardian of Roots" }
    },
    {
        "id": "q_x_explorer_thread",
        "title": "Lead with a public thread",
        "type": "socialfi",
        "requiresProof": true, // Example: proof could be a link, but let's use file upload for demo
        "location": { "lat": 40.7128, "lng": -74.0060 }, // Example: New York City for a cleanup event
        "rewards": { "xp": 150, "hash": 15, "badge": "Signal Weaver" }
    },
    {
        "id": "q_post_kaito_take",
        "title": "Post a Kaito take",
        "type": "socialfi",
        "rewards": { "xp": 60, "hash": 5 }
    },
    {
        "id": "q_trade_swap",
        "title": "Make your first swap",
        "type": "degen",
        "rewards": { "xp": 70, "hash": 5 }
    }
];