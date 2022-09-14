import React from 'react'
import { TextStyle, Text } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_THEME } from '../graphql/reactivities/ThemeVariable';
import { StyleProp } from 'react-native';

interface TextWTProps {
  style?: StyleProp<TextStyle>,
  children: string
}

const TextWT: React.FC<TextWTProps> = ({ style, children }) => {

  const { data } = useQuery(GET_THEME);

  return (
    <Text style={[{ color: data.theme.textColorPrimary }, style]}>
      {children}
    </Text>
  )
}

export { TextWT }