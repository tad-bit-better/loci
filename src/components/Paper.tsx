import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';
import { colors, CONTENT_LEFT, MARGIN_X, RULE_GAP } from '@/theme';

type Props = {
  children: ReactNode;
  /** Wrap content in a ScrollView. */
  scroll?: boolean;
  /** Draw the red margin line (on by default). */
  margin?: boolean;
  style?: ViewStyle;
  /** Rendered below the content, outside the scroll area (e.g. a sticky CTA). */
  footer?: ReactNode;
};

/** Ruled notebook page. Every screen sits on one. */
export function Paper({ children, scroll, margin = true, style, footer }: Props) {
  const content = (
    <View style={[styles.content, !margin && styles.noMargin, style]}>{children}</View>
  );
  return (
    <View style={styles.root}>
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <Pattern id="ruled" patternUnits="userSpaceOnUse" width={8} height={RULE_GAP}>
            <Line
              x1={0}
              x2={8}
              y1={RULE_GAP - 0.5}
              y2={RULE_GAP - 0.5}
              stroke={colors.ruled}
              strokeWidth={1}
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#ruled)" />
        {margin && (
          <Line
            x1={MARGIN_X}
            x2={MARGIN_X}
            y1={0}
            y2="100%"
            stroke={colors.margin}
            strokeWidth={2}
          />
        )}
      </Svg>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {scroll ? (
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {content}
          </ScrollView>
        ) : (
          content
        )}
        {footer ? (
          <View style={[styles.footer, !margin && styles.noMargin]}>{footer}</View>
        ) : null}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  safe: { flex: 1 },
  scroll: { flexGrow: 1 },
  content: { flex: 1, paddingLeft: CONTENT_LEFT, paddingRight: 20, paddingTop: 16, gap: 20 },
  noMargin: { paddingLeft: 20 },
  footer: { paddingLeft: CONTENT_LEFT, paddingRight: 20, paddingBottom: 8, gap: 10 },
});
