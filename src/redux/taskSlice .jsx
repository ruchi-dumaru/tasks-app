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
      const exisitngTitle=state.tasks.find((elem)=>elem.title.trim().toLowerCase()=== task.title.toLowerCase())
      if(exisitngTitle){
        toast.error("Title with same name already exist!!");
        return;
      }
      state.tasks.push(task);
      localStorage.setItem("localTasks", JSON.stringify(state.tasks));

      toast.success("Task created Successfully !");
    },
    updateTask: (state, action) => {
      const task = action.payload;

      //will return match index
      const index = state.tasks.findIndex(
        (elem) => String(elem._id) === String(task._id),
      );

      if (index >= 0) {
        state.tasks[index] = task;

        localStorage.setItem("localTasks", JSON.stringify(state.tasks));

        toast.success("Task updated!!");
      }
    },
    viewTask: (state, action) => {},

    deleteTask: (state, action) => {
      const taskId = action.payload;
      console.log(taskId);
      const index = state.tasks.findIndex((elem) => elem._id === taskId);

      if (index >= 0) {
        state.tasks.splice(index, 1);
        localStorage.setItem("localTasks", JSON.stringify(state.tasks));
        toast.success("Task deleted!!");
      }
    },

    resetAllTask: (state) => {
      state.tasks = [];
      localStorage.setItem("localTasks");
    },
  },
});

// Action creators are generated for each case reducer function
export const { createTask, updateTask, viewTask, deleteTask, copyTask } =
  taskSlice.actions;

export default taskSlice.reducer;
