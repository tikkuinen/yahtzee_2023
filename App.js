import { useState } from "react";
import { ScrollView, View } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { AppContext } from "./components/AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "information" : "information-outline";
            } else if (route.name === "Gameboard") {
              iconName = focused ? "dice-multiple" : "dice-multiple-outline";
            } else if (route.name === "Scoreboard") {
              iconName = focused ? "view-list" : "view-list-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "steelblue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarStyle: { display: "none" } }}
        />
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   const [started, setStarted] = useState(false);

//   return (
//     <AppContext.Provider value={{ started, setStarted }}>
//       <View style={styles.container}>
//         <Header />
//         {started ? <Gameboard /> : <Home />}
//         <Footer />
//       </View>
//     </AppContext.Provider>
//   );
// }
