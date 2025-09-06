
import type { Quest, QuestId } from './constants';

export interface QuestPath {
  title: string;
  description: string;
  quests: Quest[];
}
