import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingTop: 20 + Constants.statusBarHeight,
    paddingBottom: 20 + Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  history: {
    backgroundColor: "#FFAAAA",
    padding: 20
  },
  historyItem: {
    backgroundColor: "#AAAFFA",
    paddingBottom: 20,
  },
  content: {
    backgroundColor: "#FFA",
    flex: 1,
  },
  prices: {
    backgroundColor: "#CAB",
  },
  priceItem: {
    paddingLeft: 10,
  },
});

export default styles;
