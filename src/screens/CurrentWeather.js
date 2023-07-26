// when component is being imported no need for {}
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RowText from '../components/RowText'
// when exported objects are being imported we need {}
import { weatherType } from '../utilities/weatherType'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/StatusBar'

const CurrentWeather = ({ weatherData, day }) => {
  const {
    container,
    tempStyles,
    feels,
    highLowWrapper,
    highLow,
    bodyWrapper,
    description,
    message,
    image
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

  useEffect(() => {
    if (day) {
      setImageBackground(require('../../assets/day.jpg'));
    } else {
      setImageBackground(require('../../assets/night.jpg'));
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
      <FocusAwareStatusBar barStyle="light-content" />
      <View style={container}>
        <Feather
          name={weatherType[weatherCondition]?.icon}
          size={100}
          color="white"
        />
        <Text style={tempStyles}>{`${temp}°`}</Text>
        <Text style={feels}>{`Feels like ${feels_like}°`}</Text>
        <RowText
          messageOne={`High: ${temp_max}° `}
          messageTwo={`Low: ${temp_min}°`}
          containerStyles={highLowWrapper}
          messageOneStyles={highLow}
          messageTwoStyles={highLow}
        />
      </View>
      <RowText
        messageOne={weather[0]?.description}
        messageTwo={weatherType[weatherCondition]?.message}
        containerStyles={bodyWrapper}
        messageOneStyles={description}
        messageTwoStyles={message}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempStyles: {
    color: 'white',
    fontSize: 48
  },
  feels: {
    color: 'white',
    fontSize: 30
  },
  highLow: {
    color: 'white',
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
    fontSize: 43,
    color: 'white'
  },
  message: {
    fontSize: 25,
    color: 'white'
  },
  image: {
    flex: 1
  }
})

export default CurrentWeather
