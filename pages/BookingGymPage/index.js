import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ViewCatalog from "../BookingGymPage/ViewCatalog";
import Slots from "./Slots";
import { AppContext } from "../../appContext";
import { FlatList } from "react-native-gesture-handler";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class BookingGymPage extends React.Component {
  render() {
    return (
    <NavigationContainer independent={true}>
          <Stack.Navigator>
          <Stack.Screen
              name="ViewCatalog"
              component={ViewCatalog}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Slots"
              component={Slots}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <Toast/>
      </NavigationContainer>
    );
  }
}

export default BookingGymPage;