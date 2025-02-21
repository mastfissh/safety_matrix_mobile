import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import {Platform, StyleSheet, Text, ScrollView} from 'react-native';

export default function TabLayout() {
  const headerShown  = Platform.OS === "android" ? false : true;
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Grid",
          tabBarIcon: () => <Entypo name="grid" size={24} color="black" />,
          headerShown: headerShown,
        }}
      />
      <Tabs.Screen
        name="(psych)/index"
        options={{
          title: "Info",
          tabBarIcon: () => (
            <FontAwesome5 name="book-medical" size={24} color="black" />
          ),
          headerShown: headerShown,
        }}
      />
    </Tabs>
  );
}
