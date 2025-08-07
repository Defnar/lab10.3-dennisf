import { useContext } from "react"
import { ThemeContext } from "../contexts/context"

export default function Header() {

    const {toggleTheme} = useContext(ThemeContext);



    return(
        <>
        <h1>Dennis' Todo App</h1>
        <button type="button" onClick={toggleTheme}>Dark Mode</button>
        </>
    )
}