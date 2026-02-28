import React from 'react';
import { AIConfig } from '../game/types';
import '../styles/Controls.css';

interface ControlsProps {
  gameStatus: 'active' | 'redWon' | 'blackWon' | 'draw';
  currentPlayer: 'red' | 'black';
  capturedRed: number;
  capturedBlack: number;
  aiConfig: AIConfig;
  onNewGame: () => void;
  onToggleAI: () => void;
  onDifficultyChange: (difficulty: 'easy' | 'medium') => void;
}

export const Controls: React.FC<ControlsProps> = ({
  gameStatus,
  currentPlayer,
  capturedRed,
  capturedBlack,
  aiConfig,
  onNewGame,
  onToggleAI,
  onDifficultyChange,
}) => {
  const getStatusMessage = () => {
    if (gameStatus === 'redWon') return '🔴 Red Wins!';
    if (gameStatus === 'blackWon') return '⚫ Black Wins!';
    if (gameStatus === 'draw') return 'Game Draw';
    return currentPlayer === 'red' ? '🔴 Red\'s Turn' : '⚫ Black\'s Turn';
  };

  return (
    <div className="controls">
      <div className="status">
        <h2>{getStatusMessage()}</h2>
      </div>

      <div className="captured">
        <div className="captured-section">
          <div>Red Captured:</div>
          <div className="captured-count">{capturedBlack}</div>
        </div>
        <div className="captured-section">
          <div>Black Captured:</div>
          <div className="captured-count">{capturedRed}</div>
        </div>
      </div>

      <button onClick={onNewGame} className="button button-primary">
        New Game
      </button>

      <div className="ai-controls">
        <label>
          <input type="checkbox" checked={aiConfig.enabled} onChange={onToggleAI} />
          Play vs AI
        </label>

        {aiConfig.enabled && (
          <div className="difficulty">
            <label>
              <input
                type="radio"
                name="difficulty"
                value="easy"
                checked={aiConfig.difficulty === 'easy'}
                onChange={() => onDifficultyChange('easy')}
              />
              Easy
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="medium"
                checked={aiConfig.difficulty === 'medium'}
                onChange={() => onDifficultyChange('medium')}
              />
              Medium
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
