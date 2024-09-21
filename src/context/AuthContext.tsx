import { createContext, useState, ReactNode } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../helper/Alert';

interface AuthContextType {
    user: any | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(localStorage.getItem('auth-details'));
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            console.log(res.data, 'res.data')
            localStorage.setItem('auth-details', JSON.stringify(res.data));
            setUser(JSON.stringify(res.data));
            navigate('/my-to-do');

            Alert('success', 'Welcome back!');
        } catch (error: any) {
            Alert('error', error.response?.data?.message || 'Something went wrong!');
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await api.post('/auth/register', { name, email, password });
            navigate('/my-to-do');

            Alert('success', 'You can now log in!');
        } catch (error: any) {
            Alert('error', error.response?.data?.message || 'Something went wrong!');
        }
    };

    const logout = () => {
        localStorage.removeItem('auth-details');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }
        }>
            {children}
        </AuthContext.Provider>
    );
};
