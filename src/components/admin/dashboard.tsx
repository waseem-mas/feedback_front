import { useEffect, useState } from "react"
import Nav from "./layout/Nav"
import Sidebar from "./layout/Sidebar"
import { Outlet, useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [toggle,setToggle] = useState(false)
  const navigate = useNavigate();

  const Toggle = () => {
    setToggle(!toggle)
  }


  useEffect(() => {
    if(localStorage.getItem('userToken') === null ) {
      navigate("/");
    }
  }, [])

  return (
    <div className="container-fluid bg-secondary min-vh-100">
        <div className="row">
        {toggle && 
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
                <Sidebar />
            </div>
            }
            {toggle && <div className="col-4 col-md-2"></div>}
            <div className="col">
                <div>
                   <Nav Toggle={Toggle}/>
                   <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
