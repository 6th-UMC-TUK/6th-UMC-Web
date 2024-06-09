import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/todoSlice";
import styled from "styled-components";

const InputTodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f1f4f9;
  border-radius: 15px;
  width: 400px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DateText = styled.div`
  font-size: 16px;
  color: #333;
`;

const TimeText = styled.div`
  font-size: 16px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const TextBar = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 10px;
  width: 80%;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 16px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
      <Header>
        <DateText>2022년 7월 26일</DateText>
        <TimeText>19:40:46</TimeText>
      </Header>
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
          placeholder="할 일을 입력하세요"
        />
        <SubmitButton type="submit">+</SubmitButton>
      </Form>
    </InputTodoContainer>
  );
}
