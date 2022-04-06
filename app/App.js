import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import { Provider } from "react-redux";
import { Store } from "./redux/store";

import Login from "./screens/login";
import Account from "./screens/account";
import Detail from "./screens/detail";
import Create from "./screens/create";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create"
              component={Create}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
