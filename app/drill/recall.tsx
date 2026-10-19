import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Highlight, IndexCard, Paper, SketchButton, StickyNote } from '@/components';
import { DrillHeader } from '@/components/DrillHeader';
import { drill, useDrill } from '@/lib/drillStore';
import { useCountdown } from '@/lib/useCountdown';
import { colors, fonts, type } from '@/theme';

export default function RecallScreen() {
  const s = useDrill();
  const { label, done } = useCountdown(2 * 60);
  const [value, setValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const input = useRef<TextInput>(null);

  const i = s.recallIndex;
  const finished = i >= s.stops.length || done;
  const correct = s.answers.filter((a) => a.correct).length;

  useEffect(() => {
    if (finished) {
      // TODO: save a `sessions` row, award XP, update FSRS cards for each word.
    }
  }, [finished]);

  const submit = () => {
    if (!value.trim()) return;
    const ok = drill.answer(value);
    Haptics.notificationAsync(
      ok ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    ).catch(() => {});
    setValue('');
    setShowHint(false);
    input.current?.focus();
  };

  if (finished) {
    return (
      <Paper footer={<SketchButton label="Back home" onPress={() => router.replace('/(tabs)')} />}>
        <Text style={type.h1}>Drill done!</Text>
        <Text style={[type.noteRed, styles.big]}>
          {correct}/{s.stops.length}
        </Text>
        <Text style={type.body}>+{correct * 10} XP for your palace.</Text>
      </Paper>
    );
  }

  const [roomName, spot] = s.stops[i].split(' · ');

  return (
    <Paper
      scroll
      footer={
        <StickyNote tilt={-1.2}>
          <Text style={type.bodyMuted}>
            Stuck? Picture the spot first, then let the object appear on it. A guess still trains the
            path.
          </Text>
        </StickyNote>
      }
    >
      <DrillHeader step={2} timer={label} />

      <View>
        <Text style={type.h2}>Now walk the palace again.</Text>
        <Text style={type.note}>stop by stop, what did you leave there?</Text>
      </View>

      <IndexCard tilt={0.8}>
        <Text style={type.note}>
          stop {i + 1} of {s.stops.length} · {roomName}
        </Text>
        <Highlight color="green" style={type.h2}>
          {spot}…
        </Highlight>
        {showHint && (
          <Text style={type.bodyMuted}>Starts with “{s.words[i].slice(0, 1).toUpperCase()}”</Text>
        )}
        <View style={{ gap: 2 }}>
          <Text style={type.bodyMuted} nativeID="answerLabel">
            Your answer
          </Text>
          <TextInput
            ref={input}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={submit}
            placeholder="type the word"
            placeholderTextColor={colors.pencilFaint}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            accessibilityLabelledBy="answerLabel"
            style={styles.input}
          />
        </View>
        <View style={styles.actions}>
          <SketchButton label="Hint" variant="secondary" style={{ flex: 1 }} onPress={() => setShowHint(true)} />
          <SketchButton label="Check" style={{ flex: 2 }} onPress={submit} />
        </View>
      </IndexCard>

      {s.answers.length > 0 && (
        <View style={{ gap: 6 }}>
          <View style={styles.rowBetween}>
            <Text style={type.h3}>Stops 1–{s.answers.length}</Text>
            <Text style={[type.noteRed, { transform: [{ rotate: '-3deg' }] }]}>
              {correct}/{s.answers.length} · +{correct * 10} XP
            </Text>
          </View>
          <View style={styles.grid}>
            {s.answers.map((a, k) => (
              <View key={k} style={styles.answer}>
                <Text style={styles.answerNum}>{k + 1}</Text>
                {a.correct ? (
                  <Text style={styles.answerText}>{a.given} ✓</Text>
                ) : (
                  <>
                    <Text style={[styles.answerText, styles.wrong]}>{a.given}</Text>
                    <Text style={[styles.answerText, { color: colors.redPen }]}>{s.words[k]}</Text>
                  </>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </Paper>
  );
}

const styles = StyleSheet.create({
  big: { fontSize: 64, lineHeight: 70 },
  input: {
    height: 48,
    borderBottomWidth: 2,
    borderColor: colors.ink,
    fontFamily: fonts.script,
    fontSize: 28,
    color: colors.ink,
  },
  actions: { flexDirection: 'row', gap: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  answer: { width: '50%', height: 32, flexDirection: 'row', alignItems: 'center', gap: 6 },
  answerNum: { width: 16, fontFamily: fonts.body, fontSize: 12, color: colors.pencil },
  answerText: { fontFamily: fonts.script, fontSize: 22, color: colors.ink },
  wrong: {
    color: colors.pencil,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.redPen,
  },
});
