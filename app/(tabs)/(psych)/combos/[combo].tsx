import React from 'react';
import psychoactives from "../../../../assets/data/psychoactives.json";
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';

let idx = {} as any;
for (let sub of psychoactives) {
  idx[sub["slug"]] = sub;
}

const App = () => {
  const { combo } : {combo:string} = useLocalSearchParams();
  let [psych1_slug, psych2_slug] = combo.split('|')
  const psych1 = idx[psych1_slug]
  const psych2 = idx[psych2_slug]
  return (
    <View className="flex-1 items-center justify-center">
       <Image source={"i_"+ (psych1_slug as string).replaceAll('-', "_")}  style={{ width: 50, height: 50 }}/>
      <Text className="text-slate-800">Details for {psych1.data.title}</Text>
      <Image source={"i_"+ (psych2_slug as string).replaceAll('-', "_")}  style={{ width: 50, height: 50 }}/>
      <Text className="text-slate-800">Details for {psych2.data.title}</Text>
    </View>
  );
}

export default App;