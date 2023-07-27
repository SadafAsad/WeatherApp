import React from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
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
      <Feather name="sun" size={35} color="black" />
      <Text style={styles.tempStyle}>{item.temp}</Text>
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.hour}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.67,
    backgroundColor: 'rgba(225, 225, 255, 0.5)',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 10,
    paddingBottom: 10
  },
  eachRow: {
    flexDirection: 'row',
    alignItems: 'center'
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
