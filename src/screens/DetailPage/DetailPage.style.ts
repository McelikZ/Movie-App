import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, radius, spacing } from "../../theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.neutral.black,
  },
  headerContainer: {
    position: "absolute",
    top: spacing.medium,
    left: spacing.medium,
    flexDirection: "row",
    alignItems: "center",
  },
  movieActionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: spacing.tiny,
    marginTop: spacing.large,
  },
  favoriteButtonsContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  movieInfoContainer: {
    marginHorizontal: spacing.medium,
    marginTop: spacing.tiny,
  },
  footerContainer: {
    marginTop: spacing.small,
    marginHorizontal: spacing.tiny,
    paddingBottom: spacing.tiny,
  },
  castContainer: {
    marginTop: spacing.mediumLarge,
    marginHorizontal: spacing.medium,
  },
  castItem: {
    alignItems: "center",
    marginRight: spacing.medium,
  },
  videoThumbnail: {
    width: width,
    height: 200,
    borderRadius: radius.medium,
  },
  playButton: {
    flexDirection: "row",
    marginVertical: spacing.medium,
    width: width - spacing.large * 1.25,
    height: 40,
    backgroundColor: colors.neutral.gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.large,
  },

  movieTitle: {
    color: colors.neutral.white,
    fontSize: fonts.sizes.large,
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    flexShrink: 1,
    marginLeft: spacing.small,
  },

  infoText: {
    color: colors.neutral.white,
    fontSize: fonts.sizes.medium,
    marginTop: spacing.tiny,
  },
  castName: {
    color: colors.neutral.white,
    fontSize: fonts.sizes.small,
    width: 80,
    textAlign: "center",
  },
  playButtonText: {
    fontSize: fonts.sizes.medium,
    color: colors.neutral.white,
    marginLeft: spacing.small,
  },

  castImage: {
    width: 80,
    height: 120,
    borderRadius: radius.massive,
    marginBottom: spacing.tiny,
  },
});
