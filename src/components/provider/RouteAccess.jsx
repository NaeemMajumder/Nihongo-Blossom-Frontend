

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RouteAccess = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [currentUserData, setCurrentUserData] = useState(null);
    const navigate = useNavigate();

    const email = user?.email || "bughunter7000@gmail.com"; // Replace with dynamic email logic if needed

    useEffect(() => {
        if (email) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/allUsers/user?email=${email}`);
                    if (!response.ok) {
                        throw new Error("User not found");
                    }
                    const data = await response.json();
                    setCurrentUserData(data);
                } catch (error) {
                    toast.error(error.message);
                    setCurrentUserData(null);
                }
            };
            fetchData();
        }
    }, [email]);

    useEffect(() => {
        if (currentUserData && !currentUserData.isAdmin) {
            toast.error("You are not an admin!");
            navigate("/admin/login"); // Redirect back to lessons page
        }
    }, [currentUserData, navigate]);

    if (!currentUserData) {
        return null; // Return null or a loading spinner while fetching data
    }

    return currentUserData.isAdmin ? children : null;
};

export default RouteAccess;

