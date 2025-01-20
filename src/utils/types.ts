export type Dice = 1 | 2 | 3 | 4 | 5 | 6

export type Player = {
    id: string;
    name: string;
    score: number;
    currentTurnScore: number;
    fail: [Dice, Dice]
    winningCount: number
};

export type RollHandle = {
    parentRollDice: () => Dice;
    parentResetDice: () => void;
};
