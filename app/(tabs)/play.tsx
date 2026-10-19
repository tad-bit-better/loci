import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { IndexCard, Paper, SketchButton } from '@/components';
import { drill } from '@/lib/drillStore';
import { type } from '@/theme';

/** Game modes. Only the word drill is wired up in the starter. */
const modes = [
  { title: 'GRE word drill', body: '10 words: hear it, picture it, place it, walk it back.', ready: true },
  { title: 'Numbers', body: 'Major System digits. Unlocks at Adept.', ready: false },
  { title: 'Names and faces', body: 'Remember who everyone is.', ready: false },
  { title: 'Card deck', body: 'Memory-sport classic.', ready: false },
];

export default function PlayScreen() {
  return (
    <Paper scroll>
      <Text style={type.h1}>Play</Text>
      <View style={styles.list}>
        {modes.map((m, i) => (
          <IndexCard key={m.title} tilt={i % 2 ? 0.8 : -0.8} tape={i === 0}>
            <Text style={type.h3}>{m.title}</Text>
            <Text style={type.bodyMuted}>{m.body}</Text>
            {m.ready ? (
              <SketchButton
                label="Start"
                onPress={() => {
                  drill.reset();
                  router.push('/drill/memorize');
                }}
              />
            ) : (
              <Text style={type.note}>coming soon</Text>
            )}
          </IndexCard>
        ))}
      </View>
    </Paper>
  );
}

const styles = StyleSheet.create({ list: { gap: 20, paddingBottom: 24 } });
