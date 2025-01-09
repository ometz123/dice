import {Player} from "../utils/types.ts";
import '../App.css';

type Props = {
    player: Player;
    resetGame: () => void;
}
export const Winner = ({player, resetGame}: Props) => {
    return (
        <>
            <div>
                <h2>{player.name} wins the game</h2>
                <h2>With: {player.score + player.currentTurnScore} Points!</h2>
                <button onClick={resetGame}>Restart</button>
            </div>
        </>
    );
};
