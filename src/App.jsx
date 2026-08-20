import { Routes ,Route} from "react-router-dom";
import Home from "./component/Home";
import Tasks from "./component/TasksList";
import Navbar from "./component/Navbar";
import View from "./component/View";



export default function App()

{
  return (<>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/list" element={<Tasks/>}></Route>
    <Route path="/list/:id" element={<View/>}></Route>
  </Routes>
  </>)
}



