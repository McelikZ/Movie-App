import { StyleSheet } from "react-native";
import { colors, fonts, radius, spacing } from "../../theme/index";

export default StyleSheet.create({
  defaultButton: {
    width: 250,
    height:50,
    backgroundColor: colors.primary.dark,
    borderRadius: radius.medium,
  },
  defaultButtonText: {
    color: colors.primary.dark,
    fontSize: fonts.sizes.medium,
    fontWeight: fonts.weights.bold as any
  },
  defaultButtonImageStyle: {
    width: spacing.xxlarge,
    height: spacing.xxlarge,
  },
});
