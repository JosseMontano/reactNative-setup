import {  useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
type ParamsType = {};

export const Form1 = ({}: ParamsType) => {
  const navigation = useNavigation();

  return (
    <Text onPress={() => navigation.navigate("Form1" as never)}>
      <Text>Form1 </Text>
    </Text>
  );
};
const styles = StyleSheet.create({});
