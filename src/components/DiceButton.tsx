import { useDice } from '../hooks/useDice';
export default function DiceButton() {
  const { playing, startGame, rollDice } = useDice();

  const handleClick = () => {
    if (playing) {
      rollDice();
    } else {
      startGame();
    }
  };

  return (
    <div className='dice-button-wrapper'>
      <button className='dice-button' onClick={handleClick}>
        {playing ? 'Roll Dice' : 'Start Game'}
      </button>
    </div>
  );
}
