import React from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

type ModalPickerProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  mainlist: string[];
  psychs: { [key: string]: any };
  isChecked: (target: string) => boolean;
  toggle: (target: string) => void;
};

const ModalPicker = ({
  modalVisible,
  setModalVisible,
  mainlist,
  psychs,
  isChecked,
  toggle,
}: ModalPickerProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      className="modalView m-5 bg-white rounded-lg p-9 flex items-center shadow-lg shadow-black/25"
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="rounded-lg bg-white shadow-md m-1 p-2 ios:mt-12">
        <Pressable
          className="bg-violet-400 rounded-lg text-xl p-2 m-2"
          onPress={() => setModalVisible(false)}
        >
          <Text className="text-white font-bold text-center">Hide Picker</Text>
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
                      (isChecked(item) ? " bg-indigo-500 " : " bg-slate-50 ")
                    }
                  >
                    <Text
                      className={isChecked(item) ? "text-white" : "text-black"}
                    >
                      {psychs[item]?.data?.title}
                    </Text>
                  </View>
                </Pressable>
              )}
              keyExtractor={(item) => `item-${item}-${isChecked(item)}`}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPicker;
