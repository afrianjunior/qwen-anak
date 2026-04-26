import React, { useState, useEffect } from 'react';
import Matter from 'matter-js';
import { PixiGame } from '../components/PixiGame';
import { Button } from '../components/Button';
import { StarRating } from '../components/StarRating';
import { useGameStore } from '../stores/gameStore';

interface PhysicsPuzzleProps {
  levelId: string;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

export const PhysicsPuzzle: React.FC<PhysicsPuzzleProps> = ({
  levelId,
  onComplete,
  onBack,
}) => {
  const { addTimeSpent, completeLevel } = useGameStore();
  const [showStars, setShowStars] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  
  // Parse level info
  const [gradeId, levelNum] = levelId.split('-').map(Number);
  const difficulty = Math.min(levelNum, 5); // 1-5 difficulty based on level
  
  const handleInit = (app: any) => {
    // Create Matter.js engine
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Events = Matter.Events;
    
    // Create engine
    const engine = Engine.create();
    const world = engine.world;
    
    // Create boundaries
    const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(0, 300, 60, 600, { isStatic: true });
    const rightWall = Bodies.rectangle(800, 300, 60, 600, { isStatic: true });
    
    // Create target zone
    const targetZone = Bodies.rectangle(700, 550, 100, 20, { 
      isStatic: true,
      isSensor: true,
      label: 'target'
    });
    
    // Create ball to drop
    const ball = Bodies.circle(100, 100, 30, {
      restitution: 0.5,
      friction: 0.005,
      label: 'ball'
    });
    
    // Create obstacles based on difficulty
    const obstacles = [];
    for (let i = 0; i < difficulty * 2; i++) {
      const obstacle = Bodies.rectangle(
        200 + i * 100,
        200 + (i % 2) * 150,
        80,
        20,
        { 
          isStatic: true,
          angle: Math.random() * Math.PI * 0.5
        }
      );
      obstacles.push(obstacle);
    }
    
    // Add all bodies to world
    Composite.add(world, [ground, leftWall, rightWall, targetZone, ball, ...obstacles]);
    
    // Collision detection for win condition
    Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      for (const pair of pairs) {
        const { bodyA, bodyB } = pair;
        if ((bodyA.label === 'ball' && bodyB.label === 'target') ||
            (bodyB.label === 'ball' && bodyA.label === 'target')) {
          setGameWon(true);
          setTimeout(() => setShowStars(true), 500);
        }
      }
    });
    
    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);
    
    // Store cleanup function
    return () => {
      Runner.stop(runner);
      Engine.clear(engine);
    };
  };
  
  const handleComplete = (stars: number) => {
    completeLevel(levelId, stars);
    onComplete(stars);
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      addTimeSpent(1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [addTimeSpent]);
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Button onClick={onBack} variant="secondary" size="small">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-primary">
            Physics Puzzle - Level {levelNum}
          </h1>
          <div className="w-20" />
        </div>
        
        {/* Game Canvas */}
        <div className="bg-white rounded-3xl p-4 shadow-xl">
          <PixiGame
            width={800}
            height={600}
            onInit={handleInit}
            className="mx-auto"
          />
        </div>
        
        {/* Instructions */}
        <div className="mt-4 text-center">
          <p className="text-xl text-gray-700">
            🎯 Guide the ball to the target zone!
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Tap objects to interact with them
          </p>
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
