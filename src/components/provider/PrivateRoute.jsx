import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({children}) => {

    let {user, loading} = useContext(AuthContext);
    let location = useLocation();

    if(loading){
        return <span className="loading loading-spinner text-info"></span>;
    }

    if(user && user.email){
        return children;
    }

    return (
        <>
            <Navigate state={location.pathname} to="/login" ></Navigate>
        </>
    );
};

export default PrivateRoute;