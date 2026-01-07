import React from 'react';
import { useGameStorage } from '../../hooks';
import { Button } from '../../components';
import { getMovesText, getGamesText, getPercentage } from '../../utils/textUtils';
import styles from './StatisticsPage.module.css';

interface StatisticsPageProps {
    onReturn: () => void;
}

const StatisticsPage: React.FC<StatisticsPageProps> = ({ onReturn }) => {
    const { gameStats, clearGameHistory, gameHistory } = useGameStorage();

    return (
        <div className={styles.statisticsPage}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onReturn}>
                    ← Назад
                </button>
                <h1 className={styles.title}>Статистика ігор</h1>
            </div>

            <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                    <h3>Загальна статистика</h3>
                    <div className={styles.statGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Всього ігор:</span>
                            <span className={styles.statValue}>{getGamesText(gameStats.totalGames)}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Перемог X:</span>
                            <span className={styles.statValue}>{gameStats.xWins}</span>
                            <span className={styles.statPercentage}>
                {getPercentage(gameStats.xWins, gameStats.totalGames)}
              </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Перемог O:</span>
                            <span className={styles.statValue}>{gameStats.oWins}</span>
                            <span className={styles.statPercentage}>
                {getPercentage(gameStats.oWins, gameStats.totalGames)}
              </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Нічиїх:</span>
                            <span className={styles.statValue}>{gameStats.draws}</span>
                            <span className={styles.statPercentage}>
                {getPercentage(gameStats.draws, gameStats.totalGames)}
              </span>
                        </div>
                    </div>
                </div>

                <div className={styles.historyCard}>
                    <h3>Останні ігри</h3>
                    {gameHistory.length > 0 ? (
                        <div className={styles.historyList}>
                            {gameHistory.slice(-10).reverse().map((game, index) => (
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
                    ) : (
                        <p className={styles.noHistory}>Історія ігор порожня</p>
                    )}
                </div>
            </div>

            <div className={styles.actions}>
                <Button
                    variant="danger"
                    onClick={clearGameHistory}
                    disabled={gameHistory.length === 0}
                >
                    Очистити всю історію
                </Button>
            </div>
        </div>
    );
};

export default StatisticsPage;