import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { View, Text, TouchableOpacity, FlatList} from "react-native";
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


  
  // Constants
  const ITEM_PER_PAGE = 10;
  
  type RootStackParamList = {
    DisplayTodos: undefined;
    AddTodos: undefined;
    UpdateTodo: { todoId: number };
  };
  
  type DisplayTodosProps = NativeStackScreenProps<
    RootStackParamList,
    "DisplayTodos"
  >;
  
  const DisplayTodos: React.FC<DisplayTodosProps> = ({ navigation }) => {
    const todos = useSelector((state: RootState) => state.todos.todos);
  
    const dispatch = useDispatch();
  
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
  
    const initialRender = useRef(true);
  
    const scrollRef = useRef<FlatList>(null);
  
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: "all", title: "All" },
      { key: "active", title: "Active" },
      { key: "done", title: "Done" },
    ]);
  
    // Sorting state
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
    // Fetch data using axios and handle pagination
    const fetchData = useCallback(async () => {
      setIsLoading(true);
  
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?_limit=${ITEM_PER_PAGE}&_page=${page}`
        );
        data.forEach((todo: any) => {
          dispatch(addTodo(todo));
        });
        if (data.length < ITEM_PER_PAGE) {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error fetching todos from API", error);
      } finally {
        setIsLoading(false);
      }
    }, [page, dispatch]);
  
    useEffect(() => {
      // Skip initial render
      if (initialRender.current) {
        initialRender.current = false;
        return;
      }
    
      // Fetch data if either todos are empty or if there is more data to fetch
      if (todos.length === 0 || hasMore) {
        fetchData();
      }
    }, [todos.length, hasMore, fetchData]);
  
    const sortedAndFilteredTodos = filterAndSortTodos(
      todos,
      routes[index].key,
      sortOrder
    );
  
    // Count todos using utility function
    const { allCount, activeCount, doneCount } = countTodos(todos);
  
    const handleDelete = useCallback(
      (id: number) => {
        confirmDelete(id, dispatch, removeTodo);
      },
      [dispatch]
    );
  
    const toggleCompletion = (id: number) => {
      dispatch(toggleTodoCompletion(id));
    };
  
    // Define the renderScene function
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
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <Text style={styles.sortButtonText}>
            {`Sort by ID: ${sortOrder === "asc" ? "Show Oldest" : "Show Latest"}`}
          </Text>
        </TouchableOpacity>
  
        <Tabs
          index={index}
          setIndex={setIndex}
          routes={routes}
          renderScene={renderScene}
          allCount={allCount}
          activeCount={activeCount}
          doneCount={doneCount}
        />
  
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
  