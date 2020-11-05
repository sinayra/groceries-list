import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DarkTheme from "./styles/DarkTheme";
import DefaultTheme from "./styles/DefaultTheme";

import Home from "./pages/Home";
import Grocery from "./pages/Grocery";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import List from "./pages/List";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Menu = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <Tab.Navigator initialRouteName="Login" backBehavior="history" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = "";

        if (route.name === 'Home') {
          iconName = focused ? 'home-circle' : 'home';
        } else if (route.name === 'Grocery') {
          iconName = focused ? 'plus-circle' : 'plus';
        }
        else if (route.name === 'List') {
          iconName = focused ? 'view-list' : 'format-list-checkbox';
        }

        // You can return any component that you like here!
        return iconName.length > 0 ? <MaterialCommunityIcons name={iconName} size={size} color={color} /> : <></>;
      },
    })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.secondaryCard,
      }}>
      <Tab.Screen name="List" component={List} options={{ tabBarLabel: "Lista de compras" }} />
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Início" }} />
      <Tab.Screen name="Grocery" component={Grocery} options={{ tabBarLabel: "Adicionar" }} />
    </Tab.Navigator>
  );
}

const Routes = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        headerMode="none"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
