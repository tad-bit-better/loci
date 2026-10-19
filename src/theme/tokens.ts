/**
 * Loci "notebook" design tokens.
 * Paper, graphite ink, highlighters and a red correction pen.
 * Highlighter colours carry meaning: green = solid, yellow = due / primary, pink = fading.
 */
export const colors = {
  paper: '#FBF7EE',
  paperDeep: '#F6F1E4',
  card: '#FFFEFA',
  cardEdge: '#E3DCCB',
  ruled: '#DDE7F1',
  margin: '#F3B9B4',
  tape: 'rgba(226, 212, 176, 0.8)',

  ink: '#1F2430',
  pencil: '#5B606B',
  pencilFaint: '#9A9488',
  redPen: '#D2453B',

  hlYellow: '#FFE867',
  hlGreen: '#B9F2C9',
  hlPink: '#FFC2D1',
  hlBlue: '#BFE0FF',
  sticky: '#FFF3A6',
} as const;

export type Highlighter = 'yellow' | 'green' | 'pink' | 'blue';

export const highlighter: Record<Highlighter, string> = {
  yellow: colors.hlYellow,
  green: colors.hlGreen,
  pink: colors.hlPink,
  blue: colors.hlBlue,
};

export type Strength = 'strong' | 'due' | 'weak';

export const strengthColor: Record<Strength, string> = {
  strong: colors.hlGreen,
  due: colors.hlYellow,
  weak: colors.hlPink,
};

export const fonts = {
  /** Headings and buttons */
  hand: 'Kalam_700Bold',
  handRegular: 'Kalam_400Regular',
  /** Margin notes, scribbles, annotations */
  script: 'Caveat_700Bold',
  scriptMedium: 'Caveat_500Medium',
  /** Body text — chosen for legibility */
  body: 'AtkinsonHyperlegible_400Regular',
  bodyBold: 'AtkinsonHyperlegible_700Bold',
} as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

/** Ruled line spacing for the paper background. */
export const RULE_GAP = 32;
/** x position of the red margin line; content starts after it. */
export const MARGIN_X = 28;
export const CONTENT_LEFT = 44;

/**
 * Slightly uneven corner radii read as "hand drawn".
 * React Native has no elliptical (a / b) radii, so we vary each corner instead.
 */
export const sketchRadius = {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 14,
  borderBottomLeftRadius: 7,
} as const;

export const sketchShadow = (color: string = colors.ink, offset = 3) =>
  ({ boxShadow: `${offset}px ${offset}px 0px ${color}` }) as const;

export const paperShadow = { boxShadow: '0px 8px 18px rgba(31, 36, 48, 0.09)' } as const;
