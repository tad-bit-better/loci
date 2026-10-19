import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HandIcon, Paper, PencilUnderline, SketchButton } from '@/components';
import { colors, fonts, type } from '@/theme';

/**
 * Static prices for design. In production, read localized prices from RevenueCat offerings
 * (`getOfferings()` in src/lib/purchases.ts) — the stores format currency per region.
 */
const PRICES = { yearly: '$39.99', monthly: '$7.99', perMonth: '$3.33' };

const FEATURES = [
  'Unlimited palaces and rooms',
  'Unlimited AI mnemonic ideas',
  'Exam, language and topic packs',
  "See what's fading before you forget it",
  'Streak freezes and palace themes',
];

export default function Paywall() {
  const [plan, setPlan] = useState<'yearly' | 'monthly'>('yearly');

  return (
    <Paper
      scroll
      footer={
        <>
          <SketchButton
            label={plan === 'yearly' ? 'Start my 7 free days' : `Subscribe for ${PRICES.monthly}/mo`}
            onPress={() => {
              /* TODO: Purchases.purchasePackage(selectedPackage) */
            }}
          />
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.free}>
            <Text style={[type.h3, styles.underline]}>Continue free</Text>
          </Pressable>
          <Text style={[type.bodyMuted, styles.fine]}>
            {plan === 'yearly'
              ? `Free for 7 days, then ${PRICES.yearly} a year. Cancel in your store settings at least 24 hours before the trial ends.`
              : `${PRICES.monthly} a month, renews monthly. Cancel anytime in your store settings.`}
          </Text>
        </>
      }
    >
      <View>
        <Text style={[type.noteRed, styles.kicker]}>Loci Premium</Text>
        <Text style={type.h1}>Grow your palace</Text>
        <PencilUnderline>without limits</PencilUnderline>
      </View>

      <View>
        {FEATURES.map((f) => (
          <View key={f} style={styles.feature}>
            <HandIcon name="tick" strokeWidth={2.6} />
            <Text style={type.body}>{f}</Text>
          </View>
        ))}
      </View>

      <View style={{ gap: 14 }} accessibilityRole="radiogroup">
        <PlanCard
          selected={plan === 'yearly'}
          onPress={() => setPlan('yearly')}
          title="Yearly"
          sub={`just ${PRICES.perMonth}/mo · 7 days free`}
          price={PRICES.yearly}
          badge="58%"
        />
        <PlanCard
          selected={plan === 'monthly'}
          onPress={() => setPlan('monthly')}
          title="Monthly"
          sub="cancel anytime"
          price={PRICES.monthly}
        />
      </View>
    </Paper>
  );
}

function PlanCard(p: {
  selected: boolean;
  onPress: () => void;
  title: string;
  sub: string;
  price: string;
  badge?: string;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: p.selected }}
      onPress={p.onPress}
      style={[styles.plan, p.selected ? styles.planOn : styles.planOff]}
    >
      {p.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeSmall}>save</Text>
          <Text style={styles.badgeBig}>{p.badge}</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={type.h3}>{p.title}</Text>
        <Text style={type.bodyMuted}>{p.sub}</Text>
      </View>
      <Text style={[type.h2, p.badge && { marginRight: 62 }]}>{p.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kicker: { transform: [{ rotate: '-2deg' }], alignSelf: 'flex-start' },
  feature: { height: 34, flexDirection: 'row', alignItems: 'center', gap: 10 },
  plan: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 8,
  },
  planOn: {
    borderWidth: 3,
    borderColor: colors.ink,
    boxShadow: `4px 4px 0px ${colors.hlYellow}, 6px 6px 0px ${colors.ink}`,
  },
  planOff: { borderWidth: 2, borderStyle: 'dashed', borderColor: colors.pencilFaint },
  badge: {
    position: 'absolute',
    top: -16,
    right: 10,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.hlPink,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '12deg' }],
  },
  badgeSmall: { fontFamily: fonts.hand, fontSize: 12, color: colors.ink, lineHeight: 14 },
  badgeBig: { fontFamily: fonts.hand, fontSize: 20, color: colors.ink, lineHeight: 22 },
  free: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  underline: { textDecorationLine: 'underline' },
  fine: { fontSize: 12, lineHeight: 17, textAlign: 'center' },
});
