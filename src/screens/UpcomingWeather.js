import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, SectionList, Text } from 'react-native'
import ListItem from '../components/ListItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/StatusBar'
import moment from 'moment'

const UpcomingWeather = ({ weatherData, day }) => {
  const renderItem = ({ item }) => (
    <ListItem
      condition={item.weather[0].main}
      dt_txt={item.dt_txt}
      min={item.main.temp_min}
      max={item.main.temp_max}
    />
  )
  const { image, header } = styles
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

  const [imageBackground, setImageBackground] = useState(null)
  const [barStyle, setBarStyle] = useState('')
  const [textsColor, setTextsColor] = useState('')

  useEffect(() => {
    if (day) {
      setImageBackground(require('../../assets/day.jpg'))
      setBarStyle('dark-content')
      setTextsColor('black')
    } else {
      setImageBackground(require('../../assets/night.jpg'))
      setBarStyle('light-content')
      setTextsColor('white')
    }
  }, [day])

  return (
    <ImageBackground
      // props are used to pass data from parent to child
      // they can be used to customize our components
      // core components usually come with props which can be used
      // prop source here is used to set the image
      source={imageBackground}
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
      <FocusAwareStatusBar barStyle={barStyle} />
      <SectionList
        sections={formattedData}
        renderItem={renderItem}
        // reason for key is performance based
        // keep track of each item in the list
        // hence, updating the list rather than rebuilding evrything when a change happens
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[header, { color: { textsColor } }]}>
            {moment(title).format('dddd')}
          </Text>
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
