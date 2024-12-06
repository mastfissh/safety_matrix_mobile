import React from 'react';
import psychoactives from "../../../../assets/data/psychoactives.json";
import combos from "../../../../assets/data/combos.json";
import data from "../../../../assets/data/data.json";
import { confidence, risk } from "../../../../lib/util";
import Markdown from "react-native-marked";
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { ConfidencePanel } from '@/components/ConfidencePanel';
import { RiskPanel } from '@/components/RiskPanel';

let idx = {} as any;
for (let sub of psychoactives) {
  idx[sub["slug"]] = sub;
}
let combo_idx = {} as any;
for (let sub of combos) {
  combo_idx[sub["slug"]] = sub;
}

const App = () => {
  const { combo } : {combo:string} = useLocalSearchParams();
  let [psych1_slug, psych2_slug] = combo.split('|')
  const psych1 = idx[psych1_slug]
  const psych2 = idx[psych2_slug]
  const combo_data = combo_idx[`${psych1_slug}_${psych2_slug}`]
  const conf = confidence([psych1_slug, psych2_slug], data)
  const rsk = risk([psych1_slug, psych2_slug], data)
  return (
    <View className="flex-1 items-center justify-center">
       <Image source={"i_"+ (psych1_slug as string).replaceAll('-', "_")}  style={{ width: 50, height: 50 }}/>
      <Text className="text-slate-800">Details for {psych1.data.title}</Text>
      <Image source={"i_"+ (psych2_slug as string).replaceAll('-', "_")}  style={{ width: 50, height: 50 }}/>
      <Text className="text-slate-800">Details for {psych2.data.title}</Text>
      <ConfidencePanel conf={conf} />
      <RiskPanel risk={rsk} />
      <Markdown
      value={combo_data.body}
      flatListProps={{
        initialNumToRender: 8,
      }}
    />
    </View>
  );
}

export default App;