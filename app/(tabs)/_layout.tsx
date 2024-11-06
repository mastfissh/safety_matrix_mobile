import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="grid" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="[psychs]"
        options={{
          title: 'Psychs',
          tabBarIcon: ({ color }) => <FontAwesome5 name="book" size={24} color="black" />,
          href: {
            pathname: '/(tabs)/(psych)',
          },
        }}
      />
    </Tabs>
  );
}
