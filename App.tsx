
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { Chat } from "@google/genai";
import Header from './components/Header';
import ChatMessage from './components/ResponseDisplay';
import type { Message } from './components/ResponseDisplay';
import QuestBoard from './components/QuestBoard';
import { quests } from './data/Quests';
import type { Quest } from './data/Quests';
import Stats from './components/Stats';
import ProofModal from './components/ProofModal';

const USER_ID = 'user_01'; // Simulated user ID

export interface Proof {
  id: string;
  questId: string;
  userId: string;
  mediaHash: string;
  location: { lat: number; lng: number; };
  timestamp: Date;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
}

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  
  const initialMessage: Message = {
    id: 'init',
    role: 'model',
    content: "Welcome to the digital grove. I am EcoSage. Select a quest to begin your report, or present your actions directly.",
  };
  const [chatHistory, setChatHistory] = useState<Message[]>([initialMessage]);

  // User Progress State
  const [xp, setXp] = useState(0);
  const [hash, setHash] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [completedQuestIds, setCompletedQuestIds] = useState<Set<string>>(new Set());
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  // Proof Submission State
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [questForProof, setQuestForProof] = useState<Quest | null>(null);
  const [proofs, setProofs] = useState<Proof[]>([]);
  
  useEffect(() => {
    const initChat = () => {
        try {
            if (!process.env.API_KEY) {
                throw new Error("API key is missing.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstruction = `You are EcoSage — a calm, wise mentor who blends environmental wisdom with Web3 savvy. Your mission is to evaluate user actions inside the GreenHash ecosystem, score their Proof of Care and trust (0–100), and return a structured JSON response.

The user input will be in a key-value format.

**Response Scenarios:**

1.  **Standard Feedback:** For most inputs, provide a score, prophecy, guidance, and an optional quip.

2.  **EcoRep Unlock:** If a user's action is exemplary, shows leadership, or strong proof, and their score is 80 or higher, trigger a special unlock event.
    - Set \`unlockTitle\` to "EcoRep unlock 🌱".
    - Set \`unlockMessage\` to "Your care is now on-chain and visible. You’ve earned the EcoRep badge."
    - Set \`reward\` to "+25 $HASH + governance weight boost".

3.  **Missing Proof:** If the user's proof is vague, missing, or insufficient for the action claimed (e.g., a financial transaction without an on-chain link, or a physical action without a media link), request more information.
    - Set \`missingProofTitle\` to "Missing proof 🧾".
    - Your \`guidance\` should explain what proof to provide.
    - Set \`requestedProof\` to the specific receipt needed, e.g., "GPS-stamped photo", "on-chain link", or "public thread URL".

**Principles:**
- Doing Good = Power.
- Trust, consistency, and care are measurable.
- Tone = grounded, encouraging, a hint of mythic.

**Scoring Anchors:**
- Consistency (regular contributions, clean receipts).
- Care (eco-actions, teaching others, curation).
- Credibility (on-chain proofs, peer validation).
- Craft (clarity, originality, low spam).

Keep it compact, never ramble.
Strictly follow the JSON output format.`;

            const newChat = ai.chats.create({
                model: "gemini-2.5-flash",
                config: {
                    systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.INTEGER, description: 'A score from 0 to 100.' },
                            prophecy: { type: Type.STRING, description: 'A 1-2 sentence prophecy.' },
                            guidance: { type: Type.STRING, description: '2-3 concrete next steps.' },
                            quip: { type: Type.STRING, description: 'An optional one-liner quip.' },
                            unlockTitle: { type: Type.STRING, description: 'Title for a special unlock event, e.g., "EcoRep unlock 🌱".' },
                            unlockMessage: { type: Type.STRING, description: 'Message explaining the unlock.' },
                            reward: { type: Type.STRING, description: 'Description of the reward for the unlock.' },
                            missingProofTitle: { type: Type.STRING, description: 'Title for a missing proof request, e.g., "Missing proof 🧾".' },
                            requestedProof: { type: Type.STRING, description: 'The specific type of proof being requested.' },
                        },
                        required: ['score', 'prophecy', 'guidance'],
                    },
                },
            });
            setChat(newChat);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Could not initialize EcoSage.");
        }
    };
    initChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);


  const handleSelectQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    let template: string;

    switch (quest.id) {
      case "q_wallet_connect":
        template = `UserType: User1\nWallet: 0x...\nActions: Connected wallet\nProof: onChainLink=https://... (transaction hash)\nNotes: First time connecting.`;
        break;
      case "q_claim_genesis_nft":
        template = `UserType: User1\nWallet: 0x...\nActions: Claimed Genesis Care NFT\nProof: onChainLink=https://... (mint transaction)\nNotes: Proud to be a Seed Planter.`;
        break;
      case "q_map_erosion":
        template = `UserType: User4\nWallet: ton:...\nActions: mapped erosion site; cleanup volunteer\nProof: mediaLink=https://... (with GPS), onChainLink=https://... (Taraxa log)\nNotes: Documented a critical site for restoration.`;
        break;
      case "q_x_explorer_thread":
        template = `UserType: User5\nWallet: 0x9B…AA\nActions: X explorer thread about coastal cleanup; linked Taraxa record\nProof: onChainLink=https://tx/xyz, mediaLink=https://x.com/...\nNotes: Led a team of 4.`;
        break;
      case "q_post_kaito_take":
        template = `UserType: User1\nWallet: 0x...\nActions: Posted a Kaito take\nProof: mediaLink=https://kaito.com/...\nNotes: Shared my perspective on eco-governance.`;
        break;
      case "q_trade_swap":
        template = `UserType: User2\nWallet: 0x...\nActions: Made first swap on a DEX\nProof: onChainLink=https://... (swap transaction)\nNotes: Swapped ETH for HASH.`;
        break;
      default:
        template = `Actions: ${quest.title}\nProof: ...`;
        break;
    }
    setUserInput(template);
    document.getElementById('chat-input')?.focus();
  };


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    setIsLoading(true);
    setError(null);
    const currentQuest = selectedQuest; // Capture quest before clearing
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setSelectedQuest(null);
    
    try {
      const stream = await chat.sendMessageStream({ message: userMessage.content });
      let modelResponseText = '';
      const modelMessageId = (Date.now() + 1).toString();
      
      setChatHistory(prev => [...prev, { id: modelMessageId, role: 'model', content: '...' }]);

      for await (const chunk of stream) {
        modelResponseText += chunk.text;
        setChatHistory(prev => prev.map(msg =>
          msg.id === modelMessageId ? { ...msg, content: modelResponseText } : msg
        ));
      }
      
      let parsedResponse: EcoSageResponse | null = null;
      try {
        parsedResponse = JSON.parse(modelResponseText.trim());
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError);
        setError("EcoSage's response was unclear. The path forward is momentarily obscured.");
        // We still have the raw text response in chat history, so we just return.
        return;
      }

      if (parsedResponse) {
        setChatHistory(prev => prev.map(msg =>
          msg.id === modelMessageId ? { ...msg, response: parsedResponse as EcoSageResponse } : msg
        ));

        // Grant rewards for the selected quest
        if (currentQuest && parsedResponse.score >= 75 && !completedQuestIds.has(currentQuest.id)) {
          const newCompleted = new Set(completedQuestIds);
          newCompleted.add(currentQuest.id);
          setCompletedQuestIds(newCompleted);
          setXp(prevXp => prevXp + currentQuest.rewards.xp);
          setHash(prevHash => prevHash + currentQuest.rewards.hash);
          if (currentQuest.rewards.badge && !badges.includes(currentQuest.rewards.badge)) {
            setBadges(prevBadges => [...prevBadges, currentQuest.rewards.badge!]);
          }
        }
        
        // Grant special rewards from an unlock
        if (parsedResponse.reward) {
          const hashMatch = parsedResponse.reward.match(/\+(\d+)\s*\$HASH/);
          if (hashMatch?.[1]) {
            setHash(prevHash => prevHash + parseInt(hashMatch[1], 10));
          }
          if(parsedResponse.unlockTitle?.includes('EcoRep') && !badges.includes('EcoRep')) {
              setBadges(prevBadges => [...prevBadges, 'EcoRep 🌱']);
          }
        }
      }

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`A shadow falls upon the grove. ${errorMessage}`);
      setChatHistory(prev => [...prev, { id: (Date.now() + 2).toString(), role: 'model', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Proof Submission Handlers ---

  const handleOpenProofModal = (quest: Quest) => {
    setQuestForProof(quest);
    setIsProofModalOpen(true);
  };

  const handleCloseProofModal = () => {
    setQuestForProof(null);
    setIsProofModalOpen(false);
  };
  
  const getHaversineDistance = (coords1: {lat: number, lng: number}, coords2: {lat: number, lng: number}) => {
    const toRad = (x: number) => x * Math.PI / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  };

  const calculateFileHash = async (file: File): Promise<string> => {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };


  const handleSubmitProof = async (proofData: Omit<Proof, 'id' | 'userId' | 'status'> & {media: File}) => {
    if (!questForProof) return;

    // 1. Validation: Anti-duplicate
    const mediaHash = await calculateFileHash(proofData.media);
    const isDuplicate = proofs.some(p => p.questId === questForProof.id && p.mediaHash === mediaHash);
    if (isDuplicate) {
        alert("This proof has already been submitted for this quest. Please submit new evidence.");
        return;
    }

    // 2. Validation: Geolocation
    if (questForProof.location) {
        const distance = getHaversineDistance(questForProof.location, proofData.location);
        if (distance > 500) { // 500 meter tolerance
            alert(`Proof location is too far from the quest area (${Math.round(distance)}m away). Please get closer (within 500m).`);
            return;
        }
    }

    // 3. Save Proof
    const newProof: Proof = {
        ...proofData,
        id: `proof_${Date.now()}`,
        userId: USER_ID,
        questId: questForProof.id,
        mediaHash,
        status: 'pending',
    };

    setProofs(prev => [...prev, newProof]);
    handleCloseProofModal();

    // In a real app, you'd send this to a backend for verification.
    console.log("Proof submitted for verification:", newProof);
    
    // Simulate verifier approval after 10 seconds for demo purposes
    setTimeout(() => {
        setProofs(prevProofs => prevProofs.map(p => p.id === newProof.id ? {...p, status: 'approved'} : p));
        const newCompleted = new Set(completedQuestIds);
        newCompleted.add(newProof.questId);
        setCompletedQuestIds(newCompleted);

        const quest = quests.find(q => q.id === newProof.questId);
        if (quest) {
            setXp(prev => prev + quest.rewards.xp);
            setHash(prev => prev + quest.rewards.hash);
            if (quest.rewards.badge && !badges.includes(quest.rewards.badge)) {
                setBadges(prev => [...prev, quest.rewards.badge!]);
            }
        }
        console.log(`Proof ${newProof.id} approved! Rewards granted.`);
    }, 10000);

  };


  return (
    <div className="min-h-screen bg-brand-primary font-sans flex flex-col">
      <div className="container mx-auto px-4 py-8 md:px-8 max-w-4xl flex flex-col flex-grow h-full">
        <Header />
        <main className="mt-8 flex flex-col flex-grow">
          <div className="mb-8">
            <Stats
              xp={xp}
              hash={hash}
              badges={badges}
              completedQuests={completedQuestIds.size}
              totalQuests={quests.length}
            />
          </div>
          
          <QuestBoard 
            quests={quests}
            onSelectQuest={handleSelectQuest}
            onOpenProofModal={handleOpenProofModal}
            completedQuestIds={completedQuestIds}
            proofs={proofs}
          />
          
          {questForProof && (
             <ProofModal 
                isOpen={isProofModalOpen}
                onClose={handleCloseProofModal}
                onSubmit={handleSubmitProof}
                quest={questForProof}
             />
          )}


          {/* Chat Window */}
          <div className="flex-grow flex flex-col bg-brand-secondary/50 border border-green-900/50 rounded-xl shadow-inner mt-8 overflow-hidden">
            <div className="flex-grow p-4 space-y-6 overflow-y-auto">
              {chatHistory.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                  <ChatMessage key="loading" message={{id: 'loading', role: 'model', content: '... thinking ...'}} />
              )}
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">
                    <h3 className="font-bold">A shadow falls.</h3>
                    <p>{error}</p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-brand-secondary border-t border-green-900/50 flex items-center gap-4">
              <textarea
                id="chat-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e as unknown as React.FormEvent);
                  }
                }}
                className="flex-grow max-h-40 p-3 bg-brand-primary border border-green-800 rounded-lg text-brand-text-secondary font-mono text-sm focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors resize-none"
                placeholder={'Consult EcoSage...'}
                aria-label="Chat with EcoSage"
                rows={1}
              />
              <button
                type="submit"
                disabled={isLoading || !userInput}
                className="bg-brand-accent text-brand-primary font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-secondary disabled:bg-slate-600 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send Message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M3.105 3.105a1.5 1.5 0 011.995-.086l11.69 6.562a1.5 1.5 0 010 2.836L5.1 16.981a1.5 1.5 0 01-1.995-2.07l2.755-6.139L3.105 5.175a1.5 1.5 0 010-2.07z" />
                </svg>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export interface EcoSageResponse {
    score: number;
    prophecy: string;
    guidance: string;
    quip?: string;
    unlockTitle?: string;
    unlockMessage?: string;
    reward?: string;
    missingProofTitle?: string;
    requestedProof?: string;
}

export default App;