// Login.tsx
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { FocusFadeView } from "../components/focusFadeView";

export const Login = () => {
  const navigation = useNavigation();
  return (
    <FocusFadeView animation="slide">
      <Text onPress={() => navigation.navigate("Form1" as never)}>
        Login Screen (tap to go to Register)
      </Text>
    </FocusFadeView>
  );
};
