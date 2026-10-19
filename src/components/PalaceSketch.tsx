import { StyleSheet, View } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { colors } from '@/theme';

const WINDOWS = [
  { x: 75, y: 72 },
  { x: 75, y: 96 },
  { x: 121, y: 50 },
  { x: 144, y: 50 },
  { x: 167, y: 50 },
  { x: 214, y: 72 },
  { x: 214, y: 96 },
];
const FILLS = [colors.hlYellow, colors.hlYellow, colors.hlGreen, colors.hlPink, colors.hlYellow];

/** Pencil sketch of the palace. Each unlocked room lights a window with highlighter. */
export function PalaceSketch({ litRooms }: { litRooms: number }) {
  return (
    <View style={styles.frame}>
      <Svg
        viewBox="0 0 300 130"
        width="100%"
        height={122}
        accessibilityLabel={`Pencil sketch of your palace, ${litRooms} rooms lit`}
      >
        <G fill="none" stroke={colors.ink} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M58 122 L58 60 L104 61 L104 122" />
          <Path d="M58 60 L58 51 L67 51 L67 60 M76 60 L76 51 L86 51 L86 60 M95 60 L95 51 L104 51 L104 61" />
          <Path d="M196 122 L197 60 L242 60 L242 122" />
          <Path d="M197 60 L197 51 L206 51 L206 60 M215 60 L215 51 L224 51 L224 60 M233 60 L233 51 L242 51 L242 60" />
          <Path d="M104 122 L104 36 L196 37 L196 122" />
          <Path d="M104 36 L104 27 L115 27 L115 36 M124 36 L124 27 L135 27 L135 36 M144 36 L144 27 L156 27 L156 36 M165 37 L165 27 L176 27 L176 37 M185 37 L185 27 L196 27 L196 37" />
          <Path d="M138 122 L138 104 C 138 92, 162 92, 162 104 L162 122" />
          <Path d="M14 122 C 80 120, 200 124, 288 121" />
          <Path d="M248 20 C 254 14, 266 16, 266 26 C 262 22, 254 22, 252 30 C 246 28, 244 24, 248 20 Z" />
        </G>
        {WINDOWS.map((w, i) => (
          <Rect
            key={i}
            x={w.x}
            y={w.y}
            width={11}
            height={15}
            rx={5}
            stroke={colors.ink}
            strokeWidth={1.5}
            fill={i < litRooms ? FILLS[i % FILLS.length] : 'none'}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: colors.paperDeep, borderWidth: 1, borderColor: colors.cardEdge },
});
