import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/login";
import { Register } from "./screens/register";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { withSafeArea } from "./components/safeArea";


type Root = { Login: undefined; Register: undefined };
const Stack = createNativeStackNavigator<Root>();

export function App() {

  return (
    <NavigationContainer>
      <SafeAreaProvider>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={withSafeArea(Login)} />
            <Stack.Screen name="Register" component={withSafeArea(Register)} />
          </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
