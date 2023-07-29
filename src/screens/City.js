import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, ImageBackground, View } from 'react-native'
import IconText from '../components/IconText'
import moment from 'moment'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/StatusBar'

const City = ({ weatherData, day }) => {
  const {
    image,
    cityName,
    cityText,
    countryName,
    populationWrapper,
    populationText,
    riseSetText,
    riseSetWrapper,
    rowLayout
  } = styles

  const { name, country, population, sunrise, sunset } = weatherData
  const insets = useSafeAreaInsets()
  const [txtColor, setTxtColor] = useState('black')
  const [barStyle, setBarStyle] = useState('black')

  useEffect(() => {
    if (day) {
      setBarStyle('dark-content')
      setTxtColor('black')
    } else {
      setBarStyle('light-content')
      setTxtColor('white')
    }
  }, [day])

  return (
    <ImageBackground
      source={require('../../assets/city.jpg')}
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
      <View style={styles.overlay} />
      <FocusAwareStatusBar barStyle={barStyle} />
      <Text style={[cityText, cityName, { color: { txtColor } }]}>{name}</Text>
      <Text style={[cityText, countryName, { color: { txtColor } }]}>
        {country}
      </Text>
      <View style={[populationWrapper, rowLayout]}>
        <IconText
          iconName={'user'}
          iconColor={txtColor}
          bodyText={`Population: ${population}`}
          bodyTextStyles={populationText}
        />
      </View>
      <View style={[riseSetWrapper, rowLayout]}>
        <IconText
          iconName={'sunrise'}
          iconColor={txtColor}
          bodyText={moment(sunrise).format('h:mm:ss a')}
          bodyTextStyles={riseSetText}
        />
        <IconText
          iconName={'sunset'}
          iconColor={txtColor}
          bodyText={moment(sunset).format('h:mm:ss a')}
          bodyTextStyles={riseSetText}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  cityName: {
    fontSize: 40
  },
  countryName: {
    fontSize: 30
  },
  cityText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  populationWrapper: {
    justifyContent: 'center',
    marginTop: 30
  },
  populationText: {
    fontSize: 25,
    marginLeft: 7.5
  },
  riseSetWrapper: {
    justifyContent: 'space-around',
    marginTop: 30
  },
  riseSetText: {
    fontSize: 20
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(225, 225, 255, 0.1)' // Semi-transparent grey color
  }
})

export default City
