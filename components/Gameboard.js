import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Container, Row, Col } from "react-native-flex-grid";
import styles from "../styles/style";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_THROWS,
  NBR_OF_DICES,
  MAX_SPOT,
  SCOREBOARD_KEY,
} from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDate, getTime } from "./common/functions";

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

  // tulostaulun pisteet
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });

    return unsubscribe;
  }, [navigation]);

  // nopat
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

  // pisteet
  const pointsRow = [];
  for (let i = 0; i < MAX_SPOT; i++) {
    pointsRow.push(
      <Col key={"pointsRow" + i}>
        <Text key={"pointsRow" + i}>{getSpotTotal(i)}</Text>
      </Col>
    );
  }

  // pallerot
  const pointsToSelectRow = [];
  for (let i = 0; i < MAX_SPOT; i++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + i}>
        <Pressable key={"buttonsRow" + i} onPress={() => selectDicePoints(i)}>
          <MaterialCommunityIcons
            name={"numeric-" + (i + 1) + "-circle"}
            key={"buttonsRow" + i}
            size={35}
            color={getDicePointsColor(i)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue";
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] && !gameEndStatus ? "black" : "steelblue";
  }

  //////////////////////////////////
  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];

      if (!selectedPoints[i]) {
        selectedPoints[i] = true;

        let nbrOfDices = diceSpots.reduce(
          (total, x) => (x === i + 1 ? total + 1 : total),
          0
        );

        points[i] = nbrOfDices * (i + 1);
      } else {
        setStatus("laitoit jo pisteet");
      }
      setDicePointsTotal(points);
      setSelectedDicePoints(selectedPoints);
      setGameEndStatus(false);
      setNbrOfThrowsLeft(3);
      return points[i];
    } else {
      setStatus("Heitä kaikki eka");
    }
  };

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  // tää pitäis olla oikeasti eli tuo ehto, mutta ei toiminut jostain syystä
  // const selectDice = (i) => {
  //   if (nbrOfThrowsLeft < NBR_OF_THROWS_LEFT && !gameEndStatus) {
  //     let dices = [...selectedDices];
  //     dices[i] = selectedDices[i] ? false : true;
  //     setSelectedDices(dices);
  //   } else {
  //     setStatus("You have to throw dices first");
  //   }
  // };

  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    }
  };

  // tarkistaa onko peli loppu joka kerta kun heittojen määrä vaihtuu
  // vois olla ehkä myös gameendstatus
  useEffect(() => {
    checkWinner();
  }, [nbrOfThrowsLeft]);

  const checkWinner = () => {
    // jos kaikki pallurat on valittu, peli loppuu
    // laske pisteet
    // tallenna pisteet
    // setStatus("Game over");
  };

  const calculatePoints = () => {
    // lasketaan pisteet
    let totalPoints = 1;
    // jos yli jonkun, lisää bonus
    return totalPoints;
  };

  const savePlayerPoints = async () => {
    const newKey = scores.length + 1;
    const playerPoints = {
      key: newKey,
      name: playerName,
      date: getDate(),
      time: getTime(),
      points: calculatePoints(), // yhteispisteet, lisää laskenta itse ja bonuspisteet
    };

    try {
      const newScore = [...scores, playerPoints];
      const jsonValue = JSON.stringify(newScore);
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
    } catch (e) {
      console.log("virhe tallennuksessa" + e);
    }
  };

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

  const throwDices = () => {
    if (nbrOfThrowsLeft == 0 && !gameEndStatus) {
      setStatus("Valitse pisteet eka");
      return 1;
      // niin kauan kun on true, niin heittelee noita ja kun on false taas niin peli loppuu
    } else if (nbrOfThrowsLeft == 0 && gameEndStatus) {
      setGameEndStatus(true);
      diceSpots.fill(0);
      dicePointsTotal.fill(0);
    }

    let spots = [...diceSpots];

    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = "dice-" + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    setDiceSpots(spots);
    setStatus("Heitä uudelleen");

    if (nbrOfThrowsLeft == 1) {
      setStatus("Select points and throw dices again");
    }
  };

  return (
    <>
      <Header />

      <View style={styles.gameboard}>
        <Container fluid>
          <Row>
            <MaterialCommunityIcons
              name="dice-multiple"
              size={60}
            ></MaterialCommunityIcons>
          </Row>

          <Row>{dicesRow}</Row>
          <Row>
            <Text>Throws left: {nbrOfThrowsLeft}</Text>
          </Row>
          <Row>
            <Text>{status}</Text>
          </Row>
          <Row>
            <Pressable style={styles.button} onPress={() => throwDices()}>
              <Text style={styles.buttonText}>Throw dices</Text>
            </Pressable>
          </Row>
          <Row>
            <Text>Total: {dicePointsTotal}</Text>
          </Row>
          <Row>
            <Text>Bonusinfo</Text>
          </Row>
        </Container>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>

        <Pressable style={styles.button} onPress={() => savePlayerPoints()}>
          <Text style={styles.buttonText}>Tallenna</Text>
        </Pressable>
        <Text>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  );
}
