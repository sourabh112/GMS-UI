import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Card } from 'react-native-paper';

import { SafeAreaView } from "react-native-safe-area-context";

class MyBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data:null
        }
      }
    
      componentDidMount(){
        console.log("BookSlot mounted");
        a = fetch(`http://10.0.2.2:8080/user/all-gym-centres`,{
            method: 'GET',
            headers: { 
              'Accept': 'application/json'},
        })
            .then((res) => {
            //   console.log(res.json())
                return res.json()
            })
            .then(res => this.setState({ data: res }))
            .catch(err => console.error(err));
      }
    
      randomfunction = (el) => {
        return (
            <View key={el.gymId} style={styles.container}>
                <Text style={styles.text}>{el.name}</Text>
                <Text style={styles.text}>{el.gymId}</Text>
            </View>
        )
    }
    
      render() {
        console.log(this.state.data);
        return (
          <SafeAreaView style={styles.safeArea}>
              <Text>Gyms List:</Text>
              <View style={styles.cards}>
                    {
                        this.state.data && this.state.data.map((el) => this.randomfunction(el))
                    }
                </View>
          </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    safeArea: {
    },
    container: {
        flexDirection: "row",
        padding: 10,
        margin: 10,
        borderRadius: 3,
        justifyContent: "flex-start",
        alignContent: "flex-start",
        backgroundColor: "grey",
        flexWrap: "wrap",
        width: 175
    },
    text: {
        fontSize: 16,
        margin: 10,
    },
    cards:{
      flexDirection: "row",
      justifyContent: "flex-start",
      flexWrap: "wrap"
    }
  });

export default MyBookings;
