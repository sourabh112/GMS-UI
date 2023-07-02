import React, {useState} from "react";
import { Text, TouchableOpacity, View, StyleSheet,Image,Modal, Button } from "react-native";
import { Card } from 'react-native-paper';
import { AppContext } from "../../appContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SafeAreaView } from "react-native-safe-area-context";
import {Calendar} from 'react-native-calendars';
import { ScrollView } from "react-native-gesture-handler";

class ViewCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data:null,
          isVisible: false,
          gymId: null
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
    
      toslots = (gymId) => {
        console.log("Hello")
        this.props.navigation.navigate("Slots", gymId);
      }
      randomfunction = (el) => {
        return (
          <View>
            <TouchableOpacity style={styles.container} onPress={() => {this.setState({ isVisible: true});this.setState({gymId:el.gymId})}}>
              <View key={el.gymId}  >
                  <Image source={require('../../assets/a.webp')}
                    style={{width: 160, height: 160}} />
                    <Text style={{fontSize:20}}>{el.name}:</Text>
                  <Text style={{fontSize:12,marginTop:2}}>{el.address}</Text>
                  <Text style={styles.text}>Total Area: {el.totalArea}</Text>
                  <Text style={styles.text}>Number of Items: {el.numItem}</Text>
              </View>
              </TouchableOpacity>
          </View>
        )
    }

    
      render() {

        var date = new Date();
        var curr_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+1);
        console.log(date.getDate())
        var max_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+6);
        return (
          <ScrollView>
          <SafeAreaView style={styles.safeArea}>
              <View style={styles.cards}>
                      {
                          this.state.data && this.state.data.map((el) => this.randomfunction(el))
                      }
                      <Modal            
                        animationType="slide" 
                        transparent = {true}  
                        visible = {this.state.isVisible}  
                        onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
                        {/*All views of Modal*/}  
                            <View style = {styles.modal}>  
                            <Text style={{
                              fontSize: 20,
                              margin: 5
                            }}>Select Date of Booking</Text>
                            <Calendar
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    height: 350,
                                    margin: 5
                                }}
                                current={curr_date}
                                maxDate={max_date}
                                minDate={curr_date}
                                // Callback that gets called when the user selects a day
                                onDayPress={day => {
                                    // console.log("Gym Id",el.gymId);
                                    this.props.navigation.navigate("Slots",[this.state.gymId,day.day-date.getDate()]);
                                    this.setState({ isVisible: !this.state.isVisible})
                                }}
                                theme={{
                                    monthTextColor: '#165c96',
                                    arrowColor: '#165c96',
                                    todayTextColor: '#33a8e2',
                                    selectedDayTextColor: 'white',
                                    selectedDayBackgroundColor: '#165c96',
                                    }}
                            />
                            <Button title="Change Gym" onPress = {() => {  
                                this.setState({ isVisible:!this.state.isVisible})}}/>  
                        </View>  
                      </Modal>  
                </View>
          </SafeAreaView>
          </ScrollView>
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
        marginTop:2
    },
    cards:{
      flexDirection: "row",
      justifyContent: "flex-start",
      flexWrap: "wrap"
    },
    modal: {  
      justifyContent: 'center',  
      alignItems: 'center',      
      height: 450 ,  
      width: '80%',  
      borderRadius:10,  
      borderWidth: 1,  
      borderColor: '#fff',    
      backgroundColor : "grey", 
      marginTop: 80,  
      marginLeft: 40,  
       
       },  
  });

  ViewCatalog.contextType = AppContext;

export default ViewCatalog;
