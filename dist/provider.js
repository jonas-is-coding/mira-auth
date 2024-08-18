"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { createContext, useContext, useEffect, useState } from 'react';
const UserContext = createContext({ user: null, loading: true });
export const MiraProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield fetch('/api/session');
                if (res.ok) {
                    const data = yield res.json();
                    setUser(data);
                }
                else {
                    console.error('Failed to fetch user data:', res.statusText);
                }
            }
            catch (error) {
                console.error('Error fetching user data:', error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchUser();
    }, []);
    return (React.createElement(UserContext.Provider, { value: { user, loading } }, children));
};
export const useUser = () => useContext(UserContext);
