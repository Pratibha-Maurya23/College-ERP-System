import { Outlet } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";

const AdminLayout = () => {
  return (
    <AdminProvider>
      <Outlet />
    </AdminProvider>
  );
};

export default AdminLayout;
