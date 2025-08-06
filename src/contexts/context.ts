import React from "react";
import type { ThemeType, TodoContextType } from "./type";

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  clearCompleted: () => {},
});

export const Theme = React.createContext<ThemeType>("light")