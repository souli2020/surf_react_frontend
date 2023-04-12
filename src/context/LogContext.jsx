import React, { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [isLogged, setLogged] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem('token');


    return (
        <AuthContext.Provider value={{ isLogged, setLogged, setRefresh, refresh, token }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider, AuthContext };
