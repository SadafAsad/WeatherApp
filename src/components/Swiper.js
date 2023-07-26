import React, { useRef  } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createAppContainer } from 'react-navigation'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

const Swiper = () => {
  const navigation = useNavigation()

  const { width } = Dimensions.get('window')
  const SWIPE_THRESHOLD = 0.25 * width // Minimum distance to detect swipe as a percentage of screen width

  const handleSwipe = (gestureState) => {
    const { translationX, velocityX } = gestureState;
    if (translationX > SWIPE_THRESHOLD && velocityX > 0) {
      // Swiped right, navigate to ScreenB
      navigation.navigate('Current')
    } else if (translationX < -SWIPE_THRESHOLD && velocityX < 0) {
      // Swiped left, navigate to ScreenA
      navigation.navigate('Upcoming')
    }
  }

  return (
    <View>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <View>
          <Text>Swipe right or left on this content</Text>
        </View>
      </PanGestureHandler>
    </View>
  )
}

export default Swiper
