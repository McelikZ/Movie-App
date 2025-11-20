import {
  Text,
  View,
  ActivityIndicator,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";
import styles from "./Loader.style";
interface LoaderList {
  indicatorTextStyle?: StyleProp<TextStyle>;
  loaderText?: string;
  indicatorColor?:string;
}
const Loader: React.FC<LoaderList> = ({
  indicatorTextStyle = {},
  loaderText = "Loading...",
  indicatorColor='white',
}) => {
  return (
    <View style={styles.indicatorContainer}>
      <Text style={[styles.indicatorTextStyle, indicatorTextStyle]}>
        {loaderText}
      </Text>
      <ActivityIndicator
        size="large"
        color={indicatorColor}
        style={{ transform: [{ scale: 2 }] }}
      />
    </View>
  );
};
export default Loader;
