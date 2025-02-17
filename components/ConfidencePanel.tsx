import { Link } from 'expo-router';
import { type ComponentProps } from 'react';
import { Text} from 'react-native';

let explainer: {[index: string]:any} = {}
explainer = {
  "Low confidence":
    "Low confidence: This risk rating could be wrong, we don't know much about this combination.",
  "Medium confidence":
    "Medium confidence: We're pretty sure this risk rating is right, but we aren't certain.",
  "High confidence":
    "High confidence: There is good evidence to support the risk rating of this combination.",
};


type Props = Omit<ComponentProps<typeof Link>, 'href'> & { conf: string };

export function ConfidencePanel({conf}: Props) {
  const out= explainer[conf]
  return (
    <Text>
      {out}
    </Text>
      
  );
}
