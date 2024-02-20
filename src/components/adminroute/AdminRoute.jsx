import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { isAuth, isAdmin } = useContext(AuthContext);

    if (!isAuth || !isAdmin()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;
