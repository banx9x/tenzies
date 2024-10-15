import { useDice } from '../hooks/useDice';

const zeroFill = (number: number) => String(number).padStart(2, '0');

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${zeroFill(minutes)}:${zeroFill(seconds)}s`;
};

export default function DiceScore() {
  const { playing, won, rolls, time, bestRolls, bestTime } = useDice();

  return (
    <div className='dice-score'>
      <div className='dice-score__item'>
        <div className='dice-score__title'>Current Rolls</div>
        <div className='dice-score__value'>{playing || won ? rolls : '--'}</div>
      </div>

      <div className='dice-score__item'>
        <div className='dice-score__title'>Best Rolls</div>
        <div className='dice-score__value'>{bestRolls ? bestRolls : '--'}</div>
      </div>

      <div className='dice-score__item'>
        <div className='dice-score__title'>Current Time</div>
        <div className='dice-score__value'>
          {playing || won ? formatTime(time) : '--'}
        </div>
      </div>

      <div className='dice-score__item'>
        <div className='dice-score__title'>Best Time</div>
        <div className='dice-score__value'>{bestTime ? formatTime(bestTime) : '--'}</div>
      </div>
    </div>
  );
}
