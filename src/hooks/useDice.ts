import { useContext, useEffect, useRef } from 'react';
import { DiceContext } from '../components/DiceProvider';
import roll from '../assets/roll.mp3';
import click from '../assets/click.mp3';
import won from '../assets/won.mp3';

const rollSound = new Audio(roll);
const clickSound = new Audio(click);
const wonSound = new Audio(won);

function playRollSound() {
  if (!rollSound.paused) {
    rollSound.pause();
    rollSound.currentTime = 0;
  }

  rollSound.play();
}

function playClickSound() {
  if (!clickSound.paused) {
    clickSound.pause();
    clickSound.currentTime = 0;
  }

  clickSound.play();
}

function playWonSound() {
  if (!wonSound.paused) {
    wonSound.pause();
    wonSound.currentTime = 0;
  }

  wonSound.play();
}

function stopWonSound() {
  wonSound.pause();
  wonSound.currentTime = 0;
}

export const useDice = () => {
  const { state, dispatch } = useContext(DiceContext);
  const timerRef = useRef(0);

  useEffect(() => {
    if (!state.playing && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [state.playing, timerRef.current]);

  useEffect(() => {
    if (state.won) {
      playWonSound();
    }
  }, [state.won]);

  const startGame = () => {
    playClickSound();
    playRollSound();
    dispatch({ type: 'START_GAME' });

    timerRef.current = setInterval(() => {
      dispatch({ type: 'SET_TIME' });
    }, 1000);
  };

  const rollDice = () => {
    stopWonSound();
    playClickSound();
    playRollSound();
    dispatch({ type: 'ROLL_DICE' });
  };

  const toggleHeld = (index: number) => {
    playClickSound();
    dispatch({ type: 'TOGGLE_HELD', payload: index });
  };

  const bestRolls =
    state.records.length > 0 &&
    Math.min(...state.records.map((record) => record.rolls));

  const bestTime =
    state.records.length > 0 &&
    Math.min(...state.records.map((record) => record.time));

  return {
    ...state,
    bestRolls,
    bestTime,
    startGame,
    rollDice,
    toggleHeld,
  };
};
