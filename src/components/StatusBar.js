import * as React from 'react'
import { StatusBar } from 'react-native'

const FocusAwareStatusBar = ({ barStyle }) => {
  return (
    <StatusBar translucent backgroundColor="transparent" barStyle={barStyle} />
  )
}

export default FocusAwareStatusBar
