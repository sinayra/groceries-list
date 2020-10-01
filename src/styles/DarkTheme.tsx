import { DarkTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../types/ExtendedTheme';

const CustomTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    primary: '#03DAC6',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: '#CF6679',
    red: "rgb(255, 115, 107)",
    green: "rgb(107, 255, 174)",
    yellow: "rgb(140, 125, 39)",
    secondaryCard: "rgb(46, 46, 46)",
  },
};

export default CustomTheme;