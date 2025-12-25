import React from 'react';
import { Button } from '../../components';
import { useGameStorage } from '../../hooks';
import styles from './ResultsPage.module.css';
import { Player } from '../../types/game.types';

interface ResultsPageProps {
    winner: Player | null;
    isDraw: boolean;
    onPlayAgain: () => void;
    onReturnToMenu: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
                                                     winner,
                                                     isDraw,
                                                     onPlayAgain,
                                                     onReturnToMenu,
                                                 }) => {
    const { getStats } = useGameStorage();
    const stats = getStats();

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

    return (
        <div className={styles.resultsPage}>
            <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                    <div className={styles.resultIcon}>{getResultIcon()}</div>
                    <h1 className={styles.resultTitle}>{getResultMessage()}</h1>
                </div>

                <div className={styles.resultDetails}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{winner || '—'}</div>
                            <div className={styles.statLabel}>Переможець</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{isDraw ? 'Так' : 'Ні'}</div>
                            <div className={styles.statLabel}>Нічия</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{stats.totalGames}</div>
                            <div className={styles.statLabel}>Всього ігор</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>
                                {stats.xWins}:{stats.oWins}
                            </div>
                            <div className={styles.statLabel}>X:O перемоги</div>
                        </div>
                    </div>

                    <div className={styles.scoreboard}>
                        <h3>Загальна статистика</h3>
                        <div className={styles.scoreList}>
                            <div className={styles.scoreItem}>
                                <span className={`${styles.playerSymbol} ${styles.playerX}`}>X</span>
                                <span className={styles.playerName}>Гравець X</span>
                                <div className={styles.playerStats}>
                                    <span>Перемоги: {stats.xWins}</span>
                                    <span>Процент: {stats.xWinPercentage}%</span>
                                </div>
                            </div>
                            <div className={styles.scoreItem}>
                                <span className={`${styles.playerSymbol} ${styles.playerO}`}>O</span>
                                <span className={styles.playerName}>Гравець O</span>
                                <div className={styles.playerStats}>
                                    <span>Перемоги: {stats.oWins}</span>
                                    <span>Процент: {stats.oWinPercentage}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        variant="primary"
                        size="large"
                        onClick={onPlayAgain}
                    >
                        Грати знову
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onReturnToMenu}
                    >
                        Головне меню
                    </Button>
                </div>

                <div className={styles.footerNote}>
                    <p>Результати збережено в історії. Всього зіграно ігор: {stats.totalGames}</p>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;