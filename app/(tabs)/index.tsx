import { router } from 'expo-router';
import { useEffect, useState } from 'react';
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
import { getSetting } from '@/lib/localDb';
import { colors, type } from '@/theme';

export default function HomeScreen() {
  const [palaceName, setPalaceName] = useState('My Palace');
  const [lessonDone, setLessonDone] = useState(true);

  useEffect(() => {
    getSetting('palaceName').then((v) => v && setPalaceName(v));
  }, []);

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
            <Tally count={12} />
            <Text style={type.h3}>12</Text>
          </View>
          <Text style={[type.note, styles.small]}>day streak · 2,340 XP</Text>
        </View>
      </View>

      <IndexCard tilt={1} style={styles.palaceCard}>
        <PalaceSketch litRooms={5} />
        <View style={styles.rowBetween}>
          <View>
            <Text style={type.h3}>{palaceName}</Text>
            <Text style={type.bodyMuted}>Level 3 · The Keep · 5 rooms</Text>
          </View>
          <SketchButton
            label="Enter"
            variant="secondary"
            style={styles.enter}
            onPress={() => router.push('/(tabs)/palace')}
          />
        </View>
        <SketchProgress value={340 / 500} />
        <Text style={[type.note, styles.small]}>340 / 500 XP · 160 more to open the Library!</Text>
      </IndexCard>

      <View>
        <Text style={type.h3}>Today's to-do</Text>
        <HandCheckbox
          label="Daily Challenge"
          description="20 words · 2 min · same for everyone · tap to play"
          checked={false}
          onToggle={() => {
            drill.reset();
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
