import { useState } from "react";
import { Outlet } from "react-router-dom";
// components
import HeaderComponent from "./components/HeaderComponent";
import NavBarComponent from "./components/NavBarComponent";

function AppLayout() {

  const [activeHeader, setActiveHeader] = useState(true);
  return (
    <div>
      {activeHeader && <HeaderComponent setActiveHeader={setActiveHeader} />}
      <NavBarComponent />
      <Outlet />
    </div>
  );
}

export default AppLayout;
