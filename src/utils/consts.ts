import {Player} from "./types.ts";
import {generateRandomId} from "./helpers.ts";

export const INITIAL_PLAYERS: Player[] = [
    {
        id: generateRandomId(),
        name: "Player 1",
        score: 0,
        currentTurnScore: 0,
        fail: [1, 1],
        winningCount: 0
    },
    {
        id: generateRandomId(),
        name: "Player 2",
        score: 0,
        currentTurnScore: 0,
        fail: [2, 2],
        winningCount: 0
    },
    {
        id: generateRandomId(),
        name: "Player 3",
        score: 0,
        currentTurnScore: 0,
        fail: [3, 3],
        winningCount: 0
    },
]

export const WINNING_SCORE = 50;

export const LOCAL_STORAGE_KEYS = {
    DICE_GAME_STATE: 'DICE_GAME_STATE',
}
