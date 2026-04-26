import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Grade, Level, GameCategory } from '../types';

interface GameStore {
  // State
  currentGrade: number;
  currentLevel: number;
  totalStars: number;
  gamesPlayed: number;
  timeSpent: number;
  unlockedLevels: Record<string, boolean>;
  levelStars: Record<string, number>;
  
  // Grades data
  grades: Grade[];
  
  // Actions
  setCurrentGrade: (gradeId: number) => void;
  setCurrentLevel: (levelId: number) => void;
  completeLevel: (levelId: string, stars: number) => void;
  unlockLevel: (levelId: string) => void;
  addGamePlayed: () => void;
  addTimeSpent: (seconds: number) => void;
  resetProgress: () => void;
  
  // Getters
  getLevelsForGrade: (gradeId: number) => Level[];
  isLevelUnlocked: (levelId: string) => boolean;
  getLevelStars: (levelId: string) => number;
  getTotalProgress: () => number;
}

const GRADES_DATA: Grade[] = [
  { id: 1, name: 'Explorer', ageRange: '18-24 months', description: 'First steps in learning!' },
  { id: 2, name: 'Discoverer', ageRange: '2-2.5 years', description: 'Discovering new things every day!' },
  { id: 3, name: 'Learner', ageRange: '2.5-3 years', description: 'Learning and growing!' },
  { id: 4, name: 'Thinker', ageRange: '3-3.5 years', description: 'Thinking like a pro!' },
  { id: 5, name: 'Master', ageRange: '3.5-4 years', description: 'Master of skills!' },
];

const LEVELS_PER_GRADE = 10;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial State
      currentGrade: 1,
      currentLevel: 1,
      totalStars: 0,
      gamesPlayed: 0,
      timeSpent: 0,
      unlockedLevels: { '1-1': true },
      levelStars: {},
      grades: GRADES_DATA,
      
      // Actions
      setCurrentGrade: (gradeId: number) => set({ currentGrade: gradeId }),
      
      setCurrentLevel: (levelId: number) => set({ currentLevel: levelId }),
      
      completeLevel: (levelId: string, stars: number) => {
        const currentStars = get().levelStars[levelId] || 0;
        const newStars = Math.max(currentStars, stars);
        
        set((state) => ({
          levelStars: {
            ...state.levelStars,
            [levelId]: newStars,
          },
          totalStars: state.totalStars + (newStars > currentStars ? newStars - currentStars : 0),
          gamesPlayed: state.gamesPlayed + 1,
        }));
        
        // Unlock next level if completed with at least 1 star
        if (stars >= 1) {
          const [gradeId, levelNum] = levelId.split('-').map(Number);
          const nextLevelId = `${gradeId}-${levelNum + 1}`;
          
          // Check if it's within the same grade
          if (levelNum < LEVELS_PER_GRADE) {
            get().unlockLevel(nextLevelId);
          } else if (gradeId < 5) {
            // Unlock first level of next grade
            get().unlockLevel(`${gradeId + 1}-1`);
          }
        }
      },
      
      unlockLevel: (levelId: string) => {
        set((state) => ({
          unlockedLevels: {
            ...state.unlockedLevels,
            [levelId]: true,
          },
        }));
      },
      
      addGamePlayed: () => set((state) => ({ gamesPlayed: state.gamesPlayed + 1 })),
      
      addTimeSpent: (seconds: number) => 
        set((state) => ({ timeSpent: state.timeSpent + seconds })),
      
      resetProgress: () => set({
        currentGrade: 1,
        currentLevel: 1,
        totalStars: 0,
        gamesPlayed: 0,
        timeSpent: 0,
        unlockedLevels: { '1-1': true },
        levelStars: {},
      }),
      
      // Getters
      getLevelsForGrade: (gradeId: number) => {
        const levels: Level[] = [];
        for (let i = 1; i <= LEVELS_PER_GRADE; i++) {
          const levelId = `${gradeId}-${i}`;
          levels.push({
            id: i,
            gradeId,
            number: i,
            stars: get().levelStars[levelId] || 0,
            completed: !!get().levelStars[levelId],
            unlocked: get().unlockedLevels[levelId] || false,
          });
        }
        return levels;
      },
      
      isLevelUnlocked: (levelId: string) => {
        return !!get().unlockedLevels[levelId];
      },
      
      getLevelStars: (levelId: string) => {
        return get().levelStars[levelId] || 0;
      },
      
      getTotalProgress: () => {
        const state = get();
        const totalLevels = 5 * LEVELS_PER_GRADE;
        const completedLevels = Object.keys(state.levelStars).length;
        return (completedLevels / totalLevels) * 100;
      },
    }),
    {
      name: 'early-learning-storage',
    }
  )
);
