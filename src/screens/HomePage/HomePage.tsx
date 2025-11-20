import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  SectionList,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../redux/movieThunk";
import type { RootState, AppDispatch } from "../../redux/store";
import { IMAGE_URL } from "../../services/movieAppService";
import { CustomButton, CustomTextInput, CustomImage } from "../../components";
import styles from "./HomePage.style";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const endpoints = [
  { title: "Trending Now", endpoint: "popular" },
  { title: "Upcoming", endpoint: "upcoming" },
  { title: "Top Rated", endpoint: "top_rated" },
  { title: "This Year", endpoint: "discover/movie?primary_release_year=2025" },
  {
    title: "Last Month",
    endpoint:
      "discover/movie?primary_release_date.gte=2025-08-01&primary_release_date.lte=2025-08-31",
  },
  { title: "Action", endpoint: "discover/movie?with_genres=28" },
  { title: "Comedy", endpoint: "discover/movie?with_genres=35" },
];

const MovieItem = React.memo(
  ({
    movie,
    onPress,
  }: {
    movie: any;
    onPress: (id: number, title: string) => void;
  }) => (
    <TouchableOpacity
      onPress={() => onPress(movie.id, movie.title)}
      style={styles.movieItemContainer}
      activeOpacity={0.7}
    >
      <CustomImage
        source={{
          uri: movie.fullPosterPath || `${IMAGE_URL}${movie.poster_path}`,
        }}
        imageStyle={styles.movieItemImage}
        resizeMode="cover"
      />
      <Text style={styles.movieItemTitle} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  )
);

const SearchOverlay: React.FC<{
  query: string;
  filteredMovies: any[];
  onPressMovie: (id: number, title: string) => void;
}> = ({ query, filteredMovies, onPressMovie }) => {
  if (query.trim() === "" || filteredMovies.length === 0) return null;

  return (
    <View style={styles.searchOverlay}>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <MovieItem movie={item} onPress={onPressMovie} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 45 }}
        removeClippedSubviews={true}
        initialNumToRender={9}
        maxToRenderPerBatch={9}
        windowSize={5}
      />
    </View>
  );
};

const HomePage = ({ navigation }: { navigation: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const moviesByEndpoint = useSelector(
    (state: RootState) => state.movie.moviesByEndpoint
  );
  const loadingByEndpoint = useSelector(
    (state: RootState) => state.movie.loadingByEndpoint
  );
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const allMovies = useMemo(() => {
    const flattened = Object.values(moviesByEndpoint).flat();
    return flattened.filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    );
  }, [moviesByEndpoint]);

  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredMovies([]);
    } else {
      const results = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(results);
    }
  }, [query, allMovies]);

  useEffect(() => {
    endpoints.forEach((sec) =>
      dispatch(fetchMovie({ endpoint: sec.endpoint, pageLimit: 1 }))
    );
  }, [dispatch]);

  const sections = endpoints.map((sec) => ({
    title: sec.title,
    endpoint: sec.endpoint || "",
    data: moviesByEndpoint[sec.endpoint] || [],
    loading: loadingByEndpoint[sec.endpoint] || false,
  }));

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <CustomButton
          isImageOnly
          imageStyle={styles.profileButtonImage}
          onPress={() => console.log("Profile clicked")}
          source={require("../../../assets/Images/Profile.png")}
        />

        {isSearchOpen && (
          <View style={styles.searchContainer}>
            <CustomTextInput
              value={query}
              onChangeText={setQuery}
              placeholderText="Search Movie..."
              icon={<Ionicons name="film" size={20} color="#1e1e1eff" />}
              containerStyle={styles.searchInputWrapper}
              inputWrapperStyle={styles.searchInputContainer}
              textInputStyle={styles.searchTextInput}
              iconStyle={{ width: 20, height: 20 }}
            />
          </View>
        )}

        <CustomButton
          isImageOnly
          imageStyle={{ width: 60, height: 60, marginBottom: 10 }}
          onPress={() => setIsSearchOpen(!isSearchOpen)}
          icon={
            <Ionicons
              name="search-circle-outline"
              size={55}
              color="#edededff"
            />
          }
        />
      </View>

      {isSearchOpen && (
        <SearchOverlay
          query={query}
          filteredMovies={filteredMovies}
          onPressMovie={(id, title) => {
            navigation.navigate("DetailPage", {
              movieId: id,
              movieTitle: title,
            });
            setQuery("");
            setIsSearchOpen(false);
          }}
        />
      )}

      {/* SectionList */}
      <View style={styles.contentContainer}>
        <SectionList
          sections={sections}
          contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}
          keyExtractor={(item, index) =>
            item.id ? `${item.id}-${index}` : index.toString()
          }
          renderItem={() => null}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.sectionHeaderTitleRow}>
                <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
                <CustomButton
                  isTextOnly
                  buttonText="See all"
                  buttonTextStyle={styles.seeAllButtonText}
                  onPress={() => {
                    if (!section.endpoint) return;
                    navigation.navigate("MovieListPage", {
                      endpoint: section.endpoint,
                      title: section.title,
                    });
                  }}
                />
              </View>

              {section.loading ? (
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={styles.loadingIndicator}
                />
              ) : (
                <FlatList
                  horizontal
                  data={section.data.filter(
                    (movie, index, self) =>
                      index === self.findIndex((m) => m.id === movie.id)
                  )}
                  keyExtractor={(item, index) =>
                    item.id ? `${item.id}-${index}` : index.toString()
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
                      imageStyle={styles.horizontalListItem}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingLeft: (width - 275) / 2 - 20,
                    paddingRight: 20,
                  }}
                  ItemSeparatorComponent={() => (
                    <View style={styles.flatListSeparator} />
                  )}
                  removeClippedSubviews={true}
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                />
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
