import { useContext, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { ThemeContext } from "./contexts/context";

function App() {
  const { theme } = useContext(ThemeContext);

  const styles = useMemo(() => theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-200 text-black", [theme]);


  return (
    <div
      className={`flex flex-col content-center justify-center w-150 px-20 py-10 rounded-lg ${styles}`}
    >
      <Header />
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
