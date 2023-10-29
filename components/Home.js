import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";

import styles from "../styles/style";
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
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      //Keyboard.dismiss;
    }
  };

  return (
    <>
      <Header />
      <ScrollView>
        <View style={styles.gameinfo}>
          <MaterialCommunityIcons
            name="information"
            size={90}
            color={styles.iconColorPrimary}
          />
          {!hasPlayerName ? (
            <>
              <Text style={styles.label}>Your name: </Text>
              <TextInput
                style={styles.nameInput}
                onChangeText={setPlayerName}
                autofocus={true}
              ></TextInput>
              <Pressable
                style={styles.button}
                onPress={() => handlePlayerName(playerName)}
              >
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.headerText}>Rules of the game</Text>
              <Text multiline="true" style={styles.paragraph}>
                THE GAME: Upper section of the classic Yahtzee dice game. You
                have {NBR_OF_DICES} dices and for the every dice you have{" "}
                {NBR_OF_THROWS} throws. After each throw you can keep dices in
                order to get same dice spot counts as many as possible. In the
                end of the turn you must select your points from {MIN_SPOT} to{" "}
                {MAX_SPOT}. Game ends when all points have been selected. The
                order for selecting those is free.
              </Text>
              <Text multiline="true" style={styles.paragraph}>
                POINTS: After each turn game calculates the sum for the dices
                you selected. Only the dices having the same spot count are
                calculated. Inside the game you can not select same points from{" "}
                {MIN_SPOT} to {MAX_SPOT} again.
              </Text>
              <Text multiline="true" style={styles.paragraph}>
                GOAL: To get points as much as possible {BONUS_POINTS_LIMIT}{" "}
                points is the limit of getting bonus which gives you{" "}
                {BONUS_POINTS} points more.
              </Text>
              <Text style={styles.headerText}>Good luck, {playerName}</Text>
              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Gameboard", { player: playerName })
                }
              >
                <Text style={styles.buttonText}>PLAY</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};
