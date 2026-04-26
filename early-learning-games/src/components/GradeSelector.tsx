import React from 'react';
import { useGameStore } from '../stores/gameStore';

interface GradeSelectorProps {
  onGradeSelect?: (gradeId: number) => void;
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({ onGradeSelect }) => {
  const { grades, currentGrade, setCurrentGrade } = useGameStore();
  
  const handleGradeChange = (gradeId: number) => {
    setCurrentGrade(gradeId);
    if (onGradeSelect) {
      onGradeSelect(gradeId);
    }
  };
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Grade</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {grades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => handleGradeChange(grade.id)}
            className={`
              p-4 rounded-2xl transition-all transform hover:scale-105
              ${currentGrade === grade.id 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-background text-gray-700 hover:bg-secondary hover:text-white'
              }
            `}
          >
            <div className="text-2xl font-bold">{grade.name}</div>
            <div className="text-sm opacity-80">{grade.ageRange}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
