import { useEffect, useState } from "react";
import Task from "./components/Task";
import CompletedTask from "./components/CompletedTask";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: "Send E-mail", isDone: false },
    { id: 2, content: "Make Work-Books", isDone: false },
    { id: 3, content: "Sleeping", isDone: true },
    { id: 4, content: "Watching You-Tube", isDone: true },
  ]);
  useEffect(() => {}, [todos]);
  const complete = (todo) => {
    todo.isDone = true;
  };
  return (
    <>
      <h1>UMC Study Plan</h1>
      <input type="text" placeholder="UMC 스터디 계획을 작성해보세요!" />
      <div>
        <div>
          <p>해야 할 일</p>
          {todos
            .filter((todo) => todo.isDone === false)
            .map((todo, idx) => (
              <>
                <div key={idx}>
                  <Task todo={todo} setTodo={setTodos} />
                  <button onClick={complete}>완료</button>
                </div>
              </>
            ))}
        </div>
        <div>
          <p>해낸 일</p>
          {todos
            .filter((todo) => todo.isDone === true)
            .map((todo, idx) => (
              <>
                <div key={idx}>
                  <CompletedTask todo={todo} setTodo={setTodos} />
                  <button>삭제</button>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
