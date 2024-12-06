import React from 'react';
import psychoactives from "../../../../assets/data/psychoactives.json";
import Markdown from "react-native-marked";
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
  const entry = record
  return (
    <View className="flex-1 items-center justify-center">
       <Image source={"i_"+ (slug as string).replaceAll('-', "_")}  style={{ width: 50, height: 50 }}/>
      <Text className="text-slate-800">Details for {record.data.title}</Text>
      <Text> {entry.data.title} </Text>
   
    <Image
      className="mb-4 h-auto max-w-full rounded-lg align-middle leading-none shadow-lg"
      alt={entry.data.image_caption}
      source={"i_"+ (slug as string).replaceAll('-', "_")}
    />
      <Text className="text-sm absolute mb-4 bottom-0 z-90 rounded-lg bg-black/75 px-5 py-2 text-white">
        {entry.data.image_caption}
      </Text>
    
    {entry.data.family_members &&
    <Text>{entry.data.title} is not just one drug; {entry.data.title} is a group of drugs. Drugs in this group include {entry.data.family_members.join(', ')}. Drugs within the same group can have very different dosages and very different effects.</Text>
  }
     <Text> Effects </Text>
     <Text>{entry.data.positive_effects}</Text>
     <Text> {entry.data.neutral_effects}</Text>
     <Text> {entry.data.negative_effects}</Text>
      <Markdown
      value={record.body}
      flatListProps={{
        initialNumToRender: 8,
      }}
    />
    </View>
  );
}

export default App;