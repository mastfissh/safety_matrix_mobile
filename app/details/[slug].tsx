import Disclaimer from "@/components/Disclaimer";
import { cachedPsychs } from "@/lib/fetchData";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SectionList,Image, Text, View } from "react-native";
import { Image as ImageExpo } from "expo-image";

const App = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Details" });
  }, [navigation]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const psychs = await cachedPsychs();
        setData(psychs);
        setIsLoading(false);
      } catch (error) {
        console.debug("Error fetching data:", error);
        setIsLoading(false);
        setError(error);
      }
    };

    fetchAndSetData();
  }, []);

  const { slug }: { slug: string } = useLocalSearchParams();
  let entry = {} as any;
  if (!isLoading) {
    let idx = {} as any;
    for (let sub of data) {
      idx[sub["slug"]] = sub;
    }
    entry = idx[slug];
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
              
              <View className="p-4">
                <Text className="text-lg font-bold mb-4">
                  {entry.data.dosage_table.title}
                </Text>
                <View className="flex flex-row justify-between mb-2 border-b border-gray-300">
                  <Text className="text-center w-1/2">Effect</Text>
                  <Text className="text-center w-1/2">Dose</Text>
                </View>
                <View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Threshold</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.dosage_table.threshold}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Light</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.dosage_table.light}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Common</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.dosage_table.common}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Strong</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.dosage_table.strong}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Heavy</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.dosage_table.heavy}
                    </Text>
                  </View>
                </View>
              </View>
              <Image
                source={{
                  uri: `https://psychcombo.com/charts/${slug}.png`,
                }}
                className="h-64 w-full rounded-lg p-2"
              />
              <View className="p-4">
                <Text className="text-lg font-bold mb-4">
                  {entry.data.duration_chart_title}
                </Text>
                <View className="flex flex-row justify-between mb-2 border-b border-gray-300">
                  <Text className="text-center w-1/2"></Text>
                  <Text className="text-center w-1/2">Duration</Text>
                </View>
                <View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Total</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.duration_chart.total}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Onset</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.duration_chart.onset}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Coming Up</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.duration_chart.coming_up}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Plateau</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.duration_chart.plateau}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between py-2 border-b border-gray-300">
                    <Text className="text-center w-1/2">Coming Down</Text>
                    <Text className="text-center w-1/2">
                      {entry.data.duration_chart.coming_down}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ),
        },
        {
          title: "",
          data: ["" as any],
          renderItem: (_) => <Disclaimer />,
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
