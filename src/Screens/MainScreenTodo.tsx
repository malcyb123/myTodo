import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addTodo, removeTodo, toggleTodoCompletion } from "../redux/TodoSlice";
import { confirmDelete } from "../utils/deleteUtils";
import { countTodos, filterAndSortTodos } from "../utils/todoUtils";
import styles from "./MainScreen";

import axios from "axios";
import TodoList from "../components/UIComponents/TodoList";
import Tabs from "../components/UIComponents/Tabs";
import { RootStackParamList } from "../utils/types";

// Number of items to fetch per page for pagination.
const ITEM_PER_PAGE = 10;

// Define props for the screen using navigation types.
type DisplayTodosProps = NativeStackScreenProps<
  RootStackParamList,
  "DisplayTodos"
>;

const DisplayTodos: React.FC<DisplayTodosProps> = ({ navigation }) => {
  //Access todos from Redux state
  const todos = useSelector((state: RootState) => state.todos.todos);

  const dispatch = useDispatch();

  // State to track the current page for pagination
  const [page, setPage] = useState(1);
  // State to check if more data is available for loading
  const [hasMore, setHasMore] = useState(true);
  // State to track the Loading Status
  const [isLoading, setIsLoading] = useState(false);

  //Ref to track if component renders for the first time
  const initialRender = useRef(true);

  //State to manage index of tab navigation
  const [index, setIndex] = useState(0);

  // Tab States. Define routes with key and titles
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "active", title: "Active" },
    { key: "done", title: "Done" },
  ]);

  // Sorting state (soring state by ID in ascending or descending order)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Function to fetch todos from API with pagination. Handles the todo item and stores new todo.
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch todo items from the API
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${ITEM_PER_PAGE}&_page=${page}`
      );
      // Dispatch fetched item to the Redux store
      data.forEach((todo: any) => {
        dispatch(addTodo(todo));
      });
      //If todos are less then requested, reached to the end and no more data.
      if (data.length < ITEM_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching todos from API", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, dispatch]);

  // Fetch data after initial render. Prevent redundant API calls during first render
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (hasMore) {
      fetchData();
    }
  }, [fetchData, hasMore]);

  //Fetch data when Redux store has no items. Load items when the component mounts.
  useEffect(() => {
    if (todos.length === 0) {
      fetchData();
    }
  }, [todos.length, fetchData]);

  // Filter and sort todos based on the selected tabs and sorting order
  const sortedAndFilteredTodos = filterAndSortTodos(
    todos,
    routes[index].key,
    sortOrder
  );

  // Count todos using utility function
  const { allCount, activeCount, doneCount } = countTodos(todos);

  // Delete an item from the list
  const handleDelete = useCallback(
    (id: number) => {
      confirmDelete(id, dispatch, removeTodo);
    },
    [dispatch]
  );

  // Toggle between Active and Done state for completion status.
  const toggleCompletion = (id: number) => {
    dispatch(toggleTodoCompletion(id));
  };

  // Define the renderScene. Render items based on selected route. Sort todo based on current tab
  const renderScene = useCallback(
    ({ route }: any) => {
      const filteredTodos = filterAndSortTodos(todos, route.key, sortOrder);
      return (
        <TodoList
          todos={filteredTodos}
          navigation={navigation}
          toggleCompletion={toggleCompletion}
          handleDelete={handleDelete}
          styles={styles}
          isLoading={isLoading}
          hasMore={hasMore}
          setPage={setPage}
        />
      );
    },
    [
      todos,
      sortOrder,
      toggleCompletion,
      handleDelete,
      isLoading,
      hasMore,
      setPage,
      navigation,
    ]
  );

  return (
    <View style={styles.container}>
      {/* Button to toggle sorting order between ascending and descending. */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        <Text style={styles.sortButtonText}>
          {`Sort by ID: ${sortOrder === "asc" ? "Show Oldest" : "Show Latest"}`}
        </Text>
      </TouchableOpacity>

      {/* Tabs for switching between all, active, and done todo items. */}
      <Tabs
        index={index}
        setIndex={setIndex}
        routes={routes}
        renderScene={renderScene}
        allCount={allCount}
        activeCount={activeCount}
        doneCount={doneCount}
      />

      {/* Floating button to navigate to the AddTodos screen. */}
      <View style={styles.addTodoButtonContainer}>
        <TouchableOpacity
          style={styles.addTodoButton}
          onPress={() => navigation.navigate("AddTodos")}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DisplayTodos;
