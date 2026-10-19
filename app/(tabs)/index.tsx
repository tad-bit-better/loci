import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  HandCheckbox,
  IndexCard,
  Paper,
  SketchButton,
  SketchProgress,
  Tally,
} from '@/components';
import { PalaceSketch } from '@/components/PalaceSketch';
import { drill } from '@/lib/drillStore';
import { dayKey, getProgress, levelFor, type Progress } from '@/lib/progress';
import { colors, type } from '@/theme';

/** Windows in the palace sketch. */
const MAX_LIT = 7;

export default function HomeScreen() {
  const [p, setP] = useState<Progress>({ palaceName: 'My Palace', xp: 0, streak: 0, ...levelFor(0) });
  const [lessonDone, setLessonDone] = useState(true);

  // Tabs stay mounted, so refresh whenever Home comes back into view (e.g. after a drill).
  useFocusEffect(
    useCallback(() => {
      getProgress().then(setP).catch((e) => console.warn('Loading progress failed', e));
    }, []),
  );

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <Paper scroll>
      <View style={styles.header}>
        <View>
          <Text style={type.note}>{today}</Text>
          <Text style={type.h2}>Good morning!</Text>
        </View>
        <View style={styles.streak}>
          <View style={styles.row}>
            <Tally count={p.streak} />
            <Text style={type.h3}>{p.streak}</Text>
          </View>
          <Text style={[type.note, styles.small]}>
            day streak · {p.xp.toLocaleString()} XP
          </Text>
        </View>
      </View>

      <IndexCard tilt={1} style={styles.palaceCard}>
        <PalaceSketch litRooms={Math.min(p.level, MAX_LIT)} />
        <View style={styles.rowBetween}>
          <View>
            <Text style={type.h3}>{p.palaceName}</Text>
            <Text style={type.bodyMuted}>Level {p.level}</Text>
          </View>
          <SketchButton
            label="Enter"
            variant="secondary"
            style={styles.enter}
            onPress={() => router.push('/(tabs)/palace')}
          />
        </View>
        <SketchProgress value={p.into / p.goal} />
        <Text style={[type.note, styles.small]}>
          {p.into} / {p.goal} XP · {p.goal - p.into} more to reach level {p.level + 1}
        </Text>
      </IndexCard>

      <View>
        <Text style={type.h3}>Today's to-do</Text>
        <HandCheckbox
          label="Daily Challenge"
          description="10 GRE words · same for everyone today · tap to play"
          checked={false}
          onToggle={() => {
            drill.reset(dayKey(new Date())); // same words for everyone today
            router.push('/drill/memorize');
          }}
        />
        <HandCheckbox
          label="Review 14 items"
          description="about 4 min · keeps your streak"
          checked={false}
        />
        <HandCheckbox
          label="Lesson 2 · Memory palace"
          description={lessonDone ? 'done · +40 XP' : '5 min'}
          checked={lessonDone}
          strike={lessonDone}
          onToggle={() => setLessonDone((d) => !d)}
        />
      </View>
    </Paper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  streak: { alignItems: 'flex-end' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  small: { fontSize: 18, color: colors.pencil },
  palaceCard: { padding: 12, paddingTop: 16 },
  enter: { minHeight: 44, paddingHorizontal: 16 },
});
