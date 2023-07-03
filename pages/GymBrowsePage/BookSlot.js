import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { AppContext } from "../../appContext";

// const API_URL = ;

class MyBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () =>
  this.fetchbooks()
    );
  }
  componentWillUnmount() {
    // this.focusListener.remove();
  }
  fetchbooks = () =>{
    console.log("Showing booking details");
    fetch('http://10.0.2.2:32001/customer/viewMyBookings?customerId='+this.context.users.userName)
    .then((res) => {
        return res.json()

    })
    .then((res) => {
        console.log(res)
        this.setState({ data: res })})
    .catch(err => console.error(err));
  }

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemKey}>{item.gymnasium.name}</Text>
      <Text style={styles.itemValue}>{item.gymnasium.address}</Text>
      <Text style={styles.itemValue}>{item.time}</Text>
      <Text style={styles.itemValue}>{item.date[2]}: {item.date[1]}: {item.date[0]}</Text>
    </View>
  );

  render() {
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Upcoming Bookings</Text>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemKey: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  itemValue: {
    color: '#555',
    marginBottom: 3,
  },
});

MyBookings.contextType = AppContext;
export default MyBookings;