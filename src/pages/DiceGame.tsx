import React, {useEffect, useRef, useState} from "react";
import {Dice, Player} from "../utils/types.ts";
import {WINNING_SCORE, INITIAL_PLAYERS} from "../utils/consts.ts";
import {SingleDice} from "../components/SingleDice.tsx";
import {Winner} from "../components/Winner.tsx";
import {ScoreForm} from "../components/ScoreForm.tsx";
import {GameActions} from "../components/gameActions.tsx";
import {Dices} from "../components/Dices.tsx";


type RollHandle = {
    parentRollDice: () => Dice;
    parentResetDice: () => void;
};

const DiceGame: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
    const [tempWinningScore, setTempWinningScore] = useState<number>(WINNING_SCORE);
    const [winningScore, setWinningScore] = useState<number>(WINNING_SCORE);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [winner, setWinner] = useState<Player | null>(null);

    const rollRef1 = useRef<RollHandle>(null)
    const rollRef2 = useRef<RollHandle>(null)

    const diceRef1 = useRef<Dice | null>(null)
    const diceRef2 = useRef<Dice | null>(null)

    function checkRoll(player: Player, dice1: Dice, dice2: Dice) {
        if (player.fail.includes(dice1) && player.fail.includes(dice2)) {
            console.info(`${player.name} rolled ${[dice1, dice2]}! Score is reset and Turn ends.`);
            updatePlayer(player, {currentTurnScore: 0});
            nextPlayer();
        } else {
            const newTurnScore = player.currentTurnScore + dice1 + dice2;
            updatePlayer(player, {currentTurnScore: newTurnScore});
        }
    }

    const handleRoll = () => {
        rollRef1.current?.parentRollDice()
        rollRef2.current?.parentRollDice()

        const dice1 = diceRef1.current, dice2 = diceRef2.current;
        const player = players[currentPlayerIndex]
        if (dice1 && dice2) {
            checkRoll(player, dice1, dice2);
        }
    }

    const hold = () => {
        const currentPlayer = players[currentPlayerIndex];
        const newScore = currentPlayer.score + currentPlayer.currentTurnScore;

        if (newScore >= winningScore) {
            setWinner(currentPlayer);
        } else {
            updatePlayer(currentPlayer, {score: newScore, currentTurnScore: 0});
            nextPlayer();
        }
    };

    const nextPlayer = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);

    };

    const updatePlayer = (player: Player, updates: Partial<Player>) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((p) => (p.id === player.id ? {...p, ...updates} : p))
        );
    }

    const resetGame = () => {
        diceRef1.current = null;
        diceRef2.current = null;

        rollRef1.current?.parentResetDice();
        rollRef2.current?.parentResetDice();

        setPlayers(INITIAL_PLAYERS);
        setWinner(null);
        setCurrentPlayerIndex(0)
    };

    useEffect(() => {
        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.score + currentPlayer.currentTurnScore >= winningScore) {
            setWinner(currentPlayer);
        }
    }, [players[currentPlayerIndex].currentTurnScore]);

    return (
        <div className="dice-game-container">
            <h1 className="game-title">Dice Game</h1>
            <h2 className="winning-score">Score to win: {winningScore}</h2>
            {
                winner ? <Winner player={winner} resetGame={resetGame}/>
                    : (
                        <>

                            <ScoreForm setWinningScore={setWinningScore}/>

                            <br/>

                            <h2 className="current-player">Current Player: {players[currentPlayerIndex].name}</h2>

                            <GameActions handleRoll={handleRoll} hold={hold}/>
                            <div className="dice-container">
                                <SingleDice
                                    title={'Dice 1'}
                                    onRoll={(value) => (diceRef1.current = value)}
                                    ref={rollRef1}
                                />
                                <SingleDice
                                    title={'Dice 2'}
                                    onRoll={(value) => (diceRef2.current = value)}
                                    ref={rollRef2}
                                />
                            </div>

                            <div className="scores">
                                <h3>Scores:</h3>
                                {players.map((player, index) => (
                                    <div key={index}>
                                        <p>name: {player.name}</p>
                                        <p>winnings: {player.winningCount}</p>
                                        <p>
                                            score: {player.score} {player.id === players[currentPlayerIndex].id && `(Turn: ${player.currentTurnScore})`}
                                        </p>
                                    </div>

                                ))}
                            </div>
                            <button className="reset-button" onClick={resetGame} style={{marginTop: "10px"}}>
                            Reset Game
                            </button>
                        </>
                    )}
        </div>
    );
};

export default DiceGame;
