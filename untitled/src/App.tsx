import React, { useState } from 'react';
import { Layout } from './components';
import { StartPage, GamePage, ResultsPage } from './pages';
import './styles/globals.css';

type Page = 'start' | 'game' | 'results';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const [gameResult, setGameResult] = useState({
    winner: null as 'X' | 'O' | null,
    isDraw: false,
  });

  const handleStartGame = () => setCurrentPage('game');
  const handleReturnToMenu = () => setCurrentPage('start');

  const handleGameEnd = () => {
    setGameResult({
      winner: Math.random() > 0.5 ? 'X' : 'O',
      isDraw: Math.random() > 0.7,
    });
    setCurrentPage('results');
  };

  const handlePlayAgain = () => setCurrentPage('game');

  const renderPage = () => {
    switch (currentPage) {
      case 'start': return <StartPage onStartGame={handleStartGame} />;
      case 'game': return <GamePage onReturnToMenu={handleReturnToMenu} onGameEnd={handleGameEnd} />;
      case 'results': return <ResultsPage winner={gameResult.winner} isDraw={gameResult.isDraw} onPlayAgain={handlePlayAgain} onReturnToMenu={handleReturnToMenu} />;
      default: return <StartPage onStartGame={handleStartGame} />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default App;