import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../src/redux/taskSlice '

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
})