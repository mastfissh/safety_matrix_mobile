import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  SectionList,
  Image,
} from "react-native";
import MarkdownList from "@/components/MarkDownList";
import { cachedPsychs } from "../../lib/fetchData";

const App = () => {
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
              <Text className="text-xl font-bold">{entry.data.title}</Text>
              <Image
                source={{
                  uri: "i_" + (slug as string).replaceAll("-", "_"),
                }}
                className="h-48 w-64 rounded-lg p-2"
              ></Image>

              <Text>{entry.data.image_caption}</Text>
              {entry.data.family_members && (
                <Text>
                  {entry.data.title} is not just one drug; {entry.data.title} is
                  a group of drugs. Drugs in this group include{" "}
                  {entry.data.family_members.join(", ")}. Drugs within the same
                  group can have very different dosages and very different
                  effects.
                </Text>
              )}
              <Text>Effects</Text>
              <Text>{entry.data.positive_effects}</Text>
              <Text>{entry.data.neutral_effects}</Text>
              <Text>{entry.data.negative_effects}</Text>
            </View>
          ),
        },
        {
          title: "",
          data: ["" as any],
          renderItem: ({}) => <MarkdownList str={str} />,
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
