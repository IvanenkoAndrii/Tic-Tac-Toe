import React, { useState } from 'react';
import { Layout } from './components';
import {
  StartPage,
  GamePage,
  ResultsPage,
  StatisticsPage,
  SettingsPage
} from './pages';
import { GameResult } from './types/game.types';
import './styles/globals.css';
import './styles/theme.css';

type Page = 'start' | 'game' | 'results' | 'statistics' | 'settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const handleStartGame = () => setCurrentPage('game');
  const handleReturnToMenu = () => setCurrentPage('start');
  const handleOpenSettings = () => setCurrentPage('settings');
  const handleOpenStatistics = () => setCurrentPage('statistics');

  const handleGameEnd = (result: GameResult) => {
    setGameResult(result);
    setCurrentPage('results');
  };

  const handlePlayAgain = () => setCurrentPage('game');

  const renderPage = () => {
    switch (currentPage) {
      case 'start':
        return (
            <StartPage
                onStartGame={handleStartGame}
                onOpenSettings={handleOpenSettings}
                onOpenHistory={handleOpenStatistics}
            />
        );
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
                moveCount={gameResult?.moves || 0}
                onPlayAgain={handlePlayAgain}
                onReturnToMenu={handleReturnToMenu}
            />
        );
      case 'statistics':
        return (
            <StatisticsPage
                onReturn={handleReturnToMenu}
            />
        );
      case 'settings':
        return (
            <SettingsPage
                onReturn={handleReturnToMenu}
            />
        );
      default:
        return (
            <StartPage
                onStartGame={handleStartGame}
                onOpenSettings={handleOpenSettings}
                onOpenHistory={handleOpenStatistics}
            />
        );
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default App;