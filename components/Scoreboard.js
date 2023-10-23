import { useState, useEffect } from "react";
import React from "react";
import { DataTable } from "react-native-paper";
import { Pressable, View } from "react-native";
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import Footer from "./Footer";

export default function Scoreboard({ navigation }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });

    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
      }
    } catch (e) {
      console.log("Read error" + e);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.clear();
      setScores([]);
    } catch (error) {
      console.log("Clear error: " + error);
    }
  };

  return (
    <>
      <Header />
      <View>
        {scores.length === 0 ? (
          <Text>Scoreboard is empty</Text>
        ) : (
          index < NBR_OF_SCOREBOARD_ROWS &&
          scores.map((player, index) => (
            <DataTable.Row key={player.key}>
              <DataTable.Cell>
                <Text>{index + 1}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{player.name}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}
      </View>
      <Pressable onPress={() => clearScoreboard()}>
        <Text>Paina</Text>
      </Pressable>
      <Footer />
    </>
  );
}
