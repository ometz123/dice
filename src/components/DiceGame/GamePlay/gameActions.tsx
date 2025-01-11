import '../../../App.css';

type Props = {
    handleRoll: () => void;
    handleHold: () => void;
    disabled: boolean
}
export const GameActions = ({
                                handleRoll,
                                handleHold,
                                disabled
                            }: Props) => {
    return (
        <>
            <button
                className="game-action-button"
                onClick={handleRoll}
                disabled={disabled}
            >
                Roll The Dice!
            </button>

            <button
                onClick={handleHold}
                disabled={disabled}
                style={{ marginLeft: '10px' }}
                className="game-action-button"

            >
                Hold!
            </button>
        </>
    );
};
