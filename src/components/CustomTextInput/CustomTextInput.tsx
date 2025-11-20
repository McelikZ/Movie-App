import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import styles from "./CustomTextInput.style";

interface CustomTextInputList {
  textTitle?: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  eyeIconOpen?: ImageSourcePropType;
  eyeIconClosed?: ImageSourcePropType;
  iconSource?: ImageSourcePropType;
  icon?: React.ReactNode; 

  labelPosition?: "top" | "inside";
  multiline?: boolean;
  onPress?: () => void;

  placeholderText?: string;
  placeholderFontSize?: number; 

  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
}

const CustomTextInput: React.FC<CustomTextInputList> = ({
  textTitle = "Default",
  value,
  onChangeText,
  isPassword = false,
  eyeIconOpen,
  eyeIconClosed,
  iconSource,
  icon,

  labelPosition = "top",
  multiline = false,
  onPress,

  placeholderText = "Optional",
  placeholderFontSize = 14, 

  containerStyle,
  textStyle,
  textInputStyle,
  iconStyle,
  inputWrapperStyle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const showLabelTop = labelPosition === "top";
  const showPlaceholderInside = labelPosition === "inside";

  const placeholder = showPlaceholderInside
    ? textTitle
    : showLabelTop
    ? placeholderText
    : "";

  const inputEditable = onPress ? false : true;

  return (
    <View style={[styles.container, containerStyle]}>
      {showLabelTop && <Text style={[styles.label, textStyle]}>{textTitle}</Text>}

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        style={[styles.inputWrapper, inputWrapperStyle]}
      >
        {iconSource && <Image source={iconSource} style={[styles.icon, iconStyle]} />}
        {icon && icon} 

        <TextInput
          style={[
            styles.input,
            textInputStyle,
            iconSource || isPassword || icon ? { marginLeft: 10 } : undefined,
            multiline && { textAlignVertical: "top" },
            { fontSize: placeholderFontSize }, 
          ]}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor="#4b3d2fff"
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={isPassword && !showPassword}
          editable={inputEditable}
          pointerEvents={onPress ? "none" : "auto"}
        />

        {isPassword && eyeIconOpen && eyeIconClosed && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeWrapper}>
            <Image source={showPassword ? eyeIconOpen : eyeIconClosed} style={styles.eyeIcon} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInput;
