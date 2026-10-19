import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Highlight, IndexCard, Paper, PencilUnderline, SketchButton, StickyNote } from '@/components';
import { DrillHeader } from '@/components/DrillHeader';
import { drill, useDrill } from '@/lib/drillStore';
import { useCountdown } from '@/lib/useCountdown';
import { colors, fonts, type } from '@/theme';

/**
 * Keyword method: the word's sound → a concrete sound-alike → an image that joins it to the meaning →
 * the image happens at a stop. Recall then walks the stops and asks for the word from its meaning.
 */
export default function MemorizeScreen() {
  const s = useDrill();
  const { label, done } = useCountdown(5 * 60);

  const i = s.memorizeIndex;
  const v = s.vocab[i];
  const stop = s.stops[i];
  const own = s.ownImages[i] ?? '';
  const last = i >= s.words.length - 1;

  useEffect(() => {
    if (done) router.replace('/drill/recall');
  }, [done]);

  if (!v) return null;

  return (
    <Paper
      scroll
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
        <Text style={type.h2}>Hear it, see it, place it.</Text>
        <Text style={type.note}>say the sound-alike out loud, then picture the scene</Text>
      </View>

      <IndexCard tilt={-1}>
        <Text style={type.note}>
          word {i + 1} of {s.words.length}
        </Text>
        <PencilUnderline style={styles.word}>{v.word}</PencilUnderline>
        <Text style={type.body}>{v.meaning}</Text>

        <View style={styles.divider} />

        <View style={styles.step}>
          <Text style={[type.note, styles.stepLabel]}>sounds like</Text>
          <Highlight style={type.h3}>{v.soundsLike}</Highlight>
        </View>
        <View style={styles.step}>
          <Text style={[type.note, styles.stepLabel]}>picture it at</Text>
          <Highlight color="green" style={type.h3}>
            stop {i + 1} · {stop}
          </Highlight>
        </View>
        <Text style={type.body}>{own.trim() || v.image}</Text>
      </IndexCard>

      <StickyNote>
        <Text style={[type.note, { fontSize: 19, color: colors.ink }]} nativeID="ownImageLabel">
          make it yours (optional)
        </Text>
        <TextInput
          value={own}
          onChangeText={(t) => drill.setOwnImage(i, t)}
          placeholder="rewrite the picture your way: your own scenes stick best"
          placeholderTextColor={colors.pencil}
          multiline
          accessibilityLabelledBy="ownImageLabel"
          style={styles.ownInput}
        />
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
  // GRE words run to 12+ letters ("ostentatious"), so smaller than a concrete-noun drill needs.
  word: { fontSize: 36, lineHeight: 44 },
  divider: { height: 1, backgroundColor: colors.ruled },
  step: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  stepLabel: { fontSize: 19, width: 104 },
  ownInput: {
    minHeight: 44,
    fontFamily: fonts.scriptMedium,
    fontSize: 21,
    lineHeight: 24,
    color: colors.ink,
    textAlignVertical: 'top',
  },
  actions: { flexDirection: 'row', gap: 10 },
});
