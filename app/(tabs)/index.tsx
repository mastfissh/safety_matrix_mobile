import React, { Fragment, useState } from "react";
import data from "../../assets/data/data.json";
import psychoactives from "../../assets/data/psychoactives.json";
import {
  Text,
  View,
  FlatList,
  Switch,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { risk, risk_to_bg } from "../../lib/util";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

const list: any = {};
const mainlist: any[] = [];
const preselected = ["alcohol", "cannabis", "cocaine", "ketamine"];
for (let sub of psychoactives) {
  list[sub["slug"]] = preselected.includes(sub["slug"]);
  mainlist.push(sub["slug"]);
}

const state = {
  checked_boxes: list,
};
const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentState, setState] = useState(state);
  const isChecked = (target: string) => {
    return currentState.checked_boxes[target];
  };
  const toggle = (target: string) => {
    const toggle2 = (checked: any) => {
      let checked_boxes = JSON.parse(
        JSON.stringify(currentState.checked_boxes)
      );
      checked_boxes[target] = checked;
      setState({ checked_boxes });
    };
    return toggle2;
  };
  const chart = [""];
  for (const [key, val] of Object.entries(currentState.checked_boxes)) {
    if (val) {
      chart.push(key);
    }
  }
  const grid = [];
  for (const subcol of chart) {
    for (const subrow of chart) {
      grid.push([subcol, subrow]);
    }
  }
  type ItemProps = string[];
  const Item = ({ item }: { item: ItemProps }) => {
    item.sort();
    const [x, y] = item;
    if (x === "" || x === y) {
      return (
        <View>
          <Link
            href={{
              pathname: "/details/[slug]",
              params: { slug: y },
            }}
            className="text-slate-800 text-xl w-24"
          >
            {y}
          </Link>
        </View>
      );
    }
    let classes = " " + risk_to_bg(risk([x, y], data));
    return (
      <View className={classes}>
        <Link
          href={{
            pathname: "/combos/[combo]",
            params: { combo: `${x}|${y}` },
          }}
          className="text-slate-800 w-24"
        >
          {x}, {y}
        </Link>
      </View>
    );
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        className="modalView m-5 bg-white rounded-lg p-9 flex items-center shadow-lg shadow-black/25"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView className="p-4 rounded-lg bg-white shadow-md">
          <Pressable
            className="bg-fuchsia-600 p-2 rounded-lg"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white font-bold text-center">Hide Modal</Text>
          </Pressable>
          {mainlist.map((item) => (
            <Fragment key={JSON.stringify(item)}>
              <Text>{JSON.stringify(item)}</Text>
              <Switch
                key={JSON.stringify(item)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggle(item)}
                value={isChecked(item)}
              />
            </Fragment>
          ))}
        </ScrollView>
      </Modal>
      <Pressable
        className="bg-fuchsia-600 p-2 rounded-lg"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-bold text-center">Show Modal</Text>
      </Pressable>
      <FlatList
        key={JSON.stringify(chart)}
        data={grid}
        numColumns={chart.length}
        renderItem={Item}
      />
      <View className="container px-6 mx-auto">
        <View className="mb-2 text-gray-800">
          <View className="grow-0 shrink-0 basis-auto">
            <View className="max-w-2xl mx-auto">
              <Text className="text-xl font-bold mb-4">
                Psychoactive Combination Matrix
              </Text>
              <Text className="text-md font-bold mb-4">
                What this chart tells you
              </Text>
              <Text className="text-gray-500 mb-6">
                How risky it is when you combine two psychoactives.
              </Text>
              <Text className="text-md font-bold mb-4">
                How this chart works
              </Text>
              <Text className="text-gray-500 mb-6">
                The coloured square where two psychoactives intersect on the
                grid is coded to show their combination risk.
              </Text>
              <Text className="text-gray-500 mb-6">
                Select psychoactives below to show them on the grid, or select
                psychoactives or combinations in the chart to learn more.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="block rounded-lg my-6 bg-gray-50 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
        <Text className="text-xl font-bold">Key</Text>
        <Text>Risk = danger or hazard</Text>
        <Text>Synergy = increased effects, or new effects</Text>
        <Text>Decrease = reduced effects</Text>
      </View>
      <Text className="flex space-x-4">
      <AntDesign name="exclamationcircleo" size={24} color="black" className="h-7 w-7 inline" />
        = low confidence in the risk rating
      </Text>
      <View className="grid grid-cols-2 lg:grid-cols-3">
        <Text
          className={risk_to_bg("SR")}
          // className="text-m font-medium m-2 px-2.5 py-0.5 rounded"
        >
          Significant Risk
        </Text>
        <Text
          className={risk_to_bg("GR")}
          // className="text-m font-medium m-2 px-2.5 py-0.5 rounded"
        >
          Greater Risk
        </Text>
        <Text
          className={risk_to_bg("MR")}
          // className="text-m font-medium m-2 px-2.5 py-0.5 rounded"
        >
          Minor Risk
        </Text>
        <Text
          className={risk_to_bg("LRS")}
          // className="text-m font-medium m-2 px-2.5 py-0.5 rounded"
        >
          Low Risk Synergy
        </Text>
        <Text
          className={risk_to_bg("LRD")}
          // className="text-m font-medium m-2 px-2.5 py-0.5 rounded"
        >
          Low Risk Decrease
        </Text>
        <Text
          className={risk_to_bg("LRNS")}
          // className="text-m font-medium m-2 px-2.5 py-0.5 rounded"
        >
          Low Risk No Synergy
        </Text>
      </View>
    </View>
  );
};

export default App;
