import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfilePage from "./Profile";
import BookingGymPage from "../BookingGymPage";
import { AppContext } from "../../appContext";
import MyBookings from "./BookSlot"

const Tab = createBottomTabNavigator();

class GymBrowsePage extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Gym Booking"
          component={BookingGymPage}
          options={{
            tabBarLabel: "View Catalog",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-heart"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Book Slot"
          component={MyBookings}
          options={{
            tabBarLabel: "Book Slot",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="kabaddi"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="person"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default GymBrowsePage;
