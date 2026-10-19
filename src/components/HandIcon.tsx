import Svg, { Path } from 'react-native-svg';
import { colors } from '@/theme';

/** Hand-drawn stroke icons, 24×24. Add new ones to `paths`. */
const paths = {
  home: 'M3.5 11.5 L12 4 L20.5 11 M5.5 10 L5 20 L19 20.5 L18.7 10',
  palace:
    'M4 21 L4 9 L7 9 L7 6 L10 6 L10 9 L14 9 L14 6 L17 6 L17 9 L20 9 L20 21 Z M10 21 L10 16 C 10 14, 14 14, 14 16 L14 21',
  play: 'M7 4.5 L19 12 L7.5 19.5 Z',
  trophy:
    'M8 21 L16 21 M12 17 L12 21 M7 4 L17 4 L17 9 C 17 15, 7 15, 7 9 Z M7 6 L4 6 L4 8 C 4 10, 6 11, 7 11 M17 6 L20 6 L20 8 C 20 10, 18 11, 17 11',
  person:
    'M12 4 C 15 4, 16 6, 16 8 C 16 10.5, 14 12, 12 12 C 9.5 12, 8 10.5, 8 8 C 8 6, 9.5 4, 12 4 Z M4 21 C 4.5 16, 8 14, 12 14 C 16 14, 19.5 16, 20 21',
  close: 'M5 5.5 C 10 10, 14 14, 19 19 M19 4.5 C 14 10, 10 14, 5 19.5',
  back: 'M21 12.5 C 15 12, 9 12.5, 3.5 12 M9.5 5 C 7.5 8, 5.5 10, 3.5 12 C 5.5 14, 7.5 16, 10 19',
  arrowDown: 'M12 2 C 11 9, 13 14, 12 21 M6 15 L12 22 L18 15',
  bulb: 'M9 19 L15 19 M10 22 L14 22 M12 2 C 6 2, 3 7, 5 11.5 C 6 13.5, 8 14.5, 8.5 16.5 L15.5 16.5 C 16 14.5, 18 13.5, 19 11.5 C 21 7, 18 2, 12 2 Z',
  lock: 'M5 11 L19 11.5 L18.6 21 L5.4 20.6 Z M8 11 L8 8 C 8 3, 16 3, 16 8 L16 11',
  tick: 'M3 12 C 5 14, 7 17, 9 20 C 12 13, 16 8, 21 3',
} as const;

export type HandIconName = keyof typeof paths;

export function HandIcon({
  name,
  size = 22,
  color = colors.ink,
  strokeWidth = 2,
}: {
  name: HandIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d={paths[name]}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
