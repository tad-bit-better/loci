import { StyleSheet, View } from 'react-native';
import { colors, Highlighter, highlighter } from '@/theme';

/** Pencil-outlined bar filled with highlighter. `value` is 0–1. */
export function SketchProgress({ value, color = 'yellow' }: { value: number; color?: Highlighter }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
    >
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: highlighter[color] }} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 14,
    borderWidth: 2,
    borderColor: colors.ink,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 4,
    overflow: 'hidden',
  },
});
