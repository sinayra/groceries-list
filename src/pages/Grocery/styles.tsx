import { StyleSheet } from "react-native";
import variables from "../../styles/variables";
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
    justifyContent: "space-between",
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
    fontSize: variables.FONT_SIZE_LARGE,
  },
  input: {
    height: 54,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  label: {
    fontFamily: "Roboto_400Regular",
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBlock: {
    width: "48%",
  },
  form: {},
  showNew: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: variables.FONT_SIZE_LARGE + 10,
    fontFamily: "Ubuntu_700Bold",
  },
});

export default styles;
