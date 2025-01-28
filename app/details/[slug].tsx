import React, { Fragment } from "react";
import psychoactives from "../../assets/data/psychoactives.json";
import Markdown from "react-native-marked";
import { useLocalSearchParams } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";

let idx = {} as any;
for (let sub of psychoactives) {
  idx[sub["slug"]] = sub;
}

const App = () => {
  const { slug }: { slug: string } = useLocalSearchParams();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const next = new Date();
  next.setDate(today.getDate() + 2);
  const series = [
    {
      value: 1,
      date: today,
    },
    {
      value: 4,
      date: tomorrow,
    },
    {
      value: 3,
      date: next,
    },
  ];
  const record = idx[slug];
  const entry = record;
  const str = `
  ![${entry.data.image_caption}](${"i_" + (slug as string).replaceAll("-", "_")})
  *${entry.data.image_caption}*

    Details for ${record.data.title}
    ${entry.data.title}
    Effects 
    ${entry.data.positive_effects}
    ${entry.data.neutral_effects}
    ${entry.data.negative_effects}
    ${record.body.replaceAll("import Chart from '../../components/chart.astro';", "").replaceAll("<Chart title={frontmatter.duration_chart_title} data={frontmatter.duration_chart} />", "")}
  `;
  return (
    <Fragment>
      <ScrollView>
        <View className="flex-1 items-center justify-center">

          <Text className="text-sm absolute mb-4 bottom-0 z-90 rounded-lg bg-black/75 px-5 py-2 text-white">
            {entry.data.image_caption}
          </Text>

          {entry.data.family_members && (
            <Text>
              {entry.data.title} is not just one drug; {entry.data.title} is a
              group of drugs. Drugs in this group include{" "}
              {entry.data.family_members.join(", ")}. Drugs within the same
              group can have very different dosages and very different effects.
            </Text>
          )}
        </View>
      </ScrollView>
      <Markdown
        value={str}
        flatListProps={{
          initialNumToRender: 8,
        }}
      />
    </Fragment>
  );
};

export default App;
