// screens/FavoritePage/FavoritePage.style.ts
import { StyleSheet } from "react-native";
import { colors, fonts, radius, spacing } from "../../theme";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.neutral.black,
  },
  title: {
    color: colors.neutral.white,
    fontSize: fonts.sizes.large + 4,
    fontWeight: "bold",
    marginBottom: spacing.mediumLarge,
    marginLeft: spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral.black,
  },
  loadingText: {
    color: colors.neutral.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral.black,
  },
  emptyText: {
    color: colors.neutral.white,
  },
  flatListContent: {
    paddingBottom: spacing.large,
  },
  moviePoster: {
    width: 110,
    height: 170,
    borderRadius: radius.tiny,
    margin: spacing.tiny,
    borderWidth: 0.25,
    borderColor: colors.neutral.white,
  },
});
