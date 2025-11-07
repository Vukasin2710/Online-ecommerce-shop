import { Outlet } from "react-router-dom"

function AppLayout() {


  return (
    <div>
      <h1>Hello Project</h1>

      <Outlet />
    </div>
  )
}

export default AppLayout
