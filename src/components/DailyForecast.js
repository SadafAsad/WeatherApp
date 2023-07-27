import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

const DailyForecast = () => {
  let DATA = [
    {
      hour: '4',
      icon: 'sun',
      temp: '20•'
    },
    {
      hour: '5',
      icon: 'sun',
      temp: '20•'
    },
    {
      hour: '6',
      icon: 'sun',
      temp: '20•'
    },
    {
      hour: '7',
      icon: 'sun',
      temp: '20•'
    },
    {
      hour: '8',
      icon: 'sun',
      temp: '20•'
    },
    {
      hour: '9',
      icon: 'sun',
      temp: '20•'
    },
    {
      hour: '1',
      icon: 'sun',
      temp: '20•'
    },
    {
      hour: '2',
      icon: 'sun',
      temp: '20•'
    }
  ]

  const renderItem = ({ item }) => (
    <View style={styles.eachRow}>
      <Text style={styles.hourStyle}>{item.hour}</Text>
      <Feather name="sun" size={30} color="black" />
      <Text style={styles.tempStyle}>{item.temp}</Text>
    </View>
  )

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.hour}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  eachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  hourStyle: {
    fontSize: 20,
    marginRight: 10
  },
  tempStyle: {
    fontSize: 20,
    marginLeft: 10
  }
})

export default DailyForecast
