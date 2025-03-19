import { risk, risk_to_bg } from "@/lib/util";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

interface GridCellProps {
  item: string[];
  psychs: { [key: string]: any };
  risks: any[];
  isLoading: boolean;
}

const GridCell = ({ item, psychs, risks, isLoading }: GridCellProps) => {
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
          className="text-slate-800 w-24"
        >
          {psychs[y]?.data?.title}
        </Link>
      </View>
    );
  }

  const classes = isLoading ? "p-1" : `${risk_to_bg(risk([x, y], risks))} p-1`;

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

export default GridCell;
