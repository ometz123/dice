type Props = {
    continueGame: () => void
}

export const ContinueGame = ({continueGame}: Props) => {
    return (
        <>
            <button
                onClick={continueGame}
                className="continue-button">
                Continue Game
            </button>
        </>
    );
};
