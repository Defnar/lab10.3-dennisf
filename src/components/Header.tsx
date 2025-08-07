import { useContext, useMemo } from "react";
import { ThemeContext } from "../contexts/context";

export default function Header() {
  const {theme, toggleTheme } = useContext(ThemeContext);

const buttonStyles = useMemo(() =>  theme==="dark"? "bg-slate-600": "bg-slate-800 text-white",
[theme] )

  return (
    <div className="relative flex items-center">
      <h1 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl">Dennis' Todo App</h1>
      <button type="button" className={`ml-auto mr-4 px-3 py-1 rounded-md shadow-lg ${buttonStyles}`} onClick={toggleTheme}>
        Dark Mode
      </button>
    </div>
  );
}
