import { useState } from 'react'
import './App.css'

// Simple game components
const Home = ({ onSelectGame }: { onSelectGame: (game: string) => void }) => (
  <div className="home-container">
    <h1>🎮 Learning Games</h1>
    <p>Pick a game to play!</p>
    <div className="game-grid">
      <button className="game-card" onClick={() => onSelectGame('physics')}>
        <span className="game-icon">🧱</span>
        <h3>Physics Puzzle</h3>
        <p>Drop blocks & solve puzzles</p>
      </button>
      <button className="game-card" onClick={() => onSelectGame('sorting')}>
        <span className="game-icon">🔵🔴</span>
        <h3>Sorting Game</h3>
        <p>Sort by color & shape</p>
      </button>
      <button className="game-card" onClick={() => onSelectGame('memory')}>
        <span className="game-icon">🃏</span>
        <h3>Memory Match</h3>
        <p>Find matching pairs</p>
      </button>
      <button className="game-card" onClick={() => onSelectGame('patterns')}>
        <span className="game-icon">🔶🔷</span>
        <h3>Pattern Play</h3>
        <p>Complete the patterns</p>
      </button>
    </div>
  </div>
)

const PhysicsPuzzle = ({ onBack }: { onBack: () => void }) => (
  <div className="game-container">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <h2>🧱 Physics Puzzle</h2>
    <p>Watch the blocks fall! (Matter.js integration coming soon)</p>
    <div className="placeholder-game">
      <div className="falling-block">📦</div>
      <div className="falling-block" style={{animationDelay: '0.5s'}}>🎁</div>
      <div className="falling-block" style={{animationDelay: '1s'}}>🧊</div>
    </div>
  </div>
)

const SortingGame = ({ onBack }: { onBack: () => void }) => (
  <div className="game-container">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <h2>🔵🔴 Sorting Game</h2>
    <p>Sort the shapes by color!</p>
    <div className="placeholder-game">
      <div className="sort-area">
        <div className="sort-bin red">🔴</div>
        <div className="sort-bin blue">🔵</div>
      </div>
      <div className="shapes-to-sort">
        <span className="shape">🔴</span>
        <span className="shape">🔵</span>
        <span className="shape">🔴</span>
      </div>
    </div>
  </div>
)

const MemoryGame = ({ onBack }: { onBack: () => void }) => (
  <div className="game-container">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <h2>🃏 Memory Match</h2>
    <p>Find the matching pairs!</p>
    <div className="placeholder-game">
      <div className="memory-grid">
        {['🐶', '🐱', '🐭', '🐹'].map((emoji, i) => (
          <div key={i} className="memory-card">{emoji}</div>
        ))}
      </div>
    </div>
  </div>
)

const PatternGame = ({ onBack }: { onBack: () => void }) => (
  <div className="game-container">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <h2>🔶🔷 Pattern Play</h2>
    <p>What comes next?</p>
    <div className="placeholder-game">
      <div className="pattern-sequence">
        <span>🔶</span>
        <span>🔷</span>
        <span>🔶</span>
        <span>❓</span>
      </div>
    </div>
  </div>
)

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'physics' | 'sorting' | 'memory' | 'patterns'>('home')

  const handleSelectGame = (game: string) => {
    setCurrentView(game as any)
  }

  const handleBack = () => {
    setCurrentView('home')
  }

  return (
    <div className="app">
      {currentView === 'home' && <Home onSelectGame={handleSelectGame} />}
      {currentView === 'physics' && <PhysicsPuzzle onBack={handleBack} />}
      {currentView === 'sorting' && <SortingGame onBack={handleBack} />}
      {currentView === 'memory' && <MemoryGame onBack={handleBack} />}
      {currentView === 'patterns' && <PatternGame onBack={handleBack} />}
    </div>
  )
}

export default App
