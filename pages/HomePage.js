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

import CustomButton from '../components/CustomButton';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      userName: "",
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
              "userName":this.state.userName,
              "password":this.state.password
          })
          };
          a = fetch(`http://10.0.2.2:32001/user/login`, requestOptions)
              .then((res) => {
                if(res.status==200){
                  return res.json()
                  .then(res => {
                    this.setState({ data: res })
                    this.context.changeCity({
                      userName: res.userName
                  })
                    this.props.navigation.navigate("Gyms")
                    
                  })
                }
                else {
                  Toast.show(
                    {
                      type:"error",
                      text1:`Wrong Id or Password`,
                      position:"top",
                      autoHide:true,
                      visibilityTime: 5000
                    }
                  )

                }
              })
              .catch(err => console.error(err));
}

navi = () =>{
  this.props.navigation.navigate("SignUp");
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
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
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
                this.setState({userName:newText});
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
        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}} onPress={this.navi}>
          Or, Create A new Account
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

HomePage.contextType = AppContext;

export default HomePage;
