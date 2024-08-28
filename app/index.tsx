import React from 'react';
import { withExpoSnack } from 'nativewind';
import data from "../assets/data/data.json";
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)

const App = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-slate-800">Try editing me!! 🎉</StyledText>
      <StyledText className="text-slate-800">{data["drugs"][0]}</StyledText>
    </StyledView>
  );
}

// This demo is using a external compiler that will only work in Expo Snacks.
// You may see flashes of unstyled content, this will not occur under normal use!
// Please see the documentation to setup your application
export default withExpoSnack(App);