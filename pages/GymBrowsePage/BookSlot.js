import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../../appContext";

class BookSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        // get request


        fetch(`http://localhost:3000/api/cities/${this.context.city.toLowerCase()}/gyms`)
            .then((res) => {
                return res.json()
            })
            .then(res => this.setState({ data: res }))
            .catch(err => console.error(err));
    }

    renderList = (el) => {
        return (
            <View key={el.slug} style={styles.container}>
                <Text style={styles.text}>{el.name}</Text>
                <Text style={styles.text}>{el.city}</Text>
            </View>
        )
    }


    render() {
        return (
            <View>
                {
                    this.state.data && this.state.data.map((el) => this.renderList(el))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        margin: 10,
        borderRadius: 3,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "grey",
    },
    text: {
        fontSize: 16,
        margin: 10,
    }
})

BookSlot.contextType = AppContext

export default BookSlot;
