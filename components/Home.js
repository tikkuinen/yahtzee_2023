import React, { useState, useContext } from "react";
import { Text, TextInput, View, Pressable, Keyboard } from "react-native";

import styles from "../styles/style";
import { AppContext } from "./AppContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
} from "../constants/Game";
import Header from "./Header";
import Footer from "./Footer";

export default Home = ({ navigation }) => {
  // const { started, setStarted } = useContext(AppContext);
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss;
    }
  };

  return (
    <>
      <Header />
      <View>
        <MaterialCommunityIcons
          name="information"
          size={90}
          color="steelblue"
        />
        {!hasPlayerName ? (
          <>
            <Text>For scoreboard enter your name: </Text>
            <TextInput
              onChangeText={setPlayerName}
              autofocus={true}
            ></TextInput>
            <Pressable onPress={() => handlePlayerName(playerName)}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text>Rules of the game...</Text>
            <Text multiline="true">
              Tähän tulee kappale ja tarvittaessa toinen
            </Text>
            <Text>Good luck, {playerName}</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("Gameboard", { player: playerName })
              }
            >
              <Text>PLAY</Text>
            </Pressable>
          </>
        )}
      </View>
      <Footer />
    </>
  );
};
