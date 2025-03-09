import Disclaimer from "@/components/Disclaimer";
import {
  cachedPsychs,
  cachedRisks,
  gridState,
  saveGridState,
} from "@/lib/fetchData";
import { risk, risk_to_bg } from "@/lib/util";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  SectionList,
  Text,
  View,
  ScrollView,
} from "react-native";

const selectToBg = (selected: boolean) => {
  return selected ? " bg-indigo-500 " : " bg-slate-50 ";
};

const selectToText = (selected: boolean) => {
  return selected ? " color-white " : " color-black ";
};

const App = () => {
  const iosClass = Platform.OS === "android" ? "" : " mt-12 ";
  const [mainlist, setMainlist] = useState<any[]>([]);
  const [risks, setRisks] = useState<any[]>([]);
  const [psychs, setPsychs] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentState, setState] = useState<{
    checked_boxes: { [key: string]: boolean };
  }>({ checked_boxes: {} });
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const psychs = await cachedPsychs();
        let idx = {} as any;
        for (let sub of psychs) {
          idx[sub["slug"]] = sub;
        }
        const risks = await cachedRisks();
        const preselected = await gridState();
        const list: any = {};
        const mainlist: any[] = [];
        for (let sub of psychs) {
          list[sub["slug"]] = preselected.includes(sub["slug"]);
          mainlist.push(sub["slug"]);
        }
        const state = {
          checked_boxes: list,
        };
        setRisks(risks);
        setState(state);
        setPsychs(idx);
        setMainlist(mainlist);
        setIsLoading(false);
      } catch (error) {
        console.debug("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, []);

  const isChecked = (target: string) => {
    return currentState.checked_boxes[target];
  };
  const toggle = (target: string) => {
    setState((prev) => ({
      checked_boxes: {
        ...prev.checked_boxes,
        [target]: !prev.checked_boxes[target],
      },
    }));
  };
  useEffect(() => {
    if (isLoading) {
      return;
    }
    const saved = [];
    for (const [key, val] of Object.entries(currentState.checked_boxes)) {
      if (val) {
        saved.push(key);
      }
    }
    saveGridState(saved);
  }, [currentState]);
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
        <View className="bg-slate-50 p-1">
          <Link
            href={{
              pathname: "/details/[slug]",
              params: { slug: y },
            }}
            className="text-slate-800 w-24 "
          >
            {psychs[y]?.data?.title}
          </Link>
        </View>
      );
    }
    let classes = " ";
    if (!isLoading) {
      classes = `${risk_to_bg(risk([x, y], risks))} p-1`;
    }
    return (
      <View className={classes}>
        <Link
          href={{
            pathname: "/combos/[combo]",
            params: { combo: `${x}|${y}` },
          }}
          className="text-slate-800 w-24"
        >
          {psychs[x]?.data?.title} + {psychs[y]?.data?.title}
        </Link>
      </View>
    );
  };

  return (
    <Fragment>
      <View className="flex-1 m-2">
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          className={`modalView m-5 bg-white rounded-lg p-9 flex items-center shadow-lg shadow-black/25 `}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className={`rounded-lg bg-white shadow-md m-1 p-2 ${iosClass}`}>
            <Pressable
              className="bg-violet-400 rounded-lg text-xl p-2 m-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-bold text-center">
                Hide Picker
              </Text>
            </Pressable>
            <View className="container">
              <View className="flex flex-wrap justify-center flex-row">
                <FlatList
                  data={mainlist}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <Pressable
                      onPressIn={() => toggle(item)}
                      unstable_pressDelay={50}
                    >
                      <View
                        className={
                          "w-36 h-12 m-1 rounded-lg p-1 border-solid border-2 border-slate-200" +
                          selectToBg(isChecked(item))
                        }
                      >
                        <Text className={" " + selectToText(isChecked(item))}>
                          {psychs[item]?.data?.title}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                  keyExtractor={(item) => {
                    return `item-${item}-${isChecked(item)}`;
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Pressable
          className="bg-violet-400 p-2 m-2 rounded-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white font-bold text-center">Show Picker</Text>
        </Pressable>
        {!modalVisible && (
          <Fragment>
            <ScrollView className="container">
              <SectionList
                horizontal={true}
                sections={[
                  {
                    title: "",
                    data: [grid],
                    renderItem: ({ item }) => (
                      <FlatList
                        key={JSON.stringify(chart)}
                        data={item}
                        numColumns={chart.length}
                        renderItem={Item}
                      />
                    ),
                  },
                ]}
                renderSectionHeader={({ section: { title } }) => (
                  <Text className="text-lg font-bold">{title}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />

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
                <Text className="text-md font-bold">
                  What this chart tells you
                </Text>
                <Text className="text-gray-500 mb-6">
                  How risky it is when you combine two psychoactives.
                </Text>
                <Text className="text-md font-bold">How this chart works</Text>
                <Text className="text-gray-500">
                  The coloured square where two psychoactives intersect on the
                  grid is coded to show their combination risk.
                </Text>
                <Text className="text-gray-500">
                  Select psychoactives below to show them on the grid, or select
                  psychoactives or combinations in the chart to learn more.
                </Text>
                <Disclaimer />
              </View>
            </ScrollView>
          </Fragment>
        )}
      </View>
      {/* <View className="container">
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
      <Text className="text-md font-bold">
        What this chart tells you
      </Text>
      <Text className="text-gray-500 mb-6">
        How risky it is when you combine two psychoactives.
      </Text>
      <Text className="text-md font-bold">
        How this chart works
      </Text>
      <Text className="text-gray-500">
        The coloured square where two psychoactives intersect on
        the grid is coded to show their combination risk.
      </Text>
      <Text className="text-gray-500">
        Select psychoactives below to show them on the grid, or
        select psychoactives or combinations in the chart to
        learn more.
      </Text>
    </View>
  </View>
  <Disclaimer /> */}
    </Fragment>
  );
};

export default App;
