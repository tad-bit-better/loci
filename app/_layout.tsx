import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { migrate } from '@/lib/localDb';
import { initPurchases } from '@/lib/purchases';
import { colors } from '@/theme';
import { fontAssets } from '@/theme/fonts';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    migrate()
      .catch((e) => console.warn('DB migration failed', e))
      .finally(() => setDbReady(true));
    initPurchases().catch(() => {});
  }, []);

  const ready = (fontsLoaded || fontError) && dbReady;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.paper },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding/goal" />
          <Stack.Screen name="onboarding/hook" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="drill/memorize" options={{ gestureEnabled: false }} />
          <Stack.Screen name="drill/recall" options={{ gestureEnabled: false }} />
          <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
