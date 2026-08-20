import { NavLink } from "react-router-dom"

const Navbar=()=>{
  return (<>
 <nav>
  
  <div  className="text-2xl flex justify-center gap-5 items-center">
   <NavLink to="/">Home</NavLink>
   <NavLink to="/list">task</NavLink>
  </div>
 </nav>

  </>)
}

export default Navbar