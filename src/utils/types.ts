//Types defination for navigation stack parameters.

export type RootStackParamList = {
  DisplayTodos: undefined;
  AddTodos: undefined;
  UpdateTodo: { todoId: number }; // It expects a parameter of type number to update
};

// Structure defination of a Todo Item
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

// Props defination for Tabs component, handles the tabs for All, Active, Done state
export interface TabsProps {
  index: number;  // Tracks currently active Tab
  setIndex: React.Dispatch<React.SetStateAction<number>>; //Function to update the selected tab index and switch between tabs
  routes: { key: string; title: string }[]; // Array of tab routes
  renderScene: any; //Render the content for selected tab
  allCount: number;
  activeCount: number;
  doneCount: number;
}
