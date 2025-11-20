import { StyleSheet } from "react-native";
import { colors,fonts,radius,spacing } from "../../theme/index";

export default StyleSheet.create({
  container: {
    width: "75%",
  },
  label: {
    fontSize: fonts.sizes.medium, 
    color: colors.text.secondary,
    marginBottom: spacing.tiny + spacing.smallMedium / 2, 
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral.black,
    borderRadius: radius.medium,
    paddingHorizontal: spacing.smallMedium, 
    backgroundColor: colors.neutral.white,
    height: spacing.large * 1.75, 
  },
  input: {
    flex: 1,
    fontSize: fonts.sizes.mediumLarge,
    color: colors.teal.dark,
    paddingVertical: spacing.tiny,
    paddingHorizontal: spacing.tiny,
  },
  icon: {
    width: spacing.medium,
    height: spacing.medium,
    resizeMode: "contain",
  },
  eyeWrapper: {
    padding: spacing.smallMedium / 2, 
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    width: spacing.medium,
    height: spacing.medium,
    resizeMode: "contain",
  },
});
