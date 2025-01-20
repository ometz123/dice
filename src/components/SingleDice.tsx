import {forwardRef, useImperativeHandle, useState} from "react";
import {Dice} from "../utils/types.ts";
import '../App.css';

type Props = {
    title: string
    onRoll: (value: Dice) => void;

}

export const SingleDice = forwardRef(({title, onRoll}: Props, ref) => {
    const [dice, setDice] = useState<Dice | null>(null);
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const rollDice = () => {
        setIsRolling(true); // Start the rolling animation

        let rollCount = 0;

        const interval = setInterval(() => {
            if (rollCount < 20) {
                const randomDice: Dice = (Math.floor(Math.random() * 6) + 1) as Dice;
                setDice(randomDice);
                rollCount++;
            } else {
                clearInterval(interval);
                const finalDice: Dice = (Math.floor(Math.random() * 6) + 1) as Dice;
                setDice(finalDice);
                onRoll(finalDice);
                setIsRolling(false);
            }
        }, 100); // Change the dice face every 100ms
    };

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
                    <div className={`dice-face dice-face-${isRolling ? 'rolling-' : ''}${dice}`}>
                        {dice}
                    </div>
                ) : (
                    <div className="dice-face placeholder">Roll to see result</div>
                )}
            </div>
        </div>
    );
});

