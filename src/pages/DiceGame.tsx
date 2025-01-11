import React, {useEffect, useRef, useState} from "react";
import {Dice, Player, RollHandle} from "../utils/types.ts";
import {WINNING_SCORE, INITIAL_PLAYERS} from "../utils/consts.ts";
import {Winner} from "./Winner.tsx";
import {DiceGameSettings} from "../components/DiceGame/GameSettings/gameSettings.tsx";
import {DiceGamePlay} from "../components/DiceGame/GamePlay/gamePlay.tsx";
import {DiceGameScores} from "../components/DiceGame/GameScore/gameScores.tsx";
import {loadGameState, saveGameState} from "../utils/helpers.ts";

const DiceGame: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>(loadGameState()?.players || INITIAL_PLAYERS);
    const [winningScore, setWinningScore] = useState<number>(loadGameState()?.winningScore || WINNING_SCORE);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(loadGameState()?.currentPlayerIndex || 0);
    const [winner, setWinner] = useState<Player | null>(null);
    const [isGameLocked, setIsGameLocked] = useState<boolean>(false)

    const rollRef1 = useRef<RollHandle>(null)
    const rollRef2 = useRef<RollHandle>(null)

    const diceRef1 = useRef<Dice | null>(null)
    const diceRef2 = useRef<Dice | null>(null)

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const lockGame = async (time: number) => {
        setIsGameLocked(true)
        await delay(time)
        alert('Funny gif')
        setIsGameLocked(false)
    }

    const checkRoll = async (player: Player, dice1: Dice, dice2: Dice) => {
        if (dice1 === 6 && dice2 === 6) {
            console.log('start waiting')
            await lockGame(10000)

            updatePlayer(player, {currentTurnScore: 0});
            nextPlayer();
        }
        if (player.fail.includes(dice1) && player.fail.includes(dice2)) {
            console.info(`${player.name} rolled ${[dice1, dice2]}! Score is reset and Turn ends.`);
            updatePlayer(player, {currentTurnScore: 0});
            nextPlayer();
        } else {
            const newTurnScore = player.currentTurnScore + dice1 + dice2;
            updatePlayer(player, {currentTurnScore: newTurnScore});
        }
    }

    const nextPlayer = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);

    };

    const updatePlayer = (player: Player, updates: Partial<Player>) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((p) => (p.id === player.id ? {...p, ...updates} : p))
        );
    }

    const handleRoll = async () => {
        if (isGameLocked) return
        rollRef1.current?.parentRollDice()
        rollRef2.current?.parentRollDice()

        const player = players[currentPlayerIndex]
        const dice1 = diceRef1.current
        const dice2 = diceRef2.current

        if (dice1 && dice2) {
            await checkRoll(player, dice1, dice2);
        }
    }

    const handleHold = () => {
        if (isGameLocked) return
        const currentPlayer = players[currentPlayerIndex];
        const newScore = currentPlayer.score + currentPlayer.currentTurnScore;

        if (newScore >= winningScore) {
            setWinner(currentPlayer);
        } else {
            updatePlayer(currentPlayer, {score: newScore, currentTurnScore: 0});
            nextPlayer();
        }
    };

    const handleResetGame = () => {
        diceRef1.current = null;
        diceRef2.current = null;

        rollRef1.current?.parentResetDice();
        rollRef2.current?.parentResetDice();

        setPlayers(INITIAL_PLAYERS);
        setWinner(null);
        setCurrentPlayerIndex(0)
    };

    const handleContinueGame = () => {
        setWinner(null);
        setPlayers((prevPlayers) =>
            prevPlayers.map((p) => ({...p, currentTurnScore: 0}))
        );
    }

    useEffect(() => {
        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.score + currentPlayer.currentTurnScore >= winningScore) {
            setWinner(currentPlayer);
            updatePlayer(currentPlayer, {winningCount: currentPlayer.winningCount + 1, currentTurnScore: 0});

        }
    }, [players[currentPlayerIndex].currentTurnScore]);

    useEffect(() => {
        console.log('save')
        saveGameState(players, currentPlayerIndex, winningScore);

    }, [players, currentPlayerIndex, winningScore]);

    useEffect(() => {
        const savedState = loadGameState();
        if (savedState) {
            console.log(savedState)
            setPlayers(savedState.players);
            setCurrentPlayerIndex(savedState.currentPlayerIndex);
            setWinningScore(savedState.winningScore);
        }
        return () => {
            saveGameState(players, currentPlayerIndex, winningScore);
        }
    }, []);

    return (
        <div className="dice-game-container">
            <h1 className="game-title">Dice Game</h1>
            <h2 className="winning-score">Score to win: {winningScore}</h2>
            {
                winner
                    ? <Winner player={winner} resetGame={handleResetGame} continueGame={handleContinueGame}/>
                    : (
                        <>
                            <div className="game-layout">
                                <DiceGameSettings
                                    disabled={isGameLocked}
                                    setWinningScore={setWinningScore}
                                    resetGame={handleResetGame}

                                />
                                <DiceGamePlay
                                    disabled={isGameLocked}
                                    players={players}
                                    currentPlayerIndex={currentPlayerIndex}
                                    handleRoll={handleRoll}
                                    handleHold={handleHold}
                                    diceRef1={diceRef1}
                                    rollRef1={rollRef1}
                                    diceRef2={diceRef2}
                                    rollRef2={rollRef2}
                                />
                                <DiceGameScores
                                    players={players}
                                    currentPlayerIndex={currentPlayerIndex}
                                />

                            </div>

                            <br/>

                        </>
                    )}
        </div>
    );
};

export default DiceGame;
