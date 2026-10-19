import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getSetting } from '@/lib/localDb';

/** Sends first-time users to onboarding, everyone else home. */
export default function Index() {
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    getSetting('onboarded').then((v) => setOnboarded(v === 'true'));
  }, []);

  if (onboarded === null) return null;
  return <Redirect href={onboarded ? '/(tabs)' : '/onboarding/goal'} />;
}
