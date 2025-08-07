import { useContext } from "react";
import { TodoContext } from "../contexts/context";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, clearCompleted } = useContext(TodoContext);

  const listBuilder = () => {
    return todos.map((item) => (
      <TodoItem
        id={item.id}
        text={item.text}
        completed={item.completed}
        key={item.id}
      />
    ));
  };

  return (
    <>
      <ul>{listBuilder()}</ul>
      <button type="button" onClick={clearCompleted}>clear completed</button>
    </>
  );
}
