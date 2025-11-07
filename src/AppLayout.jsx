import { useState } from "react";
import { Outlet } from "react-router-dom";
// components
import HeaderComponent from "./components/HeaderComponent";
import NavBarComponent from "./components/NavBarComponent";
import CategoryComponent from "./components/CategoryComponent";

// axios
import axios from "axios";

axios.defaults.baseURL = "https://dummyjson.com";

function AppLayout() {

  const [activeHeader, setActiveHeader] = useState(true);
  return (
    <div>
      {activeHeader && <HeaderComponent setActiveHeader={setActiveHeader} />}
      <NavBarComponent />
      <CategoryComponent />
      <Outlet />
    </div>
  );
}

export default AppLayout;
