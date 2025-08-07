import type React from "react";
import { ThemeContext, TodoContext } from "./context";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ThemeType, Todo } from "../utils/type";

export default function AppProviders({ children }: React.PropsWithChildren) {
  /////////////////////TODO LOGIC///////////////////

  //saves todo list to state
  const [todos, setTodos] = useState<Todo[]>(() => {
    const item = localStorage.getItem("todos");
    return item ? JSON.parse(item) : [];
  });

  //creates a unique id for incrementing, current id is unused in list
  const idRef = useRef<number>(Number(localStorage.getItem("id")) || 0);

  //listens for todo list changes and saves to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("id", idRef.current.toString());
  }, [todos]);

  //adds a new item to the list
  const addTodo = (text: string) => {
    if (!text.trim()) return;

    const newTodo = { id: idRef.current, text: text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
    idRef.current++;
  };

  //toggles todo to true or false
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  //delete todo item
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  //edits the item
  const editTodo = (id: number, newText: string) => {
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  };

  //clears completed
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((item) => !item.completed));
  };

  ///////////THEME////////////
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem("theme") as ThemeType) || "light"
  );

  //saves everytime theme is changed
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  //toggles theme between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  ////// values for providers //////////
  const todoValues = useMemo(
    () => ({
      todos,
      addTodo,
      toggleTodo,
      editTodo,
      deleteTodo,
      clearCompleted,
    }),
    [todos]
  );

  const themeValues = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeValues}>
      <TodoContext.Provider value={todoValues}>{children}</TodoContext.Provider>
    </ThemeContext.Provider>
  );
}
