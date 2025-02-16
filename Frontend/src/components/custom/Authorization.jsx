import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Authorization = ({ children }) => {
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // ? Un Authenticated User can Only Visit Login & Signup
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/signup")
    )
  ) {
    return <Navigate to={"/auth/login"} replace />;
  }

  // ? Authenticated user can visit Any Page except Login & Signup
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/signup"))
  ) {
    // * Based on Role - Admin or User
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} replace />;
    } else {
      return <Navigate to={"/shop"} replace />;
    }
  }

  // ? Authenticated User try to visit Admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to={"/un-auth"} replace />;
  }

  // ? Authenticated Admin try to visit Shop
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    (location.pathname === "/" || location.pathname.includes("/shop"))
  ) {
    return <Navigate to={"/admin/dashboard"} replace />;
  }

  // ? No Restriction to Visit Page
  return <>{children}</>;
};

export default Authorization;
