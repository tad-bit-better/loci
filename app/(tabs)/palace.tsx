import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { HandIcon, IndexCard, Paper, SketchButton } from '@/components';
import { lockedRooms, rooms } from '@/data/sample';
import { drill } from '@/lib/drillStore';
import { packWord } from '@/lib/packs';
import { colors, fonts, highlighter, strengthColor, type } from '@/theme';

/** Stop positions on the sketched floor plan, as fractions of the plan's width/height. */
const STOP_POS = [
  [0.14, 0.22],
  [0.5, 0.21],
  [0.86, 0.22],
  [0.86, 0.74],
  [0.5, 0.77],
  [0.14, 0.75],
] as const;

export default function PalaceScreen() {
  const [roomId, setRoomId] = useState('kitchen');
  const [stopIdx, setStopIdx] = useState(2);
  const [plan, setPlan] = useState({ w: 0, h: 0 });

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const stop = room.stops[Math.min(stopIdx, room.stops.length - 1)];
  const v = packWord(stop.word);

  return (
    <Paper
      scroll
      footer={
        <View style={styles.actions}>
          <SketchButton label="+ Add" variant="secondary" style={{ flex: 1 }} />
          <SketchButton
            label="Walk this room →"
            style={{ flex: 2 }}
            onPress={() => {
              drill.reset();
              router.push('/drill/memorize');
            }}
          />
        </View>
      }
    >
      <View>
        <Text style={type.h2}>The Night Palace</Text>
        <Text style={type.note}>level 3 · 5 of 8 rooms open</Text>
      </View>

      <View style={styles.tabs} accessibilityRole="tablist">
        {rooms.map((r) => {
          const on = r.id === roomId;
          return (
            <Pressable
              key={r.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              onPress={() => {
                setRoomId(r.id);
                setStopIdx(0);
              }}
              style={[
                styles.tab,
                { backgroundColor: highlighter[r.tab], height: on ? 44 : 38 },
                on && { borderBottomColor: highlighter[r.tab] },
              ]}
            >
              <Text style={styles.tabLabel}>{r.name}</Text>
            </Pressable>
          );
        })}
        {lockedRooms.map((name) => (
          <View key={name} style={[styles.tab, styles.tabLocked]} accessibilityState={{ disabled: true }}>
            <HandIcon name="lock" size={13} color={colors.pencil} strokeWidth={2.4} />
            <Text style={[styles.tabLabel, { color: colors.pencil }]}>{name}</Text>
          </View>
        ))}
      </View>

      <View style={{ gap: 4 }}>
        <Text style={type.note}>{room.title}</Text>
        <View
          style={styles.plan}
          onLayout={(e) => setPlan({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
        >
          <Svg
            style={StyleSheet.absoluteFill}
            viewBox="0 0 322 188"
            preserveAspectRatio="none"
            pointerEvents="none"
          >
            <Path
              d="M44 42 C 90 30, 120 44, 161 40 C 200 36, 240 46, 278 42 C 284 70, 276 110, 278 140 C 240 150, 200 140, 161 146 C 120 150, 80 140, 44 142"
              fill="none"
              stroke={colors.pencil}
              strokeWidth={1.6}
              strokeDasharray="5 6"
              strokeLinecap="round"
            />
          </Svg>
          {plan.w > 0 &&
            room.stops.map((s, i) => {
              const [fx, fy] = STOP_POS[i];
              const on = i === stopIdx;
              return (
                <Pressable
                  key={s.place}
                  accessibilityRole="button"
                  accessibilityLabel={`Stop ${i + 1}, ${s.place}: ${s.word}`}
                  accessibilityState={{ selected: on }}
                  onPress={() => setStopIdx(i)}
                  style={[styles.stop, { left: fx * plan.w - 40, top: fy * plan.h - 22 }]}
                >
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: strengthColor[s.strength], borderWidth: on ? 3 : 2 },
                      on && { boxShadow: `0px 0px 0px 4px ${colors.card}, 0px 0px 0px 6px ${colors.ink}` },
                    ]}
                  >
                    <Text style={styles.dotNum}>{i + 1}</Text>
                  </View>
                  <Text style={styles.stopLabel} numberOfLines={1}>
                    {s.place}
                  </Text>
                </Pressable>
              );
            })}
        </View>
        <View style={styles.legend}>
          {(['strong', 'due', 'weak'] as const).map((k) => (
            <View key={k} style={styles.legendItem}>
              <View style={[styles.swatch, { backgroundColor: strengthColor[k] }]} />
              <Text style={[type.note, { fontSize: 17 }]}>
                {k === 'strong' ? 'solid' : k === 'due' ? 'due today' : 'fading'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <IndexCard tilt={-0.8} headerRule>
        <View style={styles.cardHead}>
          <Text style={type.note}>
            stop {stopIdx + 1} · {stop.place}
          </Text>
          <Text style={type.bodyMuted}>{stop.review}</Text>
        </View>
        <Text style={[type.h2, { fontSize: 22 }]}>
          <Text style={{ backgroundColor: strengthColor[stop.strength] }}> {stop.word} </Text>
        </Text>
        <Text style={type.bodyMuted}>{v?.meaning}</Text>
        {v?.image ? (
          <>
            <Text style={[type.note, { fontSize: 19 }]}>sounds like “{v.soundsLike}”</Text>
            <Text style={type.body}>{v.image}</Text>
          </>
        ) : (
          <Text style={[type.note, { fontSize: 17 }]}>no picture yet</Text>
        )}
      </IndexCard>
    </Paper>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    borderBottomWidth: 2,
    borderBottomColor: colors.ink,
    marginRight: -20,
  },
  tab: {
    paddingHorizontal: 12,
    marginBottom: -2,
    borderWidth: 2,
    borderColor: colors.ink,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tabLocked: { height: 38, backgroundColor: '#EFE9DA', borderStyle: 'dashed' },
  tabLabel: { fontFamily: fonts.hand, fontSize: 16, color: colors.ink },
  plan: {
    height: 192,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.ink,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 2,
  },
  stop: { position: 'absolute', width: 80, minHeight: 44, alignItems: 'center', gap: 2 },
  dot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotNum: { fontFamily: fonts.hand, fontSize: 17, color: colors.ink },
  stopLabel: { fontFamily: fonts.script, fontSize: 16, color: colors.ink },
  legend: { flexDirection: 'row', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch: { width: 14, height: 9, borderRadius: 3 },
  cardHead: { height: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { flexDirection: 'row', gap: 10 },
});
