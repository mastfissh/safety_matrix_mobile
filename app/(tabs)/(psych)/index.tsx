import React from 'react';
import data from "../../../assets/data/data.json";
import psychoactives from "../../../assets/data/psychoactives.json";
import { combo, risk, drug_css_prefix, confidence, linkify } from "../../../assets/util";
import { Text, View,ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

const StyledView = styled(View)
const StyledText = styled(Text)
let idx = {} as any;
for (let sub of psychoactives) {
  idx[sub["slug"]] = sub;
}
let substances = [];
for (let drug of data["drugs"]) {
  let item = idx[linkify(drug)];
  substances.push(item);
}
const App = () => {
  console.debug(substances)
  return (
    <StyledView className="flex-1 items-center justify-center">

      <StyledView className="container px-6 mx-auto">
      <StyledView className="grid w-full gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      <ScrollView>
        {
          substances.map((substance) => (
            <StyledView key={substance.data.title}
              
              className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 h-auto"
            >
              <StyledView className="p-4 h-24">
              <Link href={{
                  pathname: '/details/[slug]',
                  params: { slug: substance.slug },
                }}
                  className="text-2xl font-bold tracking-tight text-gray-600">
                {substance.data.title}
              </Link>
                
              </StyledView>

            </StyledView>
          ))
        }
        </ScrollView>
      </StyledView>
    </StyledView>
    </StyledView>
  );
}

export default App;