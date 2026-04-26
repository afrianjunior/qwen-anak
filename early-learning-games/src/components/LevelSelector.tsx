import React from 'react';
import { useGameStore } from '../stores/gameStore';

interface LevelSelectorProps {
  gradeId: number;
  onLevelSelect?: (levelId: string) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ gradeId, onLevelSelect }) => {
  const { getLevelsForGrade, isLevelUnlocked, setCurrentLevel } = useGameStore();
  const levels = getLevelsForGrade(gradeId);
  
  const handleLevelClick = (level: typeof levels[0]) => {
    if (!level.unlocked) return;
    
    setCurrentLevel(level.id);
    if (onLevelSelect) {
      onLevelSelect(`${gradeId}-${level.id}`);
    }
  };
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Level {levels.find(l => l.completed)?.number || 1}
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => handleLevelClick(level)}
            disabled={!level.unlocked}
            className={`
              aspect-square rounded-2xl flex flex-col items-center justify-center
              transition-all transform
              ${level.unlocked 
                ? level.completed 
                  ? 'bg-success text-white hover:scale-110 cursor-pointer' 
                  : 'bg-secondary text-white hover:scale-110 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <span className="text-2xl font-bold">{level.number}</span>
            {level.stars > 0 && (
              <div className="flex mt-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={i < level.stars ? 'text-yellow-300' : 'text-gray-400'}>
                    ★
                  </span>
                ))}
              </div>
            )}
            {!level.unlocked && (
              <span className="text-xl">🔒</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
