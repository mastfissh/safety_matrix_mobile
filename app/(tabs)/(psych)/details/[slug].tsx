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
  const { slug } : {slug:string} = useLocalSearchParams();
  const record = idx[slug]
  return (
    <View className="flex-1 items-center justify-center">
       <Image source={"i_"+ (slug as string).replaceAll('-', "_")}  style={{ width: 50, height: 50 }}/>
      <Text className="text-slate-800">Details for {record.data.title}</Text>
    </View>
  );
}

export default App;