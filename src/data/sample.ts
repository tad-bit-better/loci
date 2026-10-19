import type { Strength } from '@/theme';
import { greMnemonics } from './greMnemonics';
import { greWords } from './greVocab';

/** Sample content used by the screens until real data is wired up. */

export type GoalId = 'exams' | 'work' | 'language' | 'fun';

export const goals: { id: GoalId; label: string; description: string; color: 'yellow' | 'green' | 'pink' | 'blue' }[] = [
  { id: 'exams', label: 'Exams and studies', description: 'UPSC, NEET, SAT, med school and more', color: 'yellow' },
  { id: 'work', label: 'Work', description: 'Names, numbers, presentations', color: 'green' },
  { id: 'language', label: 'Learning a language', description: 'Vocabulary that actually sticks', color: 'pink' },
  { id: 'fun', label: 'Just for fun', description: 'Daily challenges and memory games', color: 'blue' },
];

export type Stop = {
  place: string;
  word: string;
  meaning: string;
  soundsLike?: string;
  image?: string;
  strength: Strength;
  review: string;
};
export type Room = { id: string; name: string; tab: 'yellow' | 'green' | 'pink'; title: string; stops: Stop[] };

const meaningOf = (word: string) => greWords.find((v) => v.word === word)?.meaning ?? '';
const stop = (place: string, word: string, strength: Strength, review: string): Stop => ({
  place,
  word,
  meaning: meaningOf(word),
  ...greMnemonics[word],
  strength,
  review,
});

export const rooms: Room[] = [
  {
    id: 'hall',
    name: 'Hall',
    tab: 'yellow',
    title: 'The Hall · Daily Challenge words',
    stops: [
      stop('Front door', 'laconic', 'strong', 'next review in 9 days'),
      stop('Coat hook', 'ephemeral', 'strong', 'next review in 6 days'),
      stop('Mirror', 'obdurate', 'due', 'due today'),
      stop('Bench', 'garrulous', 'weak', 'fading, review now'),
      stop('Rug', 'ubiquitous', 'strong', 'next review in 4 days'),
      stop('Stairs', 'vacillate', 'due', 'due today'),
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    tab: 'green',
    title: 'The Kitchen · GRE vocab',
    stops: [
      stop('Doorway', 'pungent', 'strong', 'next review in 5 days'),
      stop('Table', 'placate', 'due', 'due today'),
      stop('Stove', 'fervent', 'strong', 'next review in 3 days'),
      stop('Sink', 'desiccate', 'weak', 'fading, review now'),
      stop('Window', 'lucid', 'strong', 'next review in 8 days'),
      stop('Fridge', 'torpor', 'due', 'due today'),
    ],
  },
];

export const lockedRooms = ['Study', 'Library'];

/** Onboarding step 2: memorize with no technique, to get a starting score. */
export const baselineWords = [
  'carrot', 'hammer', 'candle', 'zebra', 'bucket', 'guitar', 'clock', 'balloon', 'spoon', 'frog',
];

/** Onboarding step 3: a list of the same difficulty, linked into one story. Each `text` contains its `word`. */
export const storyScenes: { word: string; text: string }[] = [
  { word: 'elephant', text: 'A hungry elephant stomps into your kitchen, trumpeting.' },
  { word: 'teapot', text: 'It grabs a teapot with its trunk and pours hot tea over its own head.' },
  { word: 'bicycle', text: 'Dripping wet, it squeezes onto a tiny bicycle that creaks and wobbles.' },
  { word: 'diamond', text: 'The bicycle crashes into a diamond the size of a fridge, glittering in the road.' },
  { word: 'pizza', text: 'Inside the diamond, a cheesy pizza spins like a record.' },
  { word: 'owl', text: 'An owl swoops down, cracks the diamond open and flies off with the pizza.' },
  { word: 'sock', text: 'The owl is wearing a smelly striped sock as a hat.' },
  { word: 'snowman', text: 'The sock falls onto a snowman, who sneezes so hard his head spins.' },
  { word: 'drum', text: 'The sneeze hits a giant drum: BOOM.' },
  { word: 'moon', text: 'The boom knocks the moon out of the sky and it lands in your lap.' },
];

export const storyWords = storyScenes.map((s) => s.word);

/** Word drill: one stop per word, in walking order. Words come from the GRE pack (src/lib/vocab.ts). */
export const walkStops = [
  'Hall · front door', 'Hall · coat hook', 'Hall · mirror', 'Hall · bench', 'Hall · rug', 'Hall · stairs',
  'Kitchen · doorway', 'Kitchen · the stove', 'Kitchen · sink', 'Kitchen · window', 'Kitchen · fridge',
  'Kitchen · table', 'Garden · gate', 'Garden · fountain', 'Garden · roses', 'Garden · oak tree',
  'Garden · shed', 'Garden · pond', 'Tower · stairs', 'Tower · window',
];
