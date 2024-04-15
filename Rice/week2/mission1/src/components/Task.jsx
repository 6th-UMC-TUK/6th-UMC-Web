function Task({ todo, setTodo }) {
  return (
    <>
      <p>
        {todo.id} {todo.content}
      </p>
    </>
  );
}

export default Task;
