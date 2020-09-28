import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    padding: 15,
    paddingRight: 50,
  },
  prices: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: "#CAB"
  },
  priceItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
  }
});

  export default styles;