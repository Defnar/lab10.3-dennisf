import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext, TodoContext } from "../contexts/context";
import TodoItem from "./TodoItem";
import type { Filter, Todo } from "../utils/type";

export default function TodoList() {
  const { todos, clearCompleted } = useContext(TodoContext);

  const {theme} = useContext(ThemeContext);

  //states to hold filter data
  const  [filteredList, setFilteredList] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<Filter>("All");



  //counts number of active items
  const [activeCount, setActiveCount] = useState<number>(0);



  //commented out for personal learning purposes.  Did research on better ways to count conditional items in a list in react
//   //updates count of active items on the list
//   useEffect(() => {
//     setActiveCount(0);
//     for (const item of todos) {
//         if(!item.completed) {
//             setActiveCount(count => ++count);
//         }
//     }
//   }, [todos])

//version 2 update count of active items, using filter instead
useEffect(() => {
    const activeList = todos.filter(item => !item.completed)
    setActiveCount(activeList.length);
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

  const buttonStyles = useMemo(() => `w-30 rounded-md py-2 px-4 ${theme==="dark"? "bg-slate-600" : "bg-slate-800"}` ,[theme])

  return (
    <>
    <div className="flex flex-row justify-center gap-4 align-content-center">
        <button type="button" value="All" className={`${buttonStyles}`} onClick={() => setFilter("All")}>All</button>
        <button type="button" value="Active" className={`${buttonStyles}`} onClick={() => setFilter("Active")}>Active</button>
        <button type="button" value="Completed" className={`${buttonStyles}`} onClick={() => setFilter("Completed")}>Completed</button>
    </div>
      <ul className="list-none leading-11 h-40 overflow-y-scroll">{listBuilder()}</ul>
      
      <p>{activeCount} item{activeCount!=1? "s" : ""} left</p>
      <button type="button" onClick={clearCompleted}>clear completed</button>
    </>
  );
}
