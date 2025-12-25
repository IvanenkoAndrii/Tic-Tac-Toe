import React from 'react';
import { Player } from '../../../types/game.types';
import styles from './GameInfo.module.css';

interface GameInfoProps {
    currentPlayer: Player;
    winner: Player | null;
    isDraw: boolean;
    moveCount: number;
    playerStats: {
        X: { wins: number; losses: number; draws: number; totalMoves: number };
        O: { wins: number; losses: number; draws: number; totalMoves: number };
    };
    onRestart: () => void;
    onReset?: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
                                               currentPlayer,
                                               winner,
                                               isDraw,
                                               moveCount,
                                               playerStats,
                                               onRestart,
                                               onReset,
                                           }) => {
    const getStatusMessage = () => {
        if (winner) {
            return (
                <>
                    <span className={styles.winnerSymbol}>{winner}</span>
                    <span>Переміг!</span>
                </>
            );
        }
        if (isDraw) {
            return (
                <>
                    <span className={styles.drawSymbol}>🤝</span>
                    <span>Нічия!</span>
                </>
            );
        }
        return (
            <>
                <span>Хід гравця:</span>
                <span className={`${styles.playerSymbol} ${styles[currentPlayer]}`}>
                    {currentPlayer}
                </span>
            </>
        );
    };

    const getStatusClass = () => {
        if (winner) return styles.winner;
        if (isDraw) return styles.draw;
        return styles.current;
    };

    return (
        <div className={styles.gameInfo}>
            <div className={styles.status}>
                <div className={`${styles.statusMessage} ${getStatusClass()}`}>
                    {getStatusMessage()}
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Хід №:</span>
                        <span className={styles.statValue}>{moveCount}</span>
                    </div>

                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Гравець X:</span>
                        <span className={styles.statValue}>
                            {playerStats.X.wins} перемог
                        </span>
                    </div>

                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Гравець O:</span>
                        <span className={styles.statValue}>
                            {playerStats.O.wins} перемог
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.controlButton}
                    onClick={onRestart}
                    aria-label="Почати нову гру"
                >
                    <span className={styles.buttonIcon}>🔄</span>
                    <span>Нова гра</span>
                </button>

                {onReset && (
                    <button
                        className={`${styles.controlButton} ${styles.secondary}`}
                        onClick={onReset}
                        aria-label="Скинути рахунок"
                    >
                        <span className={styles.buttonIcon}>📊</span>
                        <span>Скинути статистику</span>
                    </button>
                )}

                <button
                    className={`${styles.controlButton} ${styles.secondary}`}
                    onClick={() => console.log('Налаштування')}
                    aria-label="Відкрити налаштування"
                >
                    <span className={styles.buttonIcon}>⚙️</span>
                    <span>Налаштування</span>
                </button>
            </div>
        </div>
    );
};

export default GameInfo;