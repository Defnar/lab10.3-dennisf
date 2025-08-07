import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/context";
import TodoItem from "./TodoItem";
import type { Filter, Todo } from "../utils/type";

export default function TodoList() {
  const { todos, clearCompleted } = useContext(TodoContext);

  //states to hold filter data
  const  [filteredList, setFilteredList] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<Filter>("All");



  //counts number of active items
  const [activeCount, setActiveCount] = useState<number>(0);


  //updates count of active items on the list
  useEffect(() => {
    setActiveCount(0);
    for (const item of todos) {
        if(!item.completed) {
            setActiveCount(count => ++count);
        }
    }
  }, [todos])


//updates filter list to display to user
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


  //build list using filtered list and todo item component
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
        <button type="button" value="Completed" onClick={() => setFilter("Completed")}>Completed</button>
    </div>
      <ul>{listBuilder()}</ul>
      
      <p>{activeCount} item{activeCount!=1? "s" : ""} left</p>
      <button type="button" onClick={clearCompleted}>clear completed</button>
    </>
  );
}
