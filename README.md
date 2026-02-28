# Checkers Game

A classic checkers game built with React, TypeScript, and Vite with AI opponent support.

## Table of Contents
- [Setup](#setup)
- [How to Play](#how-to-play)
- [Game Rules](#game-rules)
- [Features](#features)
- [AI Difficulty Levels](#ai-difficulty-levels)

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

## How to Play

### Basic Controls
- **Click a piece** to select it - selected pieces are highlighted with a gold border
- **Click a valid destination square** to move the piece - valid moves are shown with a green border
- **Click the selected piece again** to deselect it

### Game Objective
Capture all of your opponent's pieces or block them from making any valid moves to win the game.

### Turn Order
- **Red pieces start first** (at the top of the board)
- **Black pieces go second** (at the bottom of the board)
- Players alternate turns
- After your move is complete, control passes to the opponent

### Playing Against AI
1. Check the **"Play vs AI"** checkbox in the controls panel
2. Select difficulty level:
   - **Easy**: AI looks 2 moves ahead
   - **Medium**: AI looks 4 moves ahead
3. Click **"New Game"** to start
4. Play as the **red pieces** (you go first)
5. The AI automatically makes its move after you complete yours

## Game Rules

### Piece Movement

#### Regular Pieces
- Move **diagonally forward** (toward the opponent's side)
- Can only move to empty squares
- Move one square at a time during normal turns

#### Kings
- Move **diagonally in any direction** (forward or backward)
- Can only move to empty squares
- Move one square at a time during normal turns
- Created when a regular piece reaches the opponent's back row

### Capturing Pieces

#### Mandatory Captures
- If a capture move is available, you **must** take it
- You can capture multiple pieces in a single turn if available
- Jump diagonally **over an opponent's piece** to an empty square behind it
- The jumped piece is removed from the board

#### Multiple Captures
- After landing from a capture, if additional captures are available from that piece, you can continue capturing
- This allows for chains of captures in a single turn

### Winning Conditions
The game ends when:
- **Red Wins**: All black pieces are captured or black has no valid moves
- **Black Wins**: All red pieces are captured or red has no valid moves
- **Draw**: Rare situations where neither player can capture all opponent pieces

## Features

- ✨ Classic checkers gameplay
- 🤖 AI opponent with adjustable difficulty
- ♛ King promotion system
- 📊 Move history tracking
- 🎮 Two-player mode for local play
- ⚡ Real-time game status display
- 🎯 Visual indicators for valid moves and selected pieces
- 📱 Responsive design

## AI Difficulty Levels

### Easy Mode
- AI evaluates 2 moves ahead
- Makes decent moves but can miss optimal strategies
- Good for beginners learning the game

### Medium Mode
- AI evaluates 4 moves ahead
- Provides a challenging game
- Recommended for experienced players

### Scoring System
The AI uses the following evaluation metrics:
- 1 point per regular piece
- 0.5 bonus points per king
- Defensive position analysis
- Capture opportunity detection

## Tips for Winning

1. **Protect Your Back Row**: Your back row is where pieces become kings, so protect it carefully
2. **Create Kings Early**: Kings are more powerful - try to promote pieces to kings
3. **Control the Center**: Control the middle squares for more movement options
4. **Block Opponent Advancement**: Try to surround opponent pieces to limit their moves
5. **Plan Ahead**: Think several moves ahead to set up capture opportunities
6. **Avoid Traps**: Be careful not to leave your pieces vulnerable to immediate capture

## Keyboard Shortcuts

When the dev server is running:
- Press `h` + `Enter` to show Vite help options
- Press `r` + `Enter` to restart the server
- Press `q` + `Enter` to quit the dev server

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **CSS**: Styling

## Project Structure

```
src/
├── components/
│   ├── Board.tsx       # Board rendering
│   ├── Square.tsx      # Individual square component
│   ├── Game.tsx        # Main game logic and state
│   └── Controls.tsx    # Game controls and status
├── game/
│   ├── types.ts        # TypeScript interfaces
│   ├── board.ts        # Board initialization and manipulation
│   ├── gameLogic.ts    # Game rules and move validation
│   └── ai.ts           # AI algorithm (minimax)
├── styles/             # CSS stylesheets
├── App.tsx             # App root component
└── main.tsx            # Entry point
```

## License

This project is open source and available for personal and educational use.

## Contributing

Feel free to fork and submit pull requests for any improvements!
