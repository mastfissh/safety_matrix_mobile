import KeySection from "@/components/KeySection";
import ModalPicker from "@/components/ModalPicker";
import {
  cachedPsychs,
  cachedRisks,
  gridState,
  saveGridState,
} from "@/lib/fetchData";
import { risk, risk_to_bg } from "@/lib/util";
import { Link } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  View
} from "react-native";

const App = () => {
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
  }, [currentState, isLoading]);
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
  const Cell = ({ item }: { item: ItemProps }) => {
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
        <ModalPicker
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          mainlist={mainlist}
          psychs={psychs}
          isChecked={isChecked}
          toggle={toggle}
        />

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
                        renderItem={Cell}
                      />
                    ),
                  },
                ]}
                renderSectionHeader={({ section: { title } }) => (
                  <Text className="text-lg font-bold">{title}</Text>
                )}
                keyExtractor={(_, index) => index.toString()}
              />

              <KeySection />
            </ScrollView>
          </Fragment>
        )}
      </View>
    </Fragment>
  );
};

export default App;
