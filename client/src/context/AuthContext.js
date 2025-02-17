import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Проверка токена и получение данных пользователя
            axios.get('http://localhost:5000/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                localStorage.removeItem('token');
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });
            const { token, userId, isAdmin } = response.data;
            localStorage.setItem('token', token);
            setUser({ id: userId, email, isAdmin });
            return true;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Ошибка входа');
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password
            });
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            setUser({ id: userId, email, name });
            return true;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 