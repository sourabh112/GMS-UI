import React from "react";
import { Card } from 'react-native-paper';
import { AppContext } from "../appContext";
import { SafeAreaView } from "react-native-safe-area-context";
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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../components/CustomButton';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      userId: "",
      emailId: "",
      name: "",
      mobile: "",
      address: "",
      password: ""
    }
  }

loginButton = () => {
          const requestOptions = {
            method: 'POST',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' },
            body: JSON.stringify({
              "userId":this.state.userId,
              "name":this.state.name,
              "mobile":this.state.mobile,
              "email":this.state.emailId,
              "address":this.state.address,
              "password":this.state.password
          })
          };
          a = fetch(`http://10.0.2.2:8080/user/register-customer`, requestOptions)
              .then((res) => {
                if(res.status==200){
                    Toast.show(
                        {
                          type:"success",
                          text1:`You have succesfully created an account, Redirecting to login page`,
                          position:"top",
                          autoHide:true,
                          visibilityTime: 5000
                        }
                    )
                    this.props.navigation.navigate("Home")
                }
                else {
                  Toast.show(
                    {
                      type:"error",
                      text1:`This User Name is already in use`,
                      position:"top",
                      autoHide:true,
                      visibilityTime: 5000
                    }
                  )

                }
              })
              .catch(err => console.error(err));
}


  render() {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/a.webp')}
          style={{width: 300, height: 300}} />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Create New Account 
          </Text>
        <View style={styles.inputfeild}>
          <MaterialIcons
            name= {'person'}
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
            <TextInput
              placeholder={'User Id'}
              keyboardType={"email-address"}
              style={styles.inputtext}
              onChangeText={textadd = (newText) =>{
                this.setState({userId:newText});
              }}
            />
        </View>
        <View style={styles.inputfeild}>
          <MaterialIcons
            name= {'alternate-email'}
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
            <TextInput
              placeholder={'Email ID'}
              keyboardType={"email-address"}
              style={styles.inputtext}
              onChangeText={textadd = (newText) =>{
                this.setState({emailId:newText});
              }}
            />
        </View>
        <View style={styles.inputfeild}>
          <MaterialIcons
            name= {'person'}
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
            <TextInput
              placeholder={'Name'}
              keyboardType={"email-address"}
              style={styles.inputtext}
              onChangeText={textadd = (newText) =>{
                this.setState({name:newText});
              }}
            />
        </View>
        <View style={styles.inputfeild}>
          <Foundation
            name= {'mobile'}
            size={25}
            color="#666"
            style={{marginRight: 5}}
          />
            <TextInput
              placeholder={'Mobile'}
              keyboardType={"email-address"}
              style={styles.inputtext}
              onChangeText={textadd = (newText) =>{
                this.setState({mobile:newText});
              }}
            />
        </View>
        <View style={styles.inputfeild}>
          <FontAwesome
            name= {'address-book'}
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
            <TextInput
              placeholder={'Address'}
              keyboardType={"email-address"}
              style={styles.inputtext}
              onChangeText={textadd = (newText) =>{
                this.setState({address:newText});
              }}
            />
        </View>
        <View style={styles.inputfeild}>
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TextInput
              placeholder={'Password'}
              style={styles.inputtext}
              secureTextEntry={true}
              onChangeText={textadd = (newText) =>{
                this.setState({password:newText});
              }}
            />
        </View>
        <CustomButton label={"Login"} onPress={this.loginButton} />
        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, Sign Up
        </Text>
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputfeild: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    
  },
  inputtext:{
    flex: 1, 
    paddingVertical: 0},
  safeArea: {
  }
});

SignUp.contextType = AppContext;

export default SignUp;
