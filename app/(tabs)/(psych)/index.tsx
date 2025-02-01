import { Link } from "expo-router";
import React from "react";
import { FlatList, ImageBackground, Text, View } from "react-native";
import data from "../../../assets/data/data.json";
import psychoactives from "../../../assets/data/psychoactives.json";
import { linkify } from "../../../lib/util";

let idx = {} as any;
for (let sub of psychoactives) {
  idx[sub["slug"]] = sub;
}
let substances = [];
for (let drug of data["drugs"]) {
  let item = idx[linkify(drug)];
  substances.push(item);
}

const App = () => {
  return (
    <View className="flex-1">
      <FlatList
        data={substances}
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
