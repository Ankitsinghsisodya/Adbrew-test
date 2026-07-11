import TodoItem from "./TodoItem";

const TodoList = ({ todos, isLoading, error }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!todos.length) return <p>No todos yet. Add one above!</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
