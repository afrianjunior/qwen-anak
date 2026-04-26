import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface PixiGameProps {
  width?: number;
  height?: number;
  onInit?: (app: PIXI.Application) => void;
  onUpdate?: (delta: number) => void;
  className?: string;
}

export const PixiGame: React.FC<PixiGameProps> = ({
  width = 800,
  height = 600,
  onInit,
  onUpdate,
  className = '',
}) => {
  const pixiRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const animationFrameRef = useRef<number>();
  
  useEffect(() => {
    if (!pixiRef.current) return;
    
    // Create PIXI Application
    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: 0xF7FFF7,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    
    pixiRef.current.appendChild(app.canvas);
    appRef.current = app;
    
    // Call init callback
    if (onInit) {
      onInit(app);
    }
    
    // Game loop
    const gameLoop = () => {
      if (onUpdate && appRef.current) {
        onUpdate(appRef.current.ticker.deltaMS);
      }
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
      }
      if (pixiRef.current && app.canvas) {
        pixiRef.current.removeChild(app.canvas);
      }
    };
  }, [width, height, onInit, onUpdate]);
  
  return (
    <div 
      ref={pixiRef} 
      className={`relative overflow-hidden rounded-3xl shadow-xl ${className}`}
      style={{ width, height }}
    />
  );
};
