import useTodos from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const { todos, isLoading, error, addTodo } = useTodos();

  return (
    <div>
      <h1>Create a ToDo</h1>
      <TodoForm onSubmit={addTodo} />
      <h1>List of TODOs</h1>
      <TodoList todos={todos} isLoading={isLoading} error={error} />
    </div>
  );
};

export default App;
