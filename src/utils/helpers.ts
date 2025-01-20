import {Player} from "./types.ts";
import {LOCAL_STORAGE_KEYS} from "./consts.ts";

export const generateRandomId=(length = 8)=> {
    return Math.random().toString(36).slice(2, length);
}

export const saveGameState = (players: Player[], currentPlayerIndex: number, winningScore: number) => {
    const gameState = {
        players,
        currentPlayerIndex,
        winningScore,
    };
    localStorage.setItem(LOCAL_STORAGE_KEYS.DICE_GAME_STATE, JSON.stringify(gameState));
};

export const loadGameState = () => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEYS.DICE_GAME_STATE);
    console.log(savedState)
    if (savedState) {
        return JSON.parse(savedState) as { players: Player[], currentPlayerIndex: number, winningScore: number };
    }
    return null;
};
