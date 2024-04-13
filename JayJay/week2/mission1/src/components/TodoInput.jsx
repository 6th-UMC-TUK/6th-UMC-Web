import React from "react";
import { useState } from "react";

export default function TodoInput({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue(""); // 입력 후 입력 필드 초기화
    }
  };

  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="Umc 투두리스트를 작성해보세요!"
        className="todoInput"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => handleSubmit(e)}
      />
    </div>
  );
}
