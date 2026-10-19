import { useSyncExternalStore } from 'react';
import { drillWords, walkStops } from '@/data/sample';

/**
 * Tiny in-memory store for one word drill (Memorize → Recall).
 * Swap for zustand/jotai if state grows; kept dependency-free for the starter.
 */
export type DrillState = {
  words: string[];
  stops: string[];
  memorizeIndex: number;
  recallIndex: number;
  answers: { given: string; correct: boolean }[];
  startedAt: number;
};

const fresh = (): DrillState => ({
  words: drillWords,
  stops: walkStops,
  memorizeIndex: 0,
  recallIndex: 0,
  answers: [],
  startedAt: Date.now(),
});

let state = fresh();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const drill = {
  get: () => state,
  reset() {
    state = fresh();
    emit();
  },
  nextWord() {
    state = { ...state, memorizeIndex: Math.min(state.memorizeIndex + 1, state.words.length) };
    emit();
  },
  prevWord() {
    state = { ...state, memorizeIndex: Math.max(state.memorizeIndex - 1, 0) };
    emit();
  },
  answer(given: string) {
    const expected = state.words[state.recallIndex] ?? '';
    const correct = given.trim().toLowerCase() === expected.toLowerCase();
    state = {
      ...state,
      answers: [...state.answers, { given: given.trim(), correct }],
      recallIndex: state.recallIndex + 1,
    };
    emit();
    return correct;
  },
};

export function useDrill() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    drill.get,
    drill.get,
  );
}
