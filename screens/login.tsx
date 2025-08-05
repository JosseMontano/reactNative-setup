import { useLinkTo } from "@react-navigation/native";
import { StyleSheet, Text, } from "react-native";


type ParamsType = {};
export const Login = ({}: ParamsType) => {
  const linkTo = useLinkTo();
  const Redirect = () => {
    linkTo("/Register");
  };

  return (

      <Text onPress={() => Redirect()}>login23</Text>
   
  );
};
const styles = StyleSheet.create({});
