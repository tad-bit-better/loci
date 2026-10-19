import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts, Highlighter, highlighter, type } from '@/theme';

type Props = {
  label: string;
  description?: string;
  checked: boolean;
  onToggle?: () => void;
  /** Highlighter used on the label when checked. */
  color?: Highlighter;
  /** Strike the label through (for done to-dos). */
  strike?: boolean;
};

/** Notebook-style checkbox row: wobbly box, pencil tick, highlighted label. */
export function HandCheckbox({ label, description, checked, onToggle, color = 'yellow', strike }: Props) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={styles.row}
    >
      <View style={styles.box}>
        <Svg width={30} height={30} viewBox="0 0 30 30">
          <Path
            d="M4 5.5 L25.5 4 L26 25.8 L4.6 26.4 Z"
            fill={colors.card}
            stroke={colors.ink}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </Svg>
        {checked && (
          <Svg width={34} height={34} viewBox="0 0 34 34" style={styles.tick}>
            <Path
              d="M6 18 C 9 20, 11 24, 13 27 C 17 18, 23 10, 31 4"
              fill="none"
              stroke={colors.ink}
              strokeWidth={3.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
      <View style={styles.text}>
        <View style={styles.labelWrap}>
          {checked && !strike && (
            <View style={[styles.hl, { backgroundColor: highlighter[color] }]} />
          )}
          <Text
            style={[
              styles.label,
              strike && { textDecorationLine: 'line-through', color: colors.pencil },
            ]}
          >
            {label}
          </Text>
        </View>
        {description ? <Text style={type.bodyMuted}>{description}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 6 },
  box: { width: 30, height: 30 },
  tick: { position: 'absolute', left: 2, top: -8 },
  text: { flex: 1, gap: 2 },
  labelWrap: { alignSelf: 'flex-start', paddingHorizontal: 4, marginLeft: -4 },
  hl: { position: 'absolute', left: 0, right: 0, top: '40%', bottom: '8%', borderRadius: 4 },
  label: { fontFamily: fonts.hand, fontSize: 20, lineHeight: 26, color: colors.ink },
});
