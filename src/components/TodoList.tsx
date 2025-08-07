import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/context";
import TodoItem from "./TodoItem";
import type { Filter, Todo } from "../utils/type";

export default function TodoList() {
  const { todos, clearCompleted } = useContext(TodoContext);

  const  [filteredList, setFilteredList] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<Filter>("All");


  useEffect(() => {
    const filterList = todos.filter(item => {
        if (filter==="All") return item
        else if (filter ==="Active") {
            return !item.completed
        }
        else return item.completed
    })
    setFilteredList(filterList);
  }, [filter, todos])


  const listBuilder = () => {
    return filteredList.map((item) => (
      <TodoItem
        id={item.id}
        text={item.text}
        completed={item.completed}
        key={item.id}
      />
    ));
  };

  return (
    <>
    <div>
        <button type="button" value="All" onClick={() => setFilter("All")}>All</button>
        <button type="button" value="Active" onClick={() => setFilter("Active")}>Active</button>
        <button type="button" value="Completed" onClick={() => setFilter("Completed|")}>Completed</button>
    </div>
      <ul>{listBuilder()}</ul>
      <button type="button" onClick={clearCompleted}>clear completed</button>
    </>
  );
}
