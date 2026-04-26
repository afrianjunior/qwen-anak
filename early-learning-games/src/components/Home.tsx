import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { Button } from '../components/Button';
import { GradeSelector } from '../components/GradeSelector';
import { LevelSelector } from '../components/LevelSelector';
import { GameCard } from '../components/GameCard';

interface HomeProps {
  onGameSelect: (gameId: string, levelId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onGameSelect }) => {
  const { currentGrade, grades, getTotalProgress, totalStars, gamesPlayed } = useGameStore();
  
  const games = [
    {
      id: 'sorting',
      name: 'Sorting Game',
      category: 'Critical Thinking',
      icon: '🔷',
      color: '#FF6B6B',
      description: 'Sort shapes and colors into matching bins!',
    },
    {
      id: 'physics',
      name: 'Physics Puzzle',
      category: 'Problem Solving',
      icon: '⚽',
      color: '#4ECDC4',
      description: 'Guide the ball to the target using physics!',
    },
    {
      id: 'pattern',
      name: 'Pattern Match',
      category: 'Computational Thinking',
      icon: '🎨',
      color: '#FFE66D',
      description: 'Complete the patterns and sequences!',
      comingSoon: true,
    },
    {
      id: 'memory',
      name: 'Memory Game',
      category: 'Cognitive Skills',
      icon: '🧠',
      color: '#95E1A3',
      description: 'Find matching pairs and boost your memory!',
      comingSoon: true,
    },
    {
      id: 'counting',
      name: 'Counting Fun',
      category: 'Math Basics',
      icon: '🔢',
      color: '#FF9F45',
      description: 'Learn to count with fun objects!',
      comingSoon: true,
    },
  ];
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2">
            🌟 Early Learning Games 🌟
          </h1>
          <p className="text-xl text-gray-700">
            Fun games for kids under 4!
          </p>
        </header>
        
        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-primary">{totalStars}</div>
            <div className="text-sm text-gray-600">⭐ Stars</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-secondary">{gamesPlayed}</div>
            <div className="text-sm text-gray-600">🎮 Games</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-success">
              {Math.round(getTotalProgress())}%
            </div>
            <div className="text-sm text-gray-600">📊 Progress</div>
          </div>
        </div>
        
        {/* Grade Selection */}
        <div className="mb-8">
          <GradeSelector />
        </div>
        
        {/* Level Selection */}
        <div className="mb-8">
          <LevelSelector gradeId={currentGrade} />
        </div>
        
        {/* Games Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose a Game</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                {...game}
                onClick={() => !game.comingSoon && onGameSelect(game.id, `${currentGrade}-1`)}
                disabled={game.comingSoon}
              />
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-gray-600 mt-8">
          <p>Made with ❤️ for little learners everywhere!</p>
          <p className="text-sm mt-2">
            Current Grade: {grades.find(g => g.id === currentGrade)?.name}
          </p>
        </footer>
      </div>
    </div>
  );
};
