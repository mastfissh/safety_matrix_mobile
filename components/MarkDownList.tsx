import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { useMarkdown, type useMarkdownHookOptions } from "react-native-marked";

const MarkdownList = ({ str }: { str: string }) => {
  const colorScheme = "light";
  const options: useMarkdownHookOptions = {
    colorScheme,
  };
  const rnElements = useMarkdown(str, options);

  const renderItem = useCallback(({ item }: { item: React.ReactNode }) => {
    return <View>{item}</View>;
  }, []);

  const keyExtractor = useCallback(
    (_: any, index: { toString: () => any }) => index.toString(),
    []
  );

  return (
    <View className="m-2">
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
    </View>
  );
};

export default MarkdownList;
