/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react'
import CurrentWeather from '../screens/CurrentWeather'
import UpcomingWeather from '../screens/UpcomingWeather'
import City from '../screens/City'
// 2:34:10 platform specific tab navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'

const Tab = createBottomTabNavigator()

const Tabs = ({ weather }) => {
  const [tabBarStyle, setTabBarStyle] = useState('')
  const [day, setDay] = useState(true)

  const calculateDay = () => {
    setDay(
      moment().isBetween(
        moment.unix(weather.city.sunrise),
        moment.unix(weather.city.sunset)
      )
    )
    if (day) {
      setTabBarStyle('black')
    } else {
      setTabBarStyle('white')
    }
  }

  useEffect(() => {
    calculateDay()
  })

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute'
        },
        headerShown: false
      }}
    >
      <Tab.Screen
        name={'Current'}
        // focused: different icons when active and inactive
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'droplet'}
              size={25}
              color={focused ? { tabBarStyle } : 'grey'}
            />
          )
        }}
      >
        {() => (
          <CurrentWeather
            weatherData={weather.list.slice(0, 9)}
            day={day}
            city={weather.city.name}
            country={weather.city.country}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={'Upcoming'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'clock'}
              size={25}
              color={focused ? { tabBarStyle } : 'grey'}
            />
          )
        }}
      >
        {() => <UpcomingWeather weatherData={weather.list} day={day} />}
      </Tab.Screen>
      <Tab.Screen
        name={'City'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'home'}
              size={25}
              color={focused ? { tabBarStyle } : 'grey'}
            />
          )
        }}
      >
        {() => <City weatherData={weather.city} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs
