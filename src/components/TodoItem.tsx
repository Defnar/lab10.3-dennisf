import { useContext, useMemo, useState } from "react";
import type { Todo } from "../utils/type";
import { ThemeContext, TodoContext } from "../contexts/context";

export default function TodoItem({ id, text, completed }: Todo) {
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const {theme} = useContext(ThemeContext);

  const [textValue, setTextValue] = useState<string>(text);

  const [editing, setEditing] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleEdit = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (
      (e.type === "keydown" && (e as React.KeyboardEvent).key === "Enter") ||
      e.type === "blur"
    ) {
      const newText = textValue.trim() !== "" ? textValue.trim() : text;
      editTodo(id, newText);
      setEditing(false);
    }
  };

  const liStyles = useMemo(() => theme==="dark"? "border-slate-600": "border-slate-400" ,[theme])
  const inputStyles = useMemo(() => theme==="dark"? "bg-slate-600" : "white", [theme])


  return (
    <li className={`border-t border-solid ${liStyles} px-2`}>
      {!editing && (
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleTodo(id)}
            />
            {text}
          </div>
          <div className = "flex flex-row gap-6">
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" onClick={() => deleteTodo(id)}>
              Delete
            </button>
          </div>
        </div>
      )}
      {editing && (
        <>
          <input
            type="text"
            value={textValue}
            className={`w-full px-4 rounded-md ${inputStyles}`}
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
