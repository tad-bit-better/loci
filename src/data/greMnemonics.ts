/**
 * Offline snapshot only: the live copy is Supabase `pack_words` (edit it there). This file seeds a fresh
 * install (src/lib/packs.ts) and generated the gre_starter_pack migration.
 *
 * Keyword-method mnemonics for the GRE pack (our own writing, unlike the WordNet meanings).
 * Each one is a chain: `soundsLike` is a concrete sound-alike for the word, and `image` is a scene that
 * joins that sound-alike to the meaning. Images must work at any stop: the drill prefixes "At the <stop>:".
 * Drills only use words that have one, so a new pack word needs one before it can appear.
 */
export type Mnemonic = { soundsLike: string; image: string };

export const greMnemonics: Record<string, Mnemonic> = {
  abate: {
    soundsLike: 'a bait',
    image: 'You drop a bait into the roaring sea and the storm slowly calms, wave by wave.',
  },
  aberrant: {
    soundsLike: 'a berry rant',
    image:
      'One berry in the bowl is bright blue and ranting while the rest sit still: the odd one out.',
  },
  abscond: {
    soundsLike: 'abs + con',
    image: 'A con man with huge abs sneaks off into the night carrying your TV.',
  },
  abstruse: {
    soundsLike: 'abs + truce',
    image:
      "A truce treaty tattooed across someone's abs, in a script so obscure nobody can read it.",
  },
  acrimony: {
    soundsLike: 'acrid + money',
    image: 'Two siblings fight over money, spitting words so bitter the air smells acrid.',
  },
  admonish: {
    soundsLike: 'add monster',
    image: 'A teacher adds a monster to the warning sign: STOP, or this will eat you.',
  },
  adulterate: {
    soundsLike: 'adult + tray',
    image: 'An adult sneaks cheap sawdust into the tray of fresh flour, spoiling the whole batch.',
  },
  alacrity: {
    soundsLike: 'a lark',
    image: 'A lark bursts out of bed at dawn, singing, and races to start the day.',
  },
  ambivalent: {
    soundsLike: 'ambi (both) + valiant',
    image:
      'A valiant knight charges left, then right, then left again, unable to decide where to fight.',
  },
  ameliorate: {
    soundsLike: 'Amelia rates',
    image:
      'Amelia fixes everything she touches: a wobbly chair, a sad face, a burnt toast. Each one she rates higher than before.',
  },
  anachronism: {
    soundsLike: 'a knack + chrono (time)',
    image: 'A Roman soldier in full armour checks the time on his smartwatch.',
  },
  anomaly: {
    soundsLike: 'an aunt Molly',
    image: 'A row of identical penguins, and in the middle, your Aunt Molly in a pink coat.',
  },
  antipathy: {
    soundsLike: 'anti + path',
    image: 'Someone is so anti this path that they refuse to step on it, hissing with dislike.',
  },
  apathy: {
    soundsLike: 'a path, eh?',
    image: "Someone shrugs at a glowing path to treasure: \"A path, eh? Don't care.\"",
  },
  appease: {
    soundsLike: 'a peas',
    image: 'An angry toddler is handed a bowl of peas and instantly stops screaming and smiles.',
  },
  arcane: {
    soundsLike: 'ark + cane',
    image:
      'An old wizard taps his cane on an ark, and secret runes only he can read start to glow.',
  },
  arduous: {
    soundsLike: 'hard + you + us',
    image: 'Hauling a piano up a mountain is hard for you and us: exhausting, step after step.',
  },
  ascetic: {
    soundsLike: 'a seat? ick!',
    image: 'A monk refuses every comfy seat ("ick!") and sleeps on stones, eating only dry bread.',
  },
  assuage: {
    soundsLike: 'a sausage',
    image: 'A cold sausage pressed on a bruise, and the pain melts away.',
  },
  audacious: {
    soundsLike: 'audio + daring',
    image: 'Someone blasts audio from a speaker while walking a tightrope over a canyon.',
  },
  austere: {
    soundsLike: 'Aussie steer',
    image: 'An Aussie steer lives in a bare shed: one bale of hay, no decoration, nothing extra.',
  },
  banal: {
    soundsLike: 'banana',
    image: 'The hundredth banana joke today, so worn out that nobody even groans.',
  },
  belie: {
    soundsLike: 'bell + lie',
    image:
      'A bell rings "all is well" while smoke pours out of the building: the bell tells a lie.',
  },
  bolster: {
    soundsLike: 'bolster (a long pillow)',
    image: 'A giant bolster pillow is propped under a sagging roof, holding it up strong.',
  },
  bombastic: {
    soundsLike: 'bomb + blast',
    image:
      'A pompous speaker whose every fancy word explodes like a bomb, blasting big words everywhere.',
  },
  burgeon: {
    soundsLike: 'burger + on',
    image: 'A burger seed sprouts into a burger tree, sprouting new burgers every second.',
  },
  cacophony: {
    soundsLike: 'cackle + phone',
    image: 'A hundred phones ring at once while a witch cackles over them: a harsh, clashing din.',
  },
  capricious: {
    soundsLike: 'cap + rich',
    image:
      "A rich man's cap changes colour every time he changes his mind, which is every few seconds, for no reason at all.",
  },
  castigate: {
    soundsLike: 'cast a gate',
    image: 'An angry coach casts an iron gate across the field while scolding the team harshly.',
  },
  caustic: {
    soundsLike: 'caw + stick',
    image: 'A crow caws insults and jabs you with an acid-dipped stick: harsh and burning.',
  },
  chicanery: {
    soundsLike: 'chicken + ery',
    image: 'A chicken in a top hat runs a shell game, tricking farmers out of their coins.',
  },
  cogent: {
    soundsLike: 'cog + agent',
    image: 'A secret agent made of cogs makes an argument so clear and forceful everyone nods.',
  },
  compunction: {
    soundsLike: 'come + punch',
    image: 'You punched a friend; now you come back with flowers, sick with regret.',
  },
  conciliatory: {
    soundsLike: 'council + story',
    image: 'The council tells a soothing story to calm an angry crowd.',
  },
  condone: {
    soundsLike: 'con done',
    image: 'A judge watches a con done right in front of him and just shrugs: "Let it go."',
  },
  conundrum: {
    soundsLike: 'corn + drum',
    image: 'A drum full of corn with no lid and no seams: a puzzle nobody can open.',
  },
  convoluted: {
    soundsLike: 'convoy + loot',
    image:
      'A convoy of trucks drags its loot on ropes that have knotted into one hopeless, twisting tangle.',
  },
  corroborate: {
    soundsLike: 'core + robot',
    image: 'A robot holds up an apple core as evidence: "Yes, he ate it," confirming the story.',
  },
  credulous: {
    soundsLike: 'credit + fools',
    image:
      'A man believes a talking goldfish that promises free credit cards, and hands over his wallet.',
  },
  culpable: {
    soundsLike: 'culprit + able',
    image:
      'The culprit stands by the broken window holding the stone: guilty, and able to be blamed.',
  },
  cursory: {
    soundsLike: 'cursor',
    image: 'Your cursor whizzes through a 500-page contract in one second: a hasty, careless skim.',
  },
  dearth: {
    soundsLike: 'dear earth',
    image: 'The dear earth lies cracked and empty: not one plant, not one drop of water.',
  },
  deference: {
    soundsLike: 'defer',
    image: 'Everyone steps aside and defers to a tiny queen, bowing to whatever she wants.',
  },
  denigrate: {
    soundsLike: 'deny + great',
    image: 'A rival plasters posters that deny you are great, smearing lies about your name.',
  },
  deride: {
    soundsLike: 'the ride',
    image: 'Kids point and laugh at your ride, a squeaky rusty tricycle: pure mockery.',
  },
  desiccate: {
    soundsLike: 'desert cat',
    image: 'A desert cat breathes on a bunch of grapes and they shrivel into dry raisins.',
  },
  diatribe: {
    soundsLike: 'diet + tribe',
    image: 'A whole tribe shouts a furious rant at you about your diet, drums pounding.',
  },
  didactic: {
    soundsLike: 'did a tactic',
    image: 'A teacher explains every tactic you did, in a long lecture you never asked for.',
  },
  diffident: {
    soundsLike: 'diff + dent',
    image: "A shy robot with a dent in its head hides behind the door, sure it's not good enough.",
  },
  digress: {
    soundsLike: 'dig + grass',
    image: 'Mid-sentence, the speaker wanders off and starts digging in the grass.',
  },
  dilatory: {
    soundsLike: 'delay + tory',
    image: 'A dill pickle that delays everything: it naps, stretches, and wastes the whole day.',
  },
  disparate: {
    soundsLike: 'dis + pirate',
    image:
      'A pirate, a ballerina and a robot share one table: completely different kinds of guests.',
  },
  dissemble: {
    soundsLike: 'the symbol',
    image: 'Someone hides a scowl behind a smiley-symbol mask: a false face.',
  },
  dogmatic: {
    soundsLike: 'dog + automatic',
    image: 'A dog automatically barks the same unproven rule: "Cats are evil!" No proof needed.',
  },
  eclectic: {
    soundsLike: 'electric',
    image:
      'An electric magnet pulls in the best bits of everything: a jazz trumpet, a sushi roll, a Greek column.',
  },
  efficacy: {
    soundsLike: 'effect, I see',
    image: 'You take the pill and shout "I see the effect!" It works instantly.',
  },
  effrontery: {
    soundsLike: 'a front tree',
    image: 'Someone plants a tree in front of your door without asking, then demands you water it.',
  },
  elicit: {
    soundsLike: 'a lick it',
    image: 'A lollipop so tempting it draws a huge grin out of everyone; they all have to lick it.',
  },
  eloquent: {
    soundsLike: 'elegant quail',
    image: 'An elegant quail gives a flawless speech; the crowd weeps at every clear word.',
  },
  emulate: {
    soundsLike: 'emu + late',
    image: 'An emu turns up late and copies everything the ostriches do, trying to match them.',
  },
  enervate: {
    soundsLike: 'energy + vacate',
    image: 'All your energy vacates your body through your feet, leaving you limp and weak.',
  },
  ephemeral: {
    soundsLike: 'a femur, all gone',
    image: 'A femur made of ice: you reach for it and the whole bone melts away in a second.',
  },
  equivocal: {
    soundsLike: 'equal + vocal',
    image: 'Two mouths give equally vocal answers at once, "yes" and "no": which one did it mean?',
  },
  erudite: {
    soundsLike: 'a rude knight',
    image: 'A rude knight who knows everything, quoting ancient books while insulting you.',
  },
  esoteric: {
    soundsLike: 'S.O.S. trick',
    image: 'S.O.S. signals in a code only a secret inner circle can read.',
  },
  eulogy: {
    soundsLike: 'you, log',
    image: 'At a funeral, someone praises a log in a coffin: "You, log, were a fine tree."',
  },
  exacerbate: {
    soundsLike: 'extra acid bath',
    image: 'You dip a stubbed toe into an extra acid bath, and the pain gets ten times worse.',
  },
  exculpate: {
    soundsLike: 'ex-culprit',
    image: "A judge stamps EX across the culprit's mugshot: no longer guilty.",
  },
  exigent: {
    soundsLike: 'exit + urgent',
    image: 'An exit sign flashes URGENT and an alarm screams: deal with this now!',
  },
  fastidious: {
    soundsLike: 'fast + tedious',
    image: 'A man scrubs one spoon for an hour, fast but tedious, until every speck is perfect.',
  },
  fervent: {
    soundsLike: 'fever + vent',
    image:
      'Someone with a fever shouts their love for pizza so passionately that steam blasts out of a vent in their head.',
  },
  flout: {
    soundsLike: 'flute out',
    image: 'A kid blasts a flute out loud in the silent library, ignoring every rule.',
  },
  garrulous: {
    soundsLike: 'gorilla + us',
    image:
      'A gorilla squeezes in beside us and never stops chattering: the weather, its lunch, its cousin, its lunch again.',
  },
  gregarious: {
    soundsLike: 'Greg + various',
    image: 'Greg hugs various strangers and starts a party with every one of them.',
  },
  hackneyed: {
    soundsLike: 'hack + knee',
    image: "A comedian hacks out the same knee-slapper joke so often it's worn thin.",
  },
  harangue: {
    soundsLike: 'hair + rang',
    image: 'A man with wild hair rang a bell and shouted a long, furious speech at the crowd.',
  },
  iconoclast: {
    soundsLike: 'icon + blast',
    image: 'Someone blasts the icons off the museum wall, attacking every cherished idea.',
  },
  idiosyncrasy: {
    soundsLike: "idiot's sink",
    image: 'Your uncle only washes his socks in the kitchen sink, singing: a quirk all his own.',
  },
  impetuous: {
    soundsLike: 'imp + pet',
    image: 'An imp grabs a pet tiger on impulse without thinking, and instantly regrets it.',
  },
  implacable: {
    soundsLike: 'un-placate-able',
    image: 'You hand the giant plate after plate of cake, but nothing will ever calm him.',
  },
  incessant: {
    soundsLike: 'in + sent',
    image: 'Messages keep being sent in: ping, ping, ping, all day and all night, never stopping.',
  },
  ingenuous: {
    soundsLike: 'in genuine',
    image:
      'A wide-eyed child tells the burglar exactly where the key is hidden: innocent and genuine.',
  },
  insipid: {
    soundsLike: 'in sip',
    image: 'You take a sip and taste nothing at all: dull grey water.',
  },
  intransigent: {
    soundsLike: 'in-trance gent',
    image: 'A gent in a trance refuses to move, no matter how anyone begs or reasons.',
  },
  inundate: {
    soundsLike: 'in under date',
    image: 'On your date, a wave pours in and floods the whole restaurant to the ceiling.',
  },
  irascible: {
    soundsLike: 'irate rascal',
    image: 'An irate little rascal explodes with anger at the tiniest thing.',
  },
  laconic: {
    soundsLike: 'lack + comic',
    image:
      'A comic who lacks words: you ask him a long question and he holds up one card that says "No."',
  },
  laud: {
    soundsLike: 'loud',
    image: 'A crowd shouts praise so loud it shakes the stadium for the winner.',
  },
  lethargic: {
    soundsLike: 'lethal + gic',
    image: "One whiff of a lethal-sounding gas and everyone yawns, slumps and can't move.",
  },
  loquacious: {
    soundsLike: 'low quack',
    image: 'A duck that low-quacks for hours about absolutely nothing, and never takes a breath.',
  },
  lucid: {
    soundsLike: 'Lucy + lid',
    image: 'Lucy lifts the lid off a foggy jar and suddenly everything inside is crystal clear.',
  },
  magnanimous: {
    soundsLike: 'magnet + animals',
    image:
      'A giant magnet of kindness: every animal it pulls in gets a gift, even the one that bit it.',
  },
  malleable: {
    soundsLike: 'mallet + able',
    image: 'Tap him with a mallet and he takes any shape: he agrees with whoever spoke last.',
  },
  mendacious: {
    soundsLike: 'mend a shoe',
    image:
      "A cobbler promises he'll mend a shoe by tomorrow. He has said it every day for a year: he lies.",
  },
  meticulous: {
    soundsLike: 'metric tick',
    image:
      'A watchmaker ticks off every metric measurement with tweezers, checking each one ten times.',
  },
  misanthrope: {
    soundsLike: 'mis (hate) + anthro (people)',
    image:
      'A grumpy man lassoes anyone who comes near with a rope and drags them away: he hates people.',
  },
  mitigate: {
    soundsLike: 'mitt + gate',
    image: 'A giant oven mitt on the gate softens the blow when it slams into you.',
  },
  mollify: {
    soundsLike: 'Molly',
    image:
      'Molly drapes a soft pillow over a shouting boss, and his anger melts into a happy sigh.',
  },
  morose: {
    soundsLike: 'no more rose',
    image: 'No more roses: a gloomy man sits in the rain, sulking over a dead bouquet.',
  },
  nefarious: {
    soundsLike: 'nephew + various',
    image: 'Your nephew plots various wicked schemes, cackling over a map.',
  },
  obdurate: {
    soundsLike: 'ob + durable',
    image:
      'A durable steel-headed troll keeps kicking things. Everyone begs him to stop; he keeps doing wrong, unmoved.',
  },
  obsequious: {
    soundsLike: 'obey quickly',
    image: 'A servant who obeys so quickly and fawningly that he bows before you finish speaking.',
  },
  obstinate: {
    soundsLike: 'obstacle Nate',
    image:
      'Nate plants himself in the road like an obstacle and refuses to budge, whatever you say.',
  },
  obviate: {
    soundsLike: 'obvious + ate',
    image:
      'An obvious hole in the road; a goat ate the map that led there, so nobody ever falls in.',
  },
  officious: {
    soundsLike: 'office + vicious',
    image: 'A viciously nosy office worker leans over every desk, bossing everyone around.',
  },
  onerous: {
    soundsLike: 'one + rust',
    image: 'A one-ton rusty anchor chained to your ankle that you have to drag everywhere.',
  },
  opaque: {
    soundsLike: 'oh, pack',
    image: "\"Oh, a pack!\" But it's wrapped so thickly you can't see or work out what's inside.",
  },
  ostentatious: {
    soundsLike: 'ostrich + tent',
    image: 'An ostrich in a gold-plated tent covered in flashing lights, begging everyone to look.',
  },
  paucity: {
    soundsLike: 'paw city',
    image: 'A city of cats, all paws reaching for one tiny fish: nowhere near enough.',
  },
  pedantic: {
    soundsLike: 'pedal + antic',
    image:
      'A cyclist stops you to lecture on the correct number of pedal screws, fussing over trivia.',
  },
  perfidious: {
    soundsLike: 'purr + fiddle + us',
    image: 'A cat purrs sweetly, then fiddles your wallet and betrays us to the dog.',
  },
  perfunctory: {
    soundsLike: 'per function',
    image: 'A robot does each function per the checklist, eyes blank, not caring at all.',
  },
  placate: {
    soundsLike: 'plate of cake',
    image: 'An angry giant stomps in; you hand him a plate of cake and he calms right down.',
  },
  plethora: {
    soundsLike: 'plate horror',
    image: 'A horror of plates: thousands piled to the ceiling, far more than anyone needs.',
  },
  pragmatic: {
    soundsLike: 'practical attic',
    image: 'You clear the attic the practical way: keep what works, toss the rest.',
  },
  prevaricate: {
    soundsLike: 'pre-vary',
    image:
      'Asked a simple question, a politician varies his answer every second so nobody can pin him down.',
  },
  prodigal: {
    soundsLike: 'prodigy gal',
    image: 'A prodigy gal tosses her gold coins into the river, wasting her whole fortune.',
  },
  profligate: {
    soundsLike: 'profit + gate',
    image: 'Someone shovels all their profit out of the gate into the street, wasting everything.',
  },
  propensity: {
    soundsLike: 'prop + pen',
    image: "A pen propped on the desk always leans toward drawing cats: it's in its nature.",
  },
  prosaic: {
    soundsLike: 'prose ache',
    image: 'Reading the plainest prose ever gives you a dull ache: no colour, no imagination.',
  },
  pungent: {
    soundsLike: 'pun + gent',
    image: 'A gent in a top hat tells a pun, and his garlic breath is so sharp your eyes water.',
  },
  quiescent: {
    soundsLike: 'quiet scent',
    image: 'A sleeping cat in a quiet room with a soft scent of lavender: nothing moves.',
  },
  recalcitrant: {
    soundsLike: 're-calcium + rant',
    image:
      'A child shoves back his calcium milk, ranting at every adult who tells him to drink it.',
  },
  reticent: {
    soundsLike: 'rest + silent',
    image: "A man rests silently in the corner and won't say a word about himself.",
  },
  sanguine: {
    soundsLike: 'sun + win',
    image: "The sun beams on a cheerful fan who's sure they'll win, even ten points behind.",
  },
  soporific: {
    soundsLike: 'soap + horrific',
    image:
      'A soap opera so horrifically dull that everyone is snoring before the first scene ends.',
  },
  sporadic: {
    soundsLike: 'spore attic',
    image: 'Spores pop up in the attic at random: one here, nothing, then three over there.',
  },
  stoic: {
    soundsLike: 'stove',
    image: "A man leans on a hot stove and doesn't even flinch, his face completely blank.",
  },
  superfluous: {
    soundsLike: 'super flu',
    image: 'A superhero catches the flu and sneezes out twelve extra capes nobody needs.',
  },
  taciturn: {
    soundsLike: 'tack it + turn',
    image: "A man's lips are tacked shut; whenever you speak to him, he just turns away.",
  },
  tenacious: {
    soundsLike: 'ten nails',
    image: 'A cat digs ten nails into the curtain and will not let go, no matter what.',
  },
  torpor: {
    soundsLike: 'tar pour',
    image: 'Someone pours tar over a runner; they slow, slow, and freeze, too heavy to move.',
  },
  tractable: {
    soundsLike: 'tractor + able',
    image: 'A tractor so easy to steer that a toddler drives it with one finger.',
  },
  truculent: {
    soundsLike: 'truck you lent',
    image: 'The truck you lent comes back roaring at you, honking and ready for a fight.',
  },
  ubiquitous: {
    soundsLike: 'you + Bic + it is',
    image:
      "Bic pens everywhere: under the mat, in your pockets, in your hair. You can't escape them.",
  },
  vacillate: {
    soundsLike: 'vaccinate late',
    image: 'You hold a vaccine and swing back and forth: take it? not? take it? Now you are late.',
  },
  venerate: {
    soundsLike: 'Venus + rate',
    image: 'Crowds kneel before the goddess Venus, rating her above all, in deep reverence.',
  },
  verbose: {
    soundsLike: 'verb + bows',
    image:
      "A speaker piles verb after verb, bowing after each, and still isn't done an hour later.",
  },
  vex: {
    soundsLike: 'wrecks',
    image: 'A buzzing fly wrecks your nap again and again: so annoying.',
  },
  vociferous: {
    soundsLike: 'vocal + ferocious',
    image: 'A ferociously vocal crowd screams so loudly the windows rattle.',
  },
  voracious: {
    soundsLike: 'ferocious eater',
    image: 'A ferocious bear devours a mountain of food and is still starving.',
  },
  wary: {
    soundsLike: 'worry',
    image: 'A deer worries at every snapping twig, ears up, ready to bolt.',
  },
  zealot: {
    soundsLike: 'seal + a lot',
    image:
      'A seal waves a flag and barks a lot about its cause, ready to fight anyone who disagrees.',
  },
};
