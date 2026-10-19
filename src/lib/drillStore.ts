import { useSyncExternalStore } from 'react';
import { walkStops } from '@/data/sample';
import { matchWord } from './recall';
import { pickWords, type DrillWord } from './vocab';

/** Abstract words are harder to picture than objects, so vocab drills are short. */
export const DRILL_SIZE = 10;

/**
 * Tiny in-memory store for one word drill (Memorize → Recall).
 * Swap for zustand/jotai if state grows; kept dependency-free for the starter.
 */
export type DrillState = {
  words: string[];
  /** Parallel to `words`: meaning and keyword mnemonic for each. */
  vocab: DrillWord[];
  /** Parallel to `words`: the user's rewrite of the image, '' if they kept ours. */
  ownImages: string[];
  stops: string[];
  memorizeIndex: number;
  recallIndex: number;
  answers: { given: string; correct: boolean }[];
  startedAt: number;
};

const fresh = (seed?: string): DrillState => {
  const picked = pickWords(DRILL_SIZE, seed);
  return {
    words: picked.map((v) => v.word),
    vocab: picked,
    ownImages: picked.map(() => ''),
    stops: walkStops.slice(0, picked.length),
    memorizeIndex: 0,
    recallIndex: 0,
    answers: [],
    startedAt: Date.now(),
  };
};

let state = fresh();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const drill = {
  get: () => state,
  /** New random words, or the same words for everyone when given a seed (Daily Challenge). */
  reset(seed?: string) {
    state = fresh(seed);
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
  setOwnImage(index: number, text: string) {
    const ownImages = [...state.ownImages];
    ownImages[index] = text;
    state = { ...state, ownImages };
    emit();
  },
  answer(given: string) {
    const expected = state.words[state.recallIndex] ?? '';
    const correct = matchWord(given, [expected]) !== null;
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
