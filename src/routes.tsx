import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";

import DarkTheme from "./styles/DarkTheme";
import DefaultTheme from "./styles/DefaultTheme";

import Home from "./pages/Home";
import Grocery from "./pages/Grocery";
import Detail from "./pages/Detail";

const AppStack = createStackNavigator();

const Routes = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: scheme === "dark" ? DarkTheme.colors.background: DefaultTheme.colors.background,
          },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Grocery" component={Grocery} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
