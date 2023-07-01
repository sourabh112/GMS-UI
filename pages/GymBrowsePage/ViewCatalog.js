import React from "react";
import { Text, TouchableOpacity, View, StyleSheet,Image } from "react-native";
import { Card } from 'react-native-paper';
import { AppContext } from "../../appContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SafeAreaView } from "react-native-safe-area-context";

class ViewCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data:null
        }
      }
    
      componentDidMount(){
        a = fetch(`http://10.0.2.2:8080/customer/viewCatalog`,{
            method: 'GET',
            headers: { 
              'Accept': 'application/json'},
        })
            .then((res) => {
                return res.json()
            })
            .then(res => this.setState({ data: res }))
            .catch(err => {
              Toast.show(
                {
                  type:"error",
                  text1:`Sorry Something Unexpected happened`,
                  position:"top",
                  autoHide:true,
                  visibilityTime: 5000
                }
              )
            });
      }
    
      randomfunction = (el) => {
        return (
            <View key={el.gymId} style={styles.container}>
                <Image source={require('../../assets/a.webp')}
                  style={{width: 160, height: 160}} />
                <Text style={styles.text}>{el.name}</Text>
                <Text style={styles.text}>{el.gymId}</Text>
            </View>
        )
    }
    
      render() {
        return (
          <SafeAreaView style={styles.safeArea}>
              <Text>{this.context.users.userName}</Text>
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

  ViewCatalog.contextType = AppContext;

export default ViewCatalog;
