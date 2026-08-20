import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  tasks: localStorage.getItem("localTasks")
    ? JSON.parse(localStorage.getItem("localTasks"))
    : [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action) => {
      const task = action.payload;

      //add check
      state.tasks.push(task);
      localStorage.setItem("localTasks", JSON.stringify(state.tasks));

      toast.success("Task created Successfully !");
    },
    updateTask: (state, action) => {
      const task = action.payload;

      //will return match index
      const index = state.tasks.findIndex((elem) => elem._id === task._id);

      if (index >= 0) {
        state.tasks[index] = task;

        localStorage.setItem("localTask", JSON.stringify(state.tasks));

        toast.success("Task updated!!");
      }
    },
    viewTask: (state, action) => {},
    deleteTask: (state, action) => {
      const task =action.payload;

      const index=state.tasks.findIndex((elem)=>elem._id === task._id)

      if(index>=0){
        state.tasks.splice(index,1)
        localStorage.setItems('localTask',JSON.stringify(state.tasks))
         toast.success("Task deleted!!");
      }

    },
    copyTask: (state, action) => {},

    resetAllTask: (state) => {
      state.tasks = [];
      localStorage.setItem("localTask");
    },
  },
});

// Action creators are generated for each case reducer function
export const { createTask, updateTask, viewTask, deleteTask, copyTask } =
  taskSlice.actions;

export default taskSlice.reducer;
