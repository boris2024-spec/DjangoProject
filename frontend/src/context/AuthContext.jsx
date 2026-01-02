import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { loginRequest, registerRequest } from '../api/auth';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

function decodeJwtPayload(token) {
    try {
        const payload = token.split('.')[1];
        if (!payload) return null;

        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
        const json = atob(padded);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

const AuthContext = createContext({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    login: async () => { },
    register: async () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const hydrateFromStorage = () => {
        const access = localStorage.getItem(ACCESS_KEY);
        if (!access) {
            setUser(null);
            return;
        }

        const payload = decodeJwtPayload(access);
        if (!payload) {
            setUser(null);
            return;
        }

        setUser({
            id: payload.user_id || null,
            username: payload.username || null,
            is_staff: Boolean(payload.is_staff),
        });
    };

    useEffect(() => {
        hydrateFromStorage();

        const onStorage = (e) => {
            if (e.key === ACCESS_KEY || e.key === REFRESH_KEY) {
                hydrateFromStorage();
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const login = async (username, password) => {
        const data = await loginRequest(username, password);
        localStorage.setItem(ACCESS_KEY, data.access);
        localStorage.setItem(REFRESH_KEY, data.refresh);

        if (data.user) {
            setUser(data.user);
        } else {
            hydrateFromStorage();
        }

        return data;
    };

    const register = async (username, password) => {
        const data = await registerRequest(username, password);
        localStorage.setItem(ACCESS_KEY, data.access);
        localStorage.setItem(REFRESH_KEY, data.refresh);

        if (data.user) {
            setUser(data.user);
        } else {
            hydrateFromStorage();
        }

        return data;
    };

    const logout = () => {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        setUser(null);
    };

    const value = useMemo(() => {
        const isAuthenticated = Boolean(localStorage.getItem(ACCESS_KEY));
        const isAdmin = Boolean(user?.is_staff);
        return { isAuthenticated, isAdmin, user, login, register, logout };
    }, [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
