// Login.tsx
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { FocusFadeView } from "../../components/focusFadeView";

export const Login = () => {
  const navigation = useNavigation();
  return (
    <FocusFadeView animation="slide">
      <Text onPress={() => navigation.navigate("Roles" as never)}>ROLES</Text>
      <Text onPress={() => navigation.navigate("Posts" as never)}>POSTS</Text>
    </FocusFadeView>
  );
};
