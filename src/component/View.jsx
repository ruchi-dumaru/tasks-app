
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const allTasks = useSelector((state) => state.task.tasks);
  const findTask = allTasks.find((item) => String(item._id) === String(id));
  // console.log("Filter:", findTask);

  const handleCopy =async()=>{
 if(!findTask) return;

 try{
  await navigator.clipboard.writeText(`${findTask.title}\n${findTask.content}`);
toast.success("Task copied to clipboard")
 }
 catch{
  toast.error("Task unable to copy")
 }
  }
  if (!findTask) {
    return <div>Task not found</div>;
  }

  return (
    <>
      <div className="text-2xl flex-col ml-150 justify-center items-center">
        <div className="mt-10 flex gap-5">
          <input
            type="text"
            value={findTask.title}
            disabled
            className="border-2 border-xl p-5"
          />
          <button
            className="border-2 border-black p-3"
            onClick={() => navigate("/list")}
          >
            Back to list
          </button>

           <button
            className="border-2 border-black p-5"
            onClick={() => navigate(`/?taskId=${findTask._id}`)}
          >
            Edit
          </button>
          <button className="border-2 border-black p-4" onClick={handleCopy}>Copy</button>
        </div>

        <textarea
          value={findTask.content}
          disabled
          className=" border-2 w-150 h-100  p-5 mt-8 border-black"
        ></textarea>
      </div>
    </>
  );
};

export default View;
