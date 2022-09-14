import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_THEME } from '../graphql/reactivities/ThemeVariable';
import { StyleProp } from 'react-native';

interface ViewWTProps {
  style?: StyleProp<ViewStyle>,
  children: React.ReactNode
}

const ViewWT: React.FC<ViewWTProps> = ({ style, children }) => {

  const { loading, error, data } = useQuery(GET_THEME);

  return (
    <View style={[{ backgroundColor: data.theme.bgColorPrimary }, style]}>
      {children}
    </View>
  )
}

export { ViewWT }