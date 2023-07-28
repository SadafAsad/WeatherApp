/* eslint-disable react-native/no-inline-styles */
// when component is being imported no need for {}
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RowText from '../components/RowText'
// when exported objects are being imported we need {}
import { weatherType } from '../utilities/weatherType'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/StatusBar'
import DailyForecast from '../components/DailyForecast'

const CurrentWeather = ({ weatherData, day, city, country }) => {
  const {
    container,
    tempStyles,
    feels,
    highLowWrapper,
    highLow,
    image,
    cityName,
    detailContainer,
    detailStyle
  } = styles

  const {
    main: { temp, feels_like, temp_max, temp_min, humidity },
    weather,
    wind,
    visibility
  } = weatherData[0]

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
          <Text style={[tempStyles, { color: textsColor }]}>{`${Math.round(
            temp
          )}°`}</Text>
          <Text
            style={[feels, { color: textsColor }]}
          >{`Feels like ${Math.round(feels_like)}°`}</Text>
          <RowText
            messageOne={`High: ${Math.round(temp_max)}° `}
            messageTwo={`Low: ${Math.round(temp_min)}°`}
            containerStyles={highLowWrapper}
            messageOneStyles={[highLow, { color: textsColor }]}
            messageTwoStyles={[highLow, { color: textsColor }]}
          />
        </View>
        <View>
          <Text style={[cityName, { color: textsColor }]}>{city}</Text>
          <Text style={[cityName, { color: textsColor }]}>{country}</Text>
        </View>
      </View>
      <View style={detailContainer}>
        <View style={detailStyle}>
          <DailyForecast weather={weatherData} style={textsColor} />
        </View>
        <View style={[detailStyle, { alignItems: 'center' }]}>
          <Text
            style={[
              { color: textsColor },
              { fontWeight: 'bold', fontSize: 20 }
            ]}
          >
            Humidity:
          </Text>
          <Text style={{ marginBottom: 30, fontSize: 20 }}>{humidity}%</Text>
          <Text
            style={[
              { color: textsColor },
              { fontWeight: 'bold', fontSize: 20 }
            ]}
          >
            Wind:
          </Text>
          <Text style={{ marginBottom: 30, fontSize: 20 }}>
            {wind.speed}mph
          </Text>
          <Text
            style={[
              { color: textsColor },
              { fontWeight: 'bold', fontSize: 20 }
            ]}
          >
            Visibility:
          </Text>
          <Text style={{ fontSize: 20 }}>{visibility}mi</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(225, 225, 255, 0.5)',
    borderRadius: 20,
    flexDirection: 'row',
    flex: 0.33,
    justifyContent: 'space-evenly',
    margin: 10
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
  image: {
    flex: 1
  },
  cityName: {
    fontSize: 20
  },
  detailContainer: {
    flex: 0.67,
    flexDirection: 'row'
  },
  detailStyle: {
    flex: 0.5,
    backgroundColor: 'rgba(225, 225, 255, 0.5)',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center'
  }
})

export default CurrentWeather
