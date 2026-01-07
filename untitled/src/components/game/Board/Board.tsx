import React from 'react';
import Cell from '../Cell/Cell';
import styles from './Board.module.css';
import { BoardState } from '../../../types/game.types';

interface BoardProps {
    board: BoardState;
    onCellClick: (row: number, col: number) => void;
    winningCells?: [number, number][];
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, winningCells = [] }) => {
    const isWinningCell = (row: number, col: number) => {
        return winningCells.some(([r, c]) => r === row && c === col);
    };

    return (
        <div className={styles.board}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={cell}
                            row={rowIndex}
                            col={colIndex}
                            onClick={onCellClick}
                            isWinningCell={isWinningCell(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;