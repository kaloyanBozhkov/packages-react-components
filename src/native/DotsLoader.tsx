import * as React from "react";
import { useEffect, useMemo } from "react";
import { View, Animated, StyleSheet, type ViewStyle } from "react-native";

type Modifier = "primary" | "primaryBordered" | "secondary" | "tertiary";
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type DotsLoaderProps = {
  modifier?: Modifier;
  size?: Size;
  dotsBg?: string;
  style?: ViewStyle;
};

const COLORS = {
  primary: "#FFFFFF",
  primaryBordered: "#FFFFFF",
  secondary: "#000000",
  tertiary: "#737373", // neutral-550
};

const SCALES = {
  xs: 0.65,
  sm: 0.7,
  md: 0.8,
  lg: 1,
  xl: 1.05,
  xxl: 1.1,
};

export const DotsLoader = ({
  modifier = "primary",
  size = "md",
  dotsBg,
  style,
}: DotsLoaderProps) => {
  const [dot1Scale, dot2Position, dot3Position, dot4Scale] = useMemo(
    () => [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(1),
    ],
    []
  );

  useEffect(() => {
    const scaleInAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1Scale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dot1Scale, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const move24pxDot2 = Animated.loop(
      Animated.sequence([
        Animated.timing(dot2Position, {
          toValue: 24,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Position, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const move24pxDot3 = Animated.loop(
      Animated.sequence([
        Animated.timing(dot3Position, {
          toValue: 24,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Position, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const scaleOutAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(dot4Scale, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dot4Scale, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    scaleInAnimation.start();
    move24pxDot2.start();
    move24pxDot3.start();
    scaleOutAnimation.start();

    return () => {
      scaleInAnimation.stop();
      move24pxDot2.stop();
      move24pxDot3.stop();
      scaleOutAnimation.stop();
    };
  }, [dot1Scale, dot2Position, dot3Position, dot4Scale]);

  const scale = SCALES[size];
  const backgroundColor = dotsBg || COLORS[modifier];

  const dotBaseStyle = [
    styles.dot,
    {
      backgroundColor,
      transform: [{ scale }],
    },
  ];

  const borderedStyle =
    modifier === "primaryBordered"
      ? {
          shadowColor: "rgba(255,255,255,0.5)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation: 2,
        }
      : {};

  return (
    <View style={[styles.container, { transform: [{ scale }] }, style]}>
      <Animated.View
        style={[
          dotBaseStyle,
          borderedStyle,
          styles.dot1,
          {
            transform: [{ scale: dot1Scale }, { scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          dotBaseStyle,
          borderedStyle,
          styles.dot2,
          {
            transform: [{ translateX: dot2Position }, { scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          dotBaseStyle,
          borderedStyle,
          styles.dot3,
          {
            transform: [{ translateX: dot3Position }, { scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          dotBaseStyle,
          borderedStyle,
          styles.dot4,
          {
            transform: [{ scale: dot4Scale }, { scale }],
          },
        ]}
      />
    </View>
  );
};

DotsLoader.displayName = "DotsLoader";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 13,
    width: 80,
  },
  dot: {
    position: "absolute",
    top: 0,
    height: 13,
    width: 13,
    borderRadius: 13 / 2,
  },
  dot1: {
    left: 8,
    zIndex: 1,
  },
  dot2: {
    left: 8,
    zIndex: 0,
  },
  dot3: {
    left: 32,
    zIndex: 2,
  },
  dot4: {
    left: 56,
    zIndex: 1,
  },
});

export default DotsLoader;
