import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { linkify } from "../../../lib/util";
import { cachedPsychs, cachedRisks } from "../../../lib/fetchData";

const preprocess = (data: any, data2: any) => {
  const psychoactives = data;
  let idx = {} as any;
  for (let sub of psychoactives) {
    idx[sub["slug"]] = sub;
  }
  let substances = [];
  for (let drug of data2["drugs"]) {
    let item = idx[linkify(drug)];
    substances.push(item);
  }
  return substances;
};

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const psychs = await cachedPsychs();
        const risks = await cachedRisks();
        const substances = preprocess(psychs, risks);
        setData(substances);
        setIsLoading(false);
      } catch (error) {
        console.debug("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, []);

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
    <View className="flex-1">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View className="p-2">
            <Link
              href={{
                pathname: "/details/[slug]",
                params: { slug: item.slug },
              }}
              className="flex-1 flex flex-col"
            >
              <ImageBackground
                source={{
                  uri: "i_" + (item.slug as string).replaceAll("-", "_"),
                }}
                className="w-full h-full rounded-lg p-2 flex-grow"
              >
                <Text className="bg-opacity-0"> {item.data.title}</Text>
              </ImageBackground>
            </Link>
          </View>
        )}
        className="grid grid-cols-3"
        numColumns={3}
      />
    </View>
  );
};

export default App;
