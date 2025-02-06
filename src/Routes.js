import { Route, Routes } from "react-router-dom";
import ContactFormSection from "./components/core/AboutPage/ContactFormSection";
import MyProfile from "./components/core/Dashboard/MyProfile";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";

import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";

const NavigateRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path="/about" element={About} />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact" element={<ContactFormSection />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route
            path="/dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default NavigateRoute;
