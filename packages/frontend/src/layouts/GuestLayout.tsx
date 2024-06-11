import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <div className="bg-[#0a3354] w-screen h-screen m-0 p-0 flex shadow-lg">
      <div className="w-[600px] h-screen bg-[#D9D9D9] flex items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
