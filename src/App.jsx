import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DocumentPage from "./pages/DocumentPage";
import UploadDocument from "./pages/UploadDocument";
import Syllabus from "./pages/Syllabus";
import Notices from "./pages/Notices";
import CourseDetail from "./pages/CourseDetail";
import Support from "./pages/Support";
import Settings from "./pages/Settings.jsx";
import Association from "./pages/Association";
import AssociationCalendar from "./pages/AssociationCalendar";
import AssociationRegister from "./pages/AssociationRegister";
import AssociationJoin from "./pages/AssociationJoin";
import AssociationReports from "./pages/AssociationReports";
import Attendance from "./pages/Attendance";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import ChangePassword from "./pages/ChangePassword";
import { AlertProvider } from "./components/AlertContext";
import { ThemeProvider } from "./components/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/syllabus",
    element: (
      <ProtectedRoute>
        <Syllabus />
      </ProtectedRoute>
    ),
  },
  {
    path: "/attendance",
    element: (
      <ProtectedRoute>
        <Attendance />
      </ProtectedRoute>
    ),
  },
  {
    path: "/logs",
    element: (
      <ProtectedRoute>
        <DocumentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/upload-doc",
    element: (
      <ProtectedRoute>
        <UploadDocument />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notices",
    element: (
      <ProtectedRoute>
        <Notices />
      </ProtectedRoute>
    ),
  },
  {
    path: "/syllabus/:courseId",
    element: (
      <ProtectedRoute>
        <CourseDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/support",
    element: (
      <ProtectedRoute>
        <Support />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/association",
    element: (
      <ProtectedRoute>
        <Association />
      </ProtectedRoute>
    ),
  },
  {
    path: "/association/calendar",
    element: (
      <ProtectedRoute>
        <AssociationCalendar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/association/register",
    element: (
      <ProtectedRoute>
        <AssociationRegister />
      </ProtectedRoute>
    ),
  },
  {
    path: "/association/join",
    element: (
      <ProtectedRoute>
        <AssociationJoin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/association/reports",
    element: (
      <ProtectedRoute>
        <AssociationReports />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </ThemeProvider>
  );
}

// ...existing code...
