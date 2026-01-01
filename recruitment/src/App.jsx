import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleRoute from "./components/common/RoleRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterUser from "./pages/RegisterUser";
import JobHome from "./pages/jobs/JobHome";
import JobDetails from "./pages/jobs/JobDetails";
import CreateJob from "./pages/jobs/CreateJob";
import UpdateJob from "./pages/jobs/UpdateJob";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register-user"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <RegisterUser />
              </RoleRoute>
            }
          />

          <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/create"
          element={
            <RoleRoute allowedRoles={["Admin", "Recruiter"]}>
              <CreateJob />
            </RoleRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id/edit"
          element={
            <RoleRoute allowedRoles={["Admin", "Recruiter"]}>
              <UpdateJob />
            </RoleRoute>
          }
        />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
