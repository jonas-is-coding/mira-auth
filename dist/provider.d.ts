import React, { ReactNode } from 'react';
interface User {
    id: string;
    name: string;
}
interface UserContextType {
    user: User | null;
    loading: boolean;
}
export declare const MiraProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useUser: () => UserContextType;
export {};
