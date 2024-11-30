import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../utils/types";

interface TodosState {
  todos: Todo[];
  shouldScrollToTop: boolean; // Flag to control scroll to top
}

// Initial state of todoSlice
const initialState: TodosState = {
  todos: [],
  shouldScrollToTop: false, // Initial state is false
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = {
          ...action.payload,
          updated_at: new Date().toISOString(), // Update the updated_at timestamp and the data
        };
      }
    },
    toggleTodoCompletion(state, action: PayloadAction<number>) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setShouldScrollToTop(state) {
      state.shouldScrollToTop = true; // This just triggers scroll to top
    },
    resetScrollToTop(state) {
      state.shouldScrollToTop = false; // Reset scroll state
    },
  },
});

export const {
  setTodos,
  addTodo,
  toggleTodoCompletion,
  removeTodo,
  updateTodo,
  resetScrollToTop,
  setShouldScrollToTop,
} = todosSlice.actions;
export default todosSlice.reducer;
