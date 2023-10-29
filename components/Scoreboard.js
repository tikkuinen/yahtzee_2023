import { useState, useEffect } from "react";
import React from "react";
import { DataTable } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, View, Text, ScrollView } from "react-native";
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/style";
import { Container, Row } from "react-native-flex-grid";
import style from "../styles/style";

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

  // Tuloslistan sorttaus suurimmasta pienimpään
  if (scores.length > 0) {
    scores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
  }

  return (
    <>
      <Header />
      <ScrollView>
        <Container>
          <Row style={styles.row}>
            <MaterialCommunityIcons
              name="dice-multiple"
              size={90}
            ></MaterialCommunityIcons>
          </Row>
          <View>
            {scores.length === 0 ? (
              <Row style={styles.textRow}>
                <Text style={styles.statusText}>Scoreboard is empty</Text>
              </Row>
            ) : (
              scores.map(
                (player, index) =>
                  index < NBR_OF_SCOREBOARD_ROWS && (
                    <DataTable.Row key={player.key}>
                      <DataTable.Cell>
                        <Text style={styles.statusText}>{index + 1}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={styles.statusText}>{player.name}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cellPvm}>
                        <Text style={styles.statusText}>{player.date}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={styles.statusText}>{player.time}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <Text style={styles.statusText}>{player.points}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )
              )
            )}
          </View>
          <Row style={styles.row}>
            <Pressable style={styles.button} onPress={() => clearScoreboard()}>
              <Text>Clear scoreboard</Text>
            </Pressable>
          </Row>
        </Container>
      </ScrollView>
      <Footer />
    </>
  );
}
