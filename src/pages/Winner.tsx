import {Player} from "../utils/types.ts";
import {ResetGame} from "../components/DiceGame/resetGame.tsx";
import '../App.css';
import {ContinueGame} from "../components/DiceGame/continueGame.tsx";

type Props = {
    player: Player;
    resetGame: () => void;
    continueGame: () => void;
}

export const Winner = ({player, resetGame,continueGame}: Props) => {
    return (
        <>
            <div>
                <h2>{player.name} wins the game</h2>
                <h2>With: {player.score + player.currentTurnScore} Points!</h2>
                <ContinueGame continueGame={continueGame}/>
                <ResetGame resetGame={resetGame}/>
            </div>
        </>
    );
};
