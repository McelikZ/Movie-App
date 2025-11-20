import { StyleSheet } from "react-native";
import { colors, fonts, radius, spacing } from "../../theme";
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.neutral.black,
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.large,
  },
  title: {
    fontSize: fonts.sizes.large,
    fontWeight: "600",
    color: colors.neutral.white,
    margin: spacing.mediumLarge,
  },

  moviePoster: {
    width: 110,
    height: 170,
    borderRadius: radius.tiny,
    margin: spacing.tiny,
    borderWidth: 0.25,
    borderColor: colors.neutral.white,
  },

  loader: {
    marginTop: spacing.medium,
  },
  listContent: {
    paddingBottom: spacing.large,
  },

  emptyText: {
    color: colors.neutral.gray,
    fontSize: fonts.sizes.medium,
    opacity: 0.8,
  },
});
