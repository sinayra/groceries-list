import { DefaultTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../types/ExtendedTheme';

const CustomTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
    red: "rgb(176, 23, 0)",
    green: "rgb(32, 176, 0)",
    yellow: "rgb(237, 211, 64)",
    secondaryCard: "rgb(191, 191, 191)",
  },
};

export default CustomTheme;
