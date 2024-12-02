import { Stack } from 'expo-router/stack';

// Import your global CSS file
import "../global.css";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
