import { useState, useEffect, useCallback } from "react";
import { todoApi } from "../services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTodo = useCallback(
    async (description) => {
      await todoApi.create(description);
      await fetchTodos();
    },
    [fetchTodos]
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, isLoading, error, addTodo };
};

export default useTodos;
