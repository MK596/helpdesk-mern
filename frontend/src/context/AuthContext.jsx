import { createContext, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const userFromStorage = localStorage.getItem("user");
            return userFromStorage ? JSON.parse(userFromStorage) : null;
        } catch (err) {
            console.error('Error parsing user from storage:', err);
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/users`, userData);
            setIsLoading(false);
            return response.data;
        } catch (err) {
            setIsLoading(false);
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            setError(message);
            throw new Error(message);
        }
    };

    const login = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/login`, userData);
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                setUser(response.data);
            }
            setIsLoading(false);
            return response.data;
        } catch (err) {
            setIsLoading(false);
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            setError(message);
            throw new Error(message);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                error,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
