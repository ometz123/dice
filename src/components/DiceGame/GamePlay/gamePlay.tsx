import {GameActions} from "./gameActions.tsx";
import {SingleDice} from "../../SingleDice.tsx";
import React from "react";
import {Dice, Player, RollHandle} from "../../../utils/types.ts";

type Props = {
    disabled: boolean
    players: Player[];
    currentPlayerIndex: number;
    handleRoll: () => void;
    handleHold: () => void;
    diceRef1: React.MutableRefObject<Dice | null>;
    rollRef1: React.RefObject<RollHandle>;
    diceRef2: React.MutableRefObject<Dice | null>;
    rollRef2: React.RefObject<RollHandle>;
}

export const DiceGamePlay = ({
                                 disabled,
                                 players,
                                 currentPlayerIndex,
                                 handleRoll,
                                 handleHold,
                                 diceRef1,
                                 rollRef1,
                                 diceRef2,
                                 rollRef2
                             }: Props) => {
    return (
        <>
            <div className="game-section">
                <h2>Game</h2>
                <h3>Current Player: {players[currentPlayerIndex].name}</h3>
                <GameActions
                    handleRoll={handleRoll}
                    handleHold={handleHold}
                    disabled={disabled}
                />
                <div className="dice-container">
                    <SingleDice
                        title="Dice 1"
                        onRoll={(value) => (diceRef1.current = value)}
                        ref={rollRef1}
                    />
                    <SingleDice
                        title="Dice 2"
                        onRoll={(value) => (diceRef2.current = value)}
                        ref={rollRef2}
                    />
                </div>
            </div>
        </>
    );
};
