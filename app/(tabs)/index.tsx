import React,{useState} from 'react';
import data from "../../assets/data/data.json";
import { Text, View, FlatList,Switch } from 'react-native';
import { styled } from 'nativewind';
import { risk, risk_to_bg } from '../util';
import { Link } from 'expo-router';

const StyledView = styled(View)
const StyledText = styled(Text)

const App = () => {
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const chosen = ['alcohol', 'cannabis', 'cocaine']
  const chart = [""].concat(chosen)
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
      <StyledText className="bg-cyan-400">test</StyledText>
      <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      <FlatList
        data={grid}
        numColumns={chart.length}
        renderItem={Item}
      />
    </StyledView>
  );
}

export default App;