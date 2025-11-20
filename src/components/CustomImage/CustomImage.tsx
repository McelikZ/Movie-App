import React, { useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageResizeMode,
} from "react-native";
import styles from "./CustomImage.style";

interface CustomImageList {
  source?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  placeholderSource?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  accessibilityLabel?: string;
  imageText?: string;
  textStyle?: StyleProp<TextStyle>;
  flexDirection?: "row" | "column";
}

const CustomImage: React.FC<CustomImageList> = ({
  source,
  containerStyle,
  imageStyle={},
  placeholderSource,
  resizeMode = "contain",
  accessibilityLabel = "",
  imageText,
  textStyle,
  flexDirection = "row",
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={[{ flexDirection }, containerStyle]}>
      {loading && !error && <ActivityIndicator size="small" color="#999" />}
      <Image
        source={error && placeholderSource ? placeholderSource : source}
        style={[styles.defaultCustomImage, imageStyle]}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
      />
      {imageText && (
        <Text style={[styles.textStyle, textStyle]}>{imageText}</Text>
      )}
    </View>
  );
};

export default CustomImage;
