import Confetti from 'react-confetti';
import { useDice } from '../hooks/useDice';

export default function DiceConfetti() {
  const { won } = useDice();
  return won && <Confetti run />;
}
