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
          a = fetch(`http://10.0.2.2:32001/customer/viewGymnasiumSlot`, requestOptions)
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
          a = fetch(`http://10.0.2.2:32001/customer/bookingSlot`, requestOptions)
            .then((res) => {
                return res.json()
            })
            .then(res => {
              // console.log("here:",res)
              if(res==0){
                Toast.show(
                  {
                    type:"info",
                    text1:`New Slot Booked, Older Slot Cancelled`,
                    position:"top",
                    autoHide:true,
                    visibilityTime: 5000
                  }
                )
              }else if(res==1){
                Toast.show(
                  {
                    type:"error",
                    text1:`Sorry All seats in current slots filled`,
                    position:"top",
                    autoHide:true,
                    visibilityTime: 5000
                  })
              }else if(res==2){
                Toast.show(
                  {
                    type:"success",
                    text1:`New Booking Confirmed`,
                    position:"top",
                    autoHide:true,
                    visibilityTime: 5000
                  })
              }
            })
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
            this.componentWillUnmount;
            this.setState({ isVisible:!this.state.isVisible})
      }

      randomfunction = (el) => {
        var date = new Date();
        var curr_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+1);
        console.log(date.getDate())
        var max_date = date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate()+6);
        var timing = ""
        if(el.time == 0) timings = "6:00 - 7:00"
        else if(el.time == 1) timings = "7:00 - 8:00"
        else if(el.time == 2) timings = "17:00 - 18:00"
        else if(el.time == 3) timings = "18:00 - 19:00"
        return (
            <View key={el.slotId}>
            <TouchableOpacity style={styles.container} onPress={() => {this.setState({ isVisible: true,slotId: el.slotId}); }}>
              <View   >
                    <Text style={styles.text}>Timings:{timings}</Text>
                  <Text style={styles.text}>Avilable Seats:{el.capacity}</Text>
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
                    }}>Confirm Your Booking:</Text>

                    <View style={{flexWrap:"wrap",flexDirection:"row"}}>
                    <TouchableOpacity style={styles.button} onPress = {() => {  
                        this.setState({ isVisible:!this.state.isVisible})}}>
                          <Text>Change Slot</Text>
                      </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress = {() => {  
                        this.slotBooking()}}>
                      <Text>Book Your Slot</Text>
                      </TouchableOpacity> 
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
        borderRadius: 5,
        justifyContent: "flex-start",
        alignContent: "flex-start",
        backgroundColor: "#F5F5F5",
        borderStyle:"solid",
        borderColor: "Black",
        borderWidth:2
        // flexWrap: "wrap",
        // width: 175
    },
    text: {
        fontSize: 16,
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
        backgroundColor: "#F5F5F5",
        borderStyle:"solid",
        borderColor: "Black",
        borderWidth:2,
        marginTop: 80,  
        marginLeft: 15,  
         
         },  
    button: {
      borderRadius: 5,
      backgroundColor: "#F5F5F5",
      borderStyle:"solid",
      borderColor: "Black",
      borderWidth:2,
      margin:4,
      padding:5
    }
  });

  Slots.contextType = AppContext;

export default Slots;
