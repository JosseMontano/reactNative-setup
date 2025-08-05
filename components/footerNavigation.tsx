import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  // Add other screens here
};

type FooterNavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const FooterNavigation = () => {
  const navigation = useNavigation<FooterNavigationProps>();
  const route = useRoute(); // Get current route info

  // Check if current route matches tab
  const isActive = (routeName: keyof RootStackParamList) => {
    return route.name === routeName;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.tab,
          isActive('Login') && styles.activeTab
        ]} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={isActive('Login') ? styles.activeText : styles.inactiveText}>
          Login
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.tab,
          isActive('Register') && styles.activeTab
        ]} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={isActive('Register') ? styles.activeText : styles.inactiveText}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF', // iOS system blue
  },
  activeText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#8E8E93', // iOS system gray
  },
});