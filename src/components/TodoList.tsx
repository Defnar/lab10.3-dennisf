import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext, TodoContext } from "../contexts/context";
import TodoItem from "./TodoItem";
import type { Filter} from "../utils/type";

export default function TodoList() {
  const { todos, clearCompleted } = useContext(TodoContext);

  const { theme } = useContext(ThemeContext);

  //state to hold filter data
  const [filter, setFilter] = useState<Filter>("All");

  //counts number of active items
  const [activeCount, setActiveCount] = useState<number>(0);

  //version 2 update count of active items, using filter instead of
  //iterating every item in a for loop (causes rerendering in react)
  useEffect(() => {
    const activeList = todos.filter((item) => !item.completed);
    setActiveCount(activeList.length);
  }, [todos]);


  //filters list and changes based on todos and filter
  //refactored from using state for filtered list
  const filteredList = useMemo(() => {
    return todos.filter((item) => {
      switch (filter) {
        case "Active":
          return !item.completed;
        case "Completed":
          return item.completed;
        case "All":
          return item;
      }
    });
  }, [todos, filter]);

  //build list using filtered list and todo item component
  const listBuilder = useMemo(() => {
    return filteredList.map((item) => (
      <TodoItem
        id={item.id}
        text={item.text}
        completed={item.completed}
        key={item.id}
      />
    ));
  }, [filteredList]);

  //styles for the filter and clear completed buttons
  const buttonStyles = useMemo(
    () =>
      `w-30 rounded-md py-2 px-4 ${
        theme === "dark" ? "bg-slate-600" : "bg-slate-800 text-white"
      }`,
    [theme]
  );

  //places a blue ring around the active filter
  const activeButton = useMemo(() => {
    return (button: Filter) =>
      filter === button ? "ring-2 ring-blue-500" : "";
  }, [filter]);

  return (
    <>
      <div className="flex flex-row justify-center gap-4 align-content-center">
        <button
          type="button"
          value="All"
          className={`${buttonStyles} ${activeButton("All")}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          type="button"
          value="Active"
          className={`${buttonStyles} ${activeButton("Active")}`}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          type="button"
          value="Completed"
          className={`${buttonStyles} ${activeButton("Completed")}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>
      <ul className="list-none leading-11 h-40 overflow-y-scroll">
        {listBuilder}
      </ul>

      <div className="flex flex-row justify-between">
        <p>
          {activeCount} item{activeCount != 1 ? "s" : ""} left
        </p>
        {todos.length !== activeCount && (
          <button
            type="button"
            className={buttonStyles}
            onClick={clearCompleted}
          >
            clear completed
          </button>
        )}
      </div>
    </>
  );
}
