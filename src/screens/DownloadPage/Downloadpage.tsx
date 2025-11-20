import {Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loader } from "../../components/index";
import styles from "./Downloadpage.style"

const Downloadpage = () => {
  return (
    <SafeAreaView style={styles.mainContainer} >
      <Loader
      />
    </SafeAreaView>
  );
};

export default Downloadpage;

