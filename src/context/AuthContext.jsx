import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid.jsx";
import Spinner from "../components/spinner/Spinner.jsx";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {},
        role: "",
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuth(prevState => ({...prevState, status: "done"}));
        }
    }, []);


    async function login(token) {
        try {
            localStorage.setItem("token", token);
            const response = await axios.get(`http://localhost:8080/authenticated`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAuth({
                isAuth: true,
                user: {
                    username: response.data.principal.username,
                },
                role: response.data.principal.authorities[0].authority,
                status: "done",
            });
        } catch (error) {
            logout();
        }

    }


    function logout() {
        localStorage.removeItem("token");
        setAuth({
            isAuth: false,
            user: {},
            role: "",
            status: "done",
        });
        navigate("/");
    }

    function isAdmin() {
        return auth.role === "ROLE_ADMIN";
    }


    function hasRole(requiredRole) {
        return auth.role === requiredRole;
    }

    const data = {
        ...auth,
        login,
        logout,
        isAdmin,
        hasRole,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <Spinner/>}
        </AuthContext.Provider>)
}


export default AuthContextProvider;