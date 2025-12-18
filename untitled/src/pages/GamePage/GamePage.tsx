import React from 'react';
import { Board, GameInfo } from '../../components';
import styles from './GamePage.module.css';
import { BoardState, Player } from '../../types/game.types';

interface GamePageProps {
    onReturnToMenu: () => void;
    onGameEnd: (result: any) => void;
}

const GamePage: React.FC<GamePageProps> = ({ onReturnToMenu, onGameEnd }) => {
    const initialBoard: BoardState = Array(3).fill(null).map(() => Array(3).fill(null));

    const [board, setBoard] = React.useState<BoardState>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X');
    const [winner, setWinner] = React.useState<Player | null>(null);
    const [isDraw, setIsDraw] = React.useState(false);
    const [moveCount, setMoveCount] = React.useState(0);

    const handleCellClick = (row: number, col: number) => {
        console.log(`Клік по клітинці: ${row}, ${col}`);
        // Тут буде бізнес-логіка гри
    };

    const handleRestart = () => {
        setBoard(initialBoard);
        setCurrentPlayer('X');
        setWinner(null);
        setIsDraw(false);
        setMoveCount(0);
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
                <h2 className={styles.pageTitle}>Гра триває!</h2>
            </div>

            <div className={styles.gameArea}>
                <div className={styles.gameBoard}>
                    <GameInfo
                        currentPlayer={currentPlayer}
                        winner={winner}
                        isDraw={isDraw}
                        moveCount={moveCount}
                        onRestart={handleRestart}
                    />
                    <Board
                        board={board}
                        onCellClick={handleCellClick}
                    />
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.playerInfo}>
                        <h3>Гравець X</h3>
                        <div className={styles.playerSymbolX}>X</div>
                        <p className={styles.playerStats}>Зроблено ходів: 0</p>
                    </div>

                    <div className={styles.playerInfo}>
                        <h3>Гравець O</h3>
                        <div className={styles.playerSymbolO}>O</div>
                        <p className={styles.playerStats}>Зроблено ходів: 0</p>
                    </div>

                    <div className={styles.gameHistory}>
                        <h3>Історія ходів</h3>
                        <div className={styles.historyList}>
                            <p className={styles.emptyHistory}>Історія ходів порожня</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;