// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyAppoinments from "./pages/MyAppoinments.jsx";
import Appoinment from "./pages/Appoinment.jsx";
import Login from "./pages/Login.jsx";
import AppContextProvider from "./context/AppContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <App />
      </AppContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/doctors/:speciality",
        element: <Doctors />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/my-appoinments",
        element: <MyAppoinments />,
      },
      {
        path: "/appoinment/:docId",
        element: <Appoinment />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
