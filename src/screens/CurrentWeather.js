// when component is being imported no need for {}
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RowText from '../components/RowText'
// when exported objects are being imported we need {}
import { weatherType } from '../utilities/weatherType'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/StatusBar'

const CurrentWeather = ({ weatherData, day, city, country }) => {
  const {
    container,
    tempStyles,
    feels,
    highLowWrapper,
    highLow,
    bodyWrapper,
    description,
    message,
    image,
    cityNameContainer,
    cityName,
    detailContainer,
    dailyForecast,
    detailStyle
  } = styles

  const {
    main: { temp, feels_like, temp_max, temp_min },
    weather
  } = weatherData

  // optional chaining in the places that we are accessing nested object properties
  // undefined will be returned if one of the properties does not exist instead of an error
  const weatherCondition = weather[0]?.main

  const insets = useSafeAreaInsets()

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
      <View style={container}>
        <View style={{ justifyContent: 'center' }}>
          <Feather
            name={weatherType[weatherCondition]?.icon}
            size={100}
            color={textsColor}
          />
          <Text style={[tempStyles, { color: textsColor }]}>{`${temp}°`}</Text>
          <Text
            style={[feels, { color: textsColor }]}
          >{`Feels like ${feels_like}°`}</Text>
          <RowText
            messageOne={`High: ${temp_max}° `}
            messageTwo={`Low: ${temp_min}°`}
            containerStyles={highLowWrapper}
            messageOneStyles={[highLow, { color: textsColor }]}
            messageTwoStyles={[highLow, { color: textsColor }]}
          />
        </View>
        <View style={cityNameContainer}>
          <Text style={[cityName, { color: textsColor }]}>{city}</Text>
          <Text style={[cityName, { color: textsColor }]}>{country}</Text>
        </View>
      </View>
      <View style={detailContainer}>
        <View style={dailyForecast}>
          <Text>HI</Text>
        </View>
        <View style={detailStyle}>
          <Text>BYE</Text>
        </View>
      </View>
      {/* <RowText
        messageOne={weather[0]?.description}
        messageTwo={weatherType[weatherCondition]?.message}
        containerStyles={bodyWrapper}
        messageOneStyles={[description, { color: textsColor }]}
        messageTwoStyles={[message, { color: textsColor }]}
      /> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(225, 225, 255, 0.5)',
    borderRadius: 20,
    flexDirection: 'row',
    flex: 0.33,
    justifyContent: 'center',
    margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 10,
    paddingBottom: 10
  },
  tempStyles: {
    fontSize: 48
  },
  feels: {
    fontSize: 30
  },
  highLow: {
    fontSize: 20
  },
  highLowWrapper: {
    flexDirection: 'row'
  },
  bodyWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 25,
    marginBottom: 40
  },
  description: {
    fontSize: 43
  },
  message: {
    fontSize: 25
  },
  image: {
    flex: 1
  },
  cityNameContainer: {
    // justifyContent: 'baseline'
  },
  cityName: {
    fontSize: 20
  },
  detailContainer: {
    flex: 0.67,
    flexDirection: 'row'
  },
  dailyForecast: {
    flex: 0.35,
    backgroundColor: 'rgba(225, 225, 255, 0.5)',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 10,
    paddingBottom: 10
  },
  detailStyle: {
    flex: 0.65,
    backgroundColor: 'rgba(225, 225, 255, 0.5)',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 10,
    paddingBottom: 10
  }
})

export default CurrentWeather
