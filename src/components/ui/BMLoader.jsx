import React, { useState, useEffect, useCallback } from 'react';
import { PiPersonSimpleRun } from "react-icons/pi";
import { Mountain } from "lucide-react";

export default function BMLoader() {
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [position, setPosition] = useState(0);
  const [obstaclePositions, setObstaclePositions] = useState([50, 100, 150]);
  const [score, setScore] = useState(0);
  const [lastJumpScore, setLastJumpScore] = useState(0);

  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setScore(prev => prev + 10);
      setTimeout(() => setIsJumping(false), 500);
    }
  }, [isJumping, gameOver]);

  const resetGame = useCallback(() => {
    setGameOver(false);
    setPosition(0);
    setObstaclePositions([50, 100, 150]);
    setScore(0);
    setLastJumpScore(0);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
      } else if (e.code === 'KeyR' && gameOver) {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, gameOver, resetGame]);

  useEffect(() => {
    if (!gameOver) {
      const gameLoop = setInterval(() => {
        setObstaclePositions((prev) => {
          return prev.map(pos => {
            if (pos <= -2) {
              return 100;
            }
            return pos - 0.5; // Smoother movement for full width
          });
        });

        // Character position in px (left: 32px, width: 32px)
        const characterLeft = 32;
        const characterRight = characterLeft + 32;

        // Container width (assume 100% of parent, e.g., 1000px for calculation)
        const containerWidth = 1000; // Adjust if needed

        const hasCollision = obstaclePositions.some(pos => {
          // pos is in %, convert to px
          const obstacleLeft = (pos / 100) * containerWidth;
          const obstacleRight = obstacleLeft + 24; // Mountain width (w-6 = 24px max)
          // Collision if character and obstacle overlap
          return !isJumping && obstacleLeft < characterRight && obstacleRight > characterLeft;
        });

        if (hasCollision) {
          setGameOver(true);
        }
      }, 16); // Smoother interval

      return () => clearInterval(gameLoop);
    }
  }, [gameOver, isJumping, obstaclePositions]);

  return (
    <div className="w-full flex flex-col items-center justify-center z-50">
      <div className="relative w-full h-24 max-w-none">
        {/* Ground as a full-width, thin line */}
        <div className="absolute bottom-4 left-0 w-full h-[2px] bg-[#0451E4]"></div>

        {/* Character - Running Person */}
        <div 
          className={`absolute bottom-4 left-8 w-8 h-8 transition-transform duration-500 ${
            isJumping ? 'translate-y-[-40px]' : 'translate-y-0'
          }`}
        >
          <PiPersonSimpleRun className="w-full h-full text-black" />
        </div>

        {/* Obstacles - Three Mountains */}
        {obstaclePositions.map((pos, index) => (
          <div 
            key={index}
            className={`absolute bottom-4 ${index === 1 ? 'w-6 h-6' : 'w-4 h-4'}`}
            style={{ left: `calc(${pos}% )` }}
          >
            <Mountain 
              className="w-full h-full text-black fill-black"
            />
          </div>
        ))}

        {/* Score Display */}
        <div className="absolute top-2 right-4 font-bold text-sm" style={{ color: '#0451E4' }}>
          Score: {score}
        </div>

        {/* Game Over Text */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center mb-6" style={{ color: '#0451E4' }}>
            <div className="text-2xl font-bold mb-2">Game Over!</div>
            <div className="text-sm">Press R to restart</div>
            <div className="text-sm mt-2">Score: {score}</div>
          </div>
        )}
      </div>
      {/* Loading Text below the line, centered */}
      <div className="mt-2 w-full flex justify-center">
        <span className="font-semibold text-sm" style={{ color: '#0451E4' }}>Loading...</span>
      </div>
    </div>
  );
} 