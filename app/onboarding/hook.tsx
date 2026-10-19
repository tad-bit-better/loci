import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Highlight, IndexCard, Paper, PencilUnderline, SketchButton } from '@/components';
import { getSetting, setSetting } from '@/lib/localDb';
import { ensurePalace } from '@/lib/progress';
import { colors, fonts, type } from '@/theme';

/** Step 4: show the before/after jump from steps 2–3, then name the palace. */
export default function HookScreen() {
  const [scores, setScores] = useState<{ before: number; after: number } | null>(null);
  const [name, setName] = useState('The Night Palace');

  useEffect(() => {
    Promise.all([getSetting('baselineScore'), getSetting('retestScore')]).then(([b, a]) =>
      setScores({ before: Number(b ?? 0), after: Number(a ?? 0) }),
    );
  }, []);

  if (!scores) return null;
  const { before, after } = scores;

  const onBuild = async () => {
    const palaceName = name.trim() || 'My Palace';
    await setSetting('palaceName', palaceName);
    await ensurePalace(palaceName);
    await setSetting('onboarded', 'true');
    router.replace('/(tabs)');
  };

  return (
    <Paper
      scroll
      footer={
        <>
          <SketchButton label="Build my palace" onPress={onBuild} />
          <Text style={[type.bodyMuted, styles.center]}>Free forever. No card needed.</Text>
        </>
      }
    >
      <Text style={[type.note, styles.step]}>step 4 of 4</Text>
      <View style={styles.title}>
        <Text style={type.h1}>Look what you</Text>
        <PencilUnderline>just did.</PencilUnderline>
      </View>

      <IndexCard tilt={-1}>
        <View style={styles.row}>
          <View>
            <Text style={type.h3}>Test 1</Text>
            <Text style={type.bodyMuted}>no technique</Text>
          </View>
          <Text style={[styles.score, { color: colors.pencil }]}>{before}/10</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <View>
            <Highlight color="green">Test 2</Highlight>
            <Text style={type.bodyMuted}>with the story method</Text>
          </View>
          <View>
            <Svg width={104} height={58} viewBox="0 0 104 58" style={styles.circle}>
              <Path
                d="M60 6 C 92 4, 102 22, 96 36 C 88 54, 30 56, 12 44 C -4 32, 8 10, 36 6 C 48 4, 62 5, 74 9"
                fill="none"
                stroke={colors.redPen}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.score}>{after}/10</Text>
          </View>
        </View>
        {after > before ? (
          <Text style={[type.noteRed, styles.scribble]}>
            {before > 0 && after >= before * 2
              ? 'doubled in one minute!'
              : `+${after - before} words with one trick`}
          </Text>
        ) : (
          <Text style={[type.note, styles.scribble]}>it gets easier every time you practise</Text>
        )}
      </IndexCard>

      <Text style={type.body}>
        That was the <Text style={{ backgroundColor: colors.hlYellow }}>story method</Text>,
        technique 1 of 7. Your memory palace is ready for its first room.
      </Text>

      <View style={{ gap: 4 }}>
        <Text style={type.h3} nativeID="palaceNameLabel">
          Name your palace
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          accessibilityLabelledBy="palaceNameLabel"
          style={styles.input}
          returnKeyType="done"
        />
      </View>
    </Paper>
  );
}

const styles = StyleSheet.create({
  step: { alignSelf: 'flex-end' },
  title: { gap: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: 1, backgroundColor: colors.ruled },
  score: { fontFamily: fonts.hand, fontSize: 32, color: colors.ink, paddingHorizontal: 12 },
  circle: { position: 'absolute', left: -10, top: -8 },
  scribble: { alignSelf: 'flex-end', transform: [{ rotate: '-2deg' }] },
  input: {
    height: 48,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.ink,
    fontFamily: fonts.script,
    fontSize: 28,
    color: colors.ink,
  },
  center: { textAlign: 'center' },
});
