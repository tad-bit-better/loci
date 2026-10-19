import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Highlight, IndexCard, Paper, SketchButton, StickyNote } from '@/components';
import { storyScenes } from '@/data/sample';
import { getSetting } from '@/lib/localDb';
import { colors, type } from '@/theme';

/** Step 3: a one-minute story-method lesson, walked scene by scene. The retest follows. */
export default function LessonScreen() {
  const [baseline, setBaseline] = useState<number | null>(null);
  // -1 is the intro card; 0..9 are the scenes.
  const [scene, setScene] = useState(-1);

  useEffect(() => {
    getSetting('baselineScore').then((v) => v !== null && setBaseline(Number(v)));
  }, []);

  if (scene < 0) {
    return (
      <Paper footer={<SketchButton label="Show me →" onPress={() => setScene(0)} />}>
        <Text style={[type.note, styles.step]}>step 3 of 4</Text>
        <View style={styles.title}>
          <Text style={type.h1}>The</Text>
          <Highlight style={type.h1}>story method.</Highlight>
        </View>
        {baseline !== null && (
          <Text style={type.body}>
            You remembered <Text style={type.bodyBold}>{baseline} of 10</Text>. Now try a new list
            with one trick.
          </Text>
        )}
        <StickyNote>
          <Text style={type.body}>
            Link each word to the next in one silly story. Picture every scene for a moment: the
            weirder, the better it sticks.
          </Text>
        </StickyNote>
      </Paper>
    );
  }

  const { word, text } = storyScenes[scene];
  const last = scene === storyScenes.length - 1;
  const at = text.toLowerCase().indexOf(word);

  return (
    <Paper
      footer={
        <View style={styles.actions}>
          <SketchButton
            label="← Back"
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => setScene(scene - 1)}
          />
          <SketchButton
            label={last ? 'Test me →' : 'Next scene →'}
            style={{ flex: 2 }}
            onPress={() => (last ? router.replace('/onboarding/retest') : setScene(scene + 1))}
          />
        </View>
      }
    >
      <Text style={[type.note, styles.step]}>step 3 of 4</Text>
      <View>
        <Text style={type.h2}>Picture it.</Text>
        <Text style={type.note}>see it, hear it, smell it</Text>
      </View>

      <IndexCard tilt={-1}>
        <Text style={type.note}>
          scene {scene + 1} of {storyScenes.length}
        </Text>
        <Text style={[type.body, styles.scene]}>
          {text.slice(0, at)}
          <Text style={[type.bodyBold, styles.scene, { backgroundColor: colors.hlYellow }]}>
            {text.slice(at, at + word.length)}
          </Text>
          {text.slice(at + word.length)}
        </Text>
      </IndexCard>

      <Text style={type.note} accessibilityLabel={`Story so far: ${storyScenes.slice(0, scene + 1).map((s) => s.word).join(', ')}`}>
        {storyScenes
          .slice(0, scene + 1)
          .map((s) => s.word)
          .join(' → ')}
      </Text>
    </Paper>
  );
}

const styles = StyleSheet.create({
  step: { alignSelf: 'flex-end' },
  title: { gap: 2 },
  scene: { fontSize: 20, lineHeight: 30 },
  actions: { flexDirection: 'row', gap: 10 },
});
