// Register.tsx
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { FocusFadeView } from "../components/focusFadeView";

export const Register = () => {
  const navigation = useNavigation();
  return (
    <FocusFadeView animation="slide">
      <Text onPress={() => navigation.navigate("Login" as never)}>
        Register Screen (tap to go to Login)
      </Text>
    </FocusFadeView>
  );
};
