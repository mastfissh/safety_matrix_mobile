import Disclaimer from "@/components/Disclaimer";
import MarkdownList from "@/components/MarkDownList";
import { cachedPsychs } from "@/lib/fetchData";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SectionList,
  Text,
  View,
  Platform
} from "react-native";

const App = () => {
  const ios = Platform.OS !== "android";
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: "Details" });
  }, [navigation]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const psychs = await cachedPsychs();
        setData(psychs);
        setIsLoading(false);
      } catch (error) {
        console.debug("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, []);
  let str = "";
  const { slug }: { slug: string } = useLocalSearchParams();
  let entry = {} as any;
  if (!isLoading) {
    let idx = {} as any;
    for (let sub of data) {
      idx[sub["slug"]] = sub;
    }
    const record = idx[slug];
    entry = record;

    str = `
  ${record.body
    .replaceAll("import Chart from '../../components/chart.astro';", "")
    .replaceAll(
      "<Chart title={frontmatter.duration_chart_title} data={frontmatter.duration_chart} />",
      ""
    )}
  `;
  // App store policies don't allow for showing dosage information.
  // We'll just strip this entire section for now
    if (ios) {
      str = ''
    }
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
              <View className="p-2">
                <Text className="text-xl font-bold">{entry.data.title}</Text>
                <Image
                  source={{
                    uri: "i_" + (slug as string).replaceAll("-", "_"),
                  }}
                  className="h-48 rounded-lg p-2"
                ></Image>

                <Text className="text-8 italic">
                  {entry.data.image_caption}
                </Text>
              </View>
              <View className="p-2">
                {entry.data.family_members && (
                  <Text>
                    {entry.data.title} is not just one drug; {entry.data.title}{" "}
                    is a group of drugs. Drugs in this group include{" "}
                    {entry.data.family_members.join(", ")}. Drugs within the
                    same group can have very different dosages and very
                    different effects.
                  </Text>
                )}
                <Text className="text-bold text-xl">Effects:</Text>
                <Text>
                  <AntDesign name="up" size={14} color="green" />{" "}
                  {entry.data.positive_effects}
                </Text>
                <Text>
                  <AntDesign name="down" size={14} color="red" />{" "}
                  {entry.data.neutral_effects}
                </Text>
                <Text>
                  <AntDesign name="exclamationcircle" size={14} color="grey" />{" "}
                  {entry.data.negative_effects}
                </Text>
              </View>
            </View>
          ),
        },
        {
          title: "",
          data: ["" as any],
          renderItem: ({}) => <MarkdownList str={str} />,
        },
        {
          title: "",
          data: ["" as any],
          renderItem: ({}) => <Disclaimer />,
        },
      ]}
      renderSectionHeader={({ section: { title } }) => (
        <Text className="text-lg font-bold">{title}</Text>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default App;
