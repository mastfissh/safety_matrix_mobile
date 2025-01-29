import React from "react";
import psychoactives from "../../assets/data/psychoactives.json";
import combos from "../../assets/data/combos.json";
import data from "../../assets/data/data.json";
import { confidence, risk } from "../../lib/util";
import Markdown from "react-native-marked";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

let idx = {} as any;
for (let sub of psychoactives) {
  idx[sub["slug"]] = sub;
}
let combo_idx = {} as any;
for (let sub of combos) {
  combo_idx[sub["slug"]] = sub;
}

const App = () => {
  const { combo }: { combo: string } = useLocalSearchParams();
  let [psych1_slug, psych2_slug] = combo.split("|");
  const psych1 = idx[psych1_slug];
  const psych2 = idx[psych2_slug];
  const combo_data = combo_idx[`${psych1_slug}_${psych2_slug}`];
  const conf = confidence([psych1_slug, psych2_slug], data);
  const rsk = risk([psych1_slug, psych2_slug], data);
  const str = `
  ![${psych1.data.image_caption}](${"i_" + (psych1_slug as string).replaceAll("-", "_")})
  *${psych1.data.image_caption}*
  ![${psych2.data.image_caption}](${"i_" + (psych2_slug as string).replaceAll("-", "_")})
  *${psych2.data.image_caption}*
    Confidence ${conf}
    Risk ${rsk}
    ${combo_data.body.replaceAll("import Chart from '../../components/chart.astro';", "").replaceAll("<Chart title={frontmatter.duration_chart_title} data={frontmatter.duration_chart} />", "")}
  `;
  return (
    <View className="flex-1 items-center justify-center">
      <Markdown
        value={str}
        flatListProps={{
          initialNumToRender: 8,
          style: { width: "100%" },
        }}
      />
    </View>
  );
};

export default App;
