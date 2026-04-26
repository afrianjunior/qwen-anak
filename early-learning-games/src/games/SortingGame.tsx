import React, { useState } from 'react';
import { Button } from '../components/Button';
import { StarRating } from '../components/StarRating';
import { useGameStore } from '../stores/gameStore';
import { shuffleArray } from '../utils/helpers';

interface SortingGameProps {
  levelId: string;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'star';
type ColorType = 'red' | 'blue' | 'yellow' | 'green';

interface SortableItem {
  id: number;
  type: ShapeType;
  color: ColorType;
}

export const SortingGame: React.FC<SortingGameProps> = ({
  levelId,
  onComplete,
  onBack,
}) => {
  const { addTimeSpent, completeLevel } = useGameStore();
  const [showStars, setShowStars] = useState(false);
  
  const [gradeId, levelNum] = levelId.split('-').map(Number);
  const numCategories = Math.min(2 + Math.floor(levelNum / 3), 4); // 2-4 categories
  const itemsPerCategory = 3;
  
  // Generate items to sort
  const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'star'];
  const colors: ColorType[] = ['red', 'blue', 'yellow', 'green'];
  
  const [items, setItems] = useState<SortableItem[]>(() => {
    const generated: SortableItem[] = [];
    let id = 0;
    
    for (let i = 0; i < numCategories; i++) {
      for (let j = 0; j < itemsPerCategory; j++) {
        generated.push({
          id: id++,
          type: shapes[i % shapes.length],
          color: colors[i % colors.length],
        });
      }
    }
    
    return shuffleArray(generated);
  });
  
  const [sortedItems, setSortedItems] = useState<Record<string, SortableItem[]>>({});
  const [selectedItem, setSelectedItem] = useState<SortableItem | null>(null);
  
  const categories = shapes.slice(0, numCategories);
  
  const handleItemClick = (item: SortableItem) => {
    if (sortedItems[item.type]?.find(i => i.id === item.id)) return;
    setSelectedItem(item);
  };
  
  const handleCategoryDrop = (category: ShapeType) => {
    if (!selectedItem || selectedItem.type !== category) return;
    
    setSortedItems(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), selectedItem],
    }));
    
    setSelectedItem(null);
    
    // Check if all items are sorted correctly
    const totalSorted = Object.values(sortedItems).reduce((sum, arr) => sum + arr.length, 0) + 1;
    if (totalSorted >= items.length) {
      setTimeout(() => setShowStars(true), 500);
    }
  };
  
  const handleComplete = (stars: number) => {
    completeLevel(levelId, stars);
    onComplete(stars);
  };
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      addTimeSpent(1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [addTimeSpent]);
  
  const getShapeEmoji = (type: ShapeType): string => {
    const emojis: Record<ShapeType, string> = {
      circle: '🔴',
      square: '🟦',
      triangle: '🔺',
      star: '⭐',
    };
    return emojis[type];
  };
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Button onClick={onBack} variant="secondary" size="small">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-primary">
            Sorting Game - Level {levelNum}
          </h1>
          <div className="w-20" />
        </div>
        
        {/* Instructions */}
        <div className="text-center mb-4">
          <p className="text-xl text-gray-700">
            🎯 Sort the shapes into their matching bins!
          </p>
        </div>
        
        {/* Category Bins */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategoryDrop(category)}
              className={`
                bg-white rounded-3xl p-4 min-h-[150px] cursor-pointer
                transition-all transform hover:scale-105 shadow-lg
                ${selectedItem?.type === category ? 'ring-4 ring-success' : ''}
              `}
            >
              <div className="text-4xl mb-2">{getShapeEmoji(category)}</div>
              <div className="text-lg font-bold text-gray-700 capitalize">
                {category}s
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {sortedItems[category]?.map((item) => (
                  <span key={item.id} className="text-2xl">
                    {getShapeEmoji(item.type)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Items to Sort */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Tap a shape to select it:</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {items.map((item) => {
              const isSorted = sortedItems[item.type]?.find(i => i.id === item.id);
              const isSelected = selectedItem?.id === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={!!isSorted}
                  className={`
                    w-20 h-20 rounded-2xl text-4xl flex items-center justify-center
                    transition-all transform
                    ${isSorted 
                      ? 'opacity-30 cursor-not-allowed' 
                      : isSelected
                        ? 'ring-4 ring-primary scale-110'
                        : 'hover:scale-110 cursor-pointer'
                    }
                    bg-background shadow-md
                  `}
                >
                  {getShapeEmoji(item.type)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Star Rating Modal */}
      {showStars && (
        <StarRating 
          maxStars={3} 
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};
