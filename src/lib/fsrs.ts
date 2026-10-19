import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  TypeConvert,
  type Card,
  type Grade,
} from 'ts-fsrs';
import type { Strength } from '@/theme';

/** One scheduler for the app. Tune `request_retention` later from real data. */
const scheduler = fsrs(generatorParameters({ enable_fuzz: true, request_retention: 0.9 }));

export { Rating };
export type { Card, Grade };

export const newCard = (now = new Date()): Card => createEmptyCard(now);

/** Cards are stored as JSON (`items.fsrs_card`); dates come back as strings, so revive them. */
export const cardToJson = (card: Card) => JSON.stringify(card);
export const cardFromJson = (json: string): Card => TypeConvert.card(JSON.parse(json));

/** Apply a review. Map recall results to grades: wrong → Again, slow → Hard, right → Good, instant → Easy. */
export function review(card: Card, grade: Grade, now = new Date()) {
  return scheduler.next(card, now, grade); // { card, log }
}

/** Probability (0–1) the user still remembers this item right now. */
export function recallChance(card: Card, now = new Date()): number {
  return scheduler.get_retrievability(card, now, false);
}

/** Maps to the highlighter colours used across the UI. */
export function strengthOf(card: Card, now = new Date()): Strength {
  if (card.due.getTime() <= now.getTime()) {
    return recallChance(card, now) < 0.7 ? 'weak' : 'due';
  }
  return 'strong';
}
