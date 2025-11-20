// screens/MovieListPage/MovieListPage.tsx
import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../redux/movieThunk";
import type { RootState, AppDispatch } from "../../redux/store";
import { IMAGE_URL } from "../../services/movieAppService";
import { CustomButton } from "../../components";
import styles from "./MovieListPage.style";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppStack";

type MovieListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MovieListPage"
>;
type Props = {
  navigation: MovieListNavigationProp;
  route: { params: { endpoint: string; title: string } };
};

const MovieListPage: React.FC<Props> = ({ route, navigation }) => {
  const { endpoint, title } = route.params;
  const dispatch: AppDispatch = useDispatch();

  const movies = useSelector(
    (state: RootState) => state.movie.moviesByEndpoint[endpoint] || []
  );
  const loading = useSelector(
    (state: RootState) => state.movie.loadingByEndpoint[endpoint] || false
  );

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovie({ endpoint, pageLimit: 3 }));
    }
  }, [dispatch, endpoint, movies.length]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" style={styles.loader} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CustomButton
              isImageOnly
              onPress={() =>
                navigation.navigate("DetailPage", {
                  movieId: item.id,
                  movieTitle: item.title,
                })
              }
              source={{
                uri: item.fullPosterPath || `${IMAGE_URL}${item.poster_path}`,
              }}
              imageStyle={styles.moviePoster}
            />
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Film bulunamadı.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MovieListPage;
