import React, { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { generateDailyPlan } from '../ai/fluencyEngine';
import { DailyPlan, UserRatings } from '../types';

type State = {
  ratings: UserRatings;
  streak: number;
  wordsMastered: number;
  speakingSpeedWpm: number;
  hesitationReduction: number;
  dailyPlan: DailyPlan[];
};

type Actions =
  | { type: 'APPLY_SPEAKING_DELTA'; payload: { eloDelta: number; confidenceScore: number } }
  | { type: 'APPLY_WRITING_DELTA'; payload: { eloDelta: number; grammarGain: number; vocabGain: number } }
  | { type: 'APPLY_DEBATE_DELTA'; payload: { eloDelta: number; confidence: number; professionalism: number } }
  | { type: 'MASTER_WORD'; payload: { count: number } };

const initialRatings: UserRatings = {
  speaking: 1832,
  writing: 1715,
  vocabulary: 1660,
  grammar: 1748,
  confidence: 79
};

const initialState: State = {
  ratings: initialRatings,
  streak: 14,
  wordsMastered: 246,
  speakingSpeedWpm: 126,
  hesitationReduction: 22,
  dailyPlan: generateDailyPlan(initialRatings)
};

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'APPLY_SPEAKING_DELTA': {
      const ratings = {
        ...state.ratings,
        speaking: Math.max(0, state.ratings.speaking + action.payload.eloDelta),
        confidence: Math.min(100, Math.max(0, Math.round((state.ratings.confidence + action.payload.confidenceScore / 25) * 10) / 10))
      };
      return {
        ...state,
        ratings,
        speakingSpeedWpm: state.speakingSpeedWpm + 1,
        hesitationReduction: Math.min(100, state.hesitationReduction + 1),
        dailyPlan: generateDailyPlan(ratings)
      };
    }
    case 'APPLY_WRITING_DELTA': {
      const ratings = {
        ...state.ratings,
        writing: Math.max(0, state.ratings.writing + action.payload.eloDelta),
        grammar: Math.max(0, state.ratings.grammar + action.payload.grammarGain),
        vocabulary: Math.max(0, state.ratings.vocabulary + action.payload.vocabGain)
      };
      return {
        ...state,
        ratings,
        dailyPlan: generateDailyPlan(ratings)
      };
    }
    case 'APPLY_DEBATE_DELTA': {
      const ratings = {
        ...state.ratings,
        speaking: Math.max(0, state.ratings.speaking + action.payload.eloDelta),
        confidence: Math.min(100, state.ratings.confidence + Math.round(action.payload.confidence / 50)),
        vocabulary: Math.max(0, state.ratings.vocabulary + Math.round(action.payload.professionalism / 30))
      };
      return {
        ...state,
        ratings,
        streak: state.streak + 1,
        dailyPlan: generateDailyPlan(ratings)
      };
    }
    case 'MASTER_WORD':
      return { ...state, wordsMastered: state.wordsMastered + action.payload.count };
    default:
      return state;
  }
}

type Ctx = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const FluentoContext = createContext<Ctx | undefined>(undefined);

export function FluentoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <FluentoContext.Provider value={value}>{children}</FluentoContext.Provider>;
}

export function useFluento() {
  const ctx = useContext(FluentoContext);
  if (!ctx) throw new Error('useFluento must be used inside FluentoProvider');
  return ctx;
}
