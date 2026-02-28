import React, { useState, useEffect } from 'react';
import { Board as BoardComponent } from './Board';
import { Controls } from './Controls';
import { GameState, Position, AIConfig, Move } from '../game/types';
import { createInitialBoard } from '../game/board';
import { getValidMoves, applyMove, getGameStatus } from '../game/gameLogic';
import { getBestMove } from '../game/ai';
import '../styles/Game.css';

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: { squares: createInitialBoard().squares },
    currentPlayer: 'red',
    selectedPiece: null,
    validMoves: [],
    capturedRed: 0,
    capturedBlack: 0,
    gameStatus: 'active',
    moveHistory: [],
  }));

  const [aiConfig, setAiConfig] = useState<AIConfig>({
    enabled: false,
    difficulty: 'easy',
  });

  const [isAIThinking, setIsAIThinking] = useState(false);

  // AI move effect
  useEffect(() => {
    if (!aiConfig.enabled || isAIThinking) return;
    if (gameState.gameStatus !== 'active') return;

    const shouldAIMove = aiConfig.enabled && gameState.currentPlayer === 'black';
    if (!shouldAIMove) return;

    const timer = setTimeout(() => {
      setIsAIThinking(true);
      const move = getBestMove(gameState.board, 'black', aiConfig.difficulty);

      if (move) {
        const newBoard = applyMove(gameState.board, move);
        const newStatus = getGameStatus(newBoard);
        const capturedCount = move.captures ? move.captures.length : 0;

        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentPlayer: 'red',
          selectedPiece: null,
          validMoves: [],
          capturedRed: prev.capturedRed + capturedCount,
          gameStatus: newStatus,
          moveHistory: [...prev.moveHistory, move],
        }));
      }
      setIsAIThinking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [gameState.currentPlayer, gameState.gameStatus, aiConfig.enabled, aiConfig.difficulty, isAIThinking]);

  const handleSquareClick = (position: Position) => {
    if (gameState.gameStatus !== 'active') return;
    if (aiConfig.enabled && gameState.currentPlayer === 'black') return;
    if (isAIThinking) return;

    const piece = gameState.board.squares[position.row][position.col]?.piece;

    // If clicking on the selected piece, deselect it
    if (gameState.selectedPiece?.row === position.row && gameState.selectedPiece?.col === position.col) {
      setGameState(prev => ({
        ...prev,
        selectedPiece: null,
        validMoves: [],
      }));
      return;
    }

    // If no piece is selected and clicked square has own piece, select it
    if (!gameState.selectedPiece && piece && piece.color === gameState.currentPlayer) {
      const moves = getValidMoves(gameState.board, position, gameState.currentPlayer);
      setGameState(prev => ({
        ...prev,
        selectedPiece: position,
        validMoves: moves,
      }));
      return;
    }

    // If a piece is selected, try to move it
    if (gameState.selectedPiece) {
      const moveIndex = gameState.validMoves.findIndex(m => m.to.row === position.row && m.to.col === position.col);

      if (moveIndex !== -1) {
        const move = gameState.validMoves[moveIndex];
        const newBoard = applyMove(gameState.board, move);
        const newStatus = getGameStatus(newBoard);
        const capturedCount = move.captures ? move.captures.length : 0;

        const nextPlayer = gameState.currentPlayer === 'red' ? 'black' : 'red';

        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentPlayer: nextPlayer,
          selectedPiece: null,
          validMoves: [],
          capturedBlack: prev.capturedBlack + (gameState.currentPlayer === 'red' ? capturedCount : 0),
          capturedRed: prev.capturedRed + (gameState.currentPlayer === 'black' ? capturedCount : 0),
          gameStatus: newStatus,
          moveHistory: [...prev.moveHistory, move],
        }));
      } else if (piece && piece.color === gameState.currentPlayer) {
        // Select a different piece
        const moves = getValidMoves(gameState.board, position, gameState.currentPlayer);
        setGameState(prev => ({
          ...prev,
          selectedPiece: position,
          validMoves: moves,
        }));
      } else {
        // Click on invalid position
        setGameState(prev => ({
          ...prev,
          selectedPiece: null,
          validMoves: [],
        }));
      }
    } else if (piece && piece.color === gameState.currentPlayer) {
      // Select the piece
      const moves = getValidMoves(gameState.board, position, gameState.currentPlayer);
      setGameState(prev => ({
        ...prev,
        selectedPiece: position,
        validMoves: moves,
      }));
    }
  };

  const handleNewGame = () => {
    setGameState({
      board: { squares: createInitialBoard().squares },
      currentPlayer: 'red',
      selectedPiece: null,
      validMoves: [],
      capturedRed: 0,
      capturedBlack: 0,
      gameStatus: 'active',
      moveHistory: [],
    });
    setIsAIThinking(false);
  };

  const handleToggleAI = () => {
    setAiConfig(prev => ({
      ...prev,
      enabled: !prev.enabled,
    }));
    handleNewGame();
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'medium') => {
    setAiConfig(prev => ({
      ...prev,
      difficulty,
    }));
  };

  return (
    <div className="game-container">
      <h1>Checkers Game</h1>
      <div className="game-content">
        <BoardComponent
          board={gameState.board}
          selectedPiece={gameState.selectedPiece}
          validMoves={gameState.validMoves}
          onSquareClick={handleSquareClick}
        />
        <Controls
          gameStatus={gameState.gameStatus}
          currentPlayer={gameState.currentPlayer}
          capturedRed={gameState.capturedRed}
          capturedBlack={gameState.capturedBlack}
          aiConfig={aiConfig}
          onNewGame={handleNewGame}
          onToggleAI={handleToggleAI}
          onDifficultyChange={handleDifficultyChange}
        />
      </div>
    </div>
  );
};
