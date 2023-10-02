import React from "react";
import { Text, View, Pressable } from "react-native";
import styles from "../styles/style";

export default function Gameboard() {
  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}></View>
      <Text style={styles.gameinfo}>Throws left:</Text>
      <Text style={styles.gameinfo}></Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Throw dices</Text>
      </Pressable>
    </View>
  );
}
