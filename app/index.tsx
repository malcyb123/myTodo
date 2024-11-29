import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import DisplayTodos from "@/src/Screens/MainScreenTodo";
import AddTodos from "@/src/Screens/AddScreenTodo";
import UpdateTodo from "@/src/Screens/UpdateScreen";
import { store } from "@/src/redux/store";

type RootStackParamList = {
  DisplayTodos: undefined;
  AddTodos: undefined;
  UpdateTodo: { todoId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="DisplayTodos" component={DisplayTodos}  options={{  title: 'Mosaddeka: TodoApp' }}/>
          <Stack.Screen name="AddTodos" component={AddTodos} options={{ title: 'Add Todo' }} />
          <Stack.Screen name="UpdateTodo" component={UpdateTodo} options={{ title: 'Update Todo' }} />
        </Stack.Navigator>
      </Provider>
    </GestureHandlerRootView>
  );
}
