import React from "react";
import '../App.css';

type Props = {
    setWinningScore: (score: number) => void;
}

export const ScoreForm = ({setWinningScore}: Props) => {
    const [tempWinningScore, setTempWinningScore] = React.useState<number>(0);
    return (
        <div className="score-form-container">
            <h4 className="score-form-title">Please set the winning score</h4>
            <input type={"number"} onChange={(e) => {
                setTempWinningScore(Number(e.target.value))
            }}/>
            <br/>

            <button
                className="score-form-button"
                onClick={() => {
                    setWinningScore(Number(tempWinningScore))
                }}
            >
                Set Winning Score
            </button>

        </div>
    );
};
