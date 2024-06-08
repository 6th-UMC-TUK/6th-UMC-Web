import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todoSlice";
import styled from "styled-components";

const InputTodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
`;

const TextBar = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 300px;
`;

const SubmitButton = styled.input`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
`;

export default function InputToDo() {
  const dispatch = useDispatch();

  const [todolist, setTodolist] = useState({
    id: 0,
    text: "",
  });

  function handleText(e) {
    setTodolist({ text: e.target.value });
  }

  function onReset() {
    setTodolist({ text: "" });
  }

  return (
    <InputTodoContainer>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== "") {
            dispatch(add(todolist.text));
          } else alert("할 일을 입력해주세요!");
          onReset();
        }}
      >
        <TextBar
          type="text"
          value={todolist.text}
          onChange={handleText}
        ></TextBar>
        <SubmitButton type="submit" value="+"></SubmitButton>
      </Form>
    </InputTodoContainer>
  );
}
