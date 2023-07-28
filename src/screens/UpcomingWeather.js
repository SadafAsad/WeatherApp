import React, { useState } from 'react'
import { StyleSheet, ImageBackground, SectionList, Text } from 'react-native'
import ListItem from '../components/ListItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/StatusBar'

const UpcomingWeather = ({ weatherData }) => {
  const renderItem = ({ item }) => (
    <ListItem
      condition={item.weather[0].main}
      dt_txt={item.dt_txt}
      min={item.main.temp_min}
      max={item.main.temp_max}
    />
  )
  const { image } = styles
  const insets = useSafeAreaInsets()

  const reformatDataForSectionList = (data) => {
    // Initialize an empty array to store the formatted sections
    const sections = []

    // Group the data by the date (dt_txt) using a dictionary
    const groupedData = data.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0] // Extract the date part from dt_txt
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    }, {})

    // Iterate through the grouped data and create sections
    for (const date in groupedData) {
      sections.push({
        title: date,
        data: groupedData[date]
      })
    }

    return sections
  }

  const formattedData = reformatDataForSectionList(weatherData)

  return (
    <ImageBackground
      // props are used to pass data from parent to child
      // they can be used to customize our components
      // core components usually come with props which can be used
      // prop source here is used to set the image
      source={require('../../assets/upcoming-background.jpg')}
      style={[
        image,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }
      ]}
    >
      <FocusAwareStatusBar barStyle="light-content" />
      <SectionList
        sections={formattedData}
        renderItem={renderItem}
        // reason for key is performance based
        // keep track of each item in the list
        // hence, updating the list rather than rebuilding evrything when a change happens
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff'
  }
})

export default UpcomingWeather
