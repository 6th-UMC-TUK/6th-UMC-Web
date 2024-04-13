import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: todos.length + 1,
          content: inputValue,
          isDone: false
        }
      ]);
      setInputValue('');
    }
  };

  const handleCompleteTodo = (id) => {
    const completedTodo = todos.find(todo => todo.id === id);
    setCompletedTodos(prevCompletedTodos => [
      ...prevCompletedTodos,
      completedTodo
    ]);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleDeleteTodo = (id, isCompleted = false) => {
    if (isCompleted) {
      setCompletedTodos(prevCompletedTodos =>
        prevCompletedTodos.filter(todo => todo.id !== id)
      );
    } else {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }
  };

  const handleTodoClick = () => {
    handleAddTodo();
  };

  return (
    <div className="container">
      <h1 className="header">UMC Study Plan</h1>
      <hr/>
      <input
        className="input_box"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="UMC 스터디 계획을 작성해보세요!"
      />
      <div className="status-bar">
      <div className="todo-container">
      <div onClick={handleTodoClick} style={{ cursor: 'pointer' }}>
        <h2 className="todoTitle">해야 할 일</h2>
        <TodoList todos={todos} onComplete={handleCompleteTodo} onDelete={handleDeleteTodo} />
      </div>
      </div>
      <div>
      <div className="done-container">
        <h2 className="doneTitle">해낸 일</h2>
        <CompletedTodoList todos={completedTodos} onDelete={handleDeleteTodo} />
      </div>
    </div>
    </div>
    </div>
  );
}

function TodoList({ todos, onComplete, onDelete }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </div>
  );
}

function CompletedTodoList({ todos, onDelete }) {
  return (
    <div className="done-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} isCompleted />
      ))}
    </div>
  );
}

function TodoItem({ todo, onComplete, onDelete, isCompleted }) {
  const handleComplete = () => {
    onComplete(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id, isCompleted);
  };

  return (
    <div className="todo-item">
      <span>{todo.content}</span>
      {isCompleted ? (
        <button className="done-button" onClick={handleDelete}>삭제</button>
      ) : (
        <button className="todo-button" onClick={handleComplete}>완료</button>
      )}
    </div>
  );
}

export default App;
