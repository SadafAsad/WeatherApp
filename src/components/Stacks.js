import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CurrentWeather from '../screens/CurrentWeather'
import moment from 'moment'
import UpcomingWeather from '../screens/UpcomingWeather'
import City from '../screens/City'
import { TabView, SceneMap } from 'react-native-tab-view'

const Stack = createNativeStackNavigator()

const MyTabView = () => {
  const [index, setIndex] = useState(0)
  const routes = [
    { key: 'Current', title: 'Current' },
    { key: 'Upcoming', title: 'Upcoming' },
    { key: 'City', title: 'City' }
  ]
  const renderScene = SceneMap({
    screenA: 'Current',
    screenB: 'Upcoming',
    screenC: 'City'
  })
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex)
  }
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      swipeEnabled={true}
    />
  )
}

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
      <Stack.Screen
        name="Main"
        component={MyTabView}
        options={{ headerShown: false }}
      />
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
