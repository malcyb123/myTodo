import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./TodoSlice";

// Configure the Redux store with the todosReducer to manage the todos state
// Exports types for RootState and AppDispatch for type safety in Redux actions and state
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
