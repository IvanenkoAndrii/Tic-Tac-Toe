import React, { useEffect } from 'react';
import { Board, GameInfo } from '../../components';
import { useGameLogic, useGameStorage } from '../../hooks';
import styles from './GamePage.module.css';

interface GamePageProps {
    onReturnToMenu: () => void;
    onGameEnd: (result: any) => void;
}

const GamePage: React.FC<GamePageProps> = ({ onReturnToMenu, onGameEnd }) => {
    const {
        gameState,
        history,
        playerStats,
        makeMove,
        restartGame,
        resetStats,
        getGameResult,
    } = useGameLogic();

    const { saveGameResult } = useGameStorage();

    useEffect(() => {
        if (gameState.winner || gameState.isDraw) {
            const result = getGameResult();
            saveGameResult(result);
            setTimeout(() => {
                onGameEnd(result);
            }, 1500);
        }
    }, [gameState.winner, gameState.isDraw, getGameResult, saveGameResult, onGameEnd]);

    const handleCellClick = (row: number, col: number) => {
        makeMove(row, col);
    };

    const formatHistory = (historyItem: any, index: number) => {
        const [row, col] = historyItem.position;
        return `${index + 1}. ${historyItem.player} → (${row + 1},${col + 1})`;
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
                </h2>
            </div>

            <div className={styles.gameArea}>
                <div className={styles.gameBoard}>
                    <GameInfo
                        currentPlayer={gameState.currentPlayer}
                        winner={gameState.winner}
                        isDraw={gameState.isDraw}
                        moveCount={gameState.moveCount}
                        playerStats={playerStats}
                        onRestart={restartGame}
                        onReset={resetStats}
                    />
                    <Board
                        board={gameState.board}
                        onCellClick={handleCellClick}
                        winningCells={gameState.winningCells}
                    />
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.playerInfo}>
                        <h3>Гравець X</h3>
                        <div className={styles.playerSymbolX}>X</div>
                        <p className={styles.playerStats}>
                            Зроблено ходів: {playerStats.X.totalMoves}
                        </p>
                        <p className={styles.playerStats}>
                            Перемог: {playerStats.X.wins}
                        </p>
                    </div>

                    <div className={styles.playerInfo}>
                        <h3>Гравець O</h3>
                        <div className={styles.playerSymbolO}>O</div>
                        <p className={styles.playerStats}>
                            Зроблено ходів: {playerStats.O.totalMoves}
                        </p>
                        <p className={styles.playerStats}>
                            Перемог: {playerStats.O.wins}
                        </p>
                    </div>

                    <div className={styles.gameHistory}>
                        <h3>Історія ходів</h3>
                        <div className={styles.historyList}>
                            {history.length > 0 ? (
                                <ul className={styles.historyItems}>
                                    {history.slice(-10).map((item, index) => (
                                        <li key={index} className={styles.historyItem}>
                                            {formatHistory(item, index)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={styles.emptyHistory}>Історія ходів порожня</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;