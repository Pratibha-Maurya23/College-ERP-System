import { Outlet } from "react-router-dom";
import { StudentProvider } from "./contexts/StudentContext";

const StudentLayout = () => (
  <StudentProvider>
    <Outlet />
  </StudentProvider>
);

export default StudentLayout;