import { useCallback, useEffect, useRef } from "react";
import TodoItem from "./TodoListCard";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Text, View } from "react-native";
import { Todo } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { resetScrollToTop } from "../../redux/TodoSlice";

const TodoList = ({
  todos,
  navigation,
  toggleCompletion,
  handleDelete,
  styles,
  isLoading,
  hasMore,
  setPage,
}: any) => {
  const dispatch = useDispatch();

  // Selector to check if scroll-to-top action is triggered
  const shouldScrollToTop = useSelector(
    (state: any) => state.todos.shouldScrollToTop
  );
  const flatListRef = useRef<FlatList>(null); // Create a reference to the FlatList

  // Function to scroll the list to the top when triggered. 
  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      dispatch(resetScrollToTop()); //Resets the scroll-to-top state after scrolling.
    }
  };

    // If the scroll flag is set to true, trigger scrollToTop
  useEffect(() => {
    if (shouldScrollToTop) {
      scrollToTop();
    }
  }, [shouldScrollToTop]);

  //Function to render each todo item in the list. Pass props to the TodoItem component.
  const renderItem = useCallback(
    ({ item }: { item: Todo }) => {
      return (
        <TodoItem
          item={item}
          navigation={navigation}
          toggleCompletion={toggleCompletion}
          handleDelete={handleDelete}
          styles={styles}
        />
      );
    },
    [navigation, toggleCompletion, handleDelete, styles]
  );

  return (
    <FlatList
      ref={flatListRef} // Attach ref for scrolling
      data={todos}
      keyExtractor={(item) => item.id.toString()} //Unique key for each item based on its ID.
      renderItem={renderItem}
      // Loading the next page when scrolled to the button. (hasMore) stops when all data is loaded. (!isLoading) ensures no duplicate fetched.
      onEndReached={() => {
        if (hasMore && !isLoading) {
          setPage((prevPage: number) => prevPage + 1);
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoading ? (
          <View style={{ paddingVertical: 10, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#000" />
            <Text>Loading...</Text>
          </View>
        ) : null
      }
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      // Pass scrollToTop function as extra data to ensure FlatList re-renders when it changes.
      extraData={scrollToTop}
    />
  );
};

export default TodoList;
