import React, { useEffect, useState } from 'react';
import { Board, GameInfo } from '../../components/game';
import { GameEndModal } from '../../components/common/GameEndModal';
import { useGameLogic, useGameStorage } from '../../hooks';
import { useGameSettings } from '../../hooks/useGameSettings';
import { Modal } from '../../components/common/Modal';
import { SettingsForm } from '../../components/common/SettingsForm';
import styles from './GamePage.module.css';
import { GameResult } from '../../types/game.types';

interface GamePageProps {
    onReturnToMenu: () => void;
    onGameEnd: (result: GameResult) => void;
}

const GamePage: React.FC<GamePageProps> = ({ onReturnToMenu, onGameEnd }) => {
    const { settings, saveSettings, resetSettings } = useGameSettings();
    const {
        gameState,
        playerStats,
        makeMove,
        restartGame,
        getGameResult,
    } = useGameLogic(settings);

    const { saveGameResult } = useGameStorage();

    const [showGameEndModal, setShowGameEndModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    useEffect(() => {
        if (gameState.winner || gameState.isDraw) {
            setTimeout(() => {
                setShowGameEndModal(true);
                const result = getGameResult();
                saveGameResult(result);
                onGameEnd(result);
            }, 1000);
        }
    }, [gameState.winner, gameState.isDraw, getGameResult, saveGameResult, onGameEnd]);

    const handleCellClick = (row: number, col: number) => {
        makeMove(row, col);
    };

    const handleSettingsSave = (newSettings: any) => {
        saveSettings(newSettings);
        setShowSettingsModal(false);
        restartGame();
    };

    const handleSettingsReset = () => {
        resetSettings();
        setShowSettingsModal(false);
        restartGame();
    };

    const handleNewGame = () => {
        setShowGameEndModal(false);
        setShowSettingsModal(true);
    };

    return (
        <div className={styles.gamePage}>
            <div className={styles.header}>
                <button
                    className={styles.backButton}
                    onClick={onReturnToMenu}
                >
                    ← Назад до меню
                </button>
                <h2 className={styles.pageTitle}>
                    {gameState.winner || gameState.isDraw ? 'Гра завершена' : 'Гра триває!'}
                    <small style={{ fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
                        Поле: {settings.boardSize}×{settings.boardSize}
                    </small>
                </h2>
            </div>

            <div className={styles.gameArea}>
                <div className={styles.gameBoard}>
                    <GameInfo
                        currentPlayer={gameState.currentPlayer}
                        winner={gameState.winner}
                        isDraw={gameState.isDraw}
                        moveCount={gameState.moveCount}
                        playerStats={playerStats}  // ДОДАНО цей рядок
                        onRestart={restartGame}
                        onSettingsOpen={() => setShowSettingsModal(true)}
                    />
                    <Board
                        board={gameState.board}
                        onCellClick={handleCellClick}
                        winningCells={gameState.winningCells}
                    />
                </div>
            </div>

            <GameEndModal
                isOpen={showGameEndModal}
                onClose={() => setShowGameEndModal(false)}
                winner={gameState.winner}
                isDraw={gameState.isDraw}
                moveCount={gameState.moveCount}
                onRestart={() => {
                    setShowGameEndModal(false);
                    restartGame();
                }}
                onNewGame={handleNewGame}
                onReturnToMenu={onReturnToMenu}
            />

            <Modal
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
                title="Налаштування гри"
            >
                <SettingsForm
                    initialSettings={settings}
                    onSubmit={handleSettingsSave}
                    onCancel={() => setShowSettingsModal(false)}
                    onResetToDefault={handleSettingsReset}
                />
            </Modal>
        </div>
    );
};

export default GamePage;