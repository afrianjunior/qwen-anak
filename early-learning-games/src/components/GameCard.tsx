import React from 'react';
import { Button } from '../components/Button';

interface GameCardProps {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  name,
  category,
  icon,
  color,
  description,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-white rounded-3xl p-6 shadow-xl
        transition-all transform hover:scale-105
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{ borderLeft: `8px solid ${color}` }}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-2 capitalize">{category}</p>
      <p className="text-gray-700">{description}</p>
    </button>
  );
};
