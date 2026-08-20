import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../redux/taskSlice ";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const taskId = searchParams.get("taskId");
  const dispatch = useDispatch();
  // console.log(title);
  // console.log(content);

  const HandlerSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content is required.");
    }

    const task = {
      _id:taskId||Date.now(),
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
          <Toaster />
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
