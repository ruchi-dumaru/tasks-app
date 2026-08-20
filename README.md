

##  App flow overview

The app is built with React Router + Redux Toolkit.

- Home page: create or edit a task
- List page: search, copy, delete, and go back to create mode
- View page: read a full task and perform edit/delete/copy actions
- Redux slice: holds all tasks in localStorage and exposes add/update/delete actions


### Home page
 
The Home page handles both create and edit states.

- It reads `taskId` from the URL query string using `useSearchParams()`.
- If a task id exists, it loads the matching task from Redux state and fills the title/content inputs.
- When the user clicks the action button:
  - if `taskId` is missing, it dispatches `addTask(...)`
  - if `taskId` exists, it dispatches `updateTask(...)`
- After saving, it clears the form and navigates to `/list`.


### List page

The list page shows all saved tasks and supports quick actions.

- The search input filters by title or content.
- Each card has these actions:
  - edit: navigates to `/?taskId=${task._id}`
  - view: navigates to `/list/${task._id}`
  - copy: copies title + content to the clipboard
  - delete: dispatches `deleteTask(task._id)`
- New task button: navigates to `/` to create a new item

### View page

The view page reads the passed `id` from the route parameter.

- It finds the task using `_id === id`.
- It disables editing fields so the user sees the content read-only.
- Buttons provide:
  - `Back`: return to `/list`
  - `Edit`: navigate to `/?taskId=${task._id}`
  - `Copy`: copy the task into the clipboard

## 3. Redux flow

The Redux logic lives in `src/redux/taskSlice.jsx`.

### Initial state

```js
const initialState = {
  tasks: localStorage.getItem("localTasks")
    ? JSON.parse(localStorage.getItem("localTasks"))
    : [],
};
```

This means tasks stay saved even after refresh.

### Reducers

#### addTask

- pushes the new task into `state.tasks`
- saves the array in localStorage

#### updateTask

- finds the task by `_id`
- replaces the old object with the updated task
- saves the array back to localStorage

#### deleteTask

- finds task index by `_id`
- removes it from the array with `splice`
- saves the updated array back to localStorage


