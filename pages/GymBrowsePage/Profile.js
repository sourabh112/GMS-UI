import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppContext } from "../../appContext";


// const API_URL = ;

class ProfilePage extends Component {
  state = {
    customerDetails: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
      console.log("Fetching Personal Details");
      fetch('http://10.0.2.2:32001/customer/viewMyDetails?customerId='+this.context.users.userName)
      .then((res) => {
          return res.json()

      })
      .then((res) => {
          console.log(res)
          this.setState({customerDetails: res,
                         loading: false})})
      .catch(err => console.error(err));


    }

  render() {
    const { customerDetails, loading, error } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/default-profile.jpeg')} style={styles.profilePicture} />

          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Customer ID</Text>
            <Text style={styles.value}>{customerDetails.customerId}</Text>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{customerDetails.name}</Text>

            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.value}>{customerDetails.mobile}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{customerDetails.email}</Text>

            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{customerDetails.address}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 16,
    marginBottom: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 8,
    marginLeft: -128,
  },
  value: {
    fontSize: 18,
    marginBottom: 16,
    marginLeft: -128,
  },
});

ProfilePage.contextType = AppContext;

export default ProfilePage;