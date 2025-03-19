import React, { createContext, useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [currentUser, setCurrentUser] = useState(user);

    const updateUser = (newUser) => {
        setCurrentUser(newUser);
    };

    const clearUser = () => {
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ user: currentUser, isAuthenticated, loginWithRedirect, logout, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );  
};

export const useUserContext = () => {
    return useContext(UserContext);
};