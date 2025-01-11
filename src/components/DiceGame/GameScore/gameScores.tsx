import {Player} from "../../../utils/types.ts";

type Props = {
    players: Player[];
    currentPlayerIndex: number;
}

export const DiceGameScores = ({
                                   players,
                                   currentPlayerIndex,
                               }: Props) => {

    return (
        <>
            <div className="scores-section">
                <h2>Scores</h2>
                {players.map((player, index) => (
                    <div
                        key={index}
                        className={`player-score ${
                            player.id === players[currentPlayerIndex].id ? "current-player-score" : ""
                        }`}
                    >
                        <p>{player.name}</p>
                        <p>Winnings: {player.winningCount}</p>
                        <p>
                            Score: {player.score}{" "}
                            {player.id === players[currentPlayerIndex].id && `(Turn: ${player.currentTurnScore})`}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};
