import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  prices: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      borderRadius: 10,
      marginTop: 8,
      paddingVertical: 10,
  },
  priceItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
  },
  price: {
    fontFamily: "Roboto_400Regular"
  },
  starPrice: {
    fontFamily: "Roboto_500Medium"
  },
  title: {
    fontFamily: "Ubuntu_700Bold"
  }
});

  export default styles;