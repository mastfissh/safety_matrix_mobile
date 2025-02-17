import { ConfidencePanel } from "@/components/ConfidencePanel";
import MarkdownList from "@/components/MarkDownList";
import { RiskPanel } from "@/components/RiskPanel";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SectionList,
  Text,
  View,
} from "react-native";
import { cachedCombos, cachedPsychs, cachedRisks } from "../../lib/fetchData";
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
  let psych1 = {} as any;
  let psych2 = {} as any;
  let conf = "";
  let rsk = "";
  if (!isLoading) {
    psych1 = idx[psych1_slug];
    psych2 = idx[psych2_slug];
    const combo_data = comboIdx[`${psych1_slug}_${psych2_slug}`];
    conf = confidence([psych1_slug, psych2_slug], data);
    rsk = risk([psych1_slug, psych2_slug], data);
    str = `
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
    <SectionList
      sections={[
        {
          title: "",
          data: ["" as any],
          renderItem: ({}) => (
            <View className="container">
              <Text className="text-xl font-bold">{psych1.data.title}</Text>
              <Image
                source={{
                  uri: "i_" + (psych1_slug as string).replaceAll("-", "_"),
                }}
                className="h-48 w-64 rounded-lg p-2"
              ></Image>
              <Text>{psych1.data.image_caption}</Text>

              <Text className="text-xl font-bold">{psych2.data.title}</Text>
              <Image
                source={{
                  uri: "i_" + (psych2_slug as string).replaceAll("-", "_"),
                }}
                className="h-48 w-64 rounded-lg p-2"
              ></Image>

              <Text>{psych2.data.image_caption}</Text>
              <ConfidencePanel conf={conf} />
              <RiskPanel risk={rsk} />
            </View>
          ),
        },
        {
          title: "",
          data: ["" as any],
          renderItem: ({}) => <MarkdownList str={str} />,
        },
      ]}
    />
  );
};

export default App;
