import React, { useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RootState } from "../../redux/store";
import { IMAGE_URL } from "../../services/movieAppService";
import { CustomButton } from "../../components/index";
import { createSelector } from "@reduxjs/toolkit";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./FavoritePage.style";

const selectAllMovies = createSelector(
  (state: RootState) => state.movie.moviesByEndpoint,
  (moviesByEndpoint) => Object.values(moviesByEndpoint).flat()
);

const FavoritePage = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[] | null>(null);
  const navigation = useNavigation<any>();
  const allMovies = useSelector(selectAllMovies);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        try {
          const stored = await AsyncStorage.getItem("favorites");
          const ids: number[] = stored ? JSON.parse(stored) : [];
          setFavoriteIds(ids);
        } catch (error) {
          console.error(error);
          setFavoriteIds([]);
        }
      };
      loadFavorites();
    }, [])
  );

  if (favoriteIds === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  const favoriteMovies = Array.from(
    new Map(
      allMovies
        .filter((movie) => favoriteIds.includes(movie.id))
        .map((movie) => [movie.id, movie])
    ).values()
  );

  if (favoriteMovies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Favorites</Text>

      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CustomButton
            onPress={() =>
              navigation.navigate("DetailPage", {
                movieId: item.id,
                movieTitle: item.title,
              })
            }
            isImageOnly
            source={{
              uri: item.fullPosterPath || `${IMAGE_URL}${item.poster_path}`,
            }}
            imageStyle={styles.moviePoster}
          />
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

export default FavoritePage;
