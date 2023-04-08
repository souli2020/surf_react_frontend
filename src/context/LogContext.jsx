import React, { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [isLogged, setLogged] = useState(false);
    const token = localStorage.getItem('token');


    return (
        <AuthContext.Provider value={{ isLogged, setLogged, token }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider, AuthContext };
