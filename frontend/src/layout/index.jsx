import { useState } from "react";
import { sideLinks } from "../data/Links";
import Sidebar from "../navigation/Sidebar";
import TopBar from "../navigation/Topbar";
import OrderViewModal from "../modals/OrderViewModal";
import CreateOrderModal from "../modals/CreateOrderModal";
import CreateMealModal from "../modals/CreateMealModal";
import Toast from "../utils/Toast";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        links={sideLinks}
      />
      <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        <TopBar setSidebarOpen={setSidebarOpen} />
        <main>
          {/* Page Content */}
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <Toast />
            <OrderViewModal />
            <CreateOrderModal />
            <CreateMealModal />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
