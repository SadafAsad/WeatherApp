import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native'

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{`count: ${count}`}</Text>
        <Button
          color={'red'}
          title={'Increase the count'}
          onPress={() => setCount(count + 1)}
        />
        <Button
          color={'green'}
          title={'Decrese the count'}
          onPress={() => setCount(count - 1)}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'orange'
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginTop: 25
  }
})

export default Counter
