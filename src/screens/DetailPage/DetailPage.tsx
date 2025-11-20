import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSelector } from "@reduxjs/toolkit";

import { fetchMovie } from "../../redux/movieThunk";
import type { RootState, AppDispatch } from "../../redux/store";
import { CustomButton } from "../../components";
import styles from "./DetailPage.style";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const { width } = Dimensions.get("window");

type Props = {
  route: { params: { movieId: number; movieTitle?: string } };
  navigation: any;
};

const endpoints = [
  "popular",
  "top_rated",
  "upcoming",
  "now_playing",
  "discover/movie?primary_release_year=2025",
  "discover/movie?primary_release_date.gte=2025-08-01&primary_release_date.lte=2025-08-31",
  "discover/movie?with_genres=28",
  "discover/movie?with_genres=35",
];

const selectAllMovies = createSelector(
  (state: RootState) => state.movie.moviesByEndpoint,
  (_: RootState, endpoints: string[]) => endpoints,
  (moviesByEndpoint, endpoints) => {
    return endpoints.map((ep) => moviesByEndpoint[ep] || []).flat();
  }
);

const selectLoading = createSelector(
  (state: RootState) => state.movie.loadingByEndpoint,
  (_: RootState, endpoints: string[]) => endpoints,
  (loadingByEndpoint, endpoints) => {
    return endpoints.some((ep) => loadingByEndpoint[ep]);
  }
);

const DetailPage: React.FC<Props> = ({ route, navigation }) => {
  const { movieId } = route.params;
  const dispatch: AppDispatch = useDispatch();

  const allMovies = useSelector((state: RootState) =>
    selectAllMovies(state, endpoints)
  );
  const allLoading = useSelector((state: RootState) =>
    selectLoading(state, endpoints)
  );

  const movieDetail = allMovies.find((m) => m.id === movieId);

  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);

  const firstVideoKey = movieDetail?.videos?.results[0]?.key;

  useEffect(() => {
    endpoints.forEach((ep) => {
      if (!allMovies.some((m) => m.id === movieId)) {
        dispatch(fetchMovie({ endpoint: ep }));
      }
    });
  }, [dispatch, allMovies, movieId]);

  useEffect(() => {
    if (firstVideoKey) {
      setPlayingVideoId(firstVideoKey);
      setIsPlaying(false);
      setPreviewMode(true);
    }
  }, [firstVideoKey]);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setIsPlaying(false);
      setPreviewMode(true);
    }
  }, []);

  const handleAddToFavorites = async (movieId: number) => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      let favorites: number[] = stored ? JSON.parse(stored).map(Number) : [];
      if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        Alert.alert(
          "Added to Favorites",
          "The movie has been added to your favorites."
        );
      } else {
        Alert.alert(
          "Already in Favorites",
          "This movie is already in your favorites."
        );
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "An error occurred while adding to favorites.");
    }
  };

  const handleRemoveFromFavorites = async (movieId: number) => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      let favorites: number[] = stored ? JSON.parse(stored).map(Number) : [];
      if (favorites.includes(movieId)) {
        favorites = favorites.filter((id) => id !== movieId);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        Alert.alert(
          "Removed from Favorites",
          "The movie has been removed from your favorites."
        );
      } else {
        Alert.alert("Not in Favorites", "This movie is not in your favorites.");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "An error occurred while removing from favorites.");
    }
  };

  if (allLoading && !movieDetail) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  if (!movieDetail) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white" }}>Film bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {playingVideoId &&
          (previewMode ? (
            <TouchableOpacity
              onPress={() => {
                setPreviewMode(false);
                setTimeout(() => setIsPlaying(true), 100);
              }}
            >
              <Image
                source={{
                  uri: `https://img.youtube.com/vi/${playingVideoId}/hqdefault.jpg`,
                }}
                style={styles.videoThumbnail}
              />
            </TouchableOpacity>
          ) : (
            <YoutubePlayer
              height={200}
              width={width}
              play={isPlaying}
              videoId={playingVideoId}
              onChangeState={onStateChange}
              onReady={() => setIsPlaying(true)}
              initialPlayerParams={{
                controls: true,
                modestbranding: true,
                autoplay: true,
              }}
            />
          ))}

        <View style={styles.headerContainer}>
          <CustomButton
            isImageOnly
            icon={
              <Ionicons
                name="arrow-back-circle-outline"
                size={50}
                color="white"
              />
            }
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.movieActionContainer}>
          <Text style={styles.movieTitle}>{movieDetail.title}</Text>
          <View style={styles.favoriteButtonsContainer}>
            <CustomButton
              isImageOnly
              buttonStyle={{ marginTop: 5 }}
              imageStyle={{ width: 50, height: 50 }}
              onPress={() => handleAddToFavorites(movieDetail.id)}
              icon={<Ionicons name="add" size={35} color="green" />}
            />
            <CustomButton
              isImageOnly
              buttonStyle={{ marginHorizontal: 10, marginTop: 10 }}
              imageStyle={{ width: 50, height: 50 }}
              onPress={() => handleRemoveFromFavorites(movieDetail.id)}
              icon={<Ionicons name="trash" size={25} color="red" />}
            />
          </View>
        </View>

        <View style={styles.movieInfoContainer}>
          <Text style={styles.infoText}>
            95% Match {movieDetail.release_date?.slice(0, 4)} 2h 49m R HD
          </Text>

          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Ionicons
              name="thumbs-up"
              size={18}
              color="green"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.infoText}>Most Liked</Text>
          </View>

          <CustomButton
            buttonStyle={styles.playButton}
            buttonTextStyle={styles.playButtonText}
            buttonText={isPlaying ? "Pause" : "Play"}
            onPress={() => {
              if (previewMode) {
                setPreviewMode(false);
                setTimeout(() => setIsPlaying(true), 100);
              } else {
                setIsPlaying((prev) => !prev);
              }
            }}
            icon={
              <Ionicons name="caret-forward-outline" size={25} color="white" />
            }
          />

          <Text style={{ color: "white", fontSize: 20, marginVertical: 5 }}>
            Prolog
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 15,
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            {movieDetail.overview}
          </Text>

          <View style={styles.footerContainer}>
            <Text style={{ color: "white", fontSize: 20, marginVertical: 5 }}>
              Top Cast
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={movieDetail.cast || []}
              keyExtractor={(item: any) => item.id.toString()}
              contentContainerStyle={{ paddingHorizontal: 0 }}
              renderItem={({ item }) => (
                <View style={styles.castItem}>
                  <Image
                    source={{
                      uri: item.profile_path
                        ? `${IMAGE_URL}${item.profile_path}`
                        : "https://via.placeholder.com/80x120",
                    }}
                    style={styles.castImage}
                  />
                  <Text style={styles.castName} numberOfLines={2}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailPage;
