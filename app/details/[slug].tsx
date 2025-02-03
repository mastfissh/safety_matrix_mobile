import { useLocalSearchParams } from "expo-router";
import {
  default as React,
  useCallback,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useMarkdown, type useMarkdownHookOptions } from "react-native-marked";
import { cachedPsychs, cachedRisks } from "../../lib/fetchData";

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
  if (!isLoading) {
    let idx = {} as any;
    for (let sub of data) {
      idx[sub["slug"]] = sub;
    }
    const { slug }: { slug: string } = useLocalSearchParams();
    const record = idx[slug];
    const entry = record;
    let placeholder = "";
    if (entry.data.family_members) {
      placeholder = ` ${entry.data.title} is not just one drug; ${
        entry.data.title
      } is a
              group of drugs. Drugs in this group include{" "}
              ${entry.data.family_members.join(", ")}. Drugs within the same
              group can have very different dosages and very different effects.`;
    }
    str = `
  ![${entry.data.image_caption}](${
      "i_" + (slug as string).replaceAll("-", "_")
    })
  *${entry.data.image_caption}*

    Details for ${record.data.title}
    ${entry.data.title}
    ${placeholder}
    Effects 
    ${entry.data.positive_effects}
    ${entry.data.neutral_effects}
    ${entry.data.negative_effects}
    ${record.body
      .replaceAll("import Chart from '../../components/chart.astro';", "")
      .replaceAll(
        "<Chart title={frontmatter.duration_chart_title} data={frontmatter.duration_chart} />",
        ""
      )}
  `;
  }

  const colorScheme = "light";
  const options: useMarkdownHookOptions = {
    colorScheme,
  };
  const rnElements = useMarkdown(str, options);

  const renderItem = useCallback(({ item }: { item: ReactNode }) => {
    return item as ReactElement;
  }, []);

  const keyExtractor = useCallback(
    (_: ReactNode, index: number) => index.toString(),
    []
  );
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
    <FlatList
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={8}
      initialNumToRender={8}
      style={{
        backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
      }}
      data={rnElements}
      renderItem={renderItem}
    />
  );
};

export default App;
