import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Projects from "../pages/Projects"
import Tasks from "../pages/Tasks"
import Reports from "../pages/Reports"
function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
        }
      />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
        }
      />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes 