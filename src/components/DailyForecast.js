/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import { weatherType } from '../utilities/weatherType'

const DailyForecast = (props) => {
  const { weather, style } = props

  const renderItem = ({ item }) => (
    <View style={styles.eachRow}>
      <Text style={[styles.hourStyle, { color: style }]}>
        {moment(item.dt_txt).format('hh a')}
      </Text>
      <Feather
        name={weatherType[item.weather[0].main].icon}
        size={25}
        color={style}
        style={{ flex: 0.3 }}
      />
      <Text style={[styles.tempStyle, { color: style }]}>{`${Math.round(
        item.main.temp
      )}•`}</Text>
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
    marginBottom: 5,
    flex: 1,
    justifyContent: 'space-around'
  },
  hourStyle: {
    fontSize: 15
  },
  tempStyle: {
    fontSize: 15
  }
})

export default DailyForecast
