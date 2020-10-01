import { StyleSheet } from 'react-native';
import variables from "../../styles/variables"

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 3,
  },
  name: {
    fontSize: variables.FONT_SIZE_SMALL,
    fontFamily: 'Roboto_400Regular',
  },
});

  export default styles;