import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext)!;

    // If user is not authenticated, redirect to the register page
    if (!user) {
        return <Navigate to="/register" />;
    }

    // If authenticated, render the nested routes
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
};

export default ProtectedRoute;
