import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader";

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <div className="flex flex-col content px-6 pb-6 overflow-y-auto gap-4">
        <NavHeader />
        <div className="wrapper border rounded-md bg-white flex flex-col items-center p-6 shadow-md w-full h-[85%] relative overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
