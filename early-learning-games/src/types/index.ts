export interface Grade {
  id: number;
  name: string;
  ageRange: string;
  description: string;
}

export interface Level {
  id: number;
  gradeId: number;
  number: number;
  stars: number;
  completed: boolean;
  unlocked: boolean;
}

export interface GameConfig {
  id: string;
  name: string;
  category: GameCategory;
  icon: string;
  color: string;
  description: string;
  minAge: number;
  maxAge: number;
}

export type GameCategory = 
  | 'sorting' 
  | 'pattern' 
  | 'physics' 
  | 'memory' 
  | 'counting';

export interface GameState {
  currentGrade: number;
  currentLevel: number;
  totalStars: number;
  gamesPlayed: number;
  timeSpent: number;
}

export interface ProgressData {
  grades: Grade[];
  levels: Record<string, Level[]>;
  gameState: GameState;
}
