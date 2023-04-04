import React, { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [isLogged, setLogged] = useState(false);
    const handleLog = () => {
        setLogged(prev => !prev)
    }

    return (
        <AuthContext.Provider value={{ isLogged, setLogged }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider, AuthContext };
