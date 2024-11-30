### TODO LIST APP
This is a simple React Native TODO list app that allows users to manage their tasks efficiently. It features task creation, completion, deletion, and filtering by state of the item, along with sorting by ID and pagination (infinite scroll). I built it using TypeScript, Redux, and React Navigation, the app fetches data from the JSONPlaceholder API and provides a smooth user experience with modern UI design.

### Technologies Used:
- React Native
- Redux
- TypeScript
- React Navigation

### How to Use:
1. **Add a new TODO**: Press the + icon on the main screen. Go to the "Add Todo" screen, type in a task, and press "Add Todo".
2. **Mark as completed**: Toggle the switch in the task item to mark it as completed.
3. **Update a TODO**: Press the pencil icon next to the task, go to the "Update Todo" screen, modify the task details, update the task state, and press "Update Todo".
4. **Delete a TODO**: Press the trash icon to remove a task from the list.
5. **Sort TODOs**: Choose the sorting option between "Most Recent" and "By ID".
6. **Filter TODOs**: Filter by All, Active, or Done.


### Features:
- [✅] Fetch a list of TODO items from JSONPlaceholder API on app load.
- [✅] Display a list of TODO items.
- [✅] Allow users to add new TODO items.
- [✅] Allow users to mark TODO items as completed.
- [✅] Allow users to delete TODO items.
- [✅] Provide a count of total TODO items and completed TODO items.
- [✅] Maintain `created_at` and `updated_at` timestamps for all TODO items.
- [✅] Allow users to sort the TODO list by Most Recent or by ID.
- [✅] Allow users to filter the TODO list by All, Active, or Done.

### Bonus (Optional):
- [✅] Refactor your project to use TypeScript for enhanced type safety, better code readability, and improved development experience.
- [✅] Implement pagination or infinite scrolling for better performance.

### Installation Steps:

1. **Clone the repository**:
```git clone <repository-url>```
2. **Navigate to the project directory**:
```cd <project-directory>```
3. **Install dependencies**:
```npm install```
4. **Start the app**:
```npx expo start```

### Folder Structure:
/app
  /index.tsx
/src
  /components
    /UIComponents
      /Tabs.tsx
      /TodoList.tsx
      /TodoListCard.tsx
  /redux
      /store.ts
      /TodoSlice.ts
  /screens
    /Styles
      /MainScreen.ts
    /MainScreenTodo.tsx
    /AddScreenTodo.tsx
    /UpdateScreen.tsx
  /utils
    /deleteUtils.ts
    /todoUtils.ts
    /types.ts

### APK FILE:
(Click on the link below to install the app on Android device)

https://expo.dev/accounts/mosaddeka/projects/myTodo/builds/ec645255-294c-4955-b6d8-9ab14d53a9f7

### Demo:
[TODO List App Video and ScreenShots]

https://github.com/user-attachments/assets/caf8fe82-7662-401b-bcd9-d812bb719cde

![TodoApp1](https://github.com/user-attachments/assets/7ffd90cc-f612-44ba-a475-2e25d1955965)
![TodoApp3](https://github.com/user-attachments/assets/e6c5aae2-15ee-4f2a-95bd-6ccf6774f675)
![TodoApp2](https://github.com/user-attachments/assets/04694ee1-6ee8-4d48-8e59-168aa0cb2f58)

