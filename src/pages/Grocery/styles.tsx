import { StyleSheet } from 'react-native';
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
    alignContent: "stretch"
  },
  item: {
    backgroundColor: "#FFA",
    flex: 1
  },
  floatingMenuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#AAA"
  },
});

  export default styles;