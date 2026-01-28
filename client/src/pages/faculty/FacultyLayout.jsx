import { Outlet } from "react-router-dom";
import { FacultyProvider } from "./contexts/FacultyContext";

const FacultyLayout = () => (
  <FacultyProvider>
    <Outlet />
  </FacultyProvider>
);

export default FacultyLayout;
