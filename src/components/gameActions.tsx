import '../App.css';

type Props = {
    handleRoll: () => void;
    hold: () => void;
}
export const GameActions = ({handleRoll, hold}: Props) => {
    return (
        <>
            <button onClick={handleRoll}>
                Roll The Dice!
            </button>

            <button onClick={hold} style={{marginLeft: "10px"}}>
                Hold!
            </button>
        </>
    );
};
