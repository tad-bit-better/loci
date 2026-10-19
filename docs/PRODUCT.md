# Loci — product spec

## One line
Learn real memory techniques, use them on what you actually need to remember, and have fun doing it.

## The gap
- Flashcard apps (Anki, Brainscape) schedule reviews but teach no technique.
- Brain-training apps (Elevate, Peak) are fun but have no real-world payoff.
- Loci = technique + your own content + a game loop, in a hand-made notebook look.

## Audience
Broad at launch. Onboarding asks the goal (multi-select); country comes from device/store locale.

| Goal | Home screen leads with | Premium pitch |
| --- | --- | --- |
| Exams and studies (UPSC, NEET, JEE, SAT, MCAT, med school) | My Stuff + exam packs | Unlimited AI + packs |
| Work (names, numbers, presentations) | Names & faces, speech-in-palace | Unlimited palaces |
| Learning a language | Vocab packs, keyword method | Language packs |
| Just for fun | Daily Challenge, drills, leagues | Themes, stats, extra palaces |

## Onboarding (~60 s, ends with a felt result)
1. Goal picker (multi-select; exams → which exam)
2. Baseline test: memorize 10 words in 30 s, recall → score
3. One-minute story-method lesson
4. Retest → "you more than doubled your recall"; name your palace
5. Optional sign-in; soft paywall with "Continue free"

## Core loop
Learn (2-min lesson) → Encode (place an item at a stop, AI helps) → Recall (timed) → Review (FSRS)
→ Earn (XP, ranks, palace grows).

## Techniques (skill tree)
| Technique | Best for | Release |
| --- | --- | --- |
| Acronyms / acrostics | Short ordered lists | MVP |
| Link / story | Lists | MVP |
| Memory palace | Ordered facts, speeches | MVP |
| Peg system | Numbered lists | v1.1 |
| Major System | Numbers, dates | v1.1 |
| Names and faces | People | v1.1 |
| Keyword method | Foreign and exam vocab (GRE drill uses it) | MVP |

## Game systems
- **Palace** = progress bar. Cottage → castle; mastered technique unlocks a room; each item sits at a
  numbered **stop** along a walking path. Stops are coloured by memory strength (green solid, yellow due,
  pink fading).
- **Word drill**: step 1 Memorize (word → place at stop, AI idea on a sticky note), step 2 Recall (walk
  the palace, type what's at each stop, red-pen grading).
- **Daily Challenge**: same puzzle for everyone, shareable result card.
- **Boss fights** to graduate a technique; ranks Novice → Grandmaster.
- **Leagues** weekly by goal; **friend duels**; **streaks** shown as tally marks.

## Monetization (freemium)
Learning is always free; premium sells scale and convenience.

| Free | Premium |
| --- | --- |
| All techniques and lessons | Unlimited palaces and rooms |
| 1 palace | Unlimited AI mnemonics |
| ~5 AI mnemonics/day | Exam, language and topic packs |
| Daily challenge, leagues, streaks | Retention stats, weak spots |
| Basic spaced repetition | Streak freezes, palace themes |

| Region | Monthly | Yearly | Yearly saving |
| --- | --- | --- | --- |
| India | ₹99 | ₹499 | ~58% |
| US / EU / UK | $7.99 | $39.99 | ~58% |
| Others | store price-parity tiers | | |

Yearly is the highlighted default with a 7-day free trial. Rewarded ads only (no banners). Optional
one-time purchases: palace themes, lifetime "Supporter".

## Success metrics
Onboarding completion, retest lift, D1/D7/D30 retention by goal, Daily Challenge share rate,
trial→paid by region, AI cost per active user.

## Risks
| Risk | Mitigation |
| --- | --- |
| Novelty fades after week 2 | Leagues, Daily Challenge, real usefulness via My Stuff |
| AI cost on free users | Daily limit, cache reuse, rewarded ads |
| Weak mnemonics | Edit/rate; community-voted mnemonics |
| Too broad | Goal-based home; store listings per goal and region |
