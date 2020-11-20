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
  titleText: {
    fontFamily: "Ubuntu_700Bold",
    flex: 1
  },
  titleIcon: {
    paddingRight: 5,
  },
  title: {
    flexDirection: "row"
  },
  purchaseList: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 10
  },
  buttonBox_vertical: {
    flexDirection: "column",
    height: 46 * 3
  },
  buttonBox__separator_vertical: {
    width: "100%",
    height: 0.5
  }
});

export default styles;