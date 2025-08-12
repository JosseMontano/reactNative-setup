// App.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "./screens/login/login";
import { Register } from "./screens/register/register";
import { Form1 } from "./screens/roles/roles";
import { Text } from "react-native";
import { withSafeArea } from "./components/safeArea";

// Define your root stack param list for type safety
type RootStackParamList = {
  Tabs: undefined;
  Form1: undefined;
};

type TabParamList = {
  Login: undefined;
  Register: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Main tab navigator (only contains tabs you want to show)
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={withSafeArea(Login)}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text>,
        }}
      />
      <Tab.Screen
        name="Register"
        component={withSafeArea(Register)}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: ({ color }) => <Text style={{ color }}>📝</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Form1" component={withSafeArea(Form1)} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
