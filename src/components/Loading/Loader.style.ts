import { StyleSheet } from "react-native";
import { colors, spacing, fonts } from "../../theme/index";

export default StyleSheet.create({
  indicatorContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:colors.status.loading,
    zIndex: 9999,
  },

  indicatorTextStyle: {
    marginBottom: spacing.small, 
    fontSize: fonts.sizes.large, 
    color: colors.neutral.white,
  },
});
