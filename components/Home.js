import React, { useContext } from "react";
import { Text, TextInput, View, Pressable } from "react-native";
import styles from "../styles/style";
import { AppContext } from "./AppContext";

export default function Home() {
  const { started, setStarted } = useContext(AppContext);
  return (
    <View>
      <Text>For scoreboard enter your name: </Text>
      <TextInput></TextInput>
      <Pressable style={styles.button} onPress={() => setStarted(true)}>
        <Text style={styles.buttonText}>OK</Text>
      </Pressable>
    </View>
  );
}
