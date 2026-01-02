import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';

export default function AdminRoute({ children }) {
    const { isAuthenticated, isAdmin } = useAuth();
    const { showSnackbar } = useSnackbar();
    const notifiedRef = useRef(false);

    useEffect(() => {
        if (isAuthenticated && !isAdmin && !notifiedRef.current) {
            notifiedRef.current = true;
            showSnackbar('Access denied', 'error');
        }
    }, [isAuthenticated, isAdmin, showSnackbar]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}
