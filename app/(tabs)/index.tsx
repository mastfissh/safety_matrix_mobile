import React from 'react';
import data from "../../assets/data/data.json";
import { Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

const StyledView = styled(View)
const StyledText = styled(Text)

const App = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-slate-800">Home!</StyledText>
      <StyledText className="text-slate-800">{data["drugs"][0]}</StyledText>
      

      <Link href="/(tabs)/(psych)" className="text-slate-800 text-xl">
        Go to psych index screen
      </Link>
      <Link href="/about" className="text-slate-800 text-xl">
        Go to about screen
      </Link>
    </StyledView>
  );
}

export default App;