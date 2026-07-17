/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAndsetUser = async () => {
            try {
                const data = await getMe();
                if (data && data.user) {
                    setUser(data.user);
                }
            } catch (err) {
                console.log("No active session:", err);
            } finally {
                setLoading(false);
            }
        };
        getAndsetUser();
    }, []);

    return(
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    );
};