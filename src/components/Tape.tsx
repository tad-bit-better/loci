import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/theme';

/** A strip of masking tape. Place inside a card with position: relative (the default in RN). */
export function Tape({ style, rotate = -4 }: { style?: ViewStyle; rotate?: number }) {
  return (
    <View
      pointerEvents="none"
      style={[styles.tape, { transform: [{ rotate: `${rotate}deg` }] }, style]}
    />
  );
}

const styles = StyleSheet.create({
  tape: {
    position: 'absolute',
    top: -11,
    alignSelf: 'center',
    width: 92,
    height: 22,
    backgroundColor: colors.tape,
  },
});
