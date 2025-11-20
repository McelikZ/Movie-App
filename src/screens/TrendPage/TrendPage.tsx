import React, { useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./TrendPage.style";
import { CustomButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../redux/movieThunk";
import type { RootState, AppDispatch } from "../../redux/store";
import { IMAGE_URL } from "../../services/movieAppService";
import { Ionicons } from "@expo/vector-icons";

const endpoints = [{ title: "Trending Now", endpoint: "popular" }];

const _ID = 424;
const _TITLE = "How to Train Your Dragon";

const TrendPage = ({ navigation }: { navigation: any }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    endpoints.forEach((sec) =>
      dispatch(fetchMovie({ endpoint: sec.endpoint, pageLimit: 1 }))
    );
  }, [dispatch]);

  const moviesByEndpoint = useSelector(
    (state: RootState) => state.movie.moviesByEndpoint
  );
  const loadingByEndpoint = useSelector(
    (state: RootState) => state.movie.loadingByEndpoint
  );

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={{
          uri: "https://www.themoviedb.org/t/p/w1280/doGEE2DgjET0XK0k9BozsMBES5H.jpg",
        }}
        resizeMode="cover"
        style={styles.heroImage}
      >
        <View style={styles.detailContainer}>
          <CustomButton
            buttonText="Play"
            buttonTextStyle={styles.detailButtonText}
            buttonStyle={styles.detailButton}
            onPress={() =>
              navigation.navigate("DetailPage", {
                movieId: _ID,
                movieTitle: _TITLE,
              })
            }
            icon={
              <Ionicons name="caret-forward-outline" size={20} color="white" />
            }
          />

          <CustomButton
            buttonText="Details"
            buttonTextStyle={styles.detailButtonText}
            buttonStyle={styles.detailButton}
            onPress={() =>
              navigation.navigate("DetailPage", {
                movieId: _ID,
                movieTitle: _TITLE,
              })
            }
          />
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        {endpoints.map((sec, index) => {
          const movies = moviesByEndpoint[sec.endpoint] || [];
          const loading = loadingByEndpoint[sec.endpoint] || false;

          return (
            <View key={`section-${index}`} style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{sec.title}</Text>
                <CustomButton
                  isTextOnly
                  buttonText="See all"
                  buttonTextStyle={styles.seeAllText}
                  onPress={() =>
                    navigation.navigate("MovieListPage", {
                      endpoint: sec.endpoint,
                      title: sec.title,
                    })
                  }
                />
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <FlatList
                  horizontal
                  data={movies}
                  keyExtractor={(item, index) =>
                    item.id
                      ? item.id.toString() + "-" + index
                      : index.toString()
                  }
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
                        uri:
                          item.fullPosterPath ||
                          `${IMAGE_URL}${item.poster_path}`,
                      }}
                      imageStyle={styles.movieImage}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContent}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TrendPage;
