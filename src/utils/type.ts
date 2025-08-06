export interface Todo {
    id: number,
    text: string,
    completed: boolean
}

export type ThemeType = "light" | "dark"

export interface TodoContextInterface {
todos: Todo[],
addTodo: (text: string) => void,
toggleTodo: (id: number) => void,
deleteTodo: (id: number) => void,
editTodo: (id: number, nextText: string) => void,
clearCompleted: () => void
}