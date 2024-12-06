import React,{Fragment, useState} from 'react';
import data from "../../assets/data/data.json";
import psychoactives from "../../assets/data/psychoactives.json";
import { Text, View, FlatList,Switch, ScrollView } from 'react-native';
import { risk, risk_to_bg } from '../../lib/util';
import { Link } from 'expo-router';

const list :any = {}
const mainlist: any[] = []
const preselected = ['alcohol', 'cannabis', 'cocaine', 'ketamine']
for (let sub of psychoactives) {
  list[sub["slug"]] = preselected.includes(sub["slug"])
  mainlist.push(sub["slug"])
}

const state = {
  checked_boxes: list,
};
const App = () => {
  const [currentState, setState] = useState(state);
  const isChecked = (target: string) => {
    return (currentState.checked_boxes[target]);
  }
  const toggle = (target: string) => {
    const toggle2 = (checked: any) => {    
      let checked_boxes = JSON.parse(JSON.stringify(currentState.checked_boxes))
      checked_boxes[target] = checked
      setState({ checked_boxes });
    }
    return toggle2
  };
  const chart = [""]
  for (const [key, val] of Object.entries(currentState.checked_boxes)) {
    if (val){
      chart.push(key)
    }
  }
  const grid = [];
  for (const subcol of chart){
    for (const subrow of chart){
      grid.push([subcol, subrow] )
    }
  }
  type ItemProps = string[]
  const Item = ({ item }: { item: ItemProps }) => {
    item.sort()
    const [x, y] = item;
    if ((x == "") || (x==y)) {
      return <View  ><Link href={{
        pathname: '/details/[slug]',
        params: { slug: y },
      }}
      className="text-slate-800 text-xl w-24">
      {y}
    </Link></View>;
    }
    let classes = " " + risk_to_bg(risk([x,y], data))
    return <View className={classes}>
        <Link href={{
                  pathname: '/combos/[combo]',
                  params: { combo: `${x}|${y}` },
                }}
                className="text-slate-800 w-24">
                {x}, {y}
              </Link>
      </View>;
  };
  return (
    <View className="flex-1 items-center justify-center">
      <ScrollView>
      {mainlist.map(item => (
        <Fragment key={JSON.stringify(item)}>
        <Text>{JSON.stringify(item)}</Text>
      <Switch
        key={JSON.stringify(item)}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggle(item)}
          value={isChecked(item)}
        />
        </Fragment>
      ))}</ScrollView>
      <FlatList
        key={JSON.stringify(chart)}
        data={grid}
        numColumns={chart.length}
        renderItem={Item}
      />
    </View>
  );
}

export default App;