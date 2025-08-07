export interface Todo {
    id: number,
    text: string,
    completed: boolean
}

export type ThemeType = "light" | "dark"

export interface ThemeContextType {
    theme: ThemeType,
    toggleTheme: () => void
}

export interface TodoContextType {
todos: Todo[],
addTodo: (text: string) => void,
toggleTodo: (id: number) => void,
deleteTodo: (id: number) => void,
editTodo: (id: number, newText: string) => void,
clearCompleted: () => void
}

export type Filter = "All" | "Active" | "Completed"