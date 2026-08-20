import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 tasks:localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[]
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state,action) => {
   
      state.value += 1
    },
    updateTask: (state,action) => {
      state.value -= 1
    },
    viewTask: (state, action) => {
      state.value += action.payload
    },
    deleteTask: (state, action) => {
      state.value += action.payload
    },
    copyTask: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { createTask, updateTask, viewTask,deleteTask,copyTask } = taskSlice.actions

export default taskSlice.reducer