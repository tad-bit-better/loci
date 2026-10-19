import { Platform } from 'react-native';

/**
 * RevenueCat wrapper. `react-native-purchases` needs a development build (it won't run in Expo Go),
 * so it's loaded lazily and every call no-ops if it isn't available.
 *
 * Products to create in App Store Connect / Play Console, then attach to a RevenueCat offering:
 *   loci_premium_monthly  — US $7.99, India ₹99
 *   loci_premium_yearly   — US $39.99, India ₹499, 7-day free trial
 * Entitlement id: "premium"
 */
export const ENTITLEMENT = 'premium';

type PurchasesModule = typeof import('react-native-purchases').default;
let Purchases: PurchasesModule | null = null;

export async function initPurchases(appUserId?: string) {
  const apiKey =
    Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
      : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
  if (!apiKey || Platform.OS === 'web') return;
  try {
    Purchases = (await import('react-native-purchases')).default;
    Purchases.configure({ apiKey, appUserID: appUserId });
  } catch {
    Purchases = null; // Running in Expo Go — use a dev build to test purchases.
  }
}

export async function isPremium(): Promise<boolean> {
  if (!Purchases) return false;
  const info = await Purchases.getCustomerInfo();
  return Boolean(info.entitlements.active[ENTITLEMENT]);
}

export async function getOfferings() {
  if (!Purchases) return null;
  return Purchases.getOfferings();
}
