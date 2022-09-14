import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const QRScanScreen = () => {

  return (
    <View style={styles.container}>
      <Text>QRScan</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
