import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GymBrowsePage from "./pages/GymBrowsePage";
import HomePage from "./pages/HomePage";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Stack = createStackNavigator();

// Context
import { user, AppContext } from "./appContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeCity = (city) => {
      console.log("New Thing",city)
      this.setState({
        users: city,
      });
    };
    this.state = {
      users: user,
      changeCity: this.changeCity,
    };
  }

  render() {
    // console.log(this.state.users)
    return (
      <NavigationContainer>
        <AppContext.Provider value={this.state}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomePage}
              changeCity={this.changeCity}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Gyms"
              component={GymBrowsePage}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <Toast/>
        </AppContext.Provider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
