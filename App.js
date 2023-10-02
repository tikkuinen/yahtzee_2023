import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Gameboard from "./components/Gameboard";
import { AppContext } from "./components/AppContext";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <AppContext.Provider value={{ started, setStarted }}>
      <View style={styles.container}>
        <Header />
        {started ? <Gameboard /> : <Home />}
        <Footer />
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
