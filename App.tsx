// App.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Login} from './screens/login';
import {Register} from './screens/register';
import {Text, } from "react-native";
import { withSafeArea } from './components/safeArea';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#007AFF', // Active tab color
            tabBarInactiveTintColor: '#8E8E93', // Inactive tab color
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: '#ccc',
              height: 60, // Match your custom footer height
            },
          }}
        >
          <Tab.Screen 
            name="Login" 
            component={withSafeArea(Login)}
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: ({ color }) => (
                <Text style={{ color }}>👤</Text> // Replace with your icon
              ),
            }}
          />
          <Tab.Screen 
            name="Register" 
            component={withSafeArea(Register)}
            options={{
              tabBarLabel: 'Register',
              tabBarIcon: ({ color }) => (
                <Text style={{ color }}>📝</Text> // Replace with your icon
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}