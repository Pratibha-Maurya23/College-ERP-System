import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import AdmissionForm from "./pages/AdmissionForm";
import PaymentPage from "./pages/PaymentPage";

import AdminDashboard from "./pages/admin/Home";
import AdminLayout from "./pages/admin/AdminLayout";

import StudentDashboard from "./pages/student/Dashboard";
import StudentLayout from "./pages/student/StudentLayout";

import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultyLayout from "./pages/faculty/FacultyLayout";



function App() {
  return (
  //   <>
  //     <Routes>
  //       <Route path="/" element={<LandingPage />} />
  //       <Route path="/login" element={<LoginPage />} />
  //        {/* Admission Form */}
  //       <Route path="/admission-form" element={<AdmissionForm />} />
  //       {/* Payment Page */}
  //       <Route path="/payment" element={<PaymentPage />} />

  //         {/* Role-based dashboards */}
  //        {/* <Route
  //         path="/admin/*"
  //         element={
  //           <PrivateRoute allowedRoles={["admin"]}>
  //                 <AdminProvider>
  //                   <AdminDashboard />
  //                 </AdminProvider>
  //           </PrivateRoute>
  //         }
  //       /> */}
  // {/* Admin routes */}
  //     <Route element={<AdminLayout />}>
  //       <Route
  //         path="/admin/*"
  //         element={
  //           <PrivateRoute allowedRoles={["admin"]}>
  //             <AdminDashboard />
  //           </PrivateRoute>
  //         }
  //       />
  //     </Route>

  //       <Route
  //         path="/faculty/dashboard"
  //         element={
  //           <PrivateRoute allowedRoles={["faculty"]}>
  //             <FacultyDashboard />
  //           </PrivateRoute>
  //         }
  //       />

  //       <Route
  //         path="/student/dashboard"
  //         element={
  //           <PrivateRoute allowedRoles={["student"]}>
  //             <StudentDashboard />
  //           </PrivateRoute>
  //         }
  //           />
  //     </Routes>
  //   </>

  <>
  <Routes>

  {/* Public */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
   {/* Admission Form */}
  <Route path="/admission-form" element={<AdmissionForm />} />
  {/* Payment Page */}
  <Route path="/payment" element={<PaymentPage />} />

  {/* Admin */}
  <Route element={<AdminLayout />}>
    <Route
      path="/admin/*"
      element={
        <PrivateRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
  </Route>

  {/* Faculty */}
  <Route element={<FacultyLayout />}>
    <Route
      path="/faculty/dashboard"
      element={
        <PrivateRoute allowedRoles={["faculty"]}>
          <FacultyDashboard />
        </PrivateRoute>
      }
    />
  </Route>

  {/* Student */}
  <Route element={<StudentLayout />}>
    <Route
      path="/student/dashboard"
      element={
        <PrivateRoute allowedRoles={["student"]}>
          <StudentDashboard />
        </PrivateRoute>
      }
    />
  </Route>

</Routes>

  </>
  );
}

export default App;
