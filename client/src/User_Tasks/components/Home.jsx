import React, { useContext, useState } from "react";
import SideBar from "./SideBar.jsx";
import { Outlet } from "react-router-dom";

import AddForm from "./AddForm.jsx";
import { Store } from "../Context.jsx";

function Home() {
  
  return (
    <div className="relative">
      <SideBar />
      <div className="bg-[#e8e8e8] fixed top-20 left-1 sm:left-56 bottom-[60px] sm:bottom-1 right-1 m-1 rounded-md">
        {/* Outlet to render nested routes */}
        <Outlet />
      </div>

      <AddForm />

    </div>
  );
}

export default Home;
