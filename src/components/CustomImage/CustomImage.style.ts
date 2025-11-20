import { StyleSheet } from "react-native";
import { colors, fonts, spacing } from "../../theme/index";

export default StyleSheet.create({
  defaultCustomImage: {
    width: "100%",
    height: 300,
  },
  textStyle: {
    fontSize: fonts.sizes.large,
    color: colors.neutral.white,
    fontWeight: fonts.weights.bold as any,
  },
});
