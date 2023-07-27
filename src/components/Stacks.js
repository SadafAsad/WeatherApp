import React from 'react'

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

  const handleSwipe = (event, route) => {
    const { translationX } = event.nativeEvent

    if (translationX < -100) {
      navigation.navigate('Upcoming')
    } else if (translationX > 100) {
      navigation.navigate('City')
    }

    // // Check the current route name
    // if (route === 'Current') {
    //   if (translationX > 100) {
    //     navigation.navigate('City')
    //   } else if (translationX < -100) {
    //     navigation.navigate('Upcoming')
    //   }
    // } else if (route === 'Upcoming' && translationX > 100) {
    //   navigation.goBack() // Go back to the 'Current' screen from 'Upcoming'
    // } else if (route === 'City' && translationX < -100) {
    //   navigation.goBack() // Go back to the 'Current' screen from 'City'
    // }
  }

  return (
    <PanGestureHandler onGestureEvent={handleSwipe}>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: 'transparent',
              position: 'absolute'
            },
            headerShown: false
          }}
          initialRouteName="Current"
        >
          <Stack.Screen name="Current">
            {() => (
              <CurrentWeather
                weatherData={weather.list.slice(0, 9)}
                day={moment().isBetween(
                  moment.unix(weather.city.sunrise),
                  moment.unix(weather.city.sunset)
                )}
                city={weather.city.name}
                country={weather.city.country}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Upcoming">
            {() => <UpcomingWeather weatherData={weather.list} />}
          </Stack.Screen>
          <Stack.Screen name="City">
            {() => <City weatherData={weather.city} />}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </PanGestureHandler>
  )
}

export default Stacks
