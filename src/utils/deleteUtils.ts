import { Alert } from "react-native";

//Function to confirm deletion of a todo item with an alert
//Dispatch with the removeTodo action to remove the todo from the store
export const confirmDelete = (id: number, dispatch: any, removeTodo: any) => {
  Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Delete",
      onPress: () => dispatch(removeTodo(id)),
      style: "destructive",
    },
  ]);
};
