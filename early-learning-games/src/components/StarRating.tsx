import React, { useState } from 'react';
import { Button } from './Button';

interface StarRatingProps {
  maxStars?: number;
  onComplete?: (stars: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  maxStars = 3, 
  onComplete 
}) => {
  const [currentStar, setCurrentStar] = useState(0);
  const [showing, setShowing] = useState(false);
  
  const showStars = () => {
    setShowing(true);
    let star = 0;
    
    const interval = setInterval(() => {
      star++;
      setCurrentStar(star);
      
      if (star >= maxStars) {
        clearInterval(interval);
        setTimeout(() => {
          setShowing(false);
          setCurrentStar(0);
          if (onComplete) {
            onComplete(maxStars);
          }
        }, 1000);
      }
    }, 500);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 animate-bounce">
        <h2 className="text-4xl font-bold text-primary mb-6">Great Job! 🎉</h2>
        
        <div className="flex justify-center gap-4 mb-8">
          {[...Array(maxStars)].map((_, i) => (
            <span
              key={i}
              className={`text-6xl transition-all duration-300 ${
                i < currentStar 
                  ? 'text-yellow-400 scale-125' 
                  : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        
        {!showing && (
          <Button onClick={showStars} variant="success" size="large">
            Continue →
          </Button>
        )}
      </div>
    </div>
  );
};
