import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, radius, spacing } from "../../theme";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.neutral.black,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    marginTop: spacing.large,
  },
  detailContainer: {
    position: "absolute",
    bottom: spacing.xlarge,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.neutral.black,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    marginTop: -spacing.medium,
    borderTopLeftRadius: radius.medium,
    borderTopRightRadius: radius.medium,
  },
  heroImage: {
    width,
    height: (height * 2) / 3,
    marginTop: spacing.large,
    resizeMode: "cover",
  },

  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 35,
    marginHorizontal: spacing.small,
    paddingHorizontal: spacing.medium,
    paddingVertical: 6,
    marginBottom: spacing.mediumLarge,
    borderRadius: radius.medium,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderWidth: 1,
    borderColor: colors.neutral.white,
  },
  detailButtonText: {
    color: colors.neutral.white,
    fontSize: fonts.sizes.medium,
    lineHeight: 20,
    fontWeight: 500,
    marginLeft: spacing.tiny,
  },
  sectionContainer: {
    marginBottom: spacing.mediumLarge,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: spacing.small,
    marginBottom: spacing.small,
  },
  sectionTitle: {
    color: colors.neutral.white,
    fontSize: fonts.sizes.mediumLarge,
    lineHeight: 24,
    fontWeight: 500,
  },
  seeAllText: {
    color: colors.neutral.gray,
    fontSize: fonts.sizes.medium,
    opacity: 0.75,
  },
  flatListContent: {
    paddingHorizontal: spacing.tiny,
    paddingBottom: spacing.mediumLarge,
  },
  movieImage: {
    width: 110,
    height: 150,
    borderWidth: 0.25,
    borderRadius: radius.tiny,
    borderColor: colors.neutral.white,
    resizeMode: "cover",
    marginHorizontal: spacing.small,
  },
});
