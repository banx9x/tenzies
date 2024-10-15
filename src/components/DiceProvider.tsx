import { createContext, Dispatch, useReducer } from 'react';

export type DiceContextObject = {
  state: DiceState;
  dispatch: Dispatch<DiceAction>;
};

export const DiceContext = createContext<DiceContextObject>(
  {} as DiceContextObject
);

export type Dice = {
  index: number;
  number: number;
  held: boolean;
};

export type Record = {
  rolls: number;
  time: number;
};

export type DiceState = {
  dices: Dice[];
  playing: boolean;
  rolls: number;
  time: number;
  records: Record[];
  won: boolean;
};

export type DiceAction =
  | {
      type: 'START_GAME';
    }
  | {
      type: 'STOP_GAME';
      payload: {
        won: boolean;
      };
    }
  | {
      type: 'TOGGLE_HELD';
      payload: number;
    }
  | {
      type: 'ROLL_DICE';
    }
  | {
      type: 'SET_TIME';
    };

const random = () => Math.floor(Math.random() * 6) + 1;

const initialDices = () => {
  return Array(10)
    .fill(0)
    .map((_, index) => ({
      index,
      number: random(),
      held: false,
    }));
};

export const diceReducer = (state: DiceState, action: DiceAction) => {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...state,
        playing: true,
        rolls: 0,
        dices: initialDices(),
        time: 0,
        won: false,
      };
    }
    case 'ROLL_DICE': {
      return {
        ...state,
        rolls: state.rolls + 1,
        dices: state.dices.map((dice) =>
          dice.held ? dice : { ...dice, number: random() }
        ),
      };
    }
    case 'TOGGLE_HELD': {
      if (!state.playing) {
        return state;
      }

      const dices = state.dices.map((dice, index) =>
        index === action.payload ? { ...dice, held: !dice.held } : { ...dice }
      );

      const won = dices.every(
        (dice) => dice.held && dice.number === dices[0].number
      );

      const records = state.records;

      if (won) {
        records.push({
          rolls: state.rolls,
          time: state.time,
        });
      }

      return {
        ...state,
        dices,
        won,
        playing: !won,
        records,
      };
    }
    case 'SET_TIME': {
      const time = state.time + 1;

      return {
        ...state,
        time,
      };
    }
    default: {
      throw new Error(`Unhandled action`);
    }
  }
};

export const DiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(diceReducer, {
    dices: initialDices(),
    playing: false,
    rolls: 0,
    time: 0,
    records: [],
    won: false,
  });

  return (
    <DiceContext.Provider value={{ state, dispatch }}>
      {children}
    </DiceContext.Provider>
  );
};
