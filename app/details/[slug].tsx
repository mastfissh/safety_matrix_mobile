import React, {
	useCallback,
	type ReactElement,
	type ReactNode,
} from "react";
import psychoactives from "../../assets/data/psychoactives.json";
import { FlatList } from "react-native";
import { useMarkdown, type useMarkdownHookOptions } from "react-native-marked";
import { useLocalSearchParams } from "expo-router";

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
  let placeholder = "";
  if (entry.data.family_members) {
    placeholder = ` ${entry.data.title} is not just one drug; ${
      entry.data.title
    } is a
              group of drugs. Drugs in this group include{" "}
              ${entry.data.family_members.join(", ")}. Drugs within the same
              group can have very different dosages and very different effects.`;
  }
  const str = `
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
  const colorScheme = "light";
  const options: useMarkdownHookOptions = {
    colorScheme
  }
	const rnElements = useMarkdown(str,options);

	const renderItem = useCallback(({ item }: { item: ReactNode }) => {
		return item as ReactElement;
	}, []);

	const keyExtractor = useCallback(
		(_: ReactNode, index: number) => index.toString(),
		[],
	);
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
    // <Markdown
    //   value={str}
    //   flatListProps={{
    //     initialNumToRender: 8,      
    //   }}
    // />
  );
};

export default App;
