import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, sketchRadius } from '@/theme';
import { HandIcon } from './HandIcon';

/** Close button · "1 Memorize → 2 Recall" steps · timer. */
export function DrillHeader({ step, timer }: { step: 1 | 2; timer: string }) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Quit drill"
        onPress={() => router.back()}
        style={styles.close}
      >
        <HandIcon name="close" strokeWidth={2.6} />
      </Pressable>
      <View style={styles.steps}>
        <Text
          style={[
            styles.step,
            step === 1 ? [styles.active, { backgroundColor: colors.hlYellow }] : styles.done,
          ]}
        >
          1 Memorize
        </Text>
        <Text style={styles.arrow}>→</Text>
        <Text
          style={[
            styles.step,
            step === 2 ? [styles.active, { backgroundColor: colors.hlGreen }] : styles.todo,
          ]}
        >
          2 Recall
        </Text>
      </View>
      <Text
        style={[styles.timer, step === 2 && { color: colors.redPen }]}
        accessibilityLabel={`${timer} left`}
      >
        {timer}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  close: { width: 44, height: 44, marginLeft: -8, alignItems: 'center', justifyContent: 'center' },
  steps: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  step: { fontFamily: fonts.hand, fontSize: 16, paddingHorizontal: 8, paddingVertical: 2, color: colors.ink },
  active: { borderWidth: 2, borderColor: colors.ink, ...sketchRadius, overflow: 'hidden' },
  done: { color: colors.pencil, textDecorationLine: 'line-through' },
  todo: { color: colors.pencil },
  arrow: { color: colors.pencil, fontSize: 16 },
  timer: { fontFamily: fonts.hand, fontSize: 20, color: colors.ink, fontVariant: ['tabular-nums'] },
});
