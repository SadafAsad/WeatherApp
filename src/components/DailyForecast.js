import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import { weatherType } from '../utilities/weatherType'

const DailyForecast = (props) => {
  const { weather } = props

  const renderItem = ({ item }) => (
    <View style={styles.eachRow}>
      <Text style={styles.hourStyle}>{moment(item.dt_txt).format('h a')}</Text>
      <Feather
        name={weatherType[item.weather[0].main].icon}
        size={25}
        color="black"
      />
      <Text style={styles.tempStyle}>{item.main.temp}</Text>
    </View>
  )

  return (
    <View>
      <FlatList
        data={weather}
        renderItem={renderItem}
        keyExtractor={(item) => item.dt_txt}
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
    fontSize: 15,
    marginRight: 10
  },
  tempStyle: {
    fontSize: 15,
    marginLeft: 10
  }
})

export default DailyForecast
