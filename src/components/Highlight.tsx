import { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { Highlighter, highlighter, type } from '@/theme';

type Props = {
  children: ReactNode;
  color?: Highlighter;
  style?: TextStyle;
  /** Small random-looking tilt so highlights don't look machine-made. */
  tilt?: number;
};

/**
 * A highlighter stroke behind the lower half of a single line of text.
 * For multi-line highlights, split the text or use `backgroundColor` on a nested <Text>.
 */
export function Highlight({ children, color = 'yellow', style, tilt = -1 }: Props) {
  return (
    <View style={styles.wrap}>
      <View
        pointerEvents="none"
        style={[
          styles.stroke,
          { backgroundColor: highlighter[color], transform: [{ rotate: `${tilt}deg` }] },
        ]}
      />
      <Text style={[type.h3, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'flex-start', paddingHorizontal: 4 },
  stroke: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '42%',
    bottom: '6%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 2,
  },
});
