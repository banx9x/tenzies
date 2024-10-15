import './App.css';
import DiceButton from './components/DiceButton';
import DiceConfetti from './components/DiceConfetti';
import DiceList from './components/DiceList';
import { DiceProvider } from './components/DiceProvider';
import DiceScore from './components/DiceScore';

function App() {
  return (
    <DiceProvider>
      <div className='container'>
        <div className='header'>
          <h1 className='title'>Tenzies</h1>
          <p className='instructions'>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <p className='icons'>🎲🎲🎲🎲🎲🎲</p>
        </div>

        <DiceConfetti />
        <DiceScore />
        <DiceList />
        <DiceButton />
      </div>
    </DiceProvider>
  );
}

export default App;
