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
    //해야할 일에는 isDone이 false 일것
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        //배열 안에 있는 객체에 각 요소들을 spread 연산자로 이용
        return { ...todo, isDone: true };
      }
      return todo; //같은 id가 없는 경우 todo 그대로 리턴, 즉 todos배열 그대로 유지
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
