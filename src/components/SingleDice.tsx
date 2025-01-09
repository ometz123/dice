import {forwardRef, useImperativeHandle, useState} from "react";
import {Dice} from "../utils/types.ts";
import '../App.css';

type Props = {
    title: string
    onRoll: (value: Dice) => void;

}

export const SingleDice = forwardRef(({title, onRoll}: Props, ref) => {
    const [dice, setDice] = useState<Dice | null>(null);

    const rollDice = () => {
        const newDice: Dice = Math.floor(Math.random() * 6) + 1 as Dice
        setDice(newDice)
        onRoll(newDice)
    }
    const resetDice = () => {
        setDice(null)
    }
    useImperativeHandle(
        ref,
        () => ({
            parentRollDice() {
                rollDice();
            },
            parentResetDice() {
                resetDice();
            },
        }),
        []
    );

    return (
        <div className="dice-container">
            <h1 className="dice-title">{title}</h1>
            <div className="dice-display">
                {dice ? (
                    <div className={`dice-face dice-face-${dice}`}>
                        {dice}
                    </div>
                ) : (
                    <div className="dice-face placeholder">Roll to see result</div>
                )}
            </div>
        </div>
    );
});
