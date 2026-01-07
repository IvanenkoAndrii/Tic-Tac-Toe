export const getMovesText = (moves: number): string => {
    if (moves === 0) return "0 moves";

    if (moves === 1) return "1 move";

    return `${moves} moves`;
};

export const getWinsText = (wins: number): string => {
    if (wins === 0) return "0 wins";

    if (wins === 1) return "1 win";

    return `${wins} wins`;
};

export const getGamesText = (games: number): string => {
    if (games === 0) return "0 games";

    if (games === 1) return "1 game";

    return `${games} games`;
};

export const getPercentage = (part: number, total: number): string => {
    if (total === 0) return '0%';
    return ((part / total) * 100).toFixed(1) + '%';
};