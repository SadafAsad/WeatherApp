import React from "react"
import { SafeAreaView, StyleSheet, Text, FlatList, View, StatusBar, ImageBackground } from "react-native"
import { Feather } from '@expo/vector-icons'
import ListItem from "../components/ListItem"

const DATA = [
    {
        dt_txt: "2023-02-18 12:00:00",
        main: {
            temp_max: 8.55,
            temp_min: 7.55
        },
        weather: [
            {
                main: 'Clear'
            }
        ]
    },
    {
        dt_txt: "2023-02-18 15:00:00",
        main: {
            temp_max: 8.55,
            temp_min: 7.55
        },
        weather: [
            {
                main: 'Clouds'
            }
        ]
    },
    {
        dt_txt: "2023-02-18 18:00:00",
        main: {
            temp_max: 8.55,
            temp_min: 7.55
        },
        weather: [
            {
                main: 'Rain'
            }
        ]
    }
]

const UpcomingWeather = () => {
    const renderItem = ({ item }) => (
        <ListItem 
            condition={item.weather[0].main} 
            dt_txt={item.dt_txt} 
            min={item.main.temp_min} 
            max={item.main.temp_max} 
        />
    )
    return (
        <SafeAreaView style={styles.container}>
            <Text> Upcoming Weather </Text>
            <ImageBackground 
                // props are used to pass data from parent to child
                // they can be used to customize our components
                // core components usually come with props which can be used
                // prop source here is used to set the image
                source={require('../../assets/upcoming-background.jpg')} 
                style={styles.image} 
            >
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    // reason for key is performance based
                    // keep track of each item in the list
                    // hence, updating the list rather than rebuilding evrything when a change happens
                    keyExtractor={(item) => item.dt_txt}
                />
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // taking into account different platforms
        // initialize with the current height of the status bar for different platforms
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'royalblue'
    },
    image: {
        flex: 1
    }
})

export default UpcomingWeather