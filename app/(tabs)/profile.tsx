import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Paper, SketchButton } from '@/components';
import { hasBackend } from '@/lib/supabase';
import { type } from '@/theme';

export default function ProfileScreen() {
  return (
    <Paper>
      <Text style={type.h1}>Profile</Text>
      <View style={{ gap: 6 }}>
        <Text style={type.body}>Backend: {hasBackend ? 'connected to Supabase' : 'offline (no .env yet)'}</Text>
        <Text style={type.bodyMuted}>Sign in with Apple / Google goes here.</Text>
      </View>
      <SketchButton label="Go Premium" onPress={() => router.push('/paywall')} />
    </Paper>
  );
}
