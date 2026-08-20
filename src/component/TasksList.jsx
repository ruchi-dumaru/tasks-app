import { useState } from "react";
import { useSelector } from "react-redux";

export default function TasksList() {
  const [searchTask, setSearchTask] = useState("");
  const tasks = useSelector((state) => state.task.tasks);
 

  const filterData=tasks.filter((task)=>{
    const title=task.title?.toLowerCase()||""
    const content=task.content?.toLowerCase()||""
    const value=searchTask.toLocaleLowerCase()
    return title.includes(value) || content.includes(value)
  })

  const handleSearch = (e) => {
    setSearchTask(e.target.value);
    console.log(searchTask);
  };

  return (
    <>
      <div className="text-2xl flex-col justify-center items-center mt-10 ml-150">
        <input
          className="p-5 border-2 border-black rounded-2xl"
          type="text"
          placeholder="Search here..."
          value={searchTask}
          onChange={handleSearch}
        />
      </div>

      <div className="ml-150 p-5">
        {filterData.length > 0 &&
          filterData.map((task) => {
            return (
              <div className="  border-2 border-black mb-5 w-150  flex-col items-center justify-center ">
                <div>{task.title}</div>

                <div> {task.content}</div>

              </div>
            );
          })}
      </div>
    </>
  );
}
