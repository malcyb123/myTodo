// Function to filter and sort todo items
export const filterAndSortTodos = (
  todos: any[],
  status: string, //status filter for (All, Active, Done)
  order: "asc" | "desc"
) => {
  let filteredTodos = [...todos];

  // Apply filtering based on status
  switch (status) {
    case "active":
      filteredTodos = filteredTodos.filter((todo) => !todo.completed); //Item is false (active)
      break;
    case "done":
      filteredTodos = filteredTodos.filter((todo) => todo.completed); //Item is true (Done)
      break;
    default:
      break;
  }

  // Sort the filtered todo based on their id in specific order and compare id for sorting.
  //Ascending or Descending based on their order argument
  return filteredTodos.sort((a, b) => {
    return order === "asc" ? a.id - b.id : b.id - a.id;
  });
};

//Function to count number of todo in the categories (All, Active, Done)
export const countTodos = (todos: any[]) => {
  const allCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const doneCount = todos.filter((todo) => todo.completed).length;

  return { allCount, activeCount, doneCount };
};
