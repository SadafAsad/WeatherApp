import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { weatherType } from '../utilities/weatherType'
import moment from 'moment'

// each list's elements
const ListItem = (props) => {
  const { dt_txt, min, max, condition, txt_color } = props
  const { item, date, temp, dateTextWrapper } = styles

  return (
    <View style={item}>
      <Feather
        name={weatherType[condition]?.icon}
        size={50}
        color={txt_color}
      />
      <View style={dateTextWrapper}>
        <Text style={[date, { color: { txt_color } }]}>
          {moment(dt_txt).format('dddd')}
        </Text>
        <Text style={[date, { color: { txt_color } }]}>
          {moment(dt_txt).format('h:mm:ss a')}
        </Text>
      </View>
      <Text style={[temp, { color: { txt_color } }]}>{`${Math.round(
        min
      )}°/${Math.round(max)}°`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    // to evenly distribute items in the row
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(225, 225, 255, 0.5)'
  },
  temp: {
    fontSize: 20
  },
  date: {
    fontSize: 15
  },
  dateTextWrapper: {
    flexDirection: 'column'
  }
})

export default ListItem
