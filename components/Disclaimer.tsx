import React from "react";
import { Text, View } from "react-native";

const Disclaimer = () => {
  return (
    <View className="rounded-lg my-6 bg-red-50 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
      <Text className="mb-2 text-xl font-medium leading-tight text-neutral-800">
        Disclaimer
      </Text>
      <Text className="mb-4 text-base text-neutral-600">
        This app may contain errors. If you find one, please help us fix it.
      </Text>
      <Text className="mb-4 text-base text-neutral-600">
        Psychoactive use is embedded in cultural and environmental contexts and
        should be treated with caution and respect.
      </Text>
      <Text className="mb-4 text-base text-neutral-600">
        We promote psychoactive science and do not endorse illegal activity. We
        are fully compliant with NSW and federal Australian law.
      </Text>
    </View>
  );
};

export default Disclaimer;
