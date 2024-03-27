import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import SingnUpPage from "./pages/SignUpPage.jsx";
import DataProvide from "./provider/DataProvide.jsx";
import DashBoard from "./pages/dashboard/DashBoard.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import DashboardPage from "./pages/dashboard/dashboard/DashboardPage.jsx";
import MedicinesPage from "./pages/dashboard/Medicines/MedicinesPage.jsx";
import ReportsPage from "./pages/dashboard/Reports/ReportsPage.jsx";
import AppointmentsPage from "./pages/dashboard/Appointments.jsx/AppointmentsPage.jsx";
import PlanPage from "./pages/dashboard/Plans/PlanPage.jsx";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/registration",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "home",
        element: <DashboardPage></DashboardPage>,
      },
      {
        path: "medicines",
        element: <MedicinesPage></MedicinesPage>,
      },
      {
        path: "reports",
        element: <ReportsPage></ReportsPage>,
      },
      {
        path: "appointments",
        element: <AppointmentsPage></AppointmentsPage>,
      },
      {
        path: "plans",
        element: <PlanPage></PlanPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <DataProvide>
        <RouterProvider router={router} />
      </DataProvide>
    </ChakraProvider>
  </React.StrictMode>
);
