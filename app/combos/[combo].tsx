import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Markdown from "react-native-marked";
// import combos from "../../assets/data/combos.json";
// import psychoactives from "../../assets/data/psychoactives.json";
import { cachedPsychs, cachedCombos, cachedRisks } from "../../lib/fetchData";
import { confidence, risk } from "../../lib/util";

const App = () => {
  const [idx, setIdx] = useState<{ [key: string]: any }>({});
  const [comboIdx, setComboIdx] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const psychs = await cachedPsychs();
        let idx = {} as any;
        for (let sub of psychs) {
          idx[sub["slug"]] = sub;
        }
        setIdx(idx);

        const combos = await cachedCombos();
        let combo_idx = {} as any;
        for (let sub of combos) {
          combo_idx[sub["slug"]] = sub;
        }
        setComboIdx(combo_idx);
        const data = await cachedRisks();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.debug("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, []);
  const { combo }: { combo: string } = useLocalSearchParams();
  let [psych1_slug, psych2_slug] = combo.split("|");
  let str = "";
  if (!isLoading) {
    const psych1 = idx[psych1_slug];
    const psych2 = idx[psych2_slug];
    const combo_data = comboIdx[`${psych1_slug}_${psych2_slug}`];
    const conf = confidence([psych1_slug, psych2_slug], data);
    const rsk = risk([psych1_slug, psych2_slug], data);
    str = `
  ![${psych1.data.image_caption}](${
      "i_" + (psych1_slug as string).replaceAll("-", "_")
    })
  *${psych1.data.image_caption}*
  ![${psych2.data.image_caption}](${
      "i_" + (psych2_slug as string).replaceAll("-", "_")
    })
  *${psych2.data.image_caption}*
    Confidence ${conf}
    Risk ${rsk}
    ${combo_data.body
      .replaceAll("import Chart from '../../components/chart.astro';", "")
      .replaceAll(
        "<Chart title={frontmatter.duration_chart_title} data={frontmatter.duration_chart} />",
        ""
      )}
  `;
  }
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error!: {error}</Text>
      </View>
    );
  }
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
