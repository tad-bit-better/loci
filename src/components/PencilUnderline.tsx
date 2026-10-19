import { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, type } from '@/theme';

type Props = { children: ReactNode; style?: TextStyle; color?: string };

/** A wobbly pencil line under a word or phrase. */
export function PencilUnderline({ children, style, color = colors.ink }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={[type.h1, style]}>{children}</Text>
      <Svg
        style={styles.line}
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        pointerEvents="none"
      >
        <Path
          d="M2 6 C 40 2, 90 9, 130 5 S 185 3, 198 7"
          fill="none"
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'flex-start' },
  line: { position: 'absolute', left: 0, right: 0, bottom: -4, height: 10 },
});
