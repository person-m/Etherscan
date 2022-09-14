import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ViewWT } from '../components'
import { GET_THEME } from '../graphql/reactivities/ThemeVariable'
import Color from '../utils/Color'

export const SplashScreen = () => {

  const { loading, error, data } = useQuery(GET_THEME);

  const icon = data.theme.type === 'dark' ? 
    require('../images/logo_dark.png') :
    require('../images/logo_light.png')

  return (
    <ViewWT style={styles.container}>
      <Image source={icon} style={styles.logo} />
    </ViewWT>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
  }
})