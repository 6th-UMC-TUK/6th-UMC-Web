import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import InputTodo from "./components/InputToDo"; // InputTodo 컴포넌트 import
import TodoList from "./components/ToDoList"; // TodoList 컴포넌트 import

function App() {
  return (
    <>
      <InputTodo /> {/* InputTodo 컴포넌트 추가 */}
      <TodoList /> {/* TodoList 컴포넌트 추가 */}
    </>
  );
}

export default App;
