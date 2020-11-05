import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20 + Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  content: {
    flex: 1,
  },
  priceContent:{
    flexDirection: "row",
    alignItems: "flex-end"
  },
  input: {
    height: 54,
    color: "white",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
});

export default styles;
