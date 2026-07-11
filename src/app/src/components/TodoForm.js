import { useState } from "react";

const TodoForm = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = description.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(trimmed);
      setDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo">ToDo:</label>
        <input
          id="todo"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      {error && <p>{error}</p>}
      <div>
        <button type="submit" disabled={isSubmitting || !description.trim()}>
          {isSubmitting ? "Adding..." : "Add ToDo!"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
