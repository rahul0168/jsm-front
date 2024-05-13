import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const navigate = useNavigate(); // Initialize useHistory
    const token = localStorage.getItem('token'); // Get token from localStorage
    // const userRole = localStorage.getItem('UserRole'); // Get user role from localStorage


    useEffect(() => {
        // Check if token exists
        if (token === null ) {
            // Redirect to login page if token does not exist
            navigate('/login');
        }
    }, [token,navigate]); // Run   this effect when token or navigate changes

    // Render children if token exists (user is authenticated)
    return <>{children}</>;
};

export default Auth;
