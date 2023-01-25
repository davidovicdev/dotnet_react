import { useReducer } from "react";

const initialState = { todos: [] };

function reducer(state: any, action: any) {
  switch (action.type) {
    case "add":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };
    case "toggle":
      return {
        todos: state.todos.map((todo: any) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "delete":
      return {
        todos: state.todos.filter((todo: any) => todo.id !== action.id),
      };
    default:
      throw new Error();
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(event: any) {
    event.preventDefault();
    const input = event.target.elements.todo;
    const text = input.value.trim();
    if (text) {
      dispatch({ type: "add", text });
      input.value = "";
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="todo" placeholder="Add a new todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {state.todos.map((todo: any) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: "toggle", id: todo.id })}>
              Toggle
            </button>
            <button onClick={() => dispatch({ type: "delete", id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default TodoList;
