import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function ProtectedRoute({ children }) {
  const authorization = useAuth();
  return authorization.token ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
