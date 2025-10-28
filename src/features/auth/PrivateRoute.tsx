import { useAuth } from "@/app/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
}

export default PrivateRoute;