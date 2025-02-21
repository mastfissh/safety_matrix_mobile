import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Platform, StyleSheet, Text, ScrollView} from 'react-native';

import "@/global.css";

export default function Layout() {
  const headerShown  = Platform.OS === "android" ? false : true;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: headerShown,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
