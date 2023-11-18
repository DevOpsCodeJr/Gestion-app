import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Global } from '../helpers/Global'

export const AppContext = createContext();

export const initialState = { theme: !!localStorage.theme }

export const AppProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        authUser();
    }, [])

    const authUser = async () => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
    
        const userObject = JSON.parse(user);
    
        if (!token || !user) {
          setLoading(false);
          return false;
        }
    
        setAuth(userObject);
        setLoading(false);
      };

    const reducer = (state, action) => {
        switch (action.type) {
            case Global.actionType[0].TOGGLE_THEME:
                return { ...state, theme: !state.theme }
            default:
                return
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={{ auth, setAuth, loading, setLoading, state, dispatch, }}>
            {children}
        </AppContext.Provider>
    );
};