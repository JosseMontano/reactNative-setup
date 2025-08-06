// components/FocusFadeView.tsx
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, ReactNode } from "react";
import { Animated, ViewStyle, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  duration?: number;
  animation?: "fade" | "slide";
};

export const FocusFadeView: React.FC<Props> = ({
  children,
  style,
  duration = 300,
  animation = "fade",
}) => {
  const isFocused = useIsFocused();
  const fade = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const translateX = useRef(new Animated.Value(isFocused ? 0 : width)).current;

  useEffect(() => {
    if (animation === "fade") {
      Animated.timing(fade, {
        toValue: isFocused ? 1 : 0,
        duration,
        useNativeDriver: true,
      }).start();
    } else if (animation === "slide") {
      Animated.timing(translateX, {
        toValue: isFocused ? 0 : width,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused, animation, duration, fade, translateX]);

  const animatedStyle: any =
    animation === "fade"
      ? { opacity: fade }
      : { transform: [{ translateX }] };

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};
