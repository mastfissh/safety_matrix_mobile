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
          tabBarIcon: () => <Entypo name="grid" size={24} color="black" />,
        }}
      />

    </Tabs>
  );
}
