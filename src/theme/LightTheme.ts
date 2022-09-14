import { Platform } from 'react-native';
import Color from '../utils/Color';

export default {
  type: 'light',
  logoSplashScreen: 'logo_white.png',
  barStyle: Platform.OS === 'ios' ? 'dark-content' : 'light-content',
  bgColorPrimary: Color.WHITE,
  bgColorSecondary: Color.WHITESMOKE,
  bgColorThird: Color.LIGHTGRAY,
  colorOpposite: Color.BLACK,
  colorAccentPrimary: Color.BRIGHTBLUE,
  textColorPrimary: Color.BLACK,
  textColorSecondary: Color.DARKGRAY,
};