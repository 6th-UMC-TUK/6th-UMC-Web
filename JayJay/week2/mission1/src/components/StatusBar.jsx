import React from "react";

export default function StatusBar({
  todos,
  completedTodos,
  onCompleteTodo,
  onDeleteTodo,
}) {
  return (
    <div className="status-bar">
      <div className="todo-list-container">
        <h3 className="todo-list-title">해야 할 일</h3>
        <div className="todo-list">
          {todos
            .filter((todo) => !todo.isDone)
            .map((todo) => (
              <div className="todo-item" key={todo.id}>
                <div className="todo-content">{todo.content}</div>
                <button
                  className="todo-button"
                  onClick={() => onCompleteTodo(todo.id)}
                >
                  완료
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="done-list-container">
        <h3 className="done-list-title">해낸 일</h3>
        <div className="done-list">
          {completedTodos.map((complete) => (
            <div className="done-item" key={complete.id}>
              <div className="done-content">{complete.content}</div>
              <button
                className="done-button"
                onClick={() => onDeleteTodo(complete.id)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
