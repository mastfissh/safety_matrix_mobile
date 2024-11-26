import React,{Fragment, useState} from 'react';
import data from "../../assets/data/data.json";
import { Text, View, FlatList,Switch } from 'react-native';
import { styled } from 'nativewind';
import { risk, risk_to_bg } from '../util';
import { Link } from 'expo-router';

const StyledView = styled(View)
const StyledText = styled(Text)
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
      return <View  ><StyledText className="text-slate-800 text-xl w-24">{y}</StyledText></View>;
    }
    let classes = " " + risk_to_bg(risk([x,y], data))
    return <StyledView className={classes}>
        <Link href={{
                  pathname: '/combos/[combo]',
                  params: { combo: `${x}|${y}` },
                }}
                className="text-slate-800 w-24">
                {x}, {y}
              </Link>
      </StyledView>;
  };
  return (
    <StyledView className="flex-1 items-center justify-center">
      {state.checked_boxes.map(item => (
        <Fragment key={item}>
        <StyledText className="bg-cyan-400">{item}</StyledText>
      <Switch
        key={item}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
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
    </StyledView>
  );
}

export default App;