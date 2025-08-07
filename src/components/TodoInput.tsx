import { useContext, useState } from "react"
import { TodoContext } from "../contexts/context";

export default function TodoInput() {

    const {addTodo} = useContext(TodoContext);
    const [input, setInput] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const submitChange = () => {
        if (input.trim() === "") return
        addTodo(input.trim());
        setInput("");
    }


    return (
        <>
        <input type="text" value={input} onChange={handleChange} />
        <button type="button" onClick={submitChange}>Add</button>
        </>
    )
}