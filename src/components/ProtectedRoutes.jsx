/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const user = localStorage.getItem("user");

  if (user) return children;
  else return <Navigate to={"/create-trip"} />;
}
