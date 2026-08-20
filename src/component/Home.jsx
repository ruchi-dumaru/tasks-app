import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../redux/taskSlice ";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const taskId = searchParams.get("taskId");
  const dispatch = useDispatch();
  const allTasks= useSelector((state)=>state.task.tasks);

  

useEffect(() => {
  if (!taskId) {
    setTitle("");
    setContent("");
    return;
  }

  const task = allTasks.find(
    (item) => String(item._id) === String(taskId)
  );

  if (task) {
    setTitle(task.title);
    setContent(task.content);
  }
}, [taskId, allTasks]);

  const HandlerSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content is required.");
      return;
    }

    const task = {
      _id:taskId||Date.now(36),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    if (taskId) {
      //update
      dispatch(updateTask(task));
    } else {
      //create
      dispatch(createTask(task));
    }


    setTitle("")
    setContent("")
    setSearchParams({})
  };

  return (
    <>
      <div className="text-2xl flex-col justify-center items-center ml-120">
        <div className="mt-10">
          <input
            placeholder="Enter the title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-2 border-xl p-5"
          />
          <button
            onClick={HandlerSubmit}
            className="p-5 border-3 ml-8 rounded-2xl"
          >
            {taskId ? "Update Task" : "Create Task"}
          </button>
          
        </div>

        <textarea
          placeholder="Content..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className=" border-2 w-150 h-100  p-5 mt-8 border-black"
        ></textarea>
      </div>
    </>
  );
};

export default Home;
