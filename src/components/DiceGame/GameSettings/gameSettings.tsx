import {ScoreForm} from "./ScoreForm.tsx";
import '../../../App.css'
import {ResetGame} from "../resetGame.tsx";
import {YouTubeAudioController} from "../../backgroundMusic.tsx";

type Props = {
    setWinningScore: (score: number) => void;
    resetGame: () => void
    disabled: boolean
}

export const DiceGameSettings = ({
                                     setWinningScore,
                                     resetGame,
                                     disabled
                                 }: Props) => {

    return (
        <>
            <div className="settings-section">
                <h2>Game Settings</h2>
                <ScoreForm setWinningScore={setWinningScore} disabled={disabled}/>
                <YouTubeAudioController videoId="pct1uEhAqBQ"/>
                <ResetGame resetGame={resetGame} disabled={disabled}/>
            </div>
        </>
    );
};
