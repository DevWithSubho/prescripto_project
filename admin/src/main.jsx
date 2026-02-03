import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

import DoctorContextProvider from "./context/DoctorContext.jsx";
import AppContextProvider from "./context/AppContex.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Appoinment from "./pages/admin/Appoinment.jsx";
import AddDoctor from "./pages/admin/AddDoctor.jsx";
import DoctorsList from "./pages/admin/DoctorsList.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";
import DoctorProfile from "./pages/doctor/DoctorProfile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <DoctorContextProvider>
          <AdminContextProvider>
            <App />
          </AdminContextProvider>
        </DoctorContextProvider>
      </AppContextProvider>
    ),
    children: [
      //admin routing
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/admin-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/all-appoinments",
        element: <Appoinment />,
      },
      {
        path: "/add-doctor",
        element: <AddDoctor />,
      },
      {
        path: "/doctor-list",
        element: <DoctorsList />,
      },
      //Doctor routings
      {
       

        path: "/doctor-dashboard",
        element: <DoctorDashboard />,
      },
      {
        path: "/doctor-appointments",
        element: <DoctorAppointments />,
      },
      {
        path: "/doctor-profile",
        element: <DoctorProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
