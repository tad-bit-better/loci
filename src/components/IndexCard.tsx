import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, paperShadow } from '@/theme';
import { Tape } from './Tape';

type Props = {
  children: ReactNode;
  /** Degrees. Keep small (-1.5 to 1.5). */
  tilt?: number;
  tape?: boolean;
  /** Red header rule like a real index card. */
  headerRule?: boolean;
  style?: ViewStyle;
};

export function IndexCard({ children, tilt = -1, tape = true, headerRule, style }: Props) {
  return (
    <View style={[styles.card, paperShadow, { transform: [{ rotate: `${tilt}deg` }] }, style]}>
      {headerRule && <View style={styles.rule} />}
      {tape && <Tape />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardEdge,
    padding: 18,
    paddingTop: 22,
    gap: 12,
  },
  rule: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 52,
    height: 2,
    backgroundColor: '#E9A3A0',
  },
});
