// import React from "react";
// import { View, Text, TouchableOpacity, Switch } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// // Used React.memo to optimize performance by preventing unnecessary re-renders
// const TodoItem = React.memo(
//   ({ item, navigation, toggleCompletion, handleDelete, styles }: any) => {
//     return (
//       <View
//         style={[
//           styles.card,
//           { backgroundColor: item.completed ? "#e5e4e2" : "#fff" },
//         ]}
//       >
//         <View style={styles.TaskUserContainer}>
//           <Text style={styles.userId}>User ID: {item.userId}</Text>
//           <Text style={styles.taskId}>Task ID: {item.id}</Text>
//         </View>

//         <View style={styles.todoHeader}>
//           <Text
//             style={{
//               color: item.completed ? "#495057" : "#212529",
//               fontSize: 18,
//               fontWeight: "bold",
//               flex: 1,
//             }}
//           >
//             {item.title}
//           </Text>
//         </View>

//         <View style={styles.timestampContainer}>
//           <Text style={styles.timestamp}>
//             Created:{" "}
//             {item.created_at
//               ? new Date(item.created_at).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "N/A"}
//           </Text>
//           <Text style={styles.timestamp}>
//             Updated:{" "}
//             {item.updated_at
//               ? new Date(item.updated_at).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "N/A"}
//           </Text>
//         </View>
//         <View style={styles.actionButtonsContainer}>
//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={() =>
//               navigation.navigate("UpdateTodo", { todoId: item.id })
//             }
//           >
//             <Ionicons name="pencil" size={18} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.switchContainer}>
//             <Text
//               style={{
//                 fontSize: 13,
//                 color: item.completed ? "#fff" : "#333",
//                 fontWeight: "bold",
//               }}
//             >
//               {item.completed ? "Completed" : "Not Completed"}
//             </Text>
//             <Switch
//               value={item.completed}
//               onValueChange={() => toggleCompletion(item.id)}
//               thumbColor={item.completed ? "#fff" : "#333"}
//               trackColor={{ false: "#ccc", true: "#333" }}
//               style={styles.switch}
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.deleteButton}
//             onPress={() => handleDelete(item.id)}
//           >
//             <Ionicons name="trash" size={18} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// );

// export default TodoItem;

import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Switch, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Used React.memo to optimize performance by preventing unnecessary re-renders
const TodoItem = React.memo(
  ({ item, navigation, toggleCompletion, handleDelete, styles }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Start opacity at 0
    const scaleAnim = useRef(new Animated.Value(0.8)).current; // Start with scale 0.8

    useEffect(() => {
      // Trigger fade-in and scale-up animations when the component mounts
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fully visible
          duration: 300, // Duration of the fade-in
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1, // Scale back to normal size
          friction: 5, // Control the spring effect (bounciness)
          useNativeDriver: true,
        }),
      ]).start();
    }, [fadeAnim, scaleAnim]);

    return (
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: item.completed ? "#e5e4e2" : "#fff",
            opacity: fadeAnim, // Bind fadeAnim to opacity
            transform: [{ scale: scaleAnim }], // Bind scaleAnim to transform
          },
        ]}
      >
        <View style={styles.TaskUserContainer}>
          <Text style={styles.userId}>User ID: {item.userId}</Text>
          <Text style={styles.taskId}>Task ID: {item.id}</Text>
        </View>

        <View style={styles.todoHeader}>
          <Text
            style={{
              color: item.completed ? "#495057" : "#212529",
              fontSize: 18,
              fontWeight: "bold",
              flex: 1,
            }}
          >
            {item.title}
          </Text>
        </View>

        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>
            Created:{" "}
            {item.created_at
              ? new Date(item.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </Text>
          <Text style={styles.timestamp}>
            Updated:{" "}
            {item.updated_at
              ? new Date(item.updated_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </Text>
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("UpdateTodo", { todoId: item.id })
            }
          >
            <Ionicons name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
          <View style={styles.switchContainer}>
            <Text
              style={{
                fontSize: 13,
                color: item.completed ? "#fff" : "#333",
                fontWeight: "bold",
              }}
            >
              {item.completed ? "Completed" : "Not Completed"}
            </Text>
            <Switch
              value={item.completed}
              onValueChange={() => toggleCompletion(item.id)}
              thumbColor={item.completed ? "#fff" : "#333"}
              trackColor={{ false: "#ccc", true: "#333" }}
              style={styles.switch}
            />
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
);

export default TodoItem;

