import React from "react";
import { Text, TouchableOpacity, View, StyleSheet,Image,Modal, Button } from "react-native";
import { Card } from 'react-native-paper';
import { AppContext } from "../../appContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SafeAreaView } from "react-native-safe-area-context";
import {Calendar} from 'react-native-calendars';


class Slots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null,
          gymId:this.props.route.params[0],
          day: this.props.route.params[1],
          slotId:"",
          isVisible: false
        }
      }
    
      componentDidMount(){
        const requestOptions = {
            method: 'POST',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' },
            body: JSON.stringify({
              "gymId":this.state.gymId,
              "day":this.state.day
          })
          };
          a = fetch(`http://10.0.2.2:8080/customer/viewGymnasiumSlot`, requestOptions)
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
    
      slotBooking = () =>{
        console.log("Bookable slot:",this.state.slotId)
        const requestOptions = {
            method: 'POST',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' },
            body: JSON.stringify({
                "gymId":this.state.gymId,
                "slotId":this.state.slotId,
                "day": this.state.day,
                "userName":this.context.users.userName
            })
          };
          a = fetch(`http://10.0.2.2:8080/customer/bookingSlot`, requestOptions)
            .then((res) => {
                return res.json()
            })
            // .then(res => this.setState({ data: res }))
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
        var date = new Date();
        var curr_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+1);
        console.log(date.getDate())
        var max_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+6);
        return (
            <View>
            <TouchableOpacity style={styles.container} onPress={() => {this.setState({ isVisible: true,slotId: el.slotId}); }}>
              <View key={el.gymId}  >
                  <Image source={require('../../assets/a.webp')}
                    style={{width: 160, height: 160}} />
                  <Text style={styles.text}>{el.slotId}</Text>
                  <Text style={styles.text}>{el.capacity}</Text>
              </View>
              </TouchableOpacity>
                
          </View>
        )
    }
    
      render() {
        console.log(this.state.gymId)
        var date = new Date();
        var curr_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+1);
        console.log(date.getDate())
        var max_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+6);
        return (
          <SafeAreaView style={styles.safeArea}>
            {
                          this.state.data && this.state.data.map((el) => this.randomfunction(el))
            }
            <View>
            <Modal            
                animationType="slide" 
                transparent = {true}  
                visible = {this.state.isVisible}  
                onRequestClose = {() =>{ 
                    console.log("Modal has been closed.")
                } }>  
                {/*All views of Modal*/}  
                    <View style = {styles.modal}>  
                    <Text style={{
                      fontSize: 20,
                      margin: 5
                    }}>Details:</Text>
                    
                    <View style={{flexWrap:"wrap",flexDirection:"row"}}>
                    <Button title="Change Slot" onPress = {() => {  
                        this.setState({ isVisible:!this.state.isVisible})}}/>
                    <Button title="Confirm Booking" onPress = {() => {  
                        this.slotBooking()}}/> 
                    </View> 
                </View>  
              </Modal>
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
    },

    modal: {  
        justifyContent: 'center',  
        alignItems: 'center',      
        height: 150 ,  
        width: '90%',  
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: '#fff',    
        backgroundColor : "grey", 
        marginTop: 80,  
        marginLeft: 15,  
         
         },  
  });

  Slots.contextType = AppContext;

export default Slots;
