import { StyleSheet } from 'react-native';
import { colors, fonts } from './tokens';

/** Shared text styles. Use with <Text style={type.h1}>. */
export const type = StyleSheet.create({
  h1: { fontFamily: fonts.hand, fontSize: 32, lineHeight: 38, color: colors.ink },
  h2: { fontFamily: fonts.hand, fontSize: 24, lineHeight: 30, color: colors.ink },
  h3: { fontFamily: fonts.hand, fontSize: 19, lineHeight: 25, color: colors.ink },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.ink },
  bodyMuted: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.pencil },
  note: { fontFamily: fonts.script, fontSize: 21, lineHeight: 24, color: colors.pencil },
  noteRed: { fontFamily: fonts.script, fontSize: 24, lineHeight: 28, color: colors.redPen },
  button: { fontFamily: fonts.hand, fontSize: 20, color: colors.ink },
});
