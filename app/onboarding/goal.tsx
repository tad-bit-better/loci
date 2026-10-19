import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HandCheckbox, Highlight, Paper, SketchButton } from '@/components';
import { goals, type GoalId } from '@/data/sample';
import { setSetting } from '@/lib/localDb';
import { type } from '@/theme';

export default function GoalScreen() {
  const [picked, setPicked] = useState<Set<GoalId>>(new Set(['exams']));

  const toggle = (id: GoalId) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onContinue = async () => {
    await setSetting('goals', JSON.stringify([...picked]));
    // TODO: insert the 30-second baseline test + story-method lesson screens here (steps 2 and 3).
    router.push('/onboarding/hook');
  };

  return (
    <Paper
      footer={
        <>
          <SketchButton label="Continue" onPress={onContinue} disabled={picked.size === 0} />
          <Text style={[type.bodyMuted, styles.center]}>Next: a 30-second memory test</Text>
        </>
      }
    >
      <Text style={[type.note, styles.step]}>step 1 of 4</Text>

      <View style={styles.titleBlock}>
        <Text style={type.h1}>Why do you want a better</Text>
        <Highlight style={type.h1}>memory?</Highlight>
        <Text style={[type.body, styles.muted]}>We'll shape your palace around it.</Text>
      </View>

      <View>
        {goals.map((g) => (
          <HandCheckbox
            key={g.id}
            label={g.label}
            description={g.description}
            color={g.color}
            checked={picked.has(g.id)}
            onToggle={() => toggle(g.id)}
          />
        ))}
      </View>

      <Text style={[type.note, styles.hint]}>↳ tick as many as you like</Text>
    </Paper>
  );
}

const styles = StyleSheet.create({
  step: { alignSelf: 'flex-end' },
  titleBlock: { gap: 2 },
  muted: { color: '#5B606B', marginTop: 6 },
  hint: { transform: [{ rotate: '-2deg' }], paddingLeft: 30 },
  center: { textAlign: 'center' },
});
