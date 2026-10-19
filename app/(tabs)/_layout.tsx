import { Tabs } from 'expo-router/js-tabs';
import { StyleSheet, View } from 'react-native';
import { HandIcon, type HandIconName } from '@/components';
import { colors, fonts } from '@/theme';

function TabIcon({ name, focused }: { name: HandIconName; focused: boolean }) {
  return (
    <View style={[styles.icon, focused && styles.iconActive]}>
      <HandIcon name={name} color={focused ? colors.ink : colors.pencil} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.pencil,
        tabBarLabelStyle: { fontFamily: fonts.hand, fontSize: 13 },
        tabBarStyle: styles.bar,
        sceneStyle: { backgroundColor: colors.paper },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} /> }}
      />
      <Tabs.Screen
        name="palace"
        options={{ title: 'Palace', tabBarIcon: ({ focused }) => <TabIcon name="palace" focused={focused} /> }}
      />
      <Tabs.Screen
        name="play"
        options={{ title: 'Play', tabBarIcon: ({ focused }) => <TabIcon name="play" focused={focused} /> }}
      />
      <Tabs.Screen
        name="leagues"
        options={{ title: 'Leagues', tabBarIcon: ({ focused }) => <TabIcon name="trophy" focused={focused} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.paperDeep,
    borderTopWidth: 2,
    borderTopColor: '#C9BFA6',
    borderStyle: 'dashed',
  },
  icon: {
    width: 44,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 8,
  },
  iconActive: { backgroundColor: colors.hlYellow },
});
