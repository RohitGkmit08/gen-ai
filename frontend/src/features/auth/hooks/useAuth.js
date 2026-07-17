import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout } from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            if (data && data.user) {
                setUser(data.user);
            }
            return { success: true };
        } catch (err) {
            console.error("Registration failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            if (data && data.user) {
                setUser(data.user);
            }
            return { success: true };
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            return { success: true };
        } catch (err) {
            console.error("Logout failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleLogin, handleRegister, handleLogout };
};