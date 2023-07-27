import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/components/Tabs'
import { useGetWeather } from './src/hooks/useGetWeather'
import ErrorItem from './src/components/ErrorItem'
import Stacks from './src/components/Stacks'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  const [loading, error, weather] = useGetWeather()

  if (weather && weather.list && !loading) {
    return (
      // <NavigationContainer>
      //   {/* <Tabs weather={weather} /> */}
      //   <Stacks weather={weather} />
      // </NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stacks weather={weather} />
        </NavigationContainer>
      </GestureHandlerRootView>
    )
  }
  return (
    <View style={styles.container}>
      {error ? (
        <ErrorItem />
      ) : (
        <ActivityIndicator size={'large'} color={'blue'} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  }
})

export default App
