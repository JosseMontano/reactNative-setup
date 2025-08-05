import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


interface SafeAreaWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export const SafeAreaWrapper = ({ children, style, ...props }: SafeAreaWrapperProps) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 3,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export const withSafeArea = (Component: React.ComponentType) => {
  return (props: any) => (
    <SafeAreaWrapper>
      <Component {...props} />
    </SafeAreaWrapper>
  );
};
