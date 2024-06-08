import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, complete } from "../redux/todoSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ToDoListView = styled.ul`
  padding-left: 0px;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const TodoText = styled.div`
  flex-grow: 1;
  ${(props) =>
    props.complete === "true" &&
    `
    text-decoration: line-through;
    color: #888;
  `}
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
`;

export default function TodoList() {
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const trash = <FontAwesomeIcon icon={faTrashCan} />;

  console.log(todolist);

  const todolistView = todolist.map((todo, idx) => (
    <List key={todolist[idx].id}>
      <Checkbox
        type="checkbox"
        onChange={() => dispatch(complete(todolist[idx].id))}
      />
      <TodoText complete={todo.complete.toString()}>
        {todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}
      </TodoText>
      <DeleteButton
        type="button"
        onClick={() => dispatch(remove(todolist[idx].id))}
      >
        {trash}
      </DeleteButton>
    </List>
  ));

  return <ToDoListView>{todolistView}</ToDoListView>;
}
