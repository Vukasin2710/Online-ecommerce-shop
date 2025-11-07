import { useState } from "react";
import { Outlet } from "react-router-dom";
// components
import HeaderComponent from "./components/HeaderComponent";

function AppLayout() {

  const [activeHeader, setActiveHeader] = useState(true);
  return (
    <div>
      {activeHeader && <HeaderComponent setActiveHeader={setActiveHeader} />}
      <Outlet />
    </div>
  );
}

export default AppLayout;
