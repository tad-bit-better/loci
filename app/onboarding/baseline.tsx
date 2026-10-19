import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Highlight, IndexCard, Paper, SketchButton } from '@/components';
import { FreeRecall } from '@/components/FreeRecall';
import { baselineWords } from '@/data/sample';
import { setSetting } from '@/lib/localDb';
import { useCountdown } from '@/lib/useCountdown';
import { colors, fonts, type } from '@/theme';

/** Step 2: memorize 10 words in 30 s with no technique, then recall them. The score is the "before". */
export default function BaselineScreen() {
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');

  if (phase === 'memorize') return <Memorize onReady={() => setPhase('recall')} />;

  return (
    <FreeRecall
      words={baselineWords}
      step="step 2 of 4"
      title="Write down every word you remember."
      hint="No tricks yet. Whatever you remember is your starting score."
      onDone={async (score) => {
        await setSetting('baselineScore', String(score));
        router.replace('/onboarding/lesson');
      }}
    />
  );
}

function Memorize({ onReady }: { onReady: () => void }) {
  const { left, label, done } = useCountdown(30);

  useEffect(() => {
    if (done) onReady();
  }, [done, onReady]);

  return (
    <Paper footer={<SketchButton label="I've got them" onPress={onReady} />}>
      <View style={styles.header}>
        <Text style={type.note}>step 2 of 4</Text>
        <Text
          style={[styles.timer, left <= 10 && { color: colors.redPen }]}
          accessibilityLabel={`${label} left`}
        >
          {label}
        </Text>
      </View>

      <View style={styles.title}>
        <Text style={type.h1}>Memorize these</Text>
        <Highlight style={type.h1}>10 words.</Highlight>
        <Text style={[type.body, styles.muted]}>You have 30 seconds. No tricks yet, just try.</Text>
      </View>

      <IndexCard tilt={-1}>
        <View style={styles.grid}>
          {baselineWords.map((w, k) => (
            <View key={w} style={styles.word}>
              <Text style={styles.num}>{k + 1}</Text>
              <Text style={type.h2}>{w}</Text>
            </View>
          ))}
        </View>
      </IndexCard>
    </Paper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timer: { fontFamily: fonts.hand, fontSize: 20, color: colors.ink, fontVariant: ['tabular-nums'] },
  title: { gap: 2 },
  muted: { color: colors.pencil, marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 6 },
  word: { width: '50%', flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  num: { width: 18, fontFamily: fonts.body, fontSize: 14, color: colors.pencil },
});
