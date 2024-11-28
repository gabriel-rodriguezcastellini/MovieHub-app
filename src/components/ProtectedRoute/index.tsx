import { User } from "firebase/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  user,
}: {
  children: JSX.Element;
  user: User | null;
}) => {
  const token = localStorage.getItem("token");
  return user || token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
