import { risk_to_bg } from "@/lib/util";
import React, { Fragment } from "react";
import { Text, View } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

const KeySection = () => {
  return (
    <Fragment>
      <Text className="text-xl font-bold">Key</Text>
      <View className="flex flex-wrap flex-row">
        <Text
          className={`${risk_to_bg(
            "SR"
          )} text-m font-medium m-2 px-2.5 py-0.5 rounded w-32`}
        >
          Significant Risk
        </Text>
        <Text
          className={`${risk_to_bg(
            "GR"
          )} text-m font-medium m-2 px-2.5 py-0.5 rounded w-32`}
        >
          Greater Risk
        </Text>
        <Text
          className={`${risk_to_bg(
            "MR"
          )} text-m font-medium m-2 px-2.5 py-0.5 rounded w-32`}
        >
          Minor Risk
        </Text>
        <Text
          className={`${risk_to_bg(
            "LRS"
          )} text-m font-medium m-2 px-2.5 py-0.5 rounded w-32`}
        >
          Low Risk Synergy
        </Text>
        <Text
          className={`${risk_to_bg(
            "LRD"
          )} text-m font-medium m-2 px-2.5 py-0.5 rounded w-32`}
        >
          Low Risk Decrease
        </Text>
        <Text
          className={`${risk_to_bg(
            "LRNS"
          )} text-m font-medium m-2 px-2.5 py-0.5 rounded w-32`}
        >
          Low Risk No Synergy
        </Text>
      </View>
      <Text className="flex space-x-4">
        <AntDesign
          name="exclamationcircleo"
          size={24}
          color="black"
          className="h-7 w-7 inline"
        />
        = low confidence in the risk rating
      </Text>
      <View className="rounded-lg bg-gray-50">
        <Text>Risk = danger or hazard</Text>
        <Text>Synergy = increased effects, or new effects</Text>
        <Text>Decrease = reduced effects</Text>
      </View>
      <View className="m-1 text-gray-800">
        <Text className="text-xl font-bold">
          Psychoactive Combination Matrix
        </Text>
        <Text className="text-md font-bold">What this chart tells you</Text>
        <Text className="text-gray-500 mb-6">
          How risky it is when you combine two psychoactives.
        </Text>
        <Text className="text-md font-bold">How this chart works</Text>
        <Text className="text-gray-500">
          The coloured square where two psychoactives intersect on the grid is
          coded to show their combination risk.
        </Text>
        <Text className="text-gray-500">
          Select psychoactives below to show them on the grid, or select
          psychoactives or combinations in the chart to learn more.
        </Text>
      </View>
    </Fragment>
  );
};

export default KeySection;
