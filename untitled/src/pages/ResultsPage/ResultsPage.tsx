import React from 'react';
import { Button } from '../../components';
import { useGameStorage } from '../../hooks';
import { getMovesText } from '../../utils/textUtils';
import styles from './ResultsPage.module.css';
import { Player } from '../../types/game.types';

interface ResultsPageProps {
    winner: Player | null;
    isDraw: boolean;
    moveCount: number;
    onPlayAgain: () => void;
    onReturnToMenu: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
                                                     winner,
                                                     isDraw,
                                                     moveCount,
                                                     onPlayAgain,
                                                     onReturnToMenu,
                                                 }) => {
    const { gameHistory } = useGameStorage();

    const getResultMessage = () => {
        if (isDraw) {
            return 'Нічия!';
        }
        return winner ? `Переміг гравець ${winner}!` : 'Гра завершена';
    };

    const getResultIcon = () => {
        if (isDraw) return '🤝';
        if (winner === 'X') return '🎉';
        if (winner === 'O') return '🏆';
        return '✅';
    };

    const calculateWinnerMoves = () => {
        if (!winner) return Math.floor(moveCount / 2);
        return winner === 'X' ? Math.ceil(moveCount / 2) : Math.floor(moveCount / 2);
    };

    const calculateLoserMoves = () => {
        if (!winner) return Math.ceil(moveCount / 2);
        return winner === 'X' ? Math.floor(moveCount / 2) : Math.ceil(moveCount / 2);
    };

    const lastGame = gameHistory.length > 0 ? gameHistory[gameHistory.length - 1] : null;
    const boardSize = lastGame?.settings?.boardSize || 3;

    return (
        <div className={styles.resultsPage}>
            <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                    <div className={styles.resultIcon}>{getResultIcon()}</div>
                    <h1 className={styles.resultTitle}>{getResultMessage()}</h1>
                    <div className={styles.boardSizeInfo}>
                        Гра на полі: <strong>{boardSize}×{boardSize}</strong>
                    </div>
                </div>

                <div className={styles.resultDetails}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{isDraw ? 'Нічия' : winner || '—'}</div>
                            <div className={styles.statLabel}>Результат</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{getMovesText(moveCount)}</div>
                            <div className={styles.statLabel}>Всього ходів</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>
                                {getMovesText(calculateWinnerMoves())}
                            </div>
                            <div className={styles.statLabel}>
                                {winner ? `Ходів ${winner}` : 'Ходів на гравця'}
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>
                                {getMovesText(calculateLoserMoves())}
                            </div>
                            <div className={styles.statLabel}>
                                {winner ? `Ходів ${winner === 'X' ? 'O' : 'X'}` : 'Ходів на гравця'}
                            </div>
                        </div>
                    </div>

                    {gameHistory.length > 0 && (
                        <div className={styles.historySection}>
                            <h3>Останні ігри</h3>
                            <div className={styles.historyList}>
                                {gameHistory.slice(-5).reverse().map((game, index) => (
                                    <div key={index} className={styles.historyItem}>
                    <span className={styles.gameDate}>
                      {new Date(game.date).toLocaleDateString('uk-UA', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                      })}
                    </span>
                                        <span className={styles.gameResult}>
                      {game.isDraw ? 'Нічия' : `Переміг ${game.winner}`}
                    </span>
                                        <span className={styles.gameMoves}>
                      {getMovesText(game.moves)}
                    </span>
                                        <span className={styles.gameBoardSize}>
                      {game.settings?.boardSize || 3}×{game.settings?.boardSize || 3}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    <Button
                        variant="primary"
                        size="large"
                        onClick={onPlayAgain}
                    >
                        Грати ще раз
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onReturnToMenu}
                    >
                        Головне меню
                    </Button>
                </div>

                <div className={styles.footerNote}>
                    <p>Результати збережено в історії.</p>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;