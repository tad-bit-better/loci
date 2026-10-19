import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, sketchRadius, sketchShadow } from '@/theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  disabled?: boolean;
  accessibilityHint?: string;
};

/** Ink-outlined button with an offset "pressed paper" shadow. */
export function SketchButton({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled,
  accessibilityHint,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={accessibilityHint}
      disabled={disabled}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.base,
        sketchRadius,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed ? styles.pressed : sketchShadow(),
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.hlYellow },
  secondary: { backgroundColor: colors.card },
  pressed: { transform: [{ translateX: 2 }, { translateY: 2 }], boxShadow: '1px 1px 0px #1F2430' },
  disabled: { opacity: 0.5 },
  label: { fontFamily: fonts.hand, fontSize: 20, color: colors.ink },
});
