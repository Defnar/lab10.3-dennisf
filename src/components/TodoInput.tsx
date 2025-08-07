import { useContext, useMemo, useState } from "react";
import { ThemeContext, TodoContext } from "../contexts/context";

export default function TodoInput() {
  const { addTodo } = useContext(TodoContext);
  const {theme} = useContext(ThemeContext);
  const [input, setInput] = useState<string>("");


  //handles user input via state to display and submit
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };


  //ensures something is in field, then submits the new task to the todo list
  const submitChange = () => {
    if (input.trim() === "") return;
    addTodo(input.trim());
    setInput("");
  };

  //listens for enter key to submit todo task
  const checkEnterKey= (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitChange();
  }

  const buttonStyles = useMemo(() =>  theme==="dark"? "bg-slate-600": "bg-slate-800 text-white",
[theme] )

  const inputStyles = useMemo(() => theme==="dark"? "bg-slate-600" : "white", [theme])
  return (
    <div className="flex flex-row gap-2">
      <input type="text" className={`rounded-md px-4 flex-1 shadow-md border border-slate-400 ${inputStyles}`} value={input} onChange={handleChange} onKeyDown={checkEnterKey}/>
      <button type="button" className={`rounded-md px-4 py-2 ${buttonStyles}`} onClick={submitChange}>
        Add
      </button>
    </div>
  );
}
