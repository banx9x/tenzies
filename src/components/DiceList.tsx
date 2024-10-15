import { useDice } from '../hooks/useDice';
import Dice from './Dice';

export default function DiceList() {
  const { dices } = useDice();

  return (
    <div className='dices'>
      {dices.map((dice) => (
        <Dice key={dice.index} {...dice} />
      ))}
    </div>
  );
}
