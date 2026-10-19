import Svg, { G, Path } from 'react-native-svg';
import { colors } from '@/theme';

/** Tally marks for streaks: groups of five with a diagonal strike. */
export function Tally({ count, color = colors.ink }: { count: number; color?: string }) {
  const groups = Math.floor(count / 5);
  const rest = count % 5;
  const groupW = 30;
  const width = groups * groupW + rest * 6 + 4;
  const paths: string[] = [];
  for (let g = 0; g < groups; g++) {
    const x0 = g * groupW + 3;
    for (let i = 0; i < 4; i++) paths.push(`M${x0 + i * 6} 3 L${x0 + i * 6 + (i % 2)} 19`);
    paths.push(`M${x0 - 3} 15 L${x0 + 22} 5`);
  }
  for (let i = 0; i < rest; i++) {
    const x = groups * groupW + 3 + i * 6;
    paths.push(`M${x} 3 L${x + (i % 2)} 19`);
  }
  return (
    <Svg width={Math.max(width, 8)} height={22} accessibilityLabel={`${count} day streak`}>
      <G fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
        {paths.map((d, i) => (
          <Path key={i} d={d} />
        ))}
      </G>
    </Svg>
  );
}
