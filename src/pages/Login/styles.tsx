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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: 60,
    flexDirection: "row",
    overflow: "hidden",
    marginTop: 8,
    backgroundColor: "rgb(70,136,241)"
  },
  logo: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",
    flexDirection: "row"
  },
  buttonText: {
    textAlign: "center",
    flex: 1,
    fontFamily: "Roboto_500Medium",
  },
});

export default styles;
