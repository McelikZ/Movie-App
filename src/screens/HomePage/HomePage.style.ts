import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, radius, spacing } from "../../theme";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.neutral.black,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.medium,
    marginTop: spacing.small,
  },
  searchContainer: {
    marginHorizontal: spacing.medium,
    marginBottom: spacing.large,
  },
  contentContainer: {
    flex: 1,
  },
  searchOverlay: {
    position: "absolute",
    top: 125,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    maxHeight: 250,
    zIndex: 999,
    padding: 10,
  },
  sectionHeaderContainer: {
    marginVertical: spacing.small,
  },
  sectionHeaderTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: spacing.mediumLarge,
    marginBottom: spacing.small,
  },
  horizontalList: {
    paddingRight: spacing.medium,
  },

  profileButtonImage: {
    width: 45,
    height: 45,
    marginBottom: spacing.small,
    marginHorizontal: spacing.small,
  },
  horizontalListItem: {
    width: 110,
    height: 170,
    borderWidth: 0.25,
    borderRadius: radius.tiny,
    borderColor: colors.neutral.white,
    resizeMode: "cover",
  },

  searchInputContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: radius.large,
    paddingHorizontal: spacing.small,
    borderWidth: 1,
    borderColor: colors.neutral.black,
    height: 40,
    alignItems: "center",
  },
  searchInputWrapper: {
    backgroundColor: "transparent",
    width: 170,
    height: 40,
    marginBottom: spacing.mediumLarge,
  },
  searchTextInput: {
    color: colors.neutral.black,
    fontSize: fonts.sizes.medium,
    height: 35,
  },
  sectionHeaderTitle: {
    fontSize: fonts.sizes.mediumLarge, 
    color: colors.neutral.white,
    fontWeight: "500",
  },
  seeAllButtonText: {
    color:  colors.neutral.gray,
    fontSize: fonts.sizes.medium+2,
    opacity: 0.75,
  },
  movieItemTitle: {
    color: colors.neutral.white,
    textAlign: "center",
    width: 70,
    fontSize: fonts.sizes.medium,
    marginTop: 2,
  },

  movieItemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: spacing.tiny,
  },
  movieItemImage: {
    width: 70,
    height: 100,
    borderRadius: radius.tiny,
    borderWidth: 1,
    borderColor: colors.neutral.white
  },

  flatListSeparator: {
    width: 10,
  },
  loadingIndicator: {
    marginVertical: spacing.mediumLarge,
  },
});
