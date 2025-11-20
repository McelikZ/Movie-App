import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomePage,
  DetailPage,
  FavoritePage,
  TrendPage,
  MovieListPage,
  Downloadpage,
} from "../screens/index";
import { Ionicons } from "@expo/vector-icons";

export type TabParamList = {
  Home: undefined;
  Favorite: undefined;
  Trend: undefined;
  Download: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  DetailPage: { movieId: number; movieTitle?: string };
  MovieListPage: { endpoint: string; title: string };
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const renderIcon =
  (iconName: keyof typeof Ionicons.glyphMap) =>
  ({ color, size }: { color: string; size: number }) =>
    <Ionicons name={iconName} size={size} color={color} />;

const MainTabs: React.FC = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: "#ffffff",
      tabBarStyle: {
        backgroundColor: "#0f1010",
        position: "absolute",
        opacity: 0.9,
        height: 90,
        borderColor: "black",
      },
      tabBarIconStyle: { alignSelf: "center", marginTop: 10 },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomePage}
      options={{ tabBarIcon: renderIcon("home") }}
    />
    <Tab.Screen
      name="Favorite"
      component={FavoritePage}
      options={{ tabBarIcon: renderIcon("heart") }}
    />
    <Tab.Screen
      name="Download"
      component={Downloadpage}
      options={{ tabBarIcon: renderIcon("download") }}
    />
    <Tab.Screen
      name="Trend"
      component={TrendPage}
      options={{ tabBarIcon: renderIcon("film") }}
    />
  </Tab.Navigator>
);

const AppStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="DetailPage" component={DetailPage} />
    <Stack.Screen name="MovieListPage" component={MovieListPage} />
  </Stack.Navigator>
);

export default AppStack;
