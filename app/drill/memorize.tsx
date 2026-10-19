import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import {
  HandIcon,
  Highlight,
  IndexCard,
  Paper,
  PencilUnderline,
  SketchButton,
  StickyNote,
} from '@/components';
import { DrillHeader } from '@/components/DrillHeader';
import { drill, useDrill } from '@/lib/drillStore';
import { suggestMnemonic } from '@/lib/mnemonics';
import { useCountdown } from '@/lib/useCountdown';
import { colors, type } from '@/theme';

export default function MemorizeScreen() {
  const s = useDrill();
  const { label, done } = useCountdown(5 * 60);
  const [idea, setIdea] = useState<string>('');

  const i = s.memorizeIndex;
  const word = s.words[i];
  const stop = s.stops[i];
  const last = i >= s.words.length - 1;

  useEffect(() => {
    if (done) router.replace('/drill/recall');
  }, [done]);

  useEffect(() => {
    setIdea('');
    if (!word) return;
    suggestMnemonic({ item: word, location: stop, technique: 'palace' })
      .then((r) => setIdea(r.mnemonic))
      .catch(() => setIdea(''));
  }, [word, stop]);

  if (!word) return null;

  return (
    <Paper
      footer={
        <View style={styles.actions}>
          <SketchButton
            label="← Back"
            variant="secondary"
            style={{ flex: 1 }}
            disabled={i === 0}
            onPress={drill.prevWord}
          />
          <SketchButton
            label={last ? 'Start recall →' : 'Placed it! Next →'}
            style={{ flex: 2 }}
            onPress={() => (last ? router.replace('/drill/recall') : drill.nextWord())}
          />
        </View>
      }
    >
      <DrillHeader step={1} timer={label} />

      <View>
        <Text style={type.h2}>Place each word in your palace.</Text>
        <Text style={type.note}>the weirder the picture, the better it sticks</Text>
      </View>

      <IndexCard tilt={-1} style={styles.center}>
        <Text style={type.note}>
          word {i + 1} of {s.words.length}
        </Text>
        <PencilUnderline style={styles.word}>{word}</PencilUnderline>
        <HandIcon name="arrowDown" size={30} strokeWidth={2.2} />
        <Text style={type.bodyMuted}>put it at</Text>
        <Highlight color="green" style={type.h3}>
          stop {i + 1} · {stop}
        </Highlight>
      </IndexCard>

      <StickyNote>
        <Text style={[type.note, { color: '#5B4A00', fontSize: 19 }]}>idea, if you're stuck:</Text>
        <Text style={type.body}>{idea || 'Thinking…'}</Text>
        <Text style={[type.note, { fontSize: 19, color: colors.ink }]}>✎ write my own instead</Text>
      </StickyNote>

      <View style={{ gap: 4 }}>
        <Text style={[type.note, { fontSize: 18 }]}>your walk so far</Text>
        <WalkTrail total={s.words.length} current={i} />
      </View>
    </Paper>
  );
}

function WalkTrail({ total, current }: { total: number; current: number }) {
  const w = 326;
  const step = (w - 16) / (total - 1);
  return (
    <Svg
      width="100%"
      height={26}
      viewBox={`0 0 ${w} 26`}
      preserveAspectRatio="none"
      accessibilityLabel={`Stop ${current + 1} of ${total}`}
    >
      <Path d={`M8 13 C 80 10, 240 16, ${w - 8} 13`} fill="none" stroke={colors.pencil} strokeWidth={1.6} strokeDasharray="4 5" />
      {Array.from({ length: total }, (_, k) => (
        <Circle
          key={k}
          cx={8 + k * step}
          cy={13}
          r={k === current ? 8 : k < current ? 5 : 4}
          fill={k === current ? colors.hlYellow : k < current ? colors.ink : colors.card}
          stroke={colors.ink}
          strokeWidth={k === current ? 2.4 : 1.6}
        />
      ))}
    </Svg>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  word: { fontSize: 46, lineHeight: 54 },
  actions: { flexDirection: 'row', gap: 10 },
});
