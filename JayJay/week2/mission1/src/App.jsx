import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import TodoInput from "./components/TodoInput";
import StatusBar from "./components/StatusBar";

function App() {
  //해야할 일
  const [todos, setTodos] = useState([]);
  //해낸 일
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (newTodo) => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    setTodos([...todos, { id: newId, content: newTodo, isDone: false }]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        //...todo가 의미하는 것은 뭘까??
        return { ...todo, isDone: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setCompletedTodos([...updatedTodos.filter((todo) => todo.isDone === true)]);
  };

  const deleteTodo = (id) => {
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="container">
        <Title />
        <hr />
        <TodoInput onAddTodo={addTodo} />
        <StatusBar
          todos={todos}
          completedTodos={completedTodos}
          onCompleteTodo={completeTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}

export default App;
