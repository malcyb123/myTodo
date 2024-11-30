import React from "react";
// Wraps the app with Provider to manage global state
import { Provider } from "react-redux";
 // For stack-based navigation flow
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//It ensures Gesture handling works smoothly across app
import { GestureHandlerRootView } from "react-native-gesture-handler";

import DisplayTodos from "@/src/Screens/MainScreenTodo";
import AddTodos from "@/src/Screens/AddScreenTodo";
import UpdateTodo from "@/src/Screens/UpdateScreen";
import { store } from "@/src/redux/store";
import { RootStackParamList } from "@/src/utils/types";


// Creating a stack navigator to ensure proper parameters are passed to each screen.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // Gesture Handling for swipeable lists or tabs.
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
