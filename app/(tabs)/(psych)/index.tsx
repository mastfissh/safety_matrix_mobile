import { cachedPsychs, cachedRisks } from "@/lib/fetchData";
import { linkify } from "@/lib/util";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from "react-native";

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
    <View className="flex flex-wrap justify-center flex-row">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/details/[slug]",
              params: { slug: item.slug },
            }}
          >
            <View className="p-2 w-36 h-12 m-1 rounded-lg p-1 border-solid border-2 border-slate-200">
              <Text className="bg-opacity-1"> {item.data.title}</Text>
            </View>
          </Link>
        )}
        numColumns={3}
      />
    </View>
  );
};

export default App;
