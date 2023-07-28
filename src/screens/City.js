import React from 'react'
import { Text, StyleSheet, ImageBackground, View } from 'react-native'
import IconText from '../components/IconText'
import moment from 'moment'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/StatusBar'

const City = ({ weatherData }) => {
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
      <FocusAwareStatusBar barStyle="light-content" />
      <Text style={[cityText, cityName]}>{name}</Text>
      <Text style={[cityText, countryName]}>{country}</Text>
      <View style={[populationWrapper, rowLayout]}>
        <IconText
          iconName={'user'}
          iconColor={'red'}
          bodyText={`Population: ${population}`}
          bodyTextStyles={populationText}
        />
      </View>
      <View style={[riseSetWrapper, rowLayout]}>
        <IconText
          iconName={'sunrise'}
          iconColor={'white'}
          bodyText={moment(sunrise).format('h:mm:ss a')}
          bodyTextStyles={riseSetText}
        />
        <IconText
          iconName={'sunset'}
          iconColor={'white'}
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
    fontWeight: 'bold',
    color: 'white'
  },
  populationWrapper: {
    justifyContent: 'center',
    marginTop: 30
  },
  populationText: {
    fontSize: 25,
    marginLeft: 7.5,
    color: 'red'
  },
  riseSetWrapper: {
    justifyContent: 'space-around',
    marginTop: 30
  },
  riseSetText: {
    fontSize: 20,
    color: 'white'
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default City
