import type { Strength } from '@/theme';

/** Sample content used by the screens until real data is wired up. */

export type GoalId = 'exams' | 'work' | 'language' | 'fun';

export const goals: { id: GoalId; label: string; description: string; color: 'yellow' | 'green' | 'pink' | 'blue' }[] = [
  { id: 'exams', label: 'Exams and studies', description: 'UPSC, NEET, SAT, med school and more', color: 'yellow' },
  { id: 'work', label: 'Work', description: 'Names, numbers, presentations', color: 'green' },
  { id: 'language', label: 'Learning a language', description: 'Vocabulary that actually sticks', color: 'pink' },
  { id: 'fun', label: 'Just for fun', description: 'Daily challenges and memory games', color: 'blue' },
];

export type Stop = { place: string; item: string; strength: Strength; mnemonic: string; source: string; review: string };
export type Room = { id: string; name: string; tab: 'yellow' | 'green' | 'pink'; title: string; stops: Stop[] };

export const rooms: Room[] = [
  {
    id: 'hall',
    name: 'Hall',
    tab: 'yellow',
    title: 'The Hall · Daily Challenge words',
    stops: [
      { place: 'Front door', item: 'anchor', strength: 'strong', mnemonic: 'A rusty ship anchor is jammed through the front door, salt water dripping onto the mat.', source: 'your own image', review: 'next review in 9 days' },
      { place: 'Coat hook', item: 'violin', strength: 'strong', mnemonic: 'A violin hangs on the coat hook, playing itself every time someone walks past.', source: 'your own image', review: 'next review in 6 days' },
      { place: 'Mirror', item: 'cactus', strength: 'due', mnemonic: 'Your reflection in the mirror is a cactus wearing your glasses.', source: 'AI-assisted', review: 'due today' },
      { place: 'Bench', item: 'lantern', strength: 'weak', mnemonic: 'A lantern on the bench is so bright it burns a hole through the cushion.', source: 'AI-assisted', review: 'fading, review now' },
      { place: 'Rug', item: 'river', strength: 'strong', mnemonic: 'The rug is a tiny river; fish leap out and splash your socks.', source: 'your own image', review: 'next review in 4 days' },
      { place: 'Stairs', item: 'helmet', strength: 'due', mnemonic: 'A giant knight helmet rolls down the stairs, clanging on every step.', source: 'AI-assisted', review: 'due today' },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    tab: 'green',
    title: 'The Kitchen · mixed study',
    stops: [
      { place: 'Doorway', item: 'pepper', strength: 'strong', mnemonic: 'A sneezing pepper blocks the doorway, too big to squeeze past.', source: 'your own image', review: 'next review in 5 days' },
      { place: 'Table', item: 'Article 21: Right to life', strength: 'due', mnemonic: 'Twenty-one candles on the table, each a heartbeat. Blow one out and the table gasps for life.', source: 'AI-assisted, edited by you', review: 'due today' },
      { place: 'Stove', item: 'Mitochondria make ATP', strength: 'strong', mnemonic: 'A tiny power plant on the stove puffs out batteries labelled A-T-P instead of steam.', source: 'AI-assisted, edited by you', review: 'next review in 3 days' },
      { place: 'Sink', item: 'Ohm’s law: V = IR', strength: 'weak', mnemonic: 'Water (current) gushes from the tap; your thumb on the spout is the resistance, the pressure is the voltage.', source: 'from the NEET pack', review: 'fading, review now' },
      { place: 'Window', item: 'la ventana = window', strength: 'strong', mnemonic: 'A van with a tan driver crashes through the window: van-tan-a.', source: 'from the Spanish pack', review: 'next review in 8 days' },
      { place: 'Fridge', item: 'Sam’s birthday: 14 Mar', strength: 'due', mnemonic: 'Sam is stuck inside the fridge holding 14 frozen pies (3.14, March 14).', source: 'your own image', review: 'due today' },
    ],
  },
];

export const lockedRooms = ['Study', 'Library'];

/** Word drill: 20 words, each placed at a stop on the walk. */
export const drillWords = [
  'anchor', 'violin', 'cactus', 'lantern', 'river', 'helmet', 'pepper', 'umbrella', 'feather', 'trumpet',
  'volcano', 'pillow', 'ladder', 'penguin', 'compass', 'banana', 'kettle', 'rocket', 'scarf', 'tiger',
];

export const walkStops = [
  'Hall · front door', 'Hall · coat hook', 'Hall · mirror', 'Hall · bench', 'Hall · rug', 'Hall · stairs',
  'Kitchen · doorway', 'Kitchen · the stove', 'Kitchen · sink', 'Kitchen · window', 'Kitchen · fridge',
  'Kitchen · table', 'Garden · gate', 'Garden · fountain', 'Garden · roses', 'Garden · oak tree',
  'Garden · shed', 'Garden · pond', 'Tower · stairs', 'Tower · window',
];
