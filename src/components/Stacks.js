import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CurrentWeather from '../screens/CurrentWeather'
import moment from 'moment'
import UpcomingWeather from '../screens/UpcomingWeather'
import City from '../screens/City'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()

const Stacks = ({ weather }) => {
  return (
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
  )
}

export default Stacks
