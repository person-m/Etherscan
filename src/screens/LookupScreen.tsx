import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import i18n from '../utils/i18n';
import { ViewWT, TextWT } from '../components'
import { useQuery } from '@apollo/client';
import { GET_THEME } from '../graphql/reactivities/ThemeVariable';

export const LookupScreen = () => {
  const { loading, error, data } = useQuery(GET_THEME);
  const [address, setAddress] = useState('');
  return (
    <ViewWT style={styles.container}>
      <View style={styles.titleView}>
        <TextWT style={styles.title}>{i18n.t('Lookup.Title')}</TextWT>
      </View>
      <TextInput
        style={[{
          backgroundColor: data.theme.bgColorSecondary,
          color: data.theme.textColorPrimary
        }, styles.textInput]}
        placeholder={i18n.t('Lookup.Placeholder')}
        onChangeText={newAddress => setAddress(newAddress)}
        defaultValue={address}
      />
      <TouchableOpacity
        style={[{ backgroundColor: data.theme.colorAccentPrimary }, styles.button]}
      >
        <Text style={[{ color:data.theme.textColorPrimary }, styles.textButton]}>
          {i18n.t('Lookup.Button')}
        </Text>
      </TouchableOpacity>
    </ViewWT>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    alignItems: 'center',
    marginVertical: 20
  },
  title: {
    fontSize: 12
  },
  textInput: {
    height: 50,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: '5%',
    paddingHorizontal: '5%',
    marginBottom: 20
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})