import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import React, { useEffect } from "react";

import "@/global.css";

async function unlockOrientationForTablets() {
  const deviceType = await Device.getDeviceTypeAsync();
  if (deviceType === Device.DeviceType.TABLET) {
    await ScreenOrientation.unlockAsync();
  }
}


export default function Layout() {
  const headerShown = Platform.OS === "android" ? false : true;
  useEffect(() => {
    unlockOrientationForTablets();
  }, []);
  // useEffect(() => {
  //   const subscription = ScreenOrientation.addOrientationChangeListener(
  //     // handleOrientationChange
  //   );
  //   return () => {
  //     ScreenOrientation.removeOrientationChangeListeners();
  //   };
  // }, []);
  
  // const handleOrientationChange = (orientationChange) => {
  //   const currentOrientation = orientationChange.orientationInfo.orientation;
  //   // Adjust your layout based on the currentOrientation
  // };
  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: headerShown,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Info" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
