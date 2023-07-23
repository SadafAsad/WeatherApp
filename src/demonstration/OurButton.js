import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const OurButton = () => {
  const onPress = () => {
    console.log('press')
  }
  const { container, buttonText } = styles
  return (
    <TouchableOpacity style={container} onPress={onPress}>
      <Text style={buttonText}>Hello</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // on Android only
    elevation: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 5
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center'
  }
})

export default OurButton
