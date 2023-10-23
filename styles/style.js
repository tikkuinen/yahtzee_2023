import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: "skyblue",
    flexDirection: "row",
  },
  footer: {
    marginTop: 20,
    backgroundColor: "skyblue",
    flexDirection: "row",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    fontSize: 23,
    textAlign: "center",
    margin: 10,
  },
  author: {
    color: "#fff",
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

  // nimen inputin muotoilu
  nameInput: {
    borderWidth: 1,
    width: 100,
  },
  // homen tekstikappaleen asettelu
  paragraph: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
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
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#2B2B52",
    fontSize: 20,
  },
});
