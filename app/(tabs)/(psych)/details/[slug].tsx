import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
const StyledView = styled(View)
const StyledText = styled(Text)

const App = () => {
  const { slug } = useLocalSearchParams();
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-slate-800">Details for {slug}</StyledText>
    </StyledView>
  );
}

export default App;