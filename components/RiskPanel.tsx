import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Text } from "react-native";

let explainer: { [index: string]: any } = {};
explainer = {
  SR: "Significant risk: Danger! This is our most dangerous combination rating.",
  GR: "Greater risk: Careful... This combination has a fair chance of harm.",
  MR: "Minor risk: Watch out, this combination might have some unwanted effects.",
  LRS: "Low risk synergy: This combination will enhance the effects of each psychoactive, or sometimes give new effects.",
  LRD: "Low risk decrease: This combination will decrease the effects of one or both of these psychoactives.",
  LRNS: "Low risk no synergy: This combination won't do much more than the individual effects of the psychoactives involved.",
};

type Props = Omit<ComponentProps<typeof Link>, "href"> & { risk: string };

export function RiskPanel({ risk }: Props) {
  const out = explainer[risk];
  return <Text>{out}</Text>;
}
