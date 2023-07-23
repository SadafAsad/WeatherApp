import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  ImageBackground
} from 'react-native'
import ListItem from '../components/ListItem'

const UpcomingWeather = ({ weatherData }) => {
  const renderItem = ({ item }) => (
    <ListItem
      condition={item.weather[0].main}
      dt_txt={item.dt_txt}
      min={item.main.temp_min}
      max={item.main.temp_max}
    />
  )
  const { container, image } = styles

  return (
    <SafeAreaView style={container}>
      <ImageBackground
        // props are used to pass data from parent to child
        // they can be used to customize our components
        // core components usually come with props which can be used
        // prop source here is used to set the image
        source={require('../../assets/upcoming-background.jpg')}
        style={image}
      >
        <FlatList
          data={weatherData}
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
