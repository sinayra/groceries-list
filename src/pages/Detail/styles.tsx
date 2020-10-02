import { StyleSheet } from "react-native";
import Constants from "expo-constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
  },
  historyItem: {
    padding: 20,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center"
  },
  content: {
    flex: 1,
  },
  prices: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  priceItem: {
    width: 0,
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  priceText: {
    textAlign: "center",
    fontFamily: "Roboto_400Regular"
  },
  title: {
    fontFamily: "Ubuntu_700Bold",
    flex: 1,
  },
  
  header: {
    minHeight: 100,
  },
  button: {
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
  },
});

export default styles;
