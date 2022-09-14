import { makeVar, gql } from "@apollo/client";
import { Appearance } from 'react-native';
import DarkTheme from "../../theme/DarkTheme";
import LightTheme from "../../theme/LightTheme";

const _theme = Appearance.getColorScheme() === 'dark' ? DarkTheme : LightTheme;
export const theme = makeVar(_theme);

export const GET_THEME = gql`
  query getTheme {
    theme @client
  }`

