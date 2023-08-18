/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CurrentWeather from '../screens/CurrentWeather'
import moment from 'moment'
import UpcomingWeather from '../screens/UpcomingWeather'
import City from '../screens/City'
import { useNavigation } from '@react-navigation/native'
import { PanGestureHandler } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()

const Stacks = ({ weather }) => {
  const navigation = useNavigation()
  const [gestureX, setGestureX] = useState(0)
  const [day, setDay] = useState(true)

  const handleSwipe = (event, route) => {
    const { translationX } = event.nativeEvent

    // Check the current route name
    if (route === 'Current') {
      if (translationX > 100) {
        navigation.navigate('City')
      } else if (translationX < -100) {
        navigation.navigate('Upcoming')
      }
    } else if (route === 'Upcoming' && translationX > 100) {
      navigation.goBack() // Go back to the 'Current' screen from 'Upcoming'
    } else if (route === 'City' && translationX < -100) {
      navigation.goBack() // Go back to the 'Current' screen from 'City'
    }
  }

  const animatedStyle = {
    transform: [{ translateX: gestureX }]
  }

  const calculateDay = () => {
    setDay(
      moment().isBetween(
        moment.unix(weather.city.sunrise),
        moment.unix(weather.city.sunset)
      )
    )
  }

  useEffect(() => {
    calculateDay()
  })

  return (
    <Stack.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute'
        },
        headerShown: false,
        gestureEnabled: true
      }}
      initialRouteName="Current"
    >
      <Stack.Screen name="Current">
        {({ route }) => (
          <PanGestureHandler onGestureEvent={(e) => handleSwipe(e, route.name)}>
            <View style={[{ flex: 1 }, animatedStyle]}>
              <CurrentWeather
                weatherData={weather.list.slice(0, 9)}
                day={day}
                city={weather.city.name}
                country={weather.city.country}
              />
            </View>
          </PanGestureHandler>
        )}
      </Stack.Screen>
      <Stack.Screen name="Upcoming">
        {({ route }) => (
          <PanGestureHandler onGestureEvent={(e) => handleSwipe(e, 'Upcoming')}>
            <View style={[{ flex: 1 }, animatedStyle]}>
              <UpcomingWeather weatherData={weather.list} day={day} />
            </View>
          </PanGestureHandler>
        )}
      </Stack.Screen>
      <Stack.Screen name="City">
        {({ route }) => (
          <PanGestureHandler onGestureEvent={(e) => handleSwipe(e, 'City')}>
            <View style={[{ flex: 1 }, animatedStyle]}>
              <City weatherData={weather.city} day={day} />
            </View>
          </PanGestureHandler>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Stacks
