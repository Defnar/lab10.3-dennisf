import React from "react";
import type { ThemeType, TodoContextType } from "../utils/type";


export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  clearCompleted: () => {},
});

export const ThemeContext = React.createContext<ThemeType>("light");
