import React,{Fragment, useState} from 'react';
import data from "../../assets/data/data.json";
import { Text, View, FlatList,Switch } from 'react-native';
import { styled } from 'nativewind';
import { risk, risk_to_bg } from '../../lib/util';
import { Link } from 'expo-router';

const state = {
  checked_boxes: ['alcohol', 'cannabis', 'cocaine', 'ketamine'],
};
const App = () => {
  const [currentState, setState] = useState(state);
  const isChecked = (target: string) => {
    return (currentState.checked_boxes.includes(target));
  }
  const toggle = (target: string) => {
    const toggle2 = (checked: any) => {      
      let checked_boxes = JSON.parse(JSON.stringify(currentState.checked_boxes))
      if (checked) {
        checked_boxes.push(target)
      } else {
        checked_boxes = checked_boxes.filter((item: any) => item !== target)
      }
      setState({ checked_boxes });
    }
    return toggle2
  };
  const chart = [""].concat(currentState.checked_boxes)
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
    if (x == "") {
      return <View  ><Text className="text-slate-800 text-xl w-24">{y}</Text></View>;
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
      {state.checked_boxes.map(item => (
        <Fragment key={item}>
        <Text>{item}</Text>
      <Switch
        key={item}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggle(item)}
          value={isChecked(item)}
        />
        </Fragment>
      ))}
      <FlatList
        key={JSON.stringify(currentState.checked_boxes)}
        data={grid}
        numColumns={chart.length}
        renderItem={Item}
      />
    </View>
  );
}

export default App;