import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BookSlot from "./BookSlot";
import MyBookings from "./MyBookings";

const Tab = createBottomTabNavigator();

class GymBrowsePage extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="My Bookings"
          component={MyBookings}
          options={{
            tabBarLabel: "My Bookings",
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
          component={BookSlot}
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
      </Tab.Navigator>
    );
  }
}

export default GymBrowsePage;
