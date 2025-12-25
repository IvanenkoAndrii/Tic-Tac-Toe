import React, { useState } from 'react';
import { Layout } from './components';
import { StartPage, GamePage, ResultsPage } from './pages';
import { GameResult } from './types/game.types';
import './styles/globals.css';
import './styles/theme.css';

type Page = 'start' | 'game' | 'results';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const handleStartGame = () => setCurrentPage('game');
  const handleReturnToMenu = () => setCurrentPage('start');

  const handleGameEnd = (result: GameResult) => {
    setGameResult(result);
    setCurrentPage('results');
  };

  const handlePlayAgain = () => setCurrentPage('game');

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return <StartPage onStartGame={handleStartGame} />;
      case 'game':
        return (
            <GamePage
                onReturnToMenu={handleReturnToMenu}
                onGameEnd={handleGameEnd}
            />
        );
      case 'results':
        return (
            <ResultsPage
                winner={gameResult?.winner || null}
                isDraw={gameResult?.isDraw || false}
                onPlayAgain={handlePlayAgain}
                onReturnToMenu={handleReturnToMenu}
            />
        );
      default:
        return <StartPage onStartGame={handleStartGame} />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default App;