import React from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Player } from '../../../types/game.types';
import styles from './GameEndModal.module.css';

interface GameEndModalProps {
    isOpen: boolean;
    onClose: () => void;
    winner: Player | null;
    isDraw: boolean;
    moveCount: number;
    onRestart: () => void;
    onNewGame: () => void;
    onReturnToMenu: () => void;
}

const GameEndModal: React.FC<GameEndModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       winner,
                                                       isDraw,
                                                       moveCount,
                                                       onRestart,
                                                       onNewGame,
                                                       onReturnToMenu,
                                                   }) => {
    const getResultIcon = () => {
        if (isDraw) return '🤝';
        if (winner === 'X') return '🎉';
        if (winner === 'O') return '🏆';
        return '✅';
    };

    const getResultTitle = () => {
        if (isDraw) return 'Нічия!';
        return `Переміг гравець ${winner}!`;
    };

    const getResultDescription = () => {
        if (isDraw) return 'Поле заповнено, але переможця немає. Спробуйте ще раз!';
        return `Гра завершена за ${moveCount} ходів. Вітаємо переможця!`;
    };

    const footer = (
        <div className={styles.actions}>
            <Button variant="primary" onClick={onRestart}>
                Грати знову з цими налаштуваннями
            </Button>
            <Button variant="secondary" onClick={onNewGame}>
                Нова гра з новими налаштуваннями
            </Button>
            <Button variant="danger" onClick={onReturnToMenu}>
                Головне меню
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Гра завершена"
            footer={footer}
        >
            <div className={styles.gameEndModal}>
                <div className={styles.resultIcon}>{getResultIcon()}</div>
                <h2 className={styles.resultTitle}>{getResultTitle()}</h2>
                <p className={styles.resultDescription}>{getResultDescription()}</p>

                <div className={styles.gameStats}>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Кількість ходів:</span>
                        <span className={styles.statValue}>{moveCount}</span>
                    </div>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Результат:</span>
                        <span className={styles.statValue}>
              {isDraw ? 'Нічия' : `Перемога ${winner}`}
            </span>
                    </div>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Тривалість:</span>
                        <span className={styles.statValue}>
              {Math.ceil(moveCount / 2)} хвилин
            </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default GameEndModal;