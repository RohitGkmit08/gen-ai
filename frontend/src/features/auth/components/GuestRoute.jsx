import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#121212",
                color: "#78ffd6",
                fontFamily: "sans-serif"
            }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;
