import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Container, Row, Col } from "react-native-flex-grid";
import styles from "../styles/style";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_THROWS,
  NBR_OF_THROWS_LEFT,
  NBR_OF_DICES,
  MAX_SPOT,
} from "../constants/Game";

let board = [];

export default function Gameboard({ navigation, route }) {
  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("Throw dices");
  const [gameEndStatus, setGameEndStatus] = useState(false);
  // Ovatko nopat kiinnitetty
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  // noppien silmäluvut
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  // onko silmäluvulle valittu pisteet
  const [selectedDicePoints, setSelectedDicePoints] = useState(
    new Array(MAX_SPOT).fill(false)
  );
  // Kerätyt pisteet
  const [dicePointsTotal, setDicePointsTotal] = useState(
    new Array(MAX_SPOT).fill(0)
  );

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  const dicesRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    dicesRow.push(
      <Col key={"dice" + i}>
        <Pressable key={"dice" + i} onPress={() => selectDice(i)}>
          <MaterialCommunityIcons
            name={board[i]}
            key={"dice" + i}
            size={50}
            color={getDiceColor(i)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const pointsRow = [];
  for (let i = 0; i < MAX_SPOT; i++) {
    pointsRow.push(
      <Col key={"pointsRow" + i}>
        <Text key={"pointsRow" + i}></Text>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + i}>
        <Pressable key={"buttonsRow" + i}>
          <MaterialCommunityIcons
            name={"numeric-" + (i + 1) + "-circle"}
            key={"buttonsRow" + i}
            size={35}
            color={getDiceColor(i)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS_LEFT) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first");
    }
  };

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue";
  }

  // useEffect(() => {
  //   checkWinner();
  //   if (nbrOfThrowsLeft === NBR_OF_THROWS) {
  //     setStatus("Game has not started");
  //   }
  //   if (nbrOfThrowsLeft < 0) {
  //     setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
  //   }
  // }, [nbrOfThrowsLeft]);

  // const checkWinner = () => {
  //   if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
  //     setStatus("You won");
  //   } else if (
  //     board.every((val, i, arr) => val === arr[0]) &&
  //     nbrOfThrowsLeft === 0
  //   ) {
  //     setStatus("You won, game over");
  //     setSelectedDices(new Array(NBR_OF_DICES).fill(false));
  //   } else if (nbrOfThrowsLeft === 0) {
  //     setStatus("Game over");
  //     setSelectedDices(new Array(NBR_OF_DICES).fill(false));
  //   } else {
  //     setStatus("Keep on throwing");
  //   }
  // };

  // const throwDices = () => {
  //   for (let i = 0; i < NBR_OF_DICES; i++) {
  //     if (!selectedDices[i]) {
  //       let randomNumber = Math.floor(Math.random() * 6 + 1);
  //       board[i] = "dice-" + randomNumber;
  //     }
  //   }
  //   setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
  // };

  return (
    <>
      <Header />
      <View style={styles.gameboard}>
        <Container fluid>
          <Row>{dicesRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        <Text>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  );
}
