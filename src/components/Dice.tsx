import { useDice } from '../hooks/useDice';

export type DiceProps = {
  index: number;
  number: number;
  held?: boolean;
};

const diceClasses = (number: number, held: boolean = false) => {
  const classes = ['dice'];

  switch (number) {
    case 1:
      classes.push('one');
      break;
    case 2:
      classes.push('two');
      break;
    case 3:
      classes.push('three');
      break;
    case 4:
      classes.push('four');
      break;
    case 5:
      classes.push('five');
      break;
    case 6:
      classes.push('six');
      break;
    default:
      break;
  }

  if (held) {
    classes.push('held');
  }

  return classes.join(' ');
};

export default function Dice({ index, number, held }: DiceProps) {
  const { toggleHeld } = useDice();

  return (
    <div
      className={diceClasses(number, held)}
      onClick={() => toggleHeld(index)}>
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <div className='dot' key={index}></div>
        ))}
    </div>
  );
}
