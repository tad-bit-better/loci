import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/theme';

export function StickyNote({
  children,
  tilt = 1.5,
  style,
}: {
  children: ReactNode;
  tilt?: number;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.note, { transform: [{ rotate: `${tilt}deg` }] }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  note: {
    backgroundColor: colors.sticky,
    padding: 14,
    gap: 6,
    boxShadow: '0px 6px 14px rgba(31, 36, 48, 0.12)',
  },
});
