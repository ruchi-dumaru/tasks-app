import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/taskSlice ";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TasksList() {
  const [searchTask, setSearchTask] = useState("");
  const tasks = useSelector((state) => state.task.tasks);
const dispatch=useDispatch();
const navigate=useNavigate();
  const filterData = tasks.filter((task) => {
    const title = task.title?.toLowerCase() || "";
    const content = task.content?.toLowerCase() || "";
    const value = searchTask.toLocaleLowerCase();
    return title.includes(value) || content.includes(value);
  });

  const handleSearch = (e) => {
    setSearchTask(e.target.value);
    console.log(searchTask);
  };

  const handleDelete=(taskId)=>{
   dispatch(deleteTask(taskId))
  }

  const handleCopy=async (task)=>{
const textToCopy= `${task.title}\n ${task.content}`

try{
 await navigator.clipboard.writeText(textToCopy)
 toast.success("Copied to clipboard")
}catch{
toast.error("Unable to copy")
}

  }
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
        {filterData.length > 0 ?( filterData.map((task) => {
            return (
              <div key= {task._id} className="  border-2 border-black mb-5 w-150  flex-col items-center justify-center ">
               
                  <div className="flex justify-end cursor-pointer gap-2 m-2">
                    <button onClick={()=>navigate(`/?taskId=${task._id}`)}>Edit</button>

                  <button  onClick={()=>handleDelete(task._id)}>Delete</button>

                  <button onClick={()=>navigate(`/list/${task._id}`)}>View</button>
 

<button onClick={()=>handleCopy(task)}>Copy</button>
                  </div>
              
               <div>
                 <div>{task.title}</div>

                <div> {task.content}</div>
               </div>
              </div>
            );
          })):(<div>Task doesn't exist</div>)
         }
      </div>
    </>
  );
}
