import { useContext, useState } from "react";
import type { Todo } from "../utils/type";
import { TodoContext } from "../contexts/context";

export default function TodoItem({ id, text, completed }: Todo) {
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);

  const [textValue, setTextValue] = useState<string>(text);

  const [editing, setEditing] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleEdit = (
    e: React.KeyboardEvent | React.FocusEvent
  ) => {
    console.log(e);
    if (
      (e.type==="keydown" && (e as React.KeyboardEvent).key === "Enter") ||
      e.type==="blur"
    ) {
      const newText = textValue.trim() !== "" ? textValue.trim() : text;
      editTodo(id, newText);
      setEditing(false);
    }
  };

  return (
    <li>
      {!editing && (
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTodo(id)}
          />
          {text}
          <button type="button" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={() => deleteTodo(id)}>
            Delete
          </button>
        </>
      )}
      {editing && (
        <>
          <input
            type="text"
            value={textValue}
            autoFocus
            onChange={handleInput}
            onBlur={handleEdit}
            onKeyDown={handleEdit}
          />
        </>
      )}
    </li>
  );
}
