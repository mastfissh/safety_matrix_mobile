import { ConfidencePanel } from "@/components/ConfidencePanel";
import Disclaimer from "@/components/Disclaimer";
import MarkdownList from "@/components/MarkDownList";
import { RiskPanel } from "@/components/RiskPanel";
import { cachedCombos, cachedPsychs, cachedRisks } from "@/lib/fetchData";
import { confidence, risk } from "@/lib/util";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SectionList,
  Text,
  View,
} from "react-native";

const App = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: "Details" });
  }, [navigation]);
  const [idx, setIdx] = useState<{ [key: string]: any }>({});
  const [comboIdx, setComboIdx] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
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
        setError(error);
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
    let md = combo_data.body
      .replaceAll("import Chart from '../../components/chart.astro';", " \n ")
      .replaceAll(
        "<Chart title={frontmatter.duration_chart_title} data={frontmatter.duration_chart} />",
        " \n "
      );
    str = `${md}`;
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
          renderItem: (_) => (
            <View className="container flex flex-wrap flex-row items-center">
              <View className="m-4">
                <Text className="text-xl font-bold">{psych1.data.title}</Text>
                <Image
                  source={{
                    uri: "i_" + (psych1_slug as string).replaceAll("-", "_"),
                  }}
                  className="h-36 w-48 rounded-lg p-2"
                ></Image>
                <Text className="text-8 w-48 italic">
                  {psych1.data.image_caption}
                </Text>
              </View>
              <View>
                <Text className="text-xl font-bold">{psych2.data.title}</Text>
                <Image
                  source={{
                    uri: "i_" + (psych2_slug as string).replaceAll("-", "_"),
                  }}
                  className="h-36 w-48 rounded-lg p-2"
                ></Image>

                <Text className="text-8 w-48 italic">
                  {psych2.data.image_caption}
                </Text>
              </View>
              <View className="m-4">
                <ConfidencePanel conf={conf} />
                <RiskPanel risk={rsk} />
              </View>
            </View>
          ),
        },
        {
          title: "",
          data: ["" as any],
          renderItem: (_) => <MarkdownList str={str} />,
        },
        {
          title: "",
          data: ["" as any],
          renderItem: (_) => <Disclaimer />,
        },
      ]}
    />
  );
};

export default App;
