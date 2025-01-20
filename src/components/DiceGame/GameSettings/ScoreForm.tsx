import React from "react";
import '../../../App.css';

type Props = {
    setWinningScore: (score: number) => void;
    disabled: boolean
}

export const ScoreForm = ({
                              setWinningScore,
                              disabled
                          }: Props) => {
    const [tempWinningScore, setTempWinningScore] = React.useState<number>(0);
    return (
        <div className="score-form-container">
            <h4 className="score-form-title">Please set the winning score</h4>
            <input
                style={{marginBottom: "10px"}}
                type={"number"}
                disabled={disabled}
                onChange={(e) => {
                setTempWinningScore(Number(e.target.value))
            }}/>

            <button
                className="score-form-button"
                disabled={disabled}
                onClick={() => {
                    setWinningScore(Number(tempWinningScore))
                }}
            >
                Set Winning Score
            </button>

        </div>
    );
};
