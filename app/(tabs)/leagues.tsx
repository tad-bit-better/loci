import { Text } from 'react-native';
import { Paper, StickyNote } from '@/components';
import { type } from '@/theme';

export default function LeaguesScreen() {
  return (
    <Paper>
      <Text style={type.h1}>Leagues</Text>
      <StickyNote>
        <Text style={type.body}>
          Weekly XP leagues, grouped by goal, arrive in v1.1. Build them on Supabase Realtime
          (league_memberships table).
        </Text>
      </StickyNote>
    </Paper>
  );
}
