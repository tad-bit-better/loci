import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { matchWord } from '@/lib/recall';
import { useCountdown } from '@/lib/useCountdown';
import { colors, fonts, type } from '@/theme';
import { IndexCard } from './IndexCard';
import { Paper } from './Paper';
import { SketchButton } from './SketchButton';
import { StickyNote } from './StickyNote';

type Entry = { given: string; match: string | null };

type Props = {
  words: string[];
  /** e.g. "step 2 of 4" */
  step: string;
  title: string;
  hint: string;
  seconds?: number;
  /** Called once, with the number of distinct words recalled. */
  onDone: (score: number) => void;
};

/** Full-screen free recall: type every word you remember, in any order, before time runs out. */
export function FreeRecall({ words, step, title, hint, seconds = 60, onDone }: Props) {
  const { left, label, done } = useCountdown(seconds);
  const [value, setValue] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const finished = useRef(false);

  const found = new Set(entries.map((e) => e.match).filter(Boolean));
  const score = found.size;

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onDone(score);
  };

  useEffect(() => {
    if (done) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const add = () => {
    const given = value.trim();
    if (!given) return;
    setValue('');
    const match = matchWord(given, words);
    if (match && found.has(match)) return; // already counted; don't list it twice
    Haptics.selectionAsync().catch(() => {});
    setEntries((prev) => [...prev, { given, match }]);
  };

  return (
    <Paper scroll>
      <View style={styles.header}>
        <Text style={type.note}>{step}</Text>
        <Text
          style={[styles.timer, left <= 10 && { color: colors.redPen }]}
          accessibilityLabel={`${label} left`}
        >
          {label}
        </Text>
      </View>

      <View>
        <Text style={type.h2}>{title}</Text>
        <Text style={type.note}>any order · press enter after each one</Text>
      </View>

      <IndexCard tilt={0.8}>
        <View style={styles.rowBetween}>
          <Text style={type.bodyMuted} nativeID="freeRecallLabel">
            Your words
          </Text>
          <Text style={type.noteRed}>
            {score}/{words.length}
          </Text>
        </View>
        <TextInput
          value={value}
          onChangeText={setValue}
          onSubmitEditing={add}
          submitBehavior="submit"
          autoFocus
          placeholder="type a word"
          placeholderTextColor={colors.pencilFaint}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          accessibilityLabelledBy="freeRecallLabel"
          style={styles.input}
        />
        <View style={styles.actions}>
          <SketchButton label="I'm done" variant="secondary" style={{ flex: 1 }} onPress={finish} />
          <SketchButton label="Add" style={{ flex: 2 }} onPress={add} />
        </View>
      </IndexCard>

      {entries.length > 0 && (
        <View style={styles.grid}>
          {entries.map((e, k) => (
            <Text key={k} style={[styles.entry, !e.match && styles.miss]}>
              {e.given}
              {e.match ? ' ✓' : ''}
            </Text>
          ))}
        </View>
      )}

      <StickyNote tilt={-1.2}>
        <Text style={type.bodyMuted}>{hint}</Text>
      </StickyNote>
    </Paper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timer: { fontFamily: fonts.hand, fontSize: 20, color: colors.ink, fontVariant: ['tabular-nums'] },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  input: {
    height: 48,
    borderBottomWidth: 2,
    borderColor: colors.ink,
    fontFamily: fonts.script,
    fontSize: 28,
    color: colors.ink,
  },
  actions: { flexDirection: 'row', gap: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  entry: { width: '50%', height: 32, fontFamily: fonts.script, fontSize: 22, color: colors.ink },
  miss: {
    color: colors.pencil,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.redPen,
  },
});
