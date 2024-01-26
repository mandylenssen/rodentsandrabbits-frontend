import {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {},
    });
    const navigate = useNavigate();


    async function login(token) {
        try {
            localStorage.setItem('token', token);
                   const response = await axios.get(`http://localhost:8080/authenticated`, {
                   headers: {
                       "Content-Type": "application/json",
                       Authorization: `Bearer ${token}`,
                   },
               });
                   console.log(response)
            // const user = response.data;
                    setAuth({
                       isAuth: true,
                       user: {
                           username: response.data.username,
                           // id: response.data.id,
                       }
                   });
               } catch (error) {
                  logout();
               }
            console.log('Gebruiker is ingelogd');
            navigate('/')
        }




    function logout() {
        console.log('Gebruiker is uitgelogd');
        setAuth({
            isAuth: false,
            user: {},
        });
        navigate('/')
    }

    const data = {
        login: login,
        logout: logout,
        isAuth: auth.isAuth
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>)
    }


export default AuthContextProvider;