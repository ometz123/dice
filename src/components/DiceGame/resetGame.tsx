type Props = {
    resetGame: () => void;
    disabled: boolean
}

export const ResetGame = ({
                              resetGame,
                              disabled
                          }: Props) => {
    return (
        <>
            <button
                className="reset-button"
                onClick={resetGame}
                disabled={disabled}
            >
                Reset Game
            </button>
        </>
    );
};
