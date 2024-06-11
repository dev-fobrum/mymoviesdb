import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
