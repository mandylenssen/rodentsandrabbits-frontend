import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid.js";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {},
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuth({
                isAuth: false,
                user: {},
                status: 'done',
            })
        }

    }, []);


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
                    console.log(response.data.principal.username)

                    setAuth({
                       isAuth: true,
                       user: {
                           username: response.data.principal.username,
                       },
                        status: 'done',
                   });
            console.log('Gebruiker is ingelogd');
            navigate('/')
               } catch (error) {
                  logout();
               }

        }




    function logout() {
        console.log('Gebruiker is uitgelogd');
        setAuth({
            isAuth: false,
            user: {},
            status: 'done',
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
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>)
    }


export default AuthContextProvider;