import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "pink",
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    // tähän väri
    backgroundColor: "#7E93DA",
    flexDirection: "row",
  },
  footer: {
    marginTop: 20,
    // tähän sama väri
    backgroundColor: "#7E93DA",
    flexDirection: "row",
  },
  title: {
    // eri väri
    color: "#404659",
    fontWeight: "bold",
    flex: 1,
    fontSize: 23,
    textAlign: "center",
    margin: 10,
  },
  author: {
    // eri väri
    color: "#404659",
    fontWeight: "bold",
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  gameboard: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  // Home.js

  label: {
    fontSize: 19,
    margin: 20,
  },
  // nimen inputin muotoilu
  nameInput: {
    borderWidth: 1,
    width: 150,
    height: 40,
    fontSize: 24,
    textAlign: "center",
  },

  headerText: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 15,
  },
  // homen tekstikappaleen asettelu
  paragraph: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    fontSize: 16,
  },
  gameinfo: {
    backgroundColor: "#fff",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    marginTop: 10,
  },
  row: {
    marginTop: 20,
    padding: 10,
  },
  flex: {
    flexDirection: "row",
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#D9C07E",
    width: 150,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#2B2B52",
    fontSize: 20,
  },
  iconColorPrimary: "black",
  iconColorSecondary: "gray",
});
