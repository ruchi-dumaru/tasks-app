import { Routes ,Route} from "react-router-dom";
import Home from "./component/Home";
import Tasks from "./component/Tasks";
import Navbar from "./component/Navbar";



export default function App()

{
  return (<>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/list" element={<Tasks/>}></Route>
  </Routes>
  </>)
}



